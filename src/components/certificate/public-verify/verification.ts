import "server-only";

import { headers } from "next/headers";
import type {
  ApiResponse,
  CertificateVerificationResponse,
} from "@/types/certificate";
import { VERIFICATION_ID_PATTERN } from "./format";

export type VerificationState =
  | { status: "valid"; certificate: CertificateVerificationResponse }
  | { status: "revoked"; certificate: CertificateVerificationResponse }
  | { status: "not_found"; debug?: string }
  | { status: "invalid_input"; debug?: string }
  | { status: "rate_limited"; debug?: string }
  | { status: "service_error"; debug?: string };

function getBackendBaseUrl(): string | null {
  const base = process.env.BACKEND_API_URL ?? process.env.BACKEND_URL;
  if (!base) return null;
  return base.replace(/\/$/, "");
}

/* -------------------------------------------------------------------------- */
/* Diagnostics                                                                */
/* -------------------------------------------------------------------------- */

const DIAGNOSTICS_ENABLED =
  process.env.NODE_ENV !== "production" || process.env.VERIFY_DEBUG === "1";

function debugInfo(message: string): string | undefined {
  return DIAGNOSTICS_ENABLED ? message : undefined;
}

/* -------------------------------------------------------------------------- */
/* Rate limiting                                                              */
/* -------------------------------------------------------------------------- */
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headerList.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Opportunistic sweep so the map cannot grow without bound.
  if (hits.size > 10_000) {
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }

  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

/* -------------------------------------------------------------------------- */
/* Response parsing                                                           */
/* -------------------------------------------------------------------------- */

type Envelope = Partial<ApiResponse<CertificateVerificationResponse>>;

function parseEnvelope(raw: string): Envelope | null {
  if (!raw.trim()) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    return parsed as Envelope;
  } catch {
    // Not JSON at all — an HTML error page, a proxy message, or empty.
    return null;
  }
}

function looksLikeAppEnvelope(body: Envelope | null): boolean {
  return (
    body !== null && (typeof body.success === "boolean" || "message" in body)
  );
}

function classifyFailure(
  status: number,
  body: Envelope | null,
  raw: string,
): VerificationState {
  const snippet = raw.slice(0, 300);

  if (status === 429) {
    return {
      status: "rate_limited",
      // debug: debugInfo(`Backend returned 429. Body: ${snippet}`),
    };
  }

  if (
    status === 400 ||
    status === 404 ||
    status === 410 ||
    status === 422 ||
    status === 401
  ) {
    return {
      status: "not_found",
      // debug: debugInfo(`Backend returned ${status}. Body: ${snippet}`),
    };
  }

  if (looksLikeAppEnvelope(body) && body?.success === false) {
    return {
      status: "not_found",
      debug: debugInfo(
        `Backend returned ${status} with success:false. Message: ${body?.message ?? "(none)"}`,
      ),
    };
  }

  console.error(
    `[verify] unexpected backend response ${status}: ${snippet || "(empty body)"}`,
  );
  return {
    status: "service_error",
    // debug: debugInfo(`Backend returned ${status}. Body: ${snippet}`),
  };
}

/* -------------------------------------------------------------------------- */
/* Verification                                                               */
/* -------------------------------------------------------------------------- */
export async function verifyByVerificationId(
  verificationId: string,
): Promise<VerificationState> {
  const trimmed = verificationId.trim();

  // Reject obvious junk locally so path noise never reaches the backend, and so
  // a malformed link reads as "bad link" rather than "no such certificate".
  if (!VERIFICATION_ID_PATTERN.test(trimmed)) {
    return {
      status: "invalid_input",
      debug: debugInfo(
        `"${trimmed.slice(0, 80)}" does not match ${VERIFICATION_ID_PATTERN}`,
      ),
    };
  }

  if (isRateLimited(await getClientIp())) {
    return { status: "rate_limited" };
  }

  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) {
    console.error("[verify] BACKEND_API_URL is not configured");
    return {
      status: "service_error",
      // debug: debugInfo("BACKEND_API_URL / BACKEND_URL is not set"),
    };
  }

  const target = new URL(`${baseUrl}/api/v1/certificates/verify`);
  target.searchParams.set("verificationId", trimmed);

  let response: Response;
  try {
    response = await fetch(target, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    // Network failure, DNS, or AbortSignal.timeout — a system problem, and the
    // one case where we genuinely learned nothing about the certificate.
    console.error("[verify] request failed", error);
    return {
      status: "service_error",
      debug: debugInfo(
        `fetch failed: ${error instanceof Error ? error.message : String(error)}`,
      ),
    };
  }

  const raw = await response.text().catch(() => "");
  const body = parseEnvelope(raw);

  if (!response.ok) {
    return classifyFailure(response.status, body, raw);
  }

  if (!body) {
    console.error(`[verify] 200 with unparseable body: ${raw.slice(0, 300)}`);
    return {
      status: "service_error",
      debug: debugInfo(`200 but body is not JSON: ${raw.slice(0, 300)}`),
    };
  }

  // The backend may answer 200 for a miss, so `success: false` or an empty
  // `data` is the real not-found signal on a successful HTTP response.
  if (body.success === false || !body.data) {
    return {
      status: "not_found",
      debug: debugInfo(
        `200 with success:${String(body.success)}, data:${
          body.data ? "present" : "empty"
        }. Message: ${body.message ?? "(none)"}`,
      ),
    };
  }

  const certificate = body.data;

  // Fail safe: only an explicit boolean is trusted. If the field is missing or
  // renamed server-side, report a system problem rather than claim validity.
  if (typeof certificate.revoked !== "boolean") {
    console.error("[verify] backend payload is missing the `revoked` flag");
    return {
      status: "service_error",
      debug: debugInfo(
        `Payload has no boolean "revoked". Keys: ${Object.keys(certificate).join(", ")}`,
      ),
    };
  }

  return certificate.revoked
    ? { status: "revoked", certificate }
    : { status: "valid", certificate };
}

import "server-only";

import { headers } from "next/headers";
import type {
  ApiResponse,
  CertificateVerificationResponse,
} from "@/types/certificate";
import { VERIFICATION_ID_PATTERN } from "./format";

/**
 * Server-only module: reads BACKEND_API_URL and talks to the backend directly.
 * The `server-only` import above makes an accidental Client Component import a
 * build-time error instead of a silent env-var leak into the browser bundle.
 *
 * Backend contract (OpenAPI, api.sastracode.tech):
 *   GET /api/v1/certificates/verify?verificationId={id}
 *     -> 200 ApiResponse<CertificateVerificationResponse>
 *     -> no `security` block: public, no Authorization header needed.
 *
 * IMPORTANT: the spec documents ONLY the 200 response. What the backend returns
 * for an unknown verificationId is undefined by contract — it could be 404, 400,
 * a 500 from an unmapped `orElseThrow`, or an HTML error page. So the status
 * code alone is not enough to classify the outcome; `classifyFailure` below
 * reads the body too.
 */

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

/**
 * Diagnostics are attached to the state (and rendered in a collapsed block) in
 * development, or in any environment where VERIFY_DEBUG=1 is set. Never on by
 * default in production: the messages can echo backend internals.
 */
const DIAGNOSTICS_ENABLED =
  process.env.NODE_ENV !== "production" || process.env.VERIFY_DEBUG === "1";

function debugInfo(message: string): string | undefined {
  return DIAGNOSTICS_ENABLED ? message : undefined;
}

/* -------------------------------------------------------------------------- */
/* Rate limiting                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The verify endpoint is public and returns a student's name, so an unthrottled
 * page is a certificate-enumeration and PII-scraping endpoint. This is a
 * best-effort in-process limiter: it resets on deploy and is per-instance, so
 * put a real limiter (Redis, or the CDN/WAF) in front of
 * `/student/certificate/verify/*` before this sees serious traffic.
 */
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

/**
 * Does this body look like the application's own ApiResponse envelope?
 *
 * This is the signal that separates "the service considered the request and
 * said no" from "something upstream fell over". A Spring `@ControllerAdvice`
 * that renders the standard envelope means the app handled the case
 * deliberately, whatever HTTP status it chose to pair with it. A Whitelabel
 * error page or a proxy's HTML means nobody handled anything.
 */
function looksLikeAppEnvelope(body: Envelope | null): boolean {
  return (
    body !== null && (typeof body.success === "boolean" || "message" in body)
  );
}

/**
 * Map a non-2xx response to a state.
 *
 * The only user-controlled input is the verificationId, so the 4xx family here
 * means "that identifier is no good", not "the system is broken" — Spring
 * commonly answers 400 (bad UUID format) or 404 (no such row) for exactly this.
 *
 * 5xx is deliberately NOT folded into not_found by status alone: a real outage
 * must never render as "this certificate does not exist". The one exception is
 * a 5xx that still carries the app's own envelope, which indicates a handled
 * lookup failure rather than a crash.
 */
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

/**
 * Unauthenticated, server-side lookup against the public verify endpoint, with
 * a hard timeout, mapping every outcome to one explicit state.
 *
 * Two rules drive the mapping:
 *   1. A transport-level or unhandled failure MUST surface as `service_error`,
 *      never `not_found` — an outage is not a verdict on the certificate.
 *   2. A missing `revoked` flag MUST NOT be read as "not revoked". Failing open
 *      would show a revoked certificate as valid, so an absent flag is treated
 *      as a broken contract and surfaces as `service_error`.
 */
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

  // Read as text first. The endpoint advertises `*/*`, so a failure can arrive
  // as an HTML error page — calling response.json() straight away would throw
  // and lose the information needed to classify what happened.
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

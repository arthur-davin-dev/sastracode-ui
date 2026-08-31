import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

/**
 * Single source of truth for turning an API failure into something we can show
 * the user. Every RTK Query mutation/query in the app throws one of a handful of
 * shapes:
 *
 *   - `FetchBaseQueryError` with a parsed body: `{ status: number, data: ... }`
 *     where `data` is the backend envelope, usually `{ message, errorCode,
 *     errors? }` (Spring `ApiResponse` / `@Valid` failures).
 *   - `FetchBaseQueryError` transport errors: `{ status: "FETCH_ERROR" |
 *     "PARSING_ERROR" | "TIMEOUT_ERROR" | "CUSTOM_ERROR", error: string }`.
 *   - `SerializedError` / a plain `Error` from `onQueryStarted` or thrown code.
 *   - The nested `{ error: FetchBaseQueryError }` shape from `queryFulfilled`.
 *
 * We always prefer the backend `message`, fall back to field-level validation
 * messages, and only then to a caller-supplied generic string. Raw JS errors
 * ("TypeError: Failed to fetch"), HTML error pages and stack-trace-looking
 * strings are never surfaced.
 */

/** Generic last-resort message. Callers should pass their own contextual one. */
export const DEFAULT_API_ERROR_MESSAGE =
  "មានបញ្ហាបានកើតឡើង។ សូមព្យាយាមម្ដងទៀត។";

type MaybeRecord = Record<string, unknown>;

function asRecord(value: unknown): MaybeRecord | null {
  return value && typeof value === "object" ? (value as MaybeRecord) : null;
}

/** Reject transport/parser noise and leaked server internals from a toast. */
function looksTechnical(message: string): boolean {
  return (
    message.startsWith("<") ||
    // Transport / JSON-parse noise.
    /failed to fetch|networkerror|load failed|econnrefused|econnreset|\bfetch(ing)?\b.*fail|unexpected token|is not valid json|<!doctype|\bat\s+\w+\.[\w<]/i.test(
      message,
    ) ||
    // Leaked persistence / framework internals (e.g. a Spring/JPA
    // "Query did not return a unique result: 3 results were returned").
    /query did not return a unique result|could not execute statement|non-?unique result|incorrectresultsize|constraintviolation|dataintegrityviolation|org\.(hibernate|springframework|postgresql)|psqlexception|\bjdbc\b|\bsql(exception|state)\b|nested exception/i.test(
      message,
    )
  );
}

function cleanMessage(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || looksTechnical(trimmed)) return null;
  return trimmed;
}

/** Walk to the backend response body regardless of which wrapper we were given. */
function getErrorData(error: unknown): unknown {
  const record = asRecord(error);
  if (!record) return undefined;
  if ("data" in record) return record.data;
  if (record.error && typeof record.error === "object") {
    return getErrorData(record.error);
  }
  return undefined;
}

/**
 * Field-level validation errors keyed by field name. Handles the shapes the
 * backend produces: `{ errors: { field: msg } }`, `{ errors: [{ field, reason |
 * message | defaultMessage }] }` and Bean Validation `violations`.
 */
export function getApiFieldErrors(error: unknown): Record<string, string> {
  return fieldErrorsFromData(getErrorData(error));
}

function fieldErrorsFromData(data: unknown): Record<string, string> {
  const record = asRecord(data);
  if (!record) return {};

  const raw = record.errors ?? record.fieldErrors ?? record.violations;
  if (!raw) return {};

  const out: Record<string, string> = {};

  if (Array.isArray(raw)) {
    for (const item of raw) {
      const entry = asRecord(item);
      if (!entry) continue;
      const field =
        entry.field ??
        entry.property ??
        entry.propertyPath ??
        entry.name ??
        entry.objectName;
      const message = cleanMessage(
        entry.reason ?? entry.message ?? entry.defaultMessage ?? entry.error,
      );
      if (typeof field === "string" && message) out[field] = message;
    }
  } else {
    const entries = asRecord(raw);
    if (entries) {
      for (const [field, value] of Object.entries(entries)) {
        const message = Array.isArray(value)
          ? cleanMessage(value[0])
          : cleanMessage(value);
        if (message) out[field] = message;
      }
    }
  }

  return out;
}

/** "birthday" -> "Birthday", "phoneNumber" -> "Phone number". */
function humanizeField(field: string): string {
  const spaced = field
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[._-]+/g, " ")
    .trim();
  return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : field;
}

/**
 * Collect field-level validation reasons as display lines, e.g.
 * `Birthday: must be a past date`. A numeric/blank field key is dropped so the
 * bare reason shows instead.
 */
function validationMessagesFromData(data: unknown): string[] {
  return Object.entries(fieldErrorsFromData(data)).map(([field, message]) =>
    field && !/^\d+$/.test(field)
      ? `${humanizeField(field)}: ${message}`
      : message,
  );
}

/**
 * Pull a human message out of the backend response body.
 *
 * Field-level validation reasons win over a generic top-level `message`
 * ("Validation failed") because they are the specific, actionable thing to
 * show. The wrapper message is only used when there are no field reasons.
 */
function messageFromData(data: unknown): string | null {
  const direct = cleanMessage(data);
  if (direct) return direct;

  const record = asRecord(data);
  if (!record) return null;

  const validationMessages = validationMessagesFromData(data);
  if (validationMessages.length) return validationMessages.join("\n");

  return (
    cleanMessage(record.message) ??
    cleanMessage(record.error) ??
    cleanMessage(record.detail) ??
    cleanMessage(record.title) ??
    cleanMessage(record.errorMessage)
  );
}

const BODY_KEYS = [
  "message",
  "errors",
  "fieldErrors",
  "violations",
  "detail",
  "title",
  "errorMessage",
] as const;

function extractApiErrorMessage(error: unknown): string | null {
  if (typeof error === "string") return cleanMessage(error);

  const record = asRecord(error);
  if (!record) return null;

  // `{ status: "FETCH_ERROR" | "PARSING_ERROR" | ... }` – a transport failure.
  // Its `error` field only ever holds a raw JS error string, never anything
  // worth showing, so those shapes fall straight through to the fallback.
  const isTransportError = typeof record.status === "string";

  // RTK Query `FetchBaseQueryError` with a parsed response body.
  if ("data" in record) {
    const fromBody = messageFromData(record.data);
    if (fromBody) return fromBody;
  }

  // Nested `{ error: FetchBaseQueryError }` (e.g. from `queryFulfilled`).
  if (record.error && typeof record.error === "object") {
    const nested = extractApiErrorMessage(record.error);
    if (nested) return nested;
  }

  // The value handed in may already BE the backend response body – a non-RTK
  // fetch, a manually unwrapped `.data`, or a thrown plain object.
  if (!isTransportError && BODY_KEYS.some((key) => key in record)) {
    const fromSelf = messageFromData(record);
    if (fromSelf) return fromSelf;
  }

  // `SerializedError` / plain `Error`.
  if (!isTransportError) {
    const fromMessage = cleanMessage(record.message);
    if (fromMessage) return fromMessage;
  }

  return null;
}

/**
 * Resolve an API error to a user-facing message.
 *
 * With a `fallback` it always returns a string (the backend message when there
 * is a usable one, otherwise the fallback). Without a `fallback` it returns
 * `null` when the backend gave us nothing usable, so callers can decide.
 */
export function getApiErrorMessage(error: unknown, fallback: string): string;
export function getApiErrorMessage(error: unknown): string | null;
export function getApiErrorMessage(
  error: unknown,
  fallback?: string,
): string | null {
  return extractApiErrorMessage(error) ?? fallback ?? null;
}

/** HTTP status code from a `FetchBaseQueryError`, when there is a numeric one. */
export function getApiErrorStatus(error: unknown): number | null {
  const record = asRecord(error);
  if (!record) return null;
  if (typeof record.status === "number") return record.status;
  if (record.error && typeof record.error === "object") {
    return getApiErrorStatus(record.error);
  }
  return null;
}

export type { FetchBaseQueryError, SerializedError };

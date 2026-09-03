/**
 * Client-safe helpers shared by the public certificate-verification UI.
 * Kept free of `fetch`/`process.env` so it can be imported from Client Components.
 */

/**
 * Shape of the identifier encoded in SastraCode certificate QR codes and in the
 * public verify URL (`/student/certificate/verify/{verificationId}`).
 *
 * Deliberately permissive — the backend owns the canonical format — but tight
 * enough to reject path junk, whitespace, and separators before we forward it.
 */
export const VERIFICATION_ID_PATTERN = /^[A-Za-z0-9_-]{6,100}$/;

const issuedDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatIssuedDate(issuedAt: string | undefined): string {
  if (!issuedAt) return "—";
  const date = new Date(issuedAt);
  if (Number.isNaN(date.getTime())) return "—";
  return issuedDateFormatter.format(date);
}

// Re-exported so existing `@/lib/qa/qa-utils` importers keep working; the
// implementation now lives in the shared API error helper.
export { getApiErrorMessage } from "@/lib/api/error";

export function resolveAvatarUrl(avatarFileId?: string): string | undefined {
  const value = avatarFileId?.trim();
  if (!value) return undefined;
  return `/api/files/${encodeURIComponent(value)}/content`;
}

export function initialsFromName(name?: string): string {
  const trimmed = name?.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

export function formatRelativeTime(iso?: string): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";

  const diffSeconds = Math.max(0, Math.floor((Date.now() - then) / 1000));

  if (diffSeconds < 60) return "ទើបតែឥឡូវ";
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes} នាទីមុន`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} ម៉ោងមុន`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays} ថ្ងៃមុន`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} ខែមុន`;
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} ឆ្នាំមុន`;
}

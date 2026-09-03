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

export interface RelativeTimeLabels {
  justNow: string;
  /** Templates use `{n}` as the numeric placeholder. */
  minutesAgo: string;
  hoursAgo: string;
  daysAgo: string;
  monthsAgo: string;
  yearsAgo: string;
}

// Default labels keep the historical Khmer output for any caller that has not
// been migrated to pass localized labels yet.
const DEFAULT_RELATIVE_TIME_LABELS: RelativeTimeLabels = {
  justNow: "ទើបតែឥឡូវ",
  minutesAgo: "{n} នាទីមុន",
  hoursAgo: "{n} ម៉ោងមុន",
  daysAgo: "{n} ថ្ងៃមុន",
  monthsAgo: "{n} ខែមុន",
  yearsAgo: "{n} ឆ្នាំមុន",
};

export function formatRelativeTime(
  iso?: string,
  labels: RelativeTimeLabels = DEFAULT_RELATIVE_TIME_LABELS,
): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";

  const diffSeconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  const fill = (template: string, n: number) => template.replace("{n}", String(n));

  if (diffSeconds < 60) return labels.justNow;
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return fill(labels.minutesAgo, diffMinutes);
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return fill(labels.hoursAgo, diffHours);
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return fill(labels.daysAgo, diffDays);
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return fill(labels.monthsAgo, diffMonths);
  const diffYears = Math.floor(diffMonths / 12);
  return fill(labels.yearsAgo, diffYears);
}

import type { InstructorApplicationStatus } from "@/types/instructor-application";

// API error parsing is shared app-wide. Re-exported here (with the historical
// local name `getFieldErrors`) so this feature's call sites stay unchanged.
export {
  getApiErrorMessage,
  getApiErrorStatus as getErrorStatus,
  getApiFieldErrors as getFieldErrors,
} from "@/lib/api/error";

/** Frontend mirror of backend `@Size(max = 2000)` on `expertise`. */
export const EXPERTISE_MAX_LENGTH = 2000;

/** Backend accepts PDF for the CV. No size limit is defined in the API contract. */
export const CV_ACCEPT = ".pdf,application/pdf";

export const STATUS_META: Record<
  InstructorApplicationStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  PENDING: {
    label: "កំពុងរង់ចាំការត្រួតពិនិត្យ",
    badgeClass:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    dotClass: "bg-amber-500",
  },
  APPROVED: {
    label: "ត្រូវបានអនុម័ត",
    badgeClass:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    dotClass: "bg-emerald-500",
  },
  REJECTED: {
    label: "ត្រូវបានបដិសេធ",
    badgeClass: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300",
    dotClass: "bg-red-500",
  },
};

/**
 * Map a backend `missingFields` key to a readable label. The backend returns
 * User-entity field names; anything unmapped falls back to a spaced version of
 * the raw key so a new backend field still renders sensibly.
 */
const MISSING_FIELD_LABELS: Record<string, string> = {
  firstName: "នាមខ្លួន",
  lastName: "នាមត្រកូល",
  email: "អាសយដ្ឋានអ៊ីមែល",
  gender: "ភេទ",
  birthday: "ថ្ងៃខែឆ្នាំកំណើត",
  phoneNumber: "លេខទូរស័ព្ទ",
  biography: "ប្រវត្តិសង្ខេប",
  workStudyType: "ប្រភេទការងារ ឬការសិក្សា",
  institutionName: "ឈ្មោះស្ថាប័ន",
  avatar: "រូបភាពប្រវត្តិរូប",
  avatarFileId: "រូបភាពប្រវត្តិរូប",
  locale: "ភាសា",
};

export function missingFieldLabel(key: string): string {
  if (MISSING_FIELD_LABELS[key]) return MISSING_FIELD_LABELS[key];

  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

export function formatDateTime(value?: string | null): string {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/** Same-origin route handler that streams a stored file's content. */
export function cvFileHref(cvFileId: string): string {
  return `/api/v1/files/${encodeURIComponent(cvFileId)}`;
}

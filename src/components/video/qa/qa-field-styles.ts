/**
 * Shared field styling for the lesson-page Q&A inputs (question composer,
 * answer box, and the inline edit forms). Centralised here so every text
 * field on the course lesson page reads as one system:
 *   - rounded-xl, soft surface, hairline border, subtle shadow
 *   - comfortable touch-friendly padding, clean typography
 *   - smooth focus: primary-color border + soft primary ring, no browser outline
 *   - dark-mode aware; disabled and aria-invalid states covered
 *
 * Colours use the project's `primary-color` token and the existing slate
 * scale already used across the lesson page — no new colours introduced.
 */

/** Standalone field (single input or textarea that owns its own box). */
export const qaField =
  "w-full rounded-xl border border-slate-200/80 bg-slate-0 px-3.5 py-2.5 text-sm text-slate-900 shadow-xs " +
  "outline-none transition-colors placeholder:text-slate-400 " +
  "hover:border-slate-300/80 " +
  "focus:border-primary-color/10 focus:bg-white focus:ring-1 focus:ring-primary-color/10 " +
  "disabled:cursor-not-allowed disabled:opacity-60 " +
  "aria-invalid:border-red-400 aria-invalid:ring-2 aria-invalid:ring-red-400/20 " +
  "dark:border-slate-700/70 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 " +
  "dark:hover:border-slate-600/70 dark:focus:border-primary-color dark:focus:bg-slate-950";

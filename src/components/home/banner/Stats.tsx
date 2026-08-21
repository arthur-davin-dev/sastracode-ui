"use client";

import { useTranslation } from "@/hooks/useTranslations";

export default function Stats() {
  const t = useTranslation();

  return (
    <div
      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-500 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:px-6 sm:text-base"
      aria-label={t.banner.badge}
    >
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-purple-500" aria-hidden="true" />
      <span>{t.banner.badge}</span>
    </div>
  );
}

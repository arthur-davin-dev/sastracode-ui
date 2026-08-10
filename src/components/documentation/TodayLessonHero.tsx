import Link from "next/link";
import { ArrowRight, BookOpen, Share2 } from "lucide-react";

interface TodayLessonHeroProps {
  title: string;
  description: string;
  percent: number;
  href: string;
}

export default function TodayLessonHero({
  title,
  description,
  percent,
  href,
}: TodayLessonHeroProps) {
  const safePercent = Math.min(100, Math.max(0, Math.round(percent)));

  return (
    <section className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-slate-50 p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="absolute inset-x-0 top-0 h-1 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-r-full bg-[#002455] transition-[width] duration-500 dark:bg-blue-400"
          style={{ width: `${safePercent}%` }}
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 max-w-2xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="font-khmer inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-[#002455] shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-blue-300">
              <BookOpen className="h-3.5 w-3.5" />
              មេរៀនថ្ងៃនេះ
            </span>

            <span className="rounded-full bg-[#002455] px-2.5 py-1 text-xs font-bold text-white dark:bg-blue-500">
              {safePercent}%
            </span>
          </div>

          <h1 className="font-khmer text-balance text-2xl font-bold leading-tight tracking-tight text-[#002455] sm:text-3xl dark:text-white">
            {title}
          </h1>

          <p className="font-khmer mt-3 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-300">
            {description}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          <Link
            href={href}
            className="font-khmer inline-flex h-10 items-center gap-2 rounded-xl bg-[#002455] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00346f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/30 focus-visible:ring-offset-2 dark:ring-offset-slate-900"
          >
            បន្តការសិក្សា
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            className="font-khmer inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Share2 className="h-4 w-4" />
            ចែករំលែក
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
        <span className="font-khmer shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400">
          វឌ្ឍនភាព
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-[#002455] transition-[width] duration-500 dark:bg-blue-400"
            style={{ width: `${safePercent}%` }}
          />
        </div>
        <span className="w-10 text-right text-xs font-bold tabular-nums text-[#002455] dark:text-blue-300">
          {safePercent}%
        </span>
      </div>
    </section>
  );
}

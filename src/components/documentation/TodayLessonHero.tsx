import Link from "next/link";
import { Share2 } from "lucide-react";
import { CircularProgress } from "./ui";

export default function TodayLessonHero({
  title,
  description,
  percent,
  href,
}: {
  title: string;
  description: string;
  percent: number;
  href: string;
}) {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3">
        <span className="w-fit rounded-2xl bg-accent px-3 py-1 text-[11px] font-bold text-accent-foreground">
          ថ្ងៃនេះ
        </span>
        <h2 className="text-xl font-extrabold text-primary-color dark:text-white">{title}</h2>
        <p className="max-w-lg text-[18px] leading-8 text-slate-700 dark:text-slate-200">{description}</p>

        <div className="mt-1 flex flex-wrap items-center gap-3">
          <Link
            href={href}
            className="rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            បន្តការសិក្សា
          </Link>
          <button className="inline-flex items-center gap-1.5 rounded-2xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <Share2 className="h-4 w-4" /> ចែករំលែក
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <CircularProgress percent={percent} size={110} strokeWidth={9} label="បានបញ្ចប់" />
      </div>
    </section>
  );
}

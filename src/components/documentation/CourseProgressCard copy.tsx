import Link from "next/link";
import { CourseProgress } from "@/types/course";

interface CourseProgressCardProps {
  progress: CourseProgress;
}

export default function CourseProgressCard({ progress }: CourseProgressCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
          <span className="text-sm font-bold">JV</span>
        </span>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-foreground">{progress.courseTitle}</p>
          <p className="text-xs text-muted-foreground">{progress.lessonLabel}</p>
          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{progress.percent}% បានបញ្ចប់</p>
        </div>
      </div>

      <Link
        href={progress.href}
        className="whitespace-nowrap rounded-2xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        បន្តរៀន
      </Link>
    </div>
  );
}

import Link from "next/link";
import { CourseProgress } from "@/types/course";

interface CourseProgressCardProps {
  progress: CourseProgress;
}

export default function CourseProgressCard({ progress }: CourseProgressCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          {/* Replace with a Java/course icon */}
          <span className="text-sm font-bold">JV</span>
        </span>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-slate-800">{progress.courseTitle}</p>
          <p className="text-xs text-slate-400">{progress.lessonLabel}</p>
          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-700"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">{progress.percent}% បានបញ្ចប់</p>
        </div>
      </div>

      <Link
        href={progress.href}
        className="whitespace-nowrap rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-900"
      >
        បន្តរៀន
      </Link>
    </div>
  );
}

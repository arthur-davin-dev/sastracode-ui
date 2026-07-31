import Image from "next/image";
import Link from "next/link";
import { EnrollmentHistoryItem } from "@/lib/course/courses";

interface EnrollmentHistoryProps {
  items: EnrollmentHistoryItem[];
}

export function EnrollmentHistory({ items }: EnrollmentHistoryProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 font-khmer transition-colors duration-300">
      
      {/* Header Row */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          ប្រវត្តិចុះឈ្មោះរបស់អ្នក
        </h2>
        <Link 
          href="/enrollments" 
          className="text-sm font-medium text-[#002455] dark:text-blue-400 hover:underline transition-colors"
        >
          មើលទាំងអស់ (View all)
        </Link>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {items.map((item) => (
          <Link 
            key={item.courseId} 
            href={`/courses/${item.courseId}`} 
            className="group flex flex-col justify-between"
          >
            <div>
              {/* Course Thumbnail */}
              <div className="relative mb-3 aspect-video overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-100 dark:ring-slate-800">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Course Title */}
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-[#002455] dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </p>
            </div>

            {/* Status Badge & Progress */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span
                  className={`rounded-lg px-2.5 py-1 font-medium ${
                    item.status === "completed"
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                      : "bg-blue-50 dark:bg-blue-950/60 text-[#002455] dark:text-blue-300"
                  }`}
                >
                  {item.status === "completed" ? "បានបញ្ចប់" : "កំពុងសិក្សា"}
                </span>

                <span className="text-slate-400 dark:text-slate-500 font-medium">
                  {item.progressPercent}%
                </span>
              </div>

              {/* Micro Progress Bar */}
              <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    item.status === "completed" ? "bg-emerald-500" : "bg-[#002455] dark:bg-blue-500"
                  }`}
                  style={{ width: `${item.progressPercent}%` }}
                />
              </div>
            </div>

          </Link>
        ))}
      </div>

    </div>
  );
}
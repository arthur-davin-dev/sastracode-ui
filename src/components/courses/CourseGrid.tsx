import { CourseCard } from "./CourseCard";
import { Course } from "@/lib/course/courses";
import Link from "next/link";

interface CourseGridProps {
  courses: Course[];
  title?: string;
  seeAllHref?: string;
  emptyMessage?: string;
}

export function CourseGrid({
  courses,
  title,
  seeAllHref,
  emptyMessage,
}: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="my-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-12 text-center transition-colors duration-300">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <section>
      {(title || seeAllHref) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          {title && (
            <h2 className="text-2xl font-bold text-primary-color font-khmer">
              {title}
            </h2>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
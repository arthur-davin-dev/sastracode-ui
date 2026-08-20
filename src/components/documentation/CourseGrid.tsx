import Link from "next/link";
import CourseCard from "@/components/documentation/CourseCard";
import { Course } from "@/types/course";

interface CourseGridProps {
  title: string;
  courses: Course[];
  seeAllHref?: string;
  columns?: 2 | 3;
  seeAllLabel?: string;
}

export default function CourseGrid({ title, courses, seeAllHref, seeAllLabel = "មើលទាំងអស់", columns = 3 }: CourseGridProps) {
  return (
    <section className="space-y-6">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        
        {/* FIX 1: Add dark:text-slate-100 or dark:text-white to the title */}
        <h2 className="font-khmer text-xl font-bold text-[#002455] dark:text-primary-color sm:text-2xl transition-colors">
          {title}
        </h2>

        {/* FIX 2: Make the "See All" link pop in dark mode */}
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="font-khmer text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-primary-color dark:hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            <span>{seeAllLabel}</span>
            <span aria-hidden="true">&rsaquo;</span>
          </Link>
        )}
      </div>

      {/* Grid List */}
      <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${
          columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

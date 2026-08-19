import Link from "next/link";
import CourseCard from "@/components/documentation/CourseCard";
import { Course } from "@/types/course";

interface CourseGridProps {
  title: string;
  courses: Course[];
  seeAllHref?: string;
  seeAllLabel?: string;
  columns?: 2 | 3;
}

export default function CourseGrid({
  title,
  courses,
  seeAllHref,
  seeAllLabel = "See all",
  columns = 3,
}: CourseGridProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-khmer text-xl font-bold text-[#002455] dark:text-primary-color sm:text-2xl transition-colors">
          {title}
        </h2>

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
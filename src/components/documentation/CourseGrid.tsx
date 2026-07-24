import Link from "next/link";
import { Course } from "@/types/course";
import CourseCard from "./CourseCard";

interface CourseGridProps {
  title: string;
  courses: Course[];
  seeAllHref?: string;
}

export default function CourseGrid({ title, courses, seeAllHref }: CourseGridProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="text-xs font-medium text-blue-700 hover:underline"
          >
            មើលទាំងអស់ ›
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

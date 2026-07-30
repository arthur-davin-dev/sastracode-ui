import { CourseCard } from "./CourseCard";
import { Course } from "@/lib/course/courses";
import Link from "next/link";

interface CourseGridProps {
  courses: Course[];
  title?: string;
  seeAllHref?: string;
}

export function CourseGrid({
  courses,
  title,
  seeAllHref,
}: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-gray-400 font-khmer">
        មិនមានវគ្គសិក្សាដែលត្រូវនឹងលក្ខខណ្ឌស្វែងរកទេ
      </p>
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
          {seeAllHref && (
            <Link
              href={seeAllHref}
              className="shrink-0 text-sm font-medium text-primary-color hover:underline font-khmer"
            >
              មើលទាំងអស់ →
            </Link>
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

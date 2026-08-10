import { CourseCard } from "@/components/courses/CourseCard";
import type { Course } from "@/lib/course/courses";


interface CardSectionProps {
  title: string;
  courses: Course[];
}

export default function CardSection({
  title,
  courses,
}: CardSectionProps) {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">
          {title}
        </h2>

         <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 8).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
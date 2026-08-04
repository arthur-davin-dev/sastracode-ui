import Link from "next/link";
import { Course } from "@/types/course";
import CourseCard from "./CourseCard";

interface CourseGridProps {
  title: string;
  courses: Course[];
  seeAllHref?: string;
}

export default function AllLessons({ title, courses, seeAllHref }: CourseGridProps) {
  return (
    <section className="flex flex-col gap-4 ">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

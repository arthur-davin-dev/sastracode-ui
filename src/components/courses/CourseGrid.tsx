import { CourseCard } from "./CourseCard";
import { Course } from "@/lib/course/courses";

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-gray-400 font-khmer">
        មិនមានវគ្គសិក្សាដែលត្រូវនឹងលក្ខខណ្ឌស្វែងរកទេ
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

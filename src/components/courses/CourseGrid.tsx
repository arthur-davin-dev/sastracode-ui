import { CourseCard } from "./CourseCard";
import { Course } from "@/lib/course/courses";

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="my-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-12 text-center transition-colors duration-300">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          មិនមានវគ្គសិក្សាដែលត្រូវនឹងលក្ខខណ្ឌស្វែងរកទេ
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
import { CourseGrid } from "../courses/CourseGrid";
import { Course } from "@/lib/course/courses";

interface RelatedCoursesProps {
  courses: Course[];
}

const ALL_LABEL = "មេរៀនទាំងអស់";

export function RelatedCourses({ courses }: RelatedCoursesProps) {
  if (courses.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h2 aria-label={ALL_LABEL} className="mb-5 text-2xl font-bold text-primary-color font-(family-name:--font-sans)">
        វគ្គសិក្សាពាក់ព័ន្ធ
      </h2>
      <CourseGrid courses={courses} />
    </section>
  );
}

import { ChapterAccordion } from "./ChapterAccordion";
import type { Course } from "@/lib/course/courses";

interface CurriculumSectionProps {
  course: Course;
}

export function CurriculumSection({ course }: CurriculumSectionProps) {
  const chapters = course.curriculum ?? [];
  const totalLessons = chapters.reduce((sum, chapter) => sum + chapter.lessonCount, 0);

  return (
    <div id="curriculum" className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="pb-3 text-2xl font-bold text-primary-color font-sans dark:text-white">
        មាតិកាវគ្គសិក្សា
      </h2>
      <p className="mb-5 text-base text-gray-400 font-sans">
        ជំពូក {chapters.length} · ចំនួនមេរៀនសរុប {totalLessons}
      </p>
      {chapters.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
          វគ្គនេះមិនទាន់មាន Section/Video ដែលអាចបង្ហាញបានទេ។
        </div>
      ) : (
        <div className="space-y-3">
          {chapters.map((chapter, index) => (
            <ChapterAccordion key={chapter.id} chapter={chapter} defaultOpen={index === 0} courseId={course.id} />
          ))}
        </div>
      )}
    </div>
  );
}
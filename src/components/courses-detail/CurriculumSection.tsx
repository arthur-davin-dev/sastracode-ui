import { ChapterAccordion } from "./ChapterAccordion";
import { Chapter, Course } from "@/lib/course/courses";

interface CurriculumSectionProps {
  course: Course;
}

const defaultChapters: Chapter[] = [
  {
    id: "ch1",
    number: "01",
    title: "សេចក្ដីណែនាំអំពី វគ្គសិក្សា",
    lessonCount: 3,
    totalDuration: "៣ មេរៀន · ៤៥ នាទី",
    lessons: [
      {
        id: "l1",
        title: "មេរៀនទី ០១ — សេចក្ដីណែនាំអំពីគ្រឹះមូលដ្ឋាន React",
        duration: "10:00",
        locked: false,
      },
      {
        id: "l2",
        title: "មេរៀនទី ០២ — សេចក្ដីណែនាំអំពី Next.js",
        duration: "10:00",
        locked: true,
      },
      {
        id: "l3",
        title: "មេរៀនទី ០៣ — សេចក្ដីណែនាំអំពី JavaScript",
        duration: "10:00",
        locked: true,
      },
    ],
  },
  {
    id: "ch2",
    number: "02",
    title: "មូលដ្ឋានគ្រឹះ Variable & DataType",
    lessonCount: 3,
    totalDuration: "៣ មេរៀន · ៤៥ នាទី",
    lessons: [
      {
        id: "l4",
        title: "មេរៀនទី ០១ — សេចក្ដីណែនាំ",
        duration: "10:00",
        locked: true,
      },
      {
        id: "l5",
        title: "មេរៀនទី ០២ — សេចក្ដីណែនាំ",
        duration: "10:00",
        locked: true,
      },
      {
        id: "l6",
        title: "មេរៀនទី ០៣ — សេចក្ដីណែនាំ",
        duration: "10:00",
        locked: true,
      },
    ],
  },
];

export function CurriculumSection({ course }: CurriculumSectionProps) {
  const chapters = course.curriculum ?? defaultChapters;
  const totalLessons = chapters.reduce((sum, c) => sum + c.lessonCount, 0);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 font-khmer transition-colors duration-300">
      
      {/* Header & Subtitle */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#002455] dark:text-blue-400">
        មាតិកាវគ្គសិក្សា
      </h2>
      <p className="mt-1 mb-5 text-sm sm:text-base text-slate-500 dark:text-slate-400">
        ចំនួន {chapters.length} ជំពូក · ចំនួនមេរៀនសរុប {totalLessons}
      </p>

      {/* Chapters Accordion Container */}
      <div className="space-y-3">
        {chapters.map((chapter, i) => (
          <ChapterAccordion
            key={chapter.id}
            chapter={chapter}
            defaultOpen={i === 0}
            courseId={course.id}
          />
        ))}
      </div>

    </div>
  );
}

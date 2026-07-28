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
        title: "មេរៀនទី ០១ — សេចក្ដីណែនាំ",
        duration: "10:00",
        locked: false,
      },
      {
        id: "l2",
        title: "មេរៀនទី ០២ — សេចក្ដីណែនាំ",
        duration: "10:00",
        locked: true,
      },
      {
        id: "l3",
        title: "មេរៀនទី ០៣ — សេចក្ដីណែនាំ",
        duration: "10:00",
        locked: true,
      },
    ],
  },
  {
    id: "ch2",
    number: "02",
    title: "មូលដ្ធានគ្រឺះ Variable & DataType",
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
    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-colors duration-300">
      <h2 className="text-lg font-bold text-foreground">
        មាតិកាវគ្គសិក្សា
      </h2>
      <p className="mb-5 text-sm text-muted-foreground">
        {chapters.length} chapters · {totalLessons} lessons total
      </p>
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
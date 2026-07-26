import { ChapterAccordion } from "./ChapterAccordion";
import { Chapter } from "../courses-detail/Type";

const chapters: Chapter[] = [
  {
    id: "ch1",
    number: "01",
    title: "សេចក្ដីណែនាំអំពី Java",
    lessonCount: 3,
    totalDuration: "៣ មេរៀន · ៤៥ នាទី",
    lessons: [
      { id: "l1", title: "មេរៀនទី ០១ — សេចក្ដីណែនាំអំពី Java", duration: "10:00", locked: false },
      { id: "l2", title: "មេរៀនទី ០២ — សេចក្ដីណែនាំអំពី Java", duration: "10:00", locked: true },
      { id: "l3", title: "មេរៀនទី ០៣ — សេចក្ដីណែនាំអំពី Java", duration: "10:00", locked: true },
    ],
  },
  {
    id: "ch2",
    number: "02",
    title: "មូលដ្ឋានគ្រឹះ: Variables និង Data Types",
    lessonCount: 5,
    totalDuration: "៥ មេរៀន · ៩០ នាទី",
    lessons: [
      { id: "l4", title: "Variables និង Constants", duration: "12:00", locked: true },
      { id: "l5", title: "Primitive Data Types", duration: "15:00", locked: true },
      { id: "l6", title: "Type Casting", duration: "18:00", locked: true },
      { id: "l7", title: "Operators", duration: "20:00", locked: true },
      { id: "l8", title: "Practice: Data Types", duration: "25:00", locked: true },
    ],
  },
  {
    id: "ch3",
    number: "03",
    title: "Control Flow: if, switch, loops",
    lessonCount: 4,
    totalDuration: "៤ មេរៀន · ៦០ នាទី",
    lessons: [
      { id: "l9", title: "if / else Statements", duration: "15:00", locked: true },
      { id: "l10", title: "switch Statements", duration: "12:00", locked: true },
      { id: "l11", title: "for និង while Loops", duration: "18:00", locked: true },
      { id: "l12", title: "Practice: Control Flow", duration: "15:00", locked: true },
    ],
  },
];

export function CurriculumSection() {
  const totalLessons = chapters.reduce((sum, c) => sum + c.lessonCount, 0);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-primary-color font-(family-name:--font-sans)
">មាតិកាវគ្គសិក្សា</h2>
      <p className="mb-5 text-sm text-gray-400 font-(family-name:--font-sans)
">
        {chapters.length} chapters · {totalLessons} lessons total
      </p>
      <div className="space-y-3">
        {chapters.map((chapter, i) => (
          <ChapterAccordion key={chapter.id} chapter={chapter} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  );
}
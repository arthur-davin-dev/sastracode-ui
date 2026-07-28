import { LessonDocument } from "@/types/documentation";
export default function HeroLesson({ lesson }: { lesson: LessonDocument }) {
  return (
    <div className="p-6 mb-6 text-white" style={{ background: "#002455", borderRadius: 16 }}>
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs bg-white/15 px-2 py-1" style={{ borderRadius: 16 }}>
            {lesson.lessonIndexLabel}
          </span>
          <h1 className="mt-3 font-bold" style={{ fontSize: 24 }}>
            {lesson.title}
          </h1>
          <p className="mt-2 text-sm text-white/80 max-w-md">{lesson.intro}</p>
        </div>
        <div className="text-right text-sm">{lesson.percentComplete}%</div>
      </div>
      <button
        className="mt-4 bg-white px-4 py-2 text-sm font-medium"
        style={{ color: "#002455", borderRadius: 16 }}
      >
        + បន្តការសិក្សា
      </button>
    </div>
  );
}

import type { LessonDocument } from "@/types/documentation";

export default function HeroLesson({
  lesson,
}: {
  lesson: LessonDocument;
}) {
  return (
    <div className="mb-6 w-full max-w-5xl rounded-2xl bg-[#002455] p-6 text-white">
      <div className="flex items-start justify-between gap-6">
        <div>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-sm">
            {lesson.lessonIndexLabel}
          </span>

          <h1 className="mt-4 text-2xl font-bold">
            {lesson.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">
            {lesson.intro}
          </p>
        </div>

        <div className="shrink-0 text-right text-sm font-semibold">
          {lesson.percentComplete}%
        </div>
      </div>

      <button
        type="button"
        className="font-khmer mt-6 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-base font-semibold text-[#002455] shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-slate-100 active:scale-[0.98] dark:border dark:border-slate-800 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-slate-800"
      >
        <span>+ បន្តការសិក្សា</span>
      </button>
    </div>
  );
}
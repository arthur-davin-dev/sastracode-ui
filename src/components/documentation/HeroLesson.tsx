import { LessonDocument } from "@/types/documentation";
import { div } from "framer-motion/client";

export default function HeroLesson({ lesson }: { lesson: LessonDocument }) {
  return (
    // Added w-full and max-w-5xl to stretch the layout wider
    <div className="w-full max-w-5xl p-6 mb-6 text-white bg-[#002455] rounded-2xl">
      <div className="flex justify-between items-start gap-6">
        <div>
          {/* Badge */}
          <span className="text-sm bg-white/15 px-2.5 py-1 rounded-full">
            {lesson.lessonIndexLabel}
          </span>
          
          {/* Main Title */}
          <h1 className="mt-4 font-bold text-2xl">
            {lesson.title}
          </h1>
          
          {/* Intro Text - increased max-w to let the text spread out wider */}
          <p className="mt-2 text-sm text-white/80 max-w-2xl leading-relaxed">
            {lesson.intro}
          </p>
        </div>
        ``
        {/* Percentage Counter */}
        <div className="text-right text-sm font-semibold shrink-0">
          {lesson.percentComplete}%
        </div>
      </div>
      
      {/* Action Button */}
      <button className="mt-6 bg-white px-5 py-2 text-[16px] font-semibold text-[#002455] rounded-xl hover:bg-white/95 transition-colors">
        + បន្តការសិក្សា
      </button>
    </div>
  );
}
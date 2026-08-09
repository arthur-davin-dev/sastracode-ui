import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LessonDocument } from "@/types/documentation";

export default function LessonFooterNav({ lesson }: { lesson: LessonDocument }) {
  return (
    <div className="flex justify-between text-sm">
      {lesson.prevLesson ? (
        <Link href={lesson.prevLesson.href} className="flex items-center gap-1 text-gray-500">
          <ChevronLeft size={16} /> {lesson.prevLesson.label}
        </Link>
      ) : (
        <span />
      )}
      {lesson.nextLesson ? (
        <Link href={lesson.nextLesson.href} className="flex items-center gap-1" style={{ color: "#002455" }}>
          {lesson.nextLesson.label}៖ {lesson.nextLesson.level} <ChevronRight size={16} />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

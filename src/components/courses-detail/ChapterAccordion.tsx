"use client";
import { useState } from "react";
import Link from "next/link";
import { Play, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { Chapter } from "@/lib/course/courses";

interface ChapterAccordionProps {
  chapter: Chapter;
  defaultOpen?: boolean;
  courseId: string;
}

export function ChapterAccordion({
  chapter,
  defaultOpen,
  courseId,
}: ChapterAccordionProps) {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between bg-white px-4 py-3.5 text-left hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-primary-color">
            {chapter.number}
          </span>
          <span className="text-sm font-semibold text-gray-900 font-(family-name:--font-sans)">
            {chapter.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-gray-400 font-(family-name:--font-sans) sm:inline">
            {chapter.totalDuration}
          </span>
          {open ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </button>

      {open && (
        <div className="divide-y divide-gray-50 border-t border-gray-100">
          {chapter.lessons.map((lesson) =>
            lesson.locked ? (
              <div
                key={lesson.id}
                className="flex cursor-not-allowed items-center justify-between px-4 py-3 pl-14 opacity-70"
              >
                <div className="flex items-center gap-2.5">
                  <Lock className="h-3.5 w-3.5 text-gray-300" />
                  <span className="text-sm text-gray-400 font-(family-name:--font-sans)">
                    {lesson.title}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{lesson.duration}</span>
              </div>
            ) : (
              <Link
                key={lesson.id}
                href={`/courses/${courseId}/learn/${lesson.id}`}
                className="flex items-center justify-between px-4 py-3 pl-14 transition hover:bg-blue-50"
              >
                <div className="flex items-center gap-2.5">
                  <Play className="h-3.5 w-3.5 fill-blue-600 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600 font-(family-name:--font-sans)">
                    {lesson.title}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{lesson.duration}</span>
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}
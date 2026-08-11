"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { CourseSection } from "@/types/lesson-player";

interface CourseContentSidebarProps {
  sections: CourseSection[];
  totalLessons: number;
  courseId: string;
}

export function CourseContentSidebar({ sections, totalLessons, courseId }: CourseContentSidebarProps) {
  const [openSectionId, setOpenSectionId] = useState<string | null>(
    sections.find((s) => s.lessons.some((l) => l.status === "current"))?.id ?? sections[0]?.id ?? null
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4 dark:border-slate-800">
        <h2 className="font-(family-name:--font-sans) text-xl font-semibold text-slate-900 dark:text-slate-100">
          ខ្លឹមសារវគ្គសិក្សា
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">{totalLessons} Lessons</span>
      </div>

      {/* Sections List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {sections.map((section) => {
          const isOpen = openSectionId === section.id;
          const completedCount = section.lessons.filter((l) => l.status === "completed").length;

          return (
            <div key={section.id}>
              {/* Section Trigger */}
              <button
                type="button"
                onClick={() => setOpenSectionId(isOpen ? null : section.id)}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {section.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {completedCount} / {section.lessons.length}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Lesson Items */}
              {isOpen && (
                <div className="space-y-0.5 border-t border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/30 px-2 py-2">
                  {section.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/courses/${courseId}/learn/${lesson.id}`}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors ${
                        lesson.status === "current"
                          ? "bg-indigo-50 ring-1 ring-inset ring-indigo-100 dark:bg-indigo-500/10 dark:ring-indigo-500/20"
                          : "hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      {lesson.status === "completed" && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
                      )}
                      {lesson.status === "current" && (
                        <PlayCircle className="h-4 w-4 shrink-0 fill-indigo-600 text-white dark:fill-indigo-400 dark:text-slate-900" />
                      )}
                      {lesson.status === "upcoming" && (
                        <Circle className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />
                      )}
                      <span
                        className={`flex-1 truncate text-sm ${
                          lesson.status === "current"
                            ? "font-semibold text-indigo-600 dark:text-indigo-300"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {lesson.title}
                      </span>
                      <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                        {lesson.duration}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

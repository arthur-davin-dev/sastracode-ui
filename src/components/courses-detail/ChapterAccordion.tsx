"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Play, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { Chapter } from "@/lib/course/courses";

interface ChapterAccordionProps {
  chapter: Chapter;
  defaultOpen?: boolean;
  /** Course slug — the learn route is /courses/{slug}/learn/{lessonId}. */
  courseSlug: string;
}

export function ChapterAccordion({
  chapter,
  defaultOpen,
  courseSlug,
}: ChapterAccordionProps) {
  const [open, setOpen] = useState(!!defaultOpen);
  const { status } = useSession();

  async function handleLessonClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    lessonId: string,
  ) {
    if (status === "authenticated") return;

    event.preventDefault();
    await signIn("keycloak", {
      redirectTo: `/courses/${courseSlug}/learn/${lessonId}`,
    });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Accordion Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-color/10 text-xs font-bold text-primary-color">
            {chapter.number}
          </span>
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {chapter.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:inline">
            {chapter.totalDuration}
          </span>
          {open ? (
            <ChevronUp className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          )}
        </div>
      </button>

      {/* Accordion Lessons List */}
      {open && (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          {chapter.lessons.map((lesson) =>
            lesson.locked ? (
              <div
                key={lesson.id}
                className="flex cursor-not-allowed items-center justify-between px-4 py-3 pl-14 opacity-60"
              >
                <div className="flex items-center gap-2.5">
                  <Lock className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {lesson.title}
                  </span>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {lesson.duration}
                </span>
              </div>
            ) : (
              <Link
                key={lesson.id}
                href={`/courses/${courseSlug}/learn/${lesson.id}`}
                onClick={(event) => handleLessonClick(event, lesson.id)}
                className="flex items-center justify-between px-4 py-3 pl-14 transition-colors hover:bg-primary-color/5"
              >
                <div className="flex items-center gap-2.5">
                  <Play className="h-3.5 w-3.5 fill-primary-color text-primary-color" />
                  <span className="text-sm font-medium text-primary-color">
                    {lesson.title}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {lesson.duration}
                </span>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

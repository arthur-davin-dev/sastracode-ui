"use client";

import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Code2,
  Loader2,
} from "lucide-react";
import { useMemo, useState } from "react";

import { CodingTaskPlayer } from "./CodingTaskPlayer";
import { useGetLessonCodingTasksQuery } from "@/redux/service/coding-task-player-api";

interface CodingTaskLessonSectionProps {
  tutorialId: string;
  lessonType: "SECTION" | "SUBSECTION";
  lessonId: string;
}

export function CodingTaskLessonSection({
  tutorialId,
  lessonType,
  lessonId,
}: CodingTaskLessonSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const queryArgs = useMemo(
    () => ({
      tutorialId,
      sectionId: lessonType === "SECTION" ? lessonId : undefined,
      subsectionId: lessonType === "SUBSECTION" ? lessonId : undefined,
    }),
    [lessonId, lessonType, tutorialId],
  );

  const { data, isLoading, isFetching, error, refetch } =
    useGetLessonCodingTasksQuery(queryArgs);

  const tasks = data?.content ?? [];
  const safeIndex = activeIndex >= tasks.length ? 0 : activeIndex;
  const activeTask = tasks[safeIndex];

  if (isLoading) {
    return (
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
          Loading coding challenge...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-10 rounded-3xl border border-rose-200 bg-rose-50 p-6 dark:border-rose-900 dark:bg-rose-950/30">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-rose-700 dark:text-rose-300">
              Coding challenge could not be loaded.
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-3 text-sm font-semibold text-rose-600 underline underline-offset-4 dark:text-rose-300"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!activeTask) return null;

  const progress = ((safeIndex + 1) / tasks.length) * 100;

  return (
    <section
      aria-label="Coding challenges"
      className="mt-10 overflow-hidden rounded-3xl border border-slate-700 bg-[#2f3b4f] text-white shadow-sm dark:bg-[#202a3a]"
    >
      <div className="border-b border-white/10 px-5 py-5 sm:px-7">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <Code2 className="h-4 w-4" />
              Coding Challenge
            </div>
            <p className="text-sm font-medium text-slate-200">
              Exercise {safeIndex + 1} of {tasks.length}
            </p>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-400 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <CodingTaskPlayer
        key={activeTask.id}
        slug={activeTask.slug}
        index={safeIndex}
        total={tasks.length}
        hasPrevious={safeIndex > 0}
        hasNext={safeIndex < tasks.length - 1}
        onPrevious={() => setActiveIndex((current) => Math.max(0, current - 1))}
        onNext={() =>
          setActiveIndex((current) => Math.min(tasks.length - 1, current + 1))
        }
      />

      {isFetching && !isLoading && (
        <div className="border-t border-white/10 px-6 py-3 text-center text-xs text-slate-300">
          Refreshing challenge data...
        </div>
      )}

      {tasks.length > 1 && (
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 sm:px-7">
          <button
            type="button"
            disabled={safeIndex === 0}
            onClick={() =>
              setActiveIndex((current) => Math.max(0, current - 1))
            }
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-semibold text-slate-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <button
            type="button"
            disabled={safeIndex >= tasks.length - 1}
            onClick={() =>
              setActiveIndex((current) =>
                Math.min(tasks.length - 1, current + 1),
              )
            }
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}

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
import { getChallengeUIConfig } from "@/utils/coding-task-ui";

interface CodingTaskLessonSectionProps {
  tutorialId: string;
  lessonType: "SECTION" | "SUBSECTION";
  lessonId: string;
  sectionId?: string;
}

export function CodingTaskLessonSection({
  tutorialId,
  lessonType,
  lessonId,
  sectionId,
}: CodingTaskLessonSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const queryArgs = useMemo(
    () => ({
      tutorialId,
    }),
    [tutorialId],
  );

  const { data, isLoading, isFetching, error, refetch } =
    useGetLessonCodingTasksQuery(queryArgs);

  const tasks = Array.isArray(data) ? data : (data?.content ?? []);
  const safeIndex = activeIndex >= tasks.length ? 0 : activeIndex;
  const activeTask = tasks[safeIndex];

  if (isLoading) {
    return (
      <section className="mt-10 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex min-h-[360px] items-center justify-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin text-[#002455] dark:text-emerald-500" />
          Loading coding challenge...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-10 overflow-hidden rounded-[24px] border border-rose-200 bg-white p-8 shadow-sm dark:border-rose-900/50 dark:bg-slate-900">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <AlertCircle className="h-8 w-8 text-rose-500 dark:text-rose-400" />
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Coding challenge could not be loaded.
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!activeTask) return null;

  const uiConfig = getChallengeUIConfig(activeTask.challengeType);
  const Icon = uiConfig.icon;

  const progress = ((safeIndex + 1) / tasks.length) * 100;

  return (
    <section
      aria-label="Coding challenges"
      className="mt-10 overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
    >
      <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-5 sm:px-7 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className={`flex items-center gap-2 text-[15px] font-bold ${uiConfig.headerColorClass}`}>
              <Icon className="h-5 w-5" />
              {uiConfig.title}
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Exercise {safeIndex + 1} of {tasks.length}
            </p>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-[#002455] transition-[width] duration-300 dark:bg-emerald-500"
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
        <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3 text-center text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
          Refreshing challenge data...
        </div>
      )}

      {tasks.length > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:px-7 dark:border-slate-800 dark:bg-slate-900/50">
          <button
            type="button"
            disabled={safeIndex === 0}
            onClick={() =>
              setActiveIndex((current) => Math.max(0, current - 1))
            }
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
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
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#002455] px-4 text-sm font-semibold text-white transition hover:bg-[#00346f] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}

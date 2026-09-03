"use client";

import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Lock,
  PartyPopper,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useMemo, useState } from "react";

import { CodingTaskPlayer } from "./CodingTaskPlayer";
import {
  type CodingTaskSubmitResult,
  useGetSectionCodingTasksQuery,
  useGetSubsectionCodingTasksQuery,
  useGetAllTutorialCodingTasksQuery,
} from "@/redux/service/coding-task-player-api";
import { getChallengeUIConfig } from "@/utils/coding-task-ui";
import { getApiErrorMessage } from "@/lib/api/error";

function codingTaskErrorMessage(error: unknown): string {
  return getApiErrorMessage(error, "Please try again in a moment.");
}

function isUnauthorizedError(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    "status" in error &&
    (error as { status?: unknown }).status === 401
  );
}

interface TaskResult {
  passed: boolean;
  xpEarned: number;
}

interface CodingTaskLessonSectionProps {
  tutorialId: string;
  lessonType: "SECTION" | "SUBSECTION";
  lessonId: string;
  /**
   * True when this is the last lesson in the tutorial. Coding tasks the
   * admin created without picking a section/subsection have nowhere to
   * live, so — matching how quiz questions fall back — they're shown on
   * the tutorial's last lesson instead of silently disappearing.
   */
  isLastLesson: boolean;
}

export function CodingTaskLessonSection({
  tutorialId,
  lessonType,
  lessonId,
  isLastLesson,
}: CodingTaskLessonSectionProps) {
  const { status: sessionStatus } = useSession();
  const [activeIndex, setActiveIndex] = useState(0);
  const [taskResults, setTaskResults] = useState<Record<string, TaskResult>>(
    {},
  );
  // Once every exercise has been attempted, the summary screen takes over —
  // but the learner can still jump back into a specific exercise from it
  // (e.g. to review or redo one). This stays true while doing so, so the
  // summary doesn't immediately reclaim the view.
  const [reviewing, setReviewing] = useState(false);
  const [trackedLessonId, setTrackedLessonId] = useState(lessonId);

  // Reset back to the first exercise whenever we switch to a different
  // lesson, instead of carrying over the previous lesson's index. Adjusting
  // state during render (rather than in an effect) avoids an extra render
  // pass — see https://react.dev/learn/you-might-not-need-an-effect.
  if (lessonId !== trackedLessonId) {
    setTrackedLessonId(lessonId);
    setActiveIndex(0);
    setTaskResults({});
    setReviewing(false);
  }

  // Ask the backend directly for exactly this lesson's tasks — via the
  // dedicated per-section/per-subsection endpoints — instead of fetching
  // everything and guessing which tasks belong here from sectionId/
  // subsectionId fields client-side (that heuristic turned out unreliable).
  const sectionQuery = useGetSectionCodingTasksQuery(
    { tutorialId, sectionId: lessonId },
    { skip: lessonType !== "SECTION" },
  );
  const subsectionQuery = useGetSubsectionCodingTasksQuery(
    { tutorialId, subsectionId: lessonId },
    { skip: lessonType !== "SUBSECTION" },
  );
  const scopedQuery =
    lessonType === "SUBSECTION" ? subsectionQuery : sectionQuery;

  // Coding tasks the admin created without picking a section/subsection
  // have nowhere to live under the scoped endpoints above, so — matching
  // how quiz questions fall back — surface them on the tutorial's last
  // lesson instead of silently disappearing.
  const tutorialQuery = useGetAllTutorialCodingTasksQuery(tutorialId, {
    skip: !isLastLesson,
  });

  const scopedTasks = useMemo(
    () => scopedQuery.data ?? [],
    [scopedQuery.data],
  );
  const orphanTasks = useMemo(
    () =>
      isLastLesson
        ? (tutorialQuery.data ?? []).filter(
            (task) => !task.sectionId && !task.subsectionId,
          )
        : [],
    [isLastLesson, tutorialQuery.data],
  );
  const tasks = useMemo(
    () => [...scopedTasks, ...orphanTasks],
    [scopedTasks, orphanTasks],
  );

  const isLoading = scopedQuery.isLoading || (isLastLesson && tutorialQuery.isLoading);
  const isFetching = scopedQuery.isFetching || tutorialQuery.isFetching;
  const error = scopedQuery.error;
  function refetch() {
    void scopedQuery.refetch();
    if (isLastLesson) void tutorialQuery.refetch();
  }

  function recordResult(taskId: string, result: CodingTaskSubmitResult) {
    setTaskResults((current) => ({
      ...current,
      [taskId]: { passed: result.passed, xpEarned: result.xpEarned ?? 0 },
    }));
  }

  const attemptedCount = tasks.filter(
    (task) => taskResults[task.id] !== undefined,
  ).length;
  const passedCount = tasks.filter(
    (task) => taskResults[task.id]?.passed,
  ).length;
  const totalXp = tasks.reduce(
    (sum, task) => sum + (taskResults[task.id]?.xpEarned ?? 0),
    0,
  );
  const allAttempted = tasks.length > 0 && attemptedCount === tasks.length;

  function retryAll() {
    setTaskResults({});
    setActiveIndex(0);
    setReviewing(false);
  }

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
    // A 401 here just means the viewer isn't signed in — the coding-task
    // endpoints require auth. That's an expected, everyday state for a
    // guest (not a real failure), so it gets its own calm sign-in prompt
    // instead of the alarming "could not be loaded" error card below.
    if (isUnauthorizedError(error) && sessionStatus !== "authenticated") {
      return (
        <section className="mt-10 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#002455]/10 text-[#002455] dark:bg-emerald-500/10 dark:text-emerald-400">
              <Lock className="h-6 w-6" />
            </span>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Log in to try this coding challenge.
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Create a free account or sign in to run and submit exercises.
              </p>
              <button
                type="button"
                onClick={() =>
                  void signIn("keycloak", {
                    redirectTo:
                      typeof window !== "undefined"
                        ? window.location.pathname
                        : undefined,
                  })
                }
                className="mt-4 inline-flex h-9 items-center justify-center rounded-xl bg-[#002455] px-4 text-sm font-semibold text-white transition hover:bg-[#00346f] dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                Login
              </button>
            </div>
          </div>
        </section>
      );
    }

    console.error("Coding challenge could not be loaded:", error);

    return (
      <section className="mt-10 overflow-hidden rounded-[24px] border border-rose-200 bg-white p-8 shadow-sm dark:border-rose-900/50 dark:bg-slate-900">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <AlertCircle className="h-8 w-8 text-rose-500 dark:text-rose-400" />
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Coding challenge could not be loaded.
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {codingTaskErrorMessage(error)}
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

  if (allAttempted && !reviewing) {
    const percent = Math.round((passedCount / tasks.length) * 100);
    const allPassed = passedCount === tasks.length;

    return (
      <section
        aria-label="Coding challenges summary"
        className={`relative mt-10 overflow-hidden rounded-[24px] border p-8 text-center shadow-sm ${
          allPassed
            ? "border-emerald-200 bg-emerald-50/70 text-slate-900 dark:border-emerald-900/60 dark:bg-emerald-950/25 dark:text-white"
            : "border-rose-200 bg-rose-50/70 text-slate-900 dark:border-rose-900/60 dark:bg-rose-950/25 dark:text-white"
        }`}
      >
        {allPassed && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <PartyPopper className="absolute left-6 top-6 h-7 w-7 -rotate-12 text-emerald-500 animate-bounce" />
            <Sparkles className="absolute right-8 top-8 h-6 w-6 text-amber-400 animate-ping" />
            <Sparkles className="absolute right-16 top-20 h-4 w-4 text-emerald-400 animate-pulse" />
            <Sparkles className="absolute left-12 top-24 h-4 w-4 text-amber-300 animate-pulse" />
          </div>
        )}

        <span
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
            allPassed
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
              : "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300"
          }`}
        >
          <Trophy className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-xl font-bold">Coding Challenges Completed</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          You passed {passedCount} of {tasks.length} exercises.
        </p>
        <p
          className={`mt-3 text-3xl font-black ${
            allPassed
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-rose-700 dark:text-rose-400"
          }`}
        >
          {percent}%
        </p>
        {totalXp > 0 && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />+{totalXp} XP earned
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {tasks.map((task, taskIndex) => {
            const taskPassed = taskResults[task.id]?.passed;
            return (
              <button
                key={task.id}
                type="button"
                onClick={() => {
                  setActiveIndex(taskIndex);
                  setReviewing(true);
                }}
                title={task.title}
                aria-label={`${task.title} — ${taskPassed ? "passed" : "not passed"}`}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                  taskPassed
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/15 dark:text-rose-300"
                }`}
              >
                {taskIndex + 1}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={retryAll}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#002455] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00346f] dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          <RotateCcw className="h-4 w-4" />
          Retry All
        </button>
      </section>
    );
  }

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
            <div
              className={`flex items-center gap-2 text-[15px] font-bold ${uiConfig.headerColorClass}`}
            >
              <Icon className="h-5 w-5" />
              {uiConfig.title}
            </div>
            <div className="flex items-center gap-3">
              {reviewing && (
                <button
                  type="button"
                  onClick={() => setReviewing(false)}
                  className="text-sm font-semibold text-[#002455] underline hover:no-underline dark:text-emerald-400"
                >
                  ← Back to summary
                </button>
              )}
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Exercise {safeIndex + 1} of {tasks.length}
              </p>
            </div>
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
        onResult={(result) => recordResult(activeTask.id, result)}
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

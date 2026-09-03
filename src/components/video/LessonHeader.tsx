"use client";

import { useRef } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  useGetVideoProgressQuery,
  useUpdateVideoProgressMutation,
} from "@/redux/api/qa-api";
import {
  achievementApi,
  useGetMyXpQuery,
} from "@/redux/service/achievementApi";
import { useAppDispatch } from "@/redux/hook";
import { getApiErrorMessage } from "@/lib/qa/qa-utils";
import { useTranslation } from "@/hooks/useTranslations";

interface LessonHeaderProps {
  videoId: string;
  courseId: string;
  title: string;
  sectionLabel: string;
  lessonPosition: string;
  level: string;
}

export function LessonHeader({
  videoId,
  courseId,
  title,
  sectionLabel,
  lessonPosition,
  level,
}: LessonHeaderProps) {
  const t = useTranslation();
  const { data: progress, isLoading: loadingProgress } =
    useGetVideoProgressQuery(videoId);
  const [updateVideoProgress, { isLoading: updating }] =
    useUpdateVideoProgressMutation();
  // Already fetched by CourseContentSidebar on the same page in the common
  // case, so this just subscribes to the shared cache entry — no extra
  // request. Gives us the XP total from *before* this completion, to diff
  // against after the mutation invalidates it (see handleMarkAsDone).
  const { data: xpBefore } = useGetMyXpQuery();
  const dispatch = useAppDispatch();

  // Synchronous guard against a fast double/triple click (or a touch that
  // fires more than one `click`): `updating` only turns true on the next
  // render, so without this the extra clicks each send another PUT and the
  // backend ends up with duplicate (user, video) progress rows that break
  // every future request for that video.
  const submitting = useRef(false);

  const isComplete = progress?.completed === true;

  // One-way: a video is marked done explicitly and never un-completed from the
  // UI. The backend `completed` flag stays the source of truth across reloads,
  // so this handler only ever runs on a genuine not-done -> done transition —
  // it's unreachable once `isComplete` is true (button is replaced by the
  // static badge below) — which is what keeps the XP reward toast from firing
  // on refresh, on reopening a completed video, or on a repeat click.
  async function handleMarkAsDone() {
    if (isComplete || updating || loadingProgress || submitting.current) return;
    submitting.current = true;

    try {
      await updateVideoProgress({
        videoId,
        courseId,
        completed: true,
      }).unwrap();

      // The backend decides XP entirely — it awards it once, server-side, and
      // never reports an amount on the progress response itself. Diffing the
      // XP total from immediately before this call against a fresh, forced
      // refetch (triggered by updateVideoProgress's own tag invalidation)
      // shows the real, backend-computed reward without the frontend ever
      // calculating an XP amount itself.
      const xpAfter = await dispatch(
        achievementApi.endpoints.getMyXp.initiate(undefined, {
          forceRefetch: true,
        }),
      ).unwrap();
      const xpGained = (xpAfter.totalXp ?? 0) - (xpBefore?.totalXp ?? 0);

      if (xpGained > 0) {
        toast.success(t.lessonPlayer.completeToast, {
          description: `+${xpGained} XP`,
        });
      } else {
        toast.success(t.lessonPlayer.completeToast);
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, t.lessonPlayer.progressError));
    } finally {
      submitting.current = false;
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      {/* Title & Meta Info */}
      <div className="w-full sm:w-[68%]">
        <h1 className="w-full whitespace-normal break-words text-xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <span>
            {sectionLabel} · {lessonPosition}
          </span>
          <span className="rounded-full bg-primary-color/10 dark:bg-primary-color/20 px-2.5 py-0.5 text-xs font-semibold text-primary-color dark:text-primary-color">
            {level}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Completion indicator / Mark-as-done action */}
        {isComplete ? (
          <span
            aria-label={t.lessonPlayer.completedAria}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-400"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            {t.lessonPlayer.completed}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleMarkAsDone}
            disabled={updating || loadingProgress}
            aria-busy={updating}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {updating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Circle className="h-3.5 w-3.5" />
            )}
            {updating ? t.lessonPlayer.saving : t.lessonPlayer.markAsDone}
          </button>
        )}
      </div>
    </div>
  );
}

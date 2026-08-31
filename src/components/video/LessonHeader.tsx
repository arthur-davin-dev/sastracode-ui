"use client";

import { ThumbsUp, CheckCircle2, Circle, Bookmark, MoreHorizontal, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  useGetVideoProgressQuery,
  useUpdateVideoProgressMutation,
} from "@/redux/api/qa-api";
import { getApiErrorMessage } from "@/lib/qa/qa-utils";

interface LessonHeaderProps {
  videoId: string;
  courseId: string;
  title: string;
  sectionLabel: string;
  lessonPosition: string;
  level: string;
  likeCount: number;
}

export function LessonHeader({
  videoId,
  courseId,
  title,
  sectionLabel,
  lessonPosition,
  level,
  likeCount,
}: LessonHeaderProps) {
  const { data: progress } = useGetVideoProgressQuery(videoId);
  const [updateVideoProgress, { isLoading: updating }] = useUpdateVideoProgressMutation();

  const isComplete = progress?.completed === true;

  // One-way: a video is marked done explicitly and never un-completed from the
  // UI. The backend `completed` flag stays the source of truth across reloads.
  async function handleMarkAsDone() {
    if (isComplete || updating) return;

    try {
      await updateVideoProgress({ videoId, courseId, completed: true }).unwrap();
      toast.success("អបអរសាទរ! អ្នកបានបញ្ចប់មេរៀននេះ");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "មិនអាចធ្វើបច្ចុប្បន្នភាពការវិវឌ្ឍន៍បានទេ"));
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      {/* Title & Meta Info */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
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
        {/* Like Button */}
        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
          <ThumbsUp className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
          {likeCount}
        </button>

        {/* Completion indicator / Mark-as-done action */}
        {isComplete ? (
          <span
            aria-label="មេរៀននេះបានបញ្ចប់"
            className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-400"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            បានបញ្ចប់
          </span>
        ) : (
          <button
            type="button"
            onClick={handleMarkAsDone}
            disabled={updating}
            aria-busy={updating}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {updating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Circle className="h-3.5 w-3.5" />
            )}
            {updating ? "កំពុងរក្សាទុក..." : "សម្គាល់ថាបានបញ្ចប់"}
          </button>
        )}

        {/* Bookmark Button */}
        <button
          type="button"
          aria-label="រក្សាទុកមេរៀន"
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-500 dark:text-slate-400 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <Bookmark className="h-3.5 w-3.5" />
        </button>

        {/* More Options Button */}
        <button
          type="button"
          aria-label="ជម្រើសបន្ថែម"
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-500 dark:text-slate-400 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

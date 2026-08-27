"use client";

import { ThumbsUp, CheckCircle2, Bookmark, MoreHorizontal, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  useGetVideoProgressQuery,
  useUpdateVideoProgressMutation,
} from "@/redux/api/qa-api";
import { getApiErrorMessage } from "@/lib/qa/qa-utils";

interface LessonHeaderProps {
  videoId: string;
  title: string;
  sectionLabel: string;
  lessonPosition: string;
  level: string;
  likeCount: number;
}

export function LessonHeader({
  videoId,
  title,
  sectionLabel,
  lessonPosition,
  level,
  likeCount,
}: LessonHeaderProps) {
  const { data: progress } = useGetVideoProgressQuery(videoId);
  const [updateVideoProgress, { isLoading: updating }] = useUpdateVideoProgressMutation();

  const isComplete = progress?.completed === true;

  async function handleToggleComplete() {
    try {
      await updateVideoProgress({ videoId, completed: !isComplete }).unwrap();
      toast.success(isComplete ? "បានលុបចេញពីបញ្ចប់" : "អបអរសាទរ! អ្នកបានបញ្ចប់មេរៀននេះ");
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

        {/* Mark as Complete Button */}
        <button
          type="button"
          onClick={handleToggleComplete}
          disabled={updating}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors disabled:opacity-50 ${
            isComplete
              ? "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          {updating ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <CheckCircle2 className="h-3.5 w-3.5" />
          )}
          {isComplete ? "បានបញ្ចប់" : "Mark as Complete"}
        </button>

        {/* Bookmark Button */}
        <button
          type="button"
          aria-label="Bookmark lesson"
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-500 dark:text-slate-400 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <Bookmark className="h-3.5 w-3.5" />
        </button>

        {/* More Options Button */}
        <button
          type="button"
          aria-label="More options"
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-500 dark:text-slate-400 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

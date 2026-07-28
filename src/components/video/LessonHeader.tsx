"use client";

import { useState } from "react";
import { ThumbsUp, CheckCircle2, Bookmark, MoreHorizontal } from "lucide-react";

interface LessonHeaderProps {
  title: string;
  sectionLabel: string;
  lessonPosition: string;
  level: string;
  likeCount: number;
}

export function LessonHeader({
  title,
  sectionLabel,
  lessonPosition,
  level,
  likeCount,
}: LessonHeaderProps) {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between ">
      <div>
        <h1 className="text-xl font-bold text-gray-900 font-(family-name:--font-sans)">
          {title}
        </h1>
        <div className="mt-1.5 flex items-center gap-2 text-sm text-gray-400 font-(family-name:--font-sans)">
          <span>{sectionLabel} · {lessonPosition}</span>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-primary-color">
            {level}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50">
          <ThumbsUp className="h-3.5 w-3.5" />
          {likeCount}
        </button>
        <button
          onClick={() => setIsComplete((v) => !v)}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition ${
            isComplete
              ? "border-emerald-200 bg-emerald-50 text-emerald-600"
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {isComplete ? "បានបញ្ចប់" : "Mark as Complete"}
        </button>
        <button
          aria-label="Bookmark lesson"
          className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50"
        >
          <Bookmark className="h-3.5 w-3.5" />
        </button>
        <button
          aria-label="More options"
          className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
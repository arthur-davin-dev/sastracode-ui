"use client";

import Image from "next/image";
import { Play } from "lucide-react";

interface UpNextCardProps {
  thumbnail: string;
  title: string;
  description: string;
  lessonPosition: string;
  duration: string;
  autoplay: boolean;
  onAutoplayChange: (value: boolean) => void;
}

export function UpNextCard({
  thumbnail,
  title,
  description,
  lessonPosition,
  duration,
  autoplay,
  onAutoplayChange,
}: UpNextCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-colors duration-300">
      {/* Header & Autoplay Toggle */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Up Next
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">Autoplay</span>
          <button
            type="button"
            role="switch"
            aria-checked={autoplay}
            onClick={() => onAutoplayChange(!autoplay)}
            className={`relative h-5 w-9 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
              autoplay ? "bg-indigo-600 dark:bg-indigo-500" : "bg-slate-200 dark:bg-slate-700"
            }`}
          >
            <span className="sr-only">Toggle autoplay</span>
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                autoplay ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Lesson Details */}
      <div className="flex gap-3">
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
            />
          )}
          <span className="absolute bottom-1 right-1 z-10 rounded bg-black/75 px-1 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
            {duration}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </p>
          <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{lessonPosition}</p>
        </div>
      </div>

      {/* Action Button */}
      <button 
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 dark:bg-indigo-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 dark:hover:bg-indigo-600"
      >
        <Play className="h-3.5 w-3.5 fill-white text-white" />
        Play Next Lesson
      </button>
    </div>
  );
}
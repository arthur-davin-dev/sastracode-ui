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
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900 font-(family-name:--font-sans)">
          Up Next
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Autoplay</span>
          <button
            type="button"
            role="switch"
            aria-checked={autoplay}
            onClick={() => onAutoplayChange(!autoplay)}
            className={`relative h-5 w-9 rounded-full transition ${
              autoplay ? "bg-primary-color" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                autoplay ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-primary-color">
          <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1 text-[10px] text-white">
            {duration}
          </span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 font-(family-name:--font-sans)">
            {title}
          </p>
          <p className="mt-0.5 line-clamp-2 text-xs text-gray-400 font-(family-name:--font-sans)">
            {description}
          </p>
          <p className="mt-1 text-xs text-gray-400">{lessonPosition}</p>
        </div>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-color py-2.5 text-sm font-semibold text-white hover:bg-primary-color/90">
        <Play className="h-3.5 w-3.5 fill-white" />
        Play Next Lesson
      </button>
    </div>
  );
}
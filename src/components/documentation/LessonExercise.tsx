"use client";

import { HelpCircle, ArrowRight } from "lucide-react";
import { LessonQuiz } from "@/types/documentation";
import Link from "next/link";

interface LessonExerciseProps {
  quiz?: LessonQuiz;
  trackLabel?: string;
}

export default function LessonExercise({ quiz, trackLabel }: LessonExerciseProps) {
  if (!quiz) return null;

  const formatTrackName = (track?: string) => {
    if (!track) return "HTML";
    const lower = track.toLowerCase();
    if (lower === "javascript") return "JavaScript";
    if (lower === "python") return "Python";
    if (lower === "java") return "Java";
    return lower.toUpperCase();
  };

  const currentTrack = formatTrackName(trackLabel);

  return (
    <div className="mb-6 w-full rounded-2xl border border-primary-color bg-primary-color p-5 font-khmer text-white shadow-sm transition-all hover:shadow-md sm:p-6">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 sm:h-14 sm:w-14">
          <HelpCircle className="h-6 w-6 text-white" />
        </div>

        <div className="flex-1 min-w-0 w-full flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
              លំហាត់បញ្ចប់ Module
            </span>
          </div>

          <h3 className="mt-0.5 wrap-break-word text-base font-bold leading-snug text-white sm:text-lg">
            បន្ទាប់ពីបញ្ចប់ការសិក្សា module ខាងលើតម្រូវអោយអ្នក ធ្វើលំហាត់ខាងក្រោមនេះ
          </h3>

          <p className="max-w-2xl wrap-break-word text-xs leading-relaxed text-white/80 sm:text-sm">
            ចុចប៊ូតុងខាងក្រោមដើម្បីចាប់ផ្តើម។
          </p>

          <div className="mt-3 w-full sm:w-auto">
            <Link
              href="/documentation/exercises/html-elements"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-primary-color shadow-sm transition-all hover:bg-white/90 active:scale-[0.98] sm:w-auto"
            >
              <span>ចាប់ផ្តើមធ្វើលំហាត់ ({currentTrack})</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

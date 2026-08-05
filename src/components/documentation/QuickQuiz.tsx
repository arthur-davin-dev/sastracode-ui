"use client";

import { HelpCircle, ArrowRight } from "lucide-react";
import { LessonQuiz } from "@/types/documentation";
import Link from "next/link";

interface QuickQuizProps {
  quiz?: LessonQuiz;
  trackLabel?: string; // Dynamically pass "html", "css", "javascript", etc.
}

export default function QuickQuiz({ quiz, trackLabel }: QuickQuizProps) {
  if (!quiz) return null;

  // Helper to safely format the track name for display
  const formatTrackName = (track?: string) => {
    if (!track) return "HTML";
    const lower = track.toLowerCase();
    if (lower === "javascript") return "JavaScript";
    if (lower === "python") return "Python";
    if (lower === "java") return "Java";
    return lower.toUpperCase(); // Handles "html", "css", etc.
  };

  const currentTrack = formatTrackName(trackLabel);

  return (
    <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 mb-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900 font-khmer">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
        
        {/* Decorative Icon Badge */}
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-[#eef2ff] dark:bg-blue-950/50">
          <HelpCircle className="h-6 w-6 text-[#002455] dark:text-blue-400" />
        </div>

        {/* Main Content Layout */}
        <div className="flex-1 min-w-0 w-full flex flex-col gap-1.5">
          
          {/* Upper Micro-Badge */}
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#eef2ff] dark:bg-blue-950/80 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[#002455] dark:text-blue-300">
              តេស្តសមត្ថភាព (Quiz)
            </span>
          </div>

          {/* Dynamic Header Text */}
          <h3 className="text-base sm:text-lg font-bold text-[#002455] dark:text-slate-100 leading-snug wrap-break-word mt-0.5">
            សាកល្បងសមត្ថភាព {currentTrack} របស់អ្នកជាមួយកម្រងសំណួរ {currentTrack} របស់យើង!
          </h3>

          {/* Description */}
          <p className="max-w-2xl text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed wrap-break-word">
            ចុចប៊ូតុងខាងក្រោមដើម្បីចាប់ផ្តើមឆ្លើយសំណួរអនុវត្តន៍ និងពង្រឹងការចងចាំមេរៀនរបស់អ្នក។
          </p>

          {/* Action Button */}
          <div className="mt-3 w-full sm:w-auto">
            <button 
              type="button"
              onClick={() => alert("Quiz feature is coming soon!")}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#002455] dark:bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-900 dark:hover:bg-blue-700 active:scale-[0.98] shadow-sm"
            >
              <span>ចាប់ផ្តើមតេស្ត ({currentTrack})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
"use client";

import { CheckCircle2, Clock, HelpCircle, RotateCcw, Sparkles, Star, ChevronRight } from "lucide-react";

export type QuizLevel = "easy" | "medium" | "hard";

export interface CardQuizProps {
  title: string;
  level: QuizLevel;
  isNew?: boolean;
  questions: number;
  minutes: number;
  rating: number; // 1-5
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  bestScore: number | null; // null = not attempted
  attempts: number;
  href: string;
}

const levelBadge: Record<QuizLevel, { label: string; dot: string; bg: string; text: string }> = {
  easy: {
    label: "កម្រិតស្រាល",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  medium: {
    label: "កម្រិតមធ្យម",
    dot: "bg-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-400",
  },
  hard: {
    label: "កម្រិតខ្ពស់",
    dot: "bg-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-700 dark:text-rose-400",
  },
};

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
}

export default function CardQuiz({
  title,
  level,
  isNew,
  questions,
  minutes,
  rating,
  easyCount,
  mediumCount,
  hardCount,
  bestScore,
  attempts,
  href,
}: CardQuizProps) {
  const badge = levelBadge[level];
  const total = easyCount + mediumCount + hardCount || 1;

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Title + badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-snug">
          {title}
        </h3>
        {isNew ? (
          <span className="shrink-0 flex items-center gap-1 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-xs font-semibold px-2.5 py-1">
            <Sparkles className="h-3 w-3" />
            ថ្មី
          </span>
        ) : (
          <span
            className={`shrink-0 flex items-center gap-1.5 rounded-full ${badge.bg} ${badge.text} text-xs font-semibold px-2.5 py-1`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
            {badge.label}
          </span>
        )}
      </div>

      {/* Meta row: questions, time, stars */}
      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
        <span className="flex items-center gap-1.5">
          <HelpCircle className="h-4 w-4" />
          {questions} សំណួរ
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {minutes} នាទី
        </span>
        <span className="flex items-center gap-0.5 ml-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-none text-slate-300 dark:text-slate-700"
              }`}
            />
          ))}
        </span>
      </div>

      {/* Difficulty distribution bar */}
      <div className="h-1.5 w-full rounded-full overflow-hidden flex mb-2">
        {easyCount > 0 && (
          <div
            className="bg-emerald-500 h-full"
            style={{ width: `${(easyCount / total) * 100}%` }}
          />
        )}
        {mediumCount > 0 && (
          <div
            className="bg-amber-400 h-full"
            style={{ width: `${(mediumCount / total) * 100}%` }}
          />
        )}
        {hardCount > 0 && (
          <div
            className="bg-rose-500 h-full"
            style={{ width: `${(hardCount / total) * 100}%` }}
          />
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        {easyCount > 0 && (
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Easy {easyCount}
          </span>
        )}
        {mediumCount > 0 && (
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Medium {mediumCount}
          </span>
        )}
        {hardCount > 0 && (
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Hard {hardCount}
          </span>
        )}
      </div>

      {/* Best score + attempts */}
      <div className="flex items-center gap-4 text-sm mb-4">
        <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="h-4 w-4" />
          Best:{" "}
          <span
            className={`font-bold ${
              bestScore === null ? "text-slate-400 dark:text-slate-600" : scoreColor(bestScore)
            }`}
          >
            {bestScore === null ? "—" : `${bestScore}%`}
          </span>
        </span>
        <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <RotateCcw className="h-4 w-4" />
          {attempts === 0 ? "Not attempted" : `${attempts}× attempted`}
        </span>
      </div>

      {/* CTA */}
      <a
        href={href}
        className="mt-auto flex items-center justify-center gap-1.5 rounded-xl bg-[#002455] hover:bg-[#001a3d] text-white font-semibold py-3 transition-colors"
      >
        ចាប់ផ្តើម Quiz
        <ChevronRight className="h-4 w-4" />
      </a>
    </div>
  );
}
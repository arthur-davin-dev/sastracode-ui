"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trophy,
  Award,
  Target,
  Clock,
  TrendingUp,
  CheckCircle2,
  RotateCcw,
  Eye,
} from "lucide-react";

interface StoredQuestion {
  topic: string;
  question: string;
  choices: string[];
  correctIndex: number;
  xpReward: number;
  explanation: string;
  codeExample?: string;
}

interface StoredResult {
  quizId: string;
  totalQuestions: number;
  correctCount: number;
  xpEarned: number;
  answers: (number | null)[];
  questions: StoredQuestion[];
  completedAt: string;
}

const PASS_THRESHOLD = 80; // matches quizzes.pass_score default in schema

function CircularProgress({
  percent,
  size = 120,
  strokeWidth = 10,
  color = "#002455",
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        className="text-slate-200 dark:text-slate-800"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}

export default function QuizResults({ quizId }: { quizId: string }) {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`quiz-result-${quizId}`);
    if (!raw) {
      router.replace(`/quiz/${quizId}`);
      return;
    }
    setResult(JSON.parse(raw));
  }, [quizId, router]);

  if (!result) return null;

  const accuracy = Math.round(
    (result.correctCount / result.totalQuestions) * 100
  );
  const passed = accuracy >= PASS_THRESHOLD;

  // Approximate difficulty split into thirds since per-question difficulty
  // isn't tracked in the mock data yet — swap for real data once available.
  const third = Math.ceil(result.totalQuestions / 3);
  const buckets = [
    { label: "កម្រិតងាយ", range: [0, third] },
    { label: "កម្រិតមធ្យម", range: [third, third * 2] },
    { label: "កម្រិតខ្ពស់", range: [third * 2, result.totalQuestions] },
  ];
  const difficultyStats = buckets.map(({ label, range }) => {
    const slice = result.answers.slice(range[0], range[1]);
    const correct = slice.filter(
      (a, i) => a === result.questions[range[0] + i]?.correctIndex
    ).length;
    const pct = slice.length ? Math.round((correct / slice.length) * 100) : 0;
    return { label, pct, count: slice.length };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header row */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <span className="inline-block rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold px-3 py-1 mb-3">
            Quiz Completed
          </span>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            {result.quizId
              .split("-")
              .map((w) => w[0].toUpperCase() + w.slice(1))
              .join(" ")}{" "}
            Quiz
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Great work! Here&apos;s a summary of your performance.
          </p>
        </div>

        {passed ? (
          <div className="rounded-2xl bg-[#002455] text-white p-6 flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
              <Award className="h-7 w-7 text-amber-300" />
            </div>
            <div>
              <span className="inline-block rounded-full bg-white/10 text-xs font-semibold px-3 py-1 mb-1.5">
                ACHIEVEMENT UNLOCKED
              </span>
              <h3 className="font-bold text-lg">Quiz Champion</h3>
              <p className="text-sm text-white/70">
                Completed a quiz with {PASS_THRESHOLD}%+ accuracy
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <Target className="h-7 w-7 text-slate-500" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">
                Keep Practicing
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Score {PASS_THRESHOLD}%+ to unlock an achievement badge.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stat cards row */}
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        {/* Accuracy donut */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col items-center justify-center">
          <div className="relative">
            <CircularProgress percent={accuracy} color="#002455" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {accuracy}%
              </span>
              <span className="text-xs text-slate-400">ACCURACY</span>
            </div>
          </div>
        </div>

        {/* Score / XP */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-amber-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {result.xpEarned}
              </p>
              <p className="text-xs text-slate-400">Total XP Earned</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {result.correctCount}/{result.totalQuestions}
              </p>
              <p className="text-xs text-slate-400">Correct Answers</p>
            </div>
          </div>
        </div>

        {/* Performance donut */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col items-center justify-center">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
            Performance Chart
          </p>
          <div className="relative">
            <CircularProgress
              percent={(result.correctCount / result.totalQuestions) * 100}
              color="#10b981"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {result.correctCount}/{result.totalQuestions}
              </span>
              <span className="text-xs text-slate-400">Correct</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance statistics */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 mb-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Performance Statistics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">
                {accuracy}%
              </p>
              <p className="text-xs text-slate-400">Accuracy</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-indigo-500 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">
                --
              </p>
              <p className="text-xs text-slate-400">Avg Time/Q</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-500 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">
                {accuracy}%
              </p>
              <p className="text-xs text-slate-400">Best Score</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">
                100%
              </p>
              <p className="text-xs text-slate-400">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {difficultyStats.map((d) => (
          <div
            key={d.label}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {d.label}
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {d.pct}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full ${
                  d.pct >= 80
                    ? "bg-emerald-500"
                    : d.pct >= 50
                      ? "bg-amber-400"
                      : "bg-rose-500"
                }`}
                style={{ width: `${d.pct}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">{d.count} questions</p>
          </div>
        ))}
      </div>

      {/* Next actions */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-8 text-center">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
          What would you like to do next?
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
          Review your answers to strengthen your understanding, or retry the
          quiz to achieve a better score.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.push(`/quiz/${quizId}/review`)}
            className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <Eye className="h-4 w-4" />
            Review Answers
          </button>
          <button
            onClick={() => router.push(`/quiz/${quizId}`)}
            className="flex items-center gap-2 rounded-xl bg-[#002455] hover:bg-[#001a3d] text-white px-5 py-3 text-sm font-semibold transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Retry Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
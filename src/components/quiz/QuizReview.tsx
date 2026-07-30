"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, XCircle, MinusCircle } from "lucide-react";

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

export default function QuizReview({ quizId }: { quizId: string }) {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`quiz-result-${quizId}`);
    if (!raw) {
      router.replace(`/quiz/${quizId}`);
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult(JSON.parse(raw));
  }, [quizId, router]);

  if (!result) return null;

  const accuracy = Math.round(
    (result.correctCount / result.totalQuestions) * 100
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push(`/quiz/${quizId}/results`)}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#002455] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Results
        </button>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-sm font-bold px-3 py-1.5">
          {accuracy}%
        </span>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
        Review Answers
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        {result.correctCount} of {result.totalQuestions} correct — read
        through the explanations below to strengthen weak spots.
      </p>

      {/* Questions list */}
      <div className="space-y-4">
        {result.questions.map((q, i) => {
          const userAnswer = result.answers[i];
          const isCorrect = userAnswer === q.correctIndex;
          const wasAnswered = userAnswer !== null;

          return (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                {wasAnswered ? (
                  isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                  )
                ) : (
                  <MinusCircle className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Question {i + 1} · {q.topic}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {q.question}
                  </h3>
                </div>
              </div>

              {/* Answer choices */}
              <div className="space-y-2 mb-4">
                {q.choices.map((choice, ci) => {
                  const isCorrectChoice = ci === q.correctIndex;
                  const isUserChoice = ci === userAnswer;

                  let classes =
                    "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400";
                  if (isCorrectChoice) {
                    classes =
                      "border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold";
                  } else if (isUserChoice && !isCorrectChoice) {
                    classes =
                      "border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 font-semibold";
                  }

                  return (
                    <div
                      key={ci}
                      className={`flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm font-mono ${classes}`}
                    >
                      <span>
                        {String.fromCharCode(65 + ci)}. {choice}
                      </span>
                      {isCorrectChoice && (
                        <span className="text-xs font-sans font-bold shrink-0 ml-2">
                          Correct Answer
                        </span>
                      )}
                      {isUserChoice && !isCorrectChoice && (
                        <span className="text-xs font-sans font-bold shrink-0 ml-2">
                          Your Answer
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {!wasAnswered && (
                <p className="text-sm text-slate-400 italic mb-4">
                  This question was not answered.
                </p>
              )}

              {/* Explanation */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 text-sm text-slate-600 dark:text-slate-300">
                <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Explanation
                </p>
                <p>{q.explanation}</p>
                {q.codeExample && (
                  <pre className="mt-3 rounded-lg bg-slate-950 text-slate-100 p-3 overflow-x-auto font-mono text-xs">
                    {q.codeExample}
                  </pre>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          onClick={() => router.push(`/quiz/${quizId}/results`)}
          className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Results
        </button>
        <button
          onClick={() => router.push(`/quiz/${quizId}`)}
          className="rounded-xl bg-[#002455] hover:bg-[#001a3d] text-white px-5 py-3 text-sm font-semibold transition-colors"
        >
          Retry Quiz
        </button>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Clock, Star, ChevronLeft, ChevronRight, Trophy, Zap } from "lucide-react";

interface QuestionData {
  id: string;
  topic: string; // e.g. "មូលដ្ឋានគ្រឹះ HTML"
  question: string;
  choices: string[];
  correctIndex: number;
  xpReward: number;
  explanation: string;
  codeExample?: string;
}

// Mock question bank, keyed by quizId — replace with a real API call once
// the backend's quiz-questions schema exists.
const questionBank: Record<string, QuestionData[]> = {
  "html-basics": [
    {
      id: "q1",
      topic: "មូលដ្ឋានគ្រឹះ HTML",
      question: "Which tag is used to define an unordered list?",
      choices: ["<ol>", "<ul>", "<li>", "<list>"],
      correctIndex: 1,
      xpReward: 100,
      explanation: "<ul> defines an unordered (bulleted) list, while <ol> is for ordered (numbered) lists.",
    },
    {
      id: "q2",
      topic: "មូលដ្ឋានគ្រឹះ HTML",
      question: "Which attribute specifies an alternate text for an image?",
      choices: ["title", "alt", "src", "longdesc"],
      correctIndex: 1,
      xpReward: 100,
      explanation: "The alt attribute provides alternative text if the image can't be displayed, and is important for accessibility.",
    },
    {
      id: "q3",
      topic: "មូលដ្ឋានគ្រឹះ HTML",
      question: "Which element is used to embed JavaScript code?",
      choices: ["<js>", "<javascript>", "<script>", "<code>"],
      correctIndex: 2,
      xpReward: 100,
      explanation: "<script> is the standard element for embedding or referencing executable JavaScript.",
    },
    {
      id: "q4",
      topic: "មូលដ្ឋានគ្រឹះ HTML",
      question: "Which HTML element creates a hyperlink?",
      choices: ["<div>", "<a>", "<button>", "<link>"],
      correctIndex: 1,
      xpReward: 150,
      explanation: "<a> (anchor) creates a hyperlink, using the href attribute to specify the destination URL.",
      codeExample: `<a href="https://example.com">Visit Example</a>`,
    },
    {
      id: "q5",
      topic: "មូលដ្ឋានគ្រឹះ HTML",
      question: "Which doctype declaration is correct for HTML5?",
      choices: ["<!DOCTYPE html5>", "<!DOCTYPE HTML PUBLIC>", "<!DOCTYPE html>", "<html5>"],
      correctIndex: 2,
      xpReward: 100,
      explanation: "<!DOCTYPE html> is the simplified doctype introduced with HTML5.",
    },
    {
      id: "q6",
      topic: "មូលដ្ឋានគ្រឹះ HTML",
      question: "Which tag defines the largest heading?",
      choices: ["<h6>", "<heading>", "<h1>", "<head>"],
      correctIndex: 2,
      xpReward: 100,
      explanation: "<h1> represents the largest, most important heading level; <h6> is the smallest.",
    },
  ],
};

const defaultQuestions: QuestionData[] = questionBank["html-basics"];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface QuizAttemptProps {
  quizId: string;
}

export default function QuizAttempt({ quizId }: QuizAttemptProps) {
  const router = useRouter();
  const questions = useMemo(
    () => questionBank[quizId] ?? defaultQuestions,
    [quizId]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  // null = not answered yet, otherwise the chosen choice index
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => questions.map(() => null)
  );
  const [secondsLeft, setSecondsLeft] = useState(20 * 60); // 20 min countdown
  const [totalXp, setTotalXp] = useState(0);

  const current = questions[current_index_safe(currentIndex, questions.length)];

  function current_index_safe(index: number, len: number) {
    return Math.min(index, Math.max(len - 1, 0));
  }

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const answeredCount = answers.filter((a) => a !== null).length;
  const remaining = questions.length - answeredCount;
  const allAnswered = remaining === 0;

  const handleSelect = useCallback(
    (choiceIndex: number) => {
      // Already answered — locked in, no changing (matches instant-feedback pattern)
      if (answers[currentIndex] !== null) return;

      setAnswers((prev) => {
        const next = [...prev];
        next[currentIndex] = choiceIndex;
        return next;
      });

      if (choiceIndex === current.correctIndex) {
        setTotalXp((xp) => xp + current.xpReward);
      }
    },
    [answers, currentIndex, current]
  );

  const handleSubmit = () => {
    const correctCount = answers.reduce<number>(
      (sum, ans, i) => (ans === questions[i].correctIndex ? sum + 1 : sum),
      0
    );
    const result = {
      quizId,
      totalQuestions: questions.length,
      correctCount,
      xpEarned: totalXp,
      answers,
      questions,
      completedAt: new Date().toISOString(),
    };
    sessionStorage.setItem(`quiz-result-${quizId}`, JSON.stringify(result));
    router.push(`/quiz/${quizId}/results`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Top bar: timer + XP */}
      <div className="flex items-center justify-end gap-3 mb-6">
        <span className="flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-1.5 text-sm font-semibold text-indigo-700 dark:text-indigo-400">
          <Clock className="h-4 w-4" />
          {formatTime(secondsLeft)}
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-4 py-1.5 text-sm font-semibold text-amber-700 dark:text-amber-400">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          +{totalXp} XP
        </span>
      </div>

      {/* Topic badge + question counter */}
      <div className="flex items-center justify-between mb-3">
        <span className="flex items-center gap-1.5 rounded-lg bg-[#002455] text-white text-sm font-semibold px-3 py-1.5">
          <Zap className="h-3.5 w-3.5" />
          {current.topic}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Progress bar + dots */}
      <div className="mb-8">
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mb-3">
          <div
            className="h-full bg-[#002455] transition-all duration-300"
            style={{
              width: `${(answeredCount / questions.length) * 100}%`,
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          {questions.map((_, i) => {
            const ans = answers[i];
            const isCurrent = i === currentIndex;
            const isWrong = ans !== null && ans !== questions[i].correctIndex;
            const isCorrect = ans !== null && ans === questions[i].correctIndex;

            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isCurrent
                    ? "bg-[#002455] text-white"
                    : isWrong
                      ? "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400"
                      : isCorrect
                        ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                }`}
              >
                {isWrong ? "✕" : isCorrect ? "✓" : i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Answer correctly to earn:
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm font-bold px-3 py-1.5">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            +{current.xpReward} XP
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#002455] dark:text-slate-100 mb-6">
          {current.question}
        </h2>

        <div className="space-y-3">
          {current.choices.map((choice, i) => {
            const selected = answers[currentIndex];
            const isSelected = selected === i;
            const isCorrectChoice = i === current.correctIndex;
            const showFeedback = selected !== null;

            let stateClasses =
              "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700";
            if (showFeedback) {
              if (isCorrectChoice) {
                stateClasses =
                  "bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-400 dark:border-emerald-700";
              } else if (isSelected && !isCorrectChoice) {
                stateClasses =
                  "bg-rose-100 dark:bg-rose-950/50 border border-rose-400 dark:border-rose-700";
              } else {
                stateClasses = "bg-slate-50 dark:bg-slate-800/50 opacity-60";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showFeedback}
                className={`w-full flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-colors ${stateClasses} ${
                  showFeedback ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <span className="h-8 w-8 shrink-0 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-300">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="font-mono text-slate-800 dark:text-slate-100">
                  {choice}
                </span>
              </button>
            );
          })}
        </div>

        {answers[currentIndex] !== null && (
          <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 text-sm text-slate-600 dark:text-slate-300">
            <p className="mb-2">{current.explanation}</p>
            {current.codeExample && (
              <pre className="mt-2 rounded-lg bg-slate-950 text-slate-100 p-3 overflow-x-auto font-mono text-xs">
                {current.codeExample}
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          ថយក្រោយ
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))
            }
            disabled={currentIndex === questions.length - 1}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            បន្ទាប់
            <ChevronRight className="h-4 w-4" />
          </button>

          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${
              allAnswered
                ? "bg-[#002455] hover:bg-[#001a3d] text-white cursor-pointer"
                : "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
            }`}
          >
            <Trophy className="h-4 w-4" />
            បញ្ចប់ Quiz
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-4">
        Answer all {questions.length} questions to submit — {remaining} remaining
      </p>
    </div>
  );
}
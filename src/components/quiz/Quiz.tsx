"use client";

import { useState, useMemo } from "react";
import { Trophy, CheckCircle2 } from "lucide-react";
import CardQuiz, { QuizLevel } from "./CardQuiz";

interface QuizData {
  id: string;
  title: string;
  level: QuizLevel;
  isNew?: boolean;
  questions: number;
  minutes: number;
  rating: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  bestScore: number | null;
  attempts: number;
  href: string;
}

const quizzes: QuizData[] = [
  {
    id: "html-basics",
    title: "HTML Basics",
    level: "easy",
    questions: 6,
    minutes: 15,
    rating: 2,
    easyCount: 4,
    mediumCount: 2,
    hardCount: 0,
    bestScore: 95,
    attempts: 3,
    href: "/quiz/html-basics",
  },
  {
    id: "css-fundamentals",
    title: "CSS Fundamentals",
    level: "easy",
    questions: 8,
    minutes: 20,
    rating: 2,
    easyCount: 3,
    mediumCount: 4,
    hardCount: 1,
    bestScore: 88,
    attempts: 2,
    href: "/quiz/css-fundamentals",
  },
  {
    id: "javascript-essentials-1",
    title: "JavaScript Essentials",
    level: "hard",
    isNew: true,
    questions: 10,
    minutes: 25,
    rating: 3,
    easyCount: 2,
    mediumCount: 5,
    hardCount: 3,
    bestScore: null,
    attempts: 0,
    href: "/quiz/javascript-essentials",
  },
  {
    id: "react-hooks",
    title: "React Hooks Deep Dive",
    level: "hard",
    questions: 12,
    minutes: 30,
    rating: 3,
    easyCount: 1,
    mediumCount: 6,
    hardCount: 5,
    bestScore: 72,
    attempts: 1,
    href: "/quiz/react-hooks",
  },
  {
    id: "typescript-patterns",
    title: "TypeScript Patterns",
    level: "hard",
    isNew: true,
    questions: 14,
    minutes: 35,
    rating: 4,
    easyCount: 0,
    mediumCount: 4,
    hardCount: 10,
    bestScore: null,
    attempts: 0,
    href: "/quiz/typescript-patterns",
  },
  {
    id: "nodejs-rest-apis",
    title: "Node.js & REST APIs",
    level: "hard",
    questions: 18,
    minutes: 35,
    rating: 4,
    easyCount: 2,
    mediumCount: 5,
    hardCount: 3,
    bestScore: 61,
    attempts: 2,
    href: "/quiz/nodejs-rest-apis",
  },
  {
    id: "javascript-essentials-2",
    title: "JavaScript Essentials",
    level: "hard",
    isNew: true,
    questions: 18,
    minutes: 35,
    rating: 4,
    easyCount: 2,
    mediumCount: 5,
    hardCount: 3,
    bestScore: null,
    attempts: 0,
    href: "/quiz/javascript-essentials-2",
  },
  {
    id: "javascript-essentials-3",
    title: "JavaScript Essentials",
    level: "hard",
    questions: 18,
    minutes: 35,
    rating: 4,
    easyCount: 2,
    mediumCount: 5,
    hardCount: 3,
    bestScore: null,
    attempts: 0,
    href: "/quiz/javascript-essentials-3",
  },
  {
    id: "git-basics",
    title: "Git & Version Control",
    level: "easy",
    questions: 8,
    minutes: 15,
    rating: 3,
    easyCount: 5,
    mediumCount: 3,
    hardCount: 0,
    bestScore: 90,
    attempts: 2,
    href: "/quiz/git-basics",
  },
  {
    id: "python-fundamentals",
    title: "Python Fundamentals",
    level: "easy",
    isNew: true,
    questions: 10,
    minutes: 20,
    rating: 3,
    easyCount: 6,
    mediumCount: 4,
    hardCount: 0,
    bestScore: null,
    attempts: 0,
    href: "/quiz/python-fundamentals",
  },
  {
    id: "sql-queries-101",
    title: "SQL Queries 101",
    level: "medium",
    questions: 12,
    minutes: 25,
    rating: 3,
    easyCount: 3,
    mediumCount: 7,
    hardCount: 2,
    bestScore: 78,
    attempts: 1,
    href: "/quiz/sql-queries-101",
  },
  {
    id: "restful-api-design",
    title: "RESTful API Design",
    level: "medium",
    questions: 10,
    minutes: 25,
    rating: 4,
    easyCount: 2,
    mediumCount: 6,
    hardCount: 2,
    bestScore: null,
    attempts: 0,
    href: "/quiz/restful-api-design",
  },
  {
    id: "docker-essentials",
    title: "Docker Essentials",
    level: "hard",
    questions: 14,
    minutes: 30,
    rating: 4,
    easyCount: 1,
    mediumCount: 5,
    hardCount: 8,
    bestScore: 55,
    attempts: 1,
    href: "/quiz/docker-essentials",
  },
  {
    id: "graphql-basics",
    title: "GraphQL Basics",
    level: "medium",
    isNew: true,
    questions: 10,
    minutes: 20,
    rating: 3,
    easyCount: 3,
    mediumCount: 6,
    hardCount: 1,
    bestScore: null,
    attempts: 0,
    href: "/quiz/graphql-basics",
  },
  {
    id: "vue-composition-api",
    title: "Vue.js Composition API",
    level: "hard",
    isNew: true,
    questions: 16,
    minutes: 35,
    rating: 4,
    easyCount: 1,
    mediumCount: 6,
    hardCount: 9,
    bestScore: null,
    attempts: 0,
    href: "/quiz/vue-composition-api",
  },
  {
    id: "cybersecurity-basics",
    title: "Cybersecurity Basics",
    level: "easy",
    questions: 10,
    minutes: 18,
    rating: 3,
    easyCount: 6,
    mediumCount: 4,
    hardCount: 0,
    bestScore: 82,
    attempts: 3,
    href: "/quiz/cybersecurity-basics",
  },
];

const filters: { key: "all" | QuizLevel; label: string }[] = [
  { key: "all", label: "ទាំងអស់" },
  { key: "easy", label: "កម្រិតស្រាល" },
  { key: "medium", label: "កម្រិតមធ្យម" },
  { key: "hard", label: "កម្រិតខ្ពស់" },
];

export default function Quiz() {
  const [activeFilter, setActiveFilter] = useState<"all" | QuizLevel>("all");

  const filteredQuizzes = useMemo(
    () =>
      activeFilter === "all"
        ? quizzes
        : quizzes.filter((q) => q.level === activeFilter),
    [activeFilter]
  );

  const { avgScore, completedCount } = useMemo(() => {
    const attempted = quizzes.filter((q) => q.bestScore !== null);
    const avg =
      attempted.length === 0
        ? 0
        : Math.round(
            attempted.reduce((sum, q) => sum + (q.bestScore ?? 0), 0) /
              attempted.length
          );
    return { avgScore: avg, completedCount: attempted.length };
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
              អភិវឌ្ឍចំណេះដឹង Programming របស់អ្នក តាមរយៈ Quiz អន្តរកម្ម
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              តាមរយៈ Quiz អន្តរកម្ម
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0 pt-1">
            <span className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <Trophy className="h-4 w-4 text-amber-500" />
              Avg score{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {avgScore}%
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span className="font-bold text-slate-900 dark:text-white">
                {completedCount}
              </span>{" "}
              of {quizzes.length} completed
            </span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeFilter === f.key
                  ? "bg-[#002455] text-white dark:bg-blue-600"
                  : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Quiz grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredQuizzes.map((quiz) => (
            <CardQuiz key={quiz.id} {...quiz} />
          ))}
        </div>
      </div>
    </div>
  );
}
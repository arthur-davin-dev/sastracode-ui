// src/components/documentation/SearchResultCard.tsx
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

// 1. Update this interface to match your real data properties
interface SearchResultItem {
  id: string;
  title: string;
  description?: string;
  type?: string;
  level?: string;
}

interface SearchResultCardProps {
  result: SearchResultItem; // Matches your exact array type now
}

export default function SearchResultCard({ result }: SearchResultCardProps) {
  const targetHref = `/documentation/lessons/${result.id}`;
  const level = result.level?.replaceAll("_", " ");

  return (
    <Link
      href={targetHref}
      className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/60 dark:text-blue-300">
        <BookOpen className="h-5 w-5" aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Tutorial
          </span>
          {level && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {level}
            </span>
          )}
        </span>

        <span className="block text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
          {result.title}
        </span>

        <span className="mt-1.5 block line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {result.description || "Open this tutorial to start learning."}
        </span>
      </span>

      <span className="mt-2 flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
        <span className="hidden sm:inline">Read</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

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
      className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-color/50 hover:bg-accent/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/25 dark:hover:border-blue-500/70 dark:hover:bg-zinc-800/90 sm:p-5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-color/10 text-primary-color transition-colors group-hover:bg-primary-color group-hover:text-white">
        <BookOpen className="h-5 w-5" aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-color">
            Tutorial
          </span>
          {level && (
            <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground dark:bg-zinc-800 dark:text-zinc-200">
              {level}
            </span>
          )}
        </span>

        <span className="block text-lg font-bold text-primary-color transition-colors group-hover:opacity-80 dark:text-zinc-50 dark:group-hover:text-blue-300">
          {result.title}
        </span>

        <span className="mt-1.5 block line-clamp-2 text-sm leading-6 text-primary-color/75 dark:text-zinc-300">
          {result.description || "Open this tutorial to start learning."}
        </span>
      </span>

      <span className="mt-2 flex shrink-0 items-center gap-1 text-sm font-semibold text-primary-color">
        <span className="hidden sm:inline">Read</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

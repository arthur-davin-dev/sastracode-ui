"use client";

import Link from "next/link";
import { Bookmark, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";
import CourseCard from "@/components/documentation/CourseCard";
import { toCourse } from "@/components/documentation/DocumentationTutorials";
import { useGetBookmarkedTutorialsQuery } from "@/redux/service/bookmarkApi";

function LoadingCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
        />
      ))}
    </div>
  );
}

export default function DocumentBookmarks() {
  const { status } = useSession();
  const { data, isLoading, isFetching, error, refetch } =
    useGetBookmarkedTutorialsQuery(undefined, {
      skip: status !== "authenticated",
    });
  const tutorials = data ?? [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 transition-colors dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#002455] dark:bg-blue-950/50 dark:text-blue-300">
            <Bookmark className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#002455] dark:text-white sm:text-3xl">
              Saved tutorials
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Your bookmarked documentation and tutorials.
            </p>
          </div>
        </div>

        <nav
          aria-label="Bookmark type"
          className="mb-8 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <Link
            href="/documentation/bookmark"
            aria-current="page"
            className="rounded-lg bg-[#002455] px-5 py-2.5 text-sm font-semibold text-white dark:bg-blue-600"
          >
            Documents
          </Link>
          <Link
            href="/courses/bookmark"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Courses
          </Link>
        </nav>

        {status === "loading" || isLoading ? (
          <LoadingCards />
        ) : status !== "authenticated" ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="font-semibold text-slate-800 dark:text-white">
              Sign in to see your saved tutorials.
            </p>
            <Link href="/documentation" className="mt-5 inline-flex rounded-xl bg-[#002455] px-5 py-2.5 text-sm font-semibold text-white">
              Browse documentation
            </Link>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
            <p className="font-semibold text-red-800 dark:text-red-200">
              Unable to load your saved tutorials.
            </p>
            <button type="button" onClick={() => refetch()} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white">
              <RefreshCw className="h-4 w-4" /> Try again
            </button>
          </div>
        ) : tutorials.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
            <Bookmark className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-4 font-semibold text-slate-800 dark:text-white">
              You have no saved tutorials yet.
            </p>
            <Link href="/documentation" className="mt-5 inline-flex rounded-xl bg-[#002455] px-5 py-2.5 text-sm font-semibold text-white dark:bg-blue-600">
              Browse documentation
            </Link>
          </div>
        ) : (
          <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${isFetching ? "opacity-70" : ""}`}>
            {tutorials.map((tutorial) => (
              <CourseCard key={tutorial.id} course={toCourse(tutorial)} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

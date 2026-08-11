"use client";

import Link from "next/link";
import { BookmarkIcon, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { mapApiCourseToCourse } from "@/lib/course/course-adapter";
import { useGetBookmarkedCoursesQuery } from "@/redux/service/bookmarkApi";

function BookmarkLoading() {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="h-[390px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
        />
      ))}
    </div>
  );
}

export default function Bookmark() {
  const { status } = useSession();
  const { data, isLoading, isFetching, error, refetch } =
    useGetBookmarkedCoursesQuery(undefined, {
      skip: status !== "authenticated",
    });

  const courses = (data ?? []).map(mapApiCourseToCourse);

  return (
    <div className="space-y-7 p-4 sm:p-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#002455] dark:bg-blue-950/50 dark:text-blue-300">
            <BookmarkIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#002455] dark:text-slate-100 sm:text-3xl">
              Bookmarked courses
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              Courses you saved for later appear here.
            </p>
          </div>
        </div>
      </div>

      <nav
        aria-label="Bookmark type"
        className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <Link
          href="/documentation/bookmark"
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Documents
        </Link>
        <Link
          href="/courses/bookmark"
          aria-current="page"
          className="rounded-lg bg-[#002455] px-5 py-2.5 text-sm font-semibold text-white dark:bg-blue-600"
        >
          Courses
        </Link>
      </nav>

      {status === "loading" || isLoading ? (
        <BookmarkLoading />
      ) : status !== "authenticated" ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="font-semibold text-slate-800 dark:text-slate-100">
            Sign in to see your bookmarked courses.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex rounded-xl bg-[#002455] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#003b80]"
          >
            Return home to sign in
          </Link>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
          <p className="font-semibold text-red-800 dark:text-red-200">
            Unable to load your bookmarked courses.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <BookmarkIcon className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-4 font-semibold text-slate-800 dark:text-slate-100">
            You have no bookmarked courses yet.
          </p>
          <Link
            href="/courses"
            className="mt-5 inline-flex rounded-xl bg-[#002455] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#003b80] dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Browse public courses
          </Link>
        </div>
      ) : (
        <div className={isFetching ? "opacity-70 transition-opacity" : ""}>
          <CourseGrid courses={courses} />
        </div>
      )}
    </div>
  );
}

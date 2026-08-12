"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bookmark, Eye } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Course } from "@/types/course";
import {
  useAddBookmarkMutation,
  useGetMyBookmarksQuery,
  useRemoveBookmarkMutation,
} from "@/redux/service/bookmarkApi";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { status } = useSession();
  const { data: bookmarkData } = useGetMyBookmarksQuery("TUTORIAL", {
    skip: status !== "authenticated",
  });
  const [coverFailed, setCoverFailed] = useState(false);
  const [addBookmark, addState] = useAddBookmarkMutation();
  const [removeBookmark, removeState] = useRemoveBookmarkMutation();
  const bookmark = bookmarkData?.data?.content.find(
    (item) => item.itemId === course.id,
  );
  const bookmarkLoading = addState.isLoading || removeState.isLoading;
  const coverSrc =
    coverFailed || !course.coverImage
      ? "/images/doc-hero.png"
      : course.coverImage;

  async function toggleBookmark() {
    if (status !== "authenticated") {
      toast.error("Please sign in to save this tutorial.");
      return;
    }

    try {
      if (bookmark) {
        await removeBookmark(bookmark.id).unwrap();
        toast.success("Tutorial removed from bookmarks.");
      } else {
        await addBookmark({ itemType: "TUTORIAL", itemId: course.id }).unwrap();
        toast.success("Tutorial saved to bookmarks.");
      }
    } catch {
      toast.error("Unable to update this bookmark. Please try again.");
    }
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 font-khmer transition-all duration-300 ease-in-out hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none">
      {/* Top Media Section */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={coverSrc}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setCoverFailed(true)}
        />
        
        {/* Badge */}
        <span className="absolute left-3 top-3 z-10 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white tracking-wide shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
          ឥតគិតថ្លៃ
        </span>

        <button
          type="button"
          onClick={toggleBookmark}
          disabled={bookmarkLoading}
          aria-label={bookmark ? "Remove tutorial bookmark" : "Bookmark tutorial"}
          aria-pressed={Boolean(bookmark)}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/95 text-[#002455] shadow-md backdrop-blur transition hover:scale-105 hover:bg-white disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900/95 dark:text-blue-400"
        >
          <Bookmark
            className="h-5 w-5"
            fill={bookmark ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Main Details Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="text-[22px] font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1 mb-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="mb-5 line-clamp-2 min-h-[3.65rem] flex-1 overflow-hidden text-ellipsis text-lg leading-relaxed text-slate-500 dark:text-slate-400">
          {course.description}
        </p>

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-1.5 text-base font-medium text-slate-500 dark:text-slate-400">
            <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>ចំនួនអ្នកសិក្សា {(course.viewCount ?? 0).toLocaleString()} នាក់</span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-lg bg-blue-600 px-2.5 py-1 text-base font-semibold tracking-wide text-white shadow-sm">
              ឥតគិតថ្លៃ
            </span>
            <button
              type="button"
              onClick={toggleBookmark}
              disabled={bookmarkLoading}
              aria-label={bookmark ? "Remove tutorial bookmark" : "Bookmark tutorial"}
              aria-pressed={Boolean(bookmark)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#002455] shadow-sm transition hover:scale-105 hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700"
            >
              <Bookmark
                className="h-4 w-4"
                fill={bookmark ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>

        {/* Action Button Link */}
        <Link
          href={course.href}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#002455] dark:bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-900 dark:hover:bg-blue-700 active:scale-[0.98]"
        >
          <span>{course.ctaLabel}</span>
          
          {/* Micro-arrow icon */}
          <svg 
            className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        
      </div>
    </article>
  );
}

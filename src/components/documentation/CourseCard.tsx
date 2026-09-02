"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Eye } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api/error";
import { Course } from "@/types/course";
import { TranslatedText } from "@/components/i18n/TranslatedText";
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
  const [addBookmark, addState] = useAddBookmarkMutation();
  const [removeBookmark, removeState] = useRemoveBookmarkMutation();
  const bookmark = bookmarkData?.data?.content.find(
    (item) => item.itemId === course.id,
  );
  const bookmarkLoading = addState.isLoading || removeState.isLoading;

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
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Unable to update this bookmark. Please try again.",
        ),
      );
    }
  }

  return (
    <article className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white font-khmer transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800 dark:hover:shadow-none dark:focus-within:ring-offset-slate-950">
      <Link
        href={course.href}
        className="absolute inset-0 z-10 rounded-2xl"
        aria-label={`មើលលម្អិតអំពី ${course.title}`}
      >
        <span className="sr-only">មើលលម្អិតអំពី {course.title}</span>
      </Link>
      
      {/* Top Media Section */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={course.coverImage}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        
      </div>

      {/* Main Details Body */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Title */}
        <TranslatedText
          as="h3"
          className="text-[22px] font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300 group-hover:text-primary-color/70 dark:group-hover:text-primary-color line-clamp-2 mb-2"
        >
          {course.title}
        </TranslatedText>

        {/* Description */}
        <TranslatedText
          as="p"
          className="mb-5 line-clamp-2 min-h-[3.65rem] flex-1 overflow-hidden text-ellipsis text-lg leading-relaxed text-slate-500 dark:text-slate-400"
        >
          {course.description}
        </TranslatedText>

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">
              {(course.viewCount ?? 0).toLocaleString()} នាក់
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full bg-primary-color px-2.5 py-1 text-sm font-semibold tracking-wide text-white shadow-sm">
              ឥតគិតថ្លៃ
            </span>
            <button
              type="button"
              onClick={toggleBookmark}
              disabled={bookmarkLoading}
              aria-label={bookmark ? "Remove tutorial bookmark" : "Bookmark tutorial"}
              aria-pressed={Boolean(bookmark)}
              className="relative z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-primary-color shadow-sm transition hover:scale-105 hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              <Bookmark
                className="h-4 w-4"
                fill={bookmark ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
        
      </div>
    </article>
  );
}
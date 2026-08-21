"use client";

import { useTranslation } from "@/hooks/useTranslations";
import Link from "next/link";
import {
  Bookmark,
  BookOpen,
  Clock,
  Lock,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import type { Course } from "@/lib/course/courses";
import {
  useAddBookmarkMutation,
  useGetMyBookmarksQuery,
  useRemoveBookmarkMutation,
} from "@/redux/service/bookmarkApi";

interface CourseCardProps {
  course: Course;
}

const FALLBACK_IMAGE = "/assets/images/HTML & CSS.jpg";

function accessLabel(course: Course) {
  if (course.accessType === "PRIVATE") {
    return "Private";
  }

  if (course.accessType === "PREMIUM") {
    if ((course.price ?? 0) > 0) {
      return `${course.currency ?? "USD"} ${course.price?.toFixed(2)}`;
    }

    return "Premium";
  }

  return "ឥតគិតថ្លៃ";
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function resolveCourseImage(image?: string | null): string {
  const value = image?.trim();

  if (!value) {
    return FALLBACK_IMAGE;
  }

  // Full URL such as MinIO presigned URL
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  // Local/frontend route:
  // /api/files/{id}/content
  // /assets/images/example.jpg
  if (value.startsWith("/")) {
    return value;
  }

  // If course.image contains only a file UUID,
  // use the Next.js file proxy.
  if (isUuid(value)) {
    return `/api/files/${encodeURIComponent(value)}/content`;
  }

  return FALLBACK_IMAGE;
}

export function CourseCard({ course }: CourseCardProps) {
  const { status } = useSession();
  const t = useTranslation();
  const { data: bookmarkData } = useGetMyBookmarksQuery("COURSE", {
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
      toast.error("Please sign in to bookmark this course.");
      return;
    }

    try {
      if (bookmark) {
        await removeBookmark(bookmark.id).unwrap();
        toast.success("Course removed from bookmarks.");
      } else {
        await addBookmark({ itemType: "COURSE", itemId: course.id }).unwrap();
        toast.success("Course saved to bookmarks.");
      }
    } catch {
      toast.error("Unable to update this bookmark. Please try again.");
    }
  }

  const isPrivate = course.accessType === "PRIVATE";
  const isPremium = course.accessType === "PREMIUM";

  // Locked courses always route to the private-course page,
  // regardless of the course's own href/id route.
  const href = course.locked
    ? "/private-course"
    : (course.href ?? `/courses/${course.id}`);

  const imageSrc = resolveCourseImage(course.image);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        onClick={toggleBookmark}
        disabled={bookmarkLoading}
        aria-label={bookmark ? "Remove course bookmark" : "Bookmark course"}
        aria-pressed={Boolean(bookmark)}
        className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/95 text-[#002455] shadow-md backdrop-blur transition hover:scale-105 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900/95 dark:text-blue-400"
      >
        <Bookmark className="h-5 w-5" fill={bookmark ? "currentColor" : "none"} />
      </button>

      <Link href={href} className="block">
        {/* =========================
            COURSE IMAGE
        ========================== */}
        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={imageSrc}
            alt={course.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(event) => {
              console.error("COURSE IMAGE FAILED:", imageSrc);
              event.currentTarget.onerror = null;
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

          {/* Access Badge */}
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-sm ${isPrivate
              ? "bg-slate-950/85 text-white"
              : isPremium
                ? "bg-amber-400 text-slate-950"
                : "bg-emerald-500 text-white"
              }`}
          >
            {accessLabel(course)}
          </span>

          {/* Private Course Lock */}
          {isPrivate && course.hasFullAccess !== true && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/25">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/80 text-white shadow-xl">
                <Lock className="h-5 w-5" />
              </div>
            </div>
          )}
        </div>

        {/* =========================
            COURSE CONTENT
        ========================== */}
        <div className="p-5">
          <Badge
            variant="secondary"
            className="mb-3 bg-transparent p-0 text-[12px] font-bold uppercase tracking-wider text-pink-600 hover:bg-transparent dark:text-pink-400"
          >
            {course.category}
          </Badge>

          <h3 className="mb-2 line-clamp-1 text-[22px] font-bold leading-snug text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
            {course.title}
          </h3>

          <p className="line-clamp-2 min-h-[3.65rem] text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            {course.description || "មិនទាន់មានសេចក្ដីពិពណ៌នា"}
          </p>

          {/* Course Information */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-indigo-700 dark:text-indigo-400" />
              {course.lessons} មេរៀន
            </span>

            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-indigo-700 dark:text-indigo-400" />
              {course.duration}
            </span>

            {course.enrollmentCount !== undefined && (
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-indigo-700 dark:text-indigo-400" />
                {course.enrollmentCount}
              </span>
            )}
          </div>

          <Separator className="my-4 bg-slate-200/80 dark:bg-slate-800" />

          {/* Footer */}
          <div className="flex items-center justify-end text-sm font-semibold">
            {course.locked ? (
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {t.courses.card.privateCourse}
              </span>
            ) : (
              <span className="text-[#002455] transition-transform group-hover:translate-x-0.5 dark:text-blue-300">
                {t.courses.card.viewCourse} →
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
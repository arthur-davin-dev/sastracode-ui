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
import { TranslatedText } from "@/components/i18n/TranslatedText";

import { getApiErrorMessage } from "@/lib/api/error";
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
const FALLBACK_AVATAR = "/images/sastra_code_logo.png";

type AccessCopy = {
  free: string;
  premium: string;
  private: string;
};

/**
 * Badge copy for a course's access type. A paid course shows its actual price
 * (a number, so it needs no translation); everything else is localized.
 */
function accessLabel(course: Course, copy: AccessCopy) {
  if (course.accessType === "PRIVATE") {
    return copy.private;
  }

  if (course.accessType === "PREMIUM") {
    if ((course.price ?? 0) > 0) {
      return `${course.currency ?? "USD"} ${course.price?.toFixed(2)}`;
    }

    return copy.premium;
  }

  return copy.free;
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

  const card = t.courses.card;

  async function toggleBookmark() {
    if (status !== "authenticated") {
      toast.error(card.bookmark.signInRequired);
      return;
    }

    try {
      if (bookmark) {
        await removeBookmark(bookmark.id).unwrap();
        toast.success(card.bookmark.removed);
      } else {
        await addBookmark({ itemType: "COURSE", itemId: course.id }).unwrap();
        toast.success(card.bookmark.added);
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, card.bookmark.error));
    }
  }

  const isPrivate = course.accessType === "PRIVATE";
  const isPremium = course.accessType === "PREMIUM";

  // Locked courses always route to the private-course page,
  // regardless of the course's own href/id route.
  const href = course.locked
    ? "/private-course"
    : (course.href ?? `/courses/${course.slug || course.id}`);

  const imageSrc = resolveCourseImage(course.image);

  const levelLabel = course.level
    ? t.courses.card.level[course.level]
    : null;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        onClick={toggleBookmark}
        disabled={bookmarkLoading}
        aria-label={bookmark ? card.bookmark.remove : card.bookmark.add}
        aria-pressed={Boolean(bookmark)}
        className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/95 text-primary-color shadow-md backdrop-blur transition hover:scale-105 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900/95 dark:text-primary-color"
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
              event.currentTarget.onerror = null;
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

          {/* Access Badge */}
          <span
            className={`absolute left-3 top-3 rounded-full px-3.5 py-1.5 text-sm font-semibold shadow-sm backdrop-blur-sm ${isPrivate
              ? "bg-slate-950/85 text-white"
              : isPremium
                ? "bg-amber-400 text-slate-950"
                : "bg-emerald-500 text-white"
              }`}
          >
            {accessLabel(course, card.access)}
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
            className="mb-3 bg-transparent p-0 text-[12px] font-bold uppercase tracking-wider text-primary-color hover:bg-transparent dark:text-primary-color"
          >
            {course.category}
          </Badge>

          <TranslatedText
            as="h3"
            className="mb-2 line-clamp-2 text-[22px] font-bold leading-snug text-slate-800 transition-colors group-hover:text-primary-color dark:text-slate-100 dark:group-hover:text-primary-color"
          >
            {course.title}
          </TranslatedText>

          <p className="line-clamp-2 min-h-[3.65rem] text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            {course.description ? (
              <TranslatedText>{course.description}</TranslatedText>
            ) : (
              card.noDescription
            )}
          </p>

          {/* Course Information */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary-color dark:text-primary-color" />
              {course.lessons} {card.lessonsUnit}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary-color dark:text-primary-color" />
              {course.duration}
            </span>

            {course.enrollmentCount !== undefined && (
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary-color dark:text-primary-color" />
                {course.enrollmentCount}
              </span>
            )}
          </div>

          <Separator className="my-4 bg-slate-200/80 dark:bg-slate-800" />

          {/* Footer */}
          <div className="flex items-center gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <img
                src={course.instructor?.avatar || FALLBACK_AVATAR}
                alt={course.instructor?.name || card.instructorAlt}
                loading="lazy"
                className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = FALLBACK_AVATAR;
                }}
              />
              <span className="truncate text-sm font-medium text-slate-600 dark:text-slate-300">
                {course.instructor?.name || card.defaultInstructor}
              </span>
            </div>

            {course.locked ? (
              <span className="shrink-0 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                {card.privateCourse}
              </span>
            ) : (
              levelLabel && (
                <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {levelLabel}
                </span>
              )
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
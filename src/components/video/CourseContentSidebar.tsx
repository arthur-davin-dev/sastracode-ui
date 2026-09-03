"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

import { CourseSection, LessonItem } from "@/types/lesson-player";
import { toKhmerNumerals } from "@/lib/khmer-numerals";
import { useLanguage } from "@/lib/language-context";
import { useTranslation } from "@/hooks/useTranslations";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetCourseProgressQuery } from "@/redux/api";
import { useGetVideoProgressQuery } from "@/redux/api/qa-api";
import { useGetMyXpQuery } from "@/redux/service/achievementApi";

interface CourseContentSidebarProps {
  sections: CourseSection[];
  totalLessons: number;
  /** Real course UUID — course progress is still fetched by id, not slug. */
  courseId: string;
  /** Course slug, used for the `/courses/{slug}/learn/...` lesson links. */
  courseSlug: string;
}

// The backend returns every section video inside the sections payload (no
// server-side pagination for section videos), so the list is paginated on the
// client to keep long sections readable.
const LESSONS_PER_PAGE = 8;

// Shown when a lesson has no video thumbnail, or when its thumbnail fails to load.
const FALLBACK_THUMBNAIL = "/assets/images/HTML & CSS.jpg";

// The lesson duration is stored as a formatted label ("M:SS" or "H:MM:SS").
// Parse it back to seconds so the thumbnail progress bar can be a real ratio.
function durationLabelToSeconds(label: string): number {
  const parts = label.split(":").map((part) => Number(part));
  if (parts.some((part) => !Number.isFinite(part))) return 0;
  return parts.reduce((total, part) => total * 60 + part, 0);
}

/**
 * One lesson link. Its completion checkmark reflects the persisted backend
 * video-progress state, never local UI state. Only mounted for the visible
 * page of the open section, so at most LESSONS_PER_PAGE progress requests run.
 */
function LessonRow({
  lesson,
  courseSlug,
  canQueryProgress,
}: {
  lesson: LessonItem;
  courseSlug: string;
  canQueryProgress: boolean;
}) {
  const t = useTranslation();
  const { data: progress } = useGetVideoProgressQuery(lesson.id, {
    skip: !canQueryProgress,
  });

  const isCurrent = lesson.status === "current";
  const isCompleted = !isCurrent && progress?.completed === true;

  const meta = isCompleted ? t.lessonSidebar.watched : null;

  // Real watched ratio: persisted playback position over the lesson length.
  // A completed lesson always reads 100%.
  const durationSeconds = durationLabelToSeconds(lesson.duration);
  const positionSeconds = progress?.positionSeconds ?? 0;
  const watchedPercent = progress?.completed
    ? 100
    : durationSeconds > 0
      ? Math.min(100, Math.round((positionSeconds / durationSeconds) * 100))
      : 0;

  return (
    <Link
      href={`/courses/${courseSlug}/learn/${lesson.id}`}
      className={`flex w-full gap-3 rounded-xl p-2 text-left transition-colors ${
        isCurrent
          ? "bg-slate-100 dark:bg-slate-800/70"
          : "hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
      }`}
    >
      {/* YouTube-style thumbnail: fixed-size on the left, duration badge,
          watched progress bar. */}
      <div className="relative h-15 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
        <img
          src={lesson.thumbnail || FALLBACK_THUMBNAIL}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.fallback !== "true") {
              img.dataset.fallback = "true";
              img.src = FALLBACK_THUMBNAIL;
            }
          }}
        />

        {lesson.duration && (
          <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1 py-0.5 text-[11px] font-medium leading-none text-white">
            {lesson.duration}
          </span>
        )}

        {watchedPercent > 0 && (
          <span className="absolute inset-x-0 bottom-0 h-[3px] bg-black/30">
            <span
              className="block h-full bg-primary-color"
              style={{ width: `${watchedPercent}%` }}
            />
          </span>
        )}
      </div>

      {/* Title (2-line clamp) + status meta, like a YouTube list item. */}
      <div className="min-w-0 flex py-0.5">
        <p
          className={`line-clamp-2 text-sm leading-5 break-words ${
            isCurrent
              ? "font-semibold text-primary-color"
              : "font-medium text-slate-700 dark:text-slate-100"
          }`}
        >
          {lesson.title}
        </p>
        {meta && (
          <p className="mt-1 flex items-center gap-1 text-[8px] text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            {/* {meta} */}
          </p>
        )}
      </div>
    </Link>
  );
}

export function CourseContentSidebar({
  sections,
  totalLessons,
  courseId,
  courseSlug,
}: CourseContentSidebarProps) {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const t = useTranslation();
  const { lang } = useLanguage();
  // Numbers follow the active language: Khmer numerals in KM, Western digits in EN.
  const num = (value: string | number) =>
    lang === "km" ? toKhmerNumerals(value) : String(value);

  // The section holding the lesson currently being watched (falls back to the
  // first section). Recomputed on every mount, so it survives navigation.
  const currentSection =
    sections.find((s) => s.lessons.some((l) => l.status === "current")) ??
    sections[0] ??
    null;

  const [openSectionId, setOpenSectionId] = useState<string | null>(
    currentSection?.id ?? null,
  );
  // Start on the page that actually contains the current lesson, otherwise
  // navigating to a lesson on page 2+ would always snap back to page 1 because
  // this component re-mounts on route change.
  const [page, setPage] = useState(() => {
    const index =
      currentSection?.lessons.findIndex((l) => l.status === "current") ?? -1;
    return index >= 0 ? Math.floor(index / LESSONS_PER_PAGE) + 1 : 1;
  });

  // Open a section and reset its list to the first page in one step, so no
  // effect is needed to keep `page` in range when the section changes.
  const toggleSection = (sectionId: string) => {
    setOpenSectionId((current) => (current === sectionId ? null : sectionId));
    setPage(1);
  };

  // Course-level progress comes straight from the backend
  // (GET /v1/courses/{courseId}/progress) — no client-side recalculation.
  const { data: courseProgress } = useGetCourseProgressQuery(courseId, {
    skip: !isAuthenticated,
  });
  const { data: xp } = useGetMyXpQuery(undefined, { skip: !isAuthenticated });

  const totalVideos = courseProgress?.totalVideos ?? 0;
  const completedVideos = Math.min(
    courseProgress?.completedVideos ?? 0,
    totalVideos,
  );
  // Backend-provided percentage (with a client fallback), clamped to 0–100 so
  // the progress bar can never render an invalid width.
  const progressPercent = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        courseProgress?.percentage ??
          (totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0),
      ),
    ),
  );

  const openSection = sections.find((s) => s.id === openSectionId) ?? null;
  const pageCount = openSection
    ? Math.max(1, Math.ceil(openSection.lessons.length / LESSONS_PER_PAGE))
    : 1;
  const safePage = Math.min(page, pageCount);

  // Pagination shows at most 3 slots. With 3 pages or fewer, every page number
  // is shown. With more, it collapses to: [first] [current-or-…] [last] — the
  // middle slot is a "…" unless the current page sits between the ends.
  const isCollapsed = pageCount > 3;
  const middleSlot: number | "ellipsis" =
    safePage !== 1 && safePage !== pageCount ? safePage : "ellipsis";
  const pageSlots: Array<number | "ellipsis"> = isCollapsed
    ? [1, middleSlot, pageCount]
    : Array.from({ length: pageCount }, (_, i) => i + 1);

  const visibleLessons = useMemo(() => {
    if (!openSection) return [];
    const start = (safePage - 1) * LESSONS_PER_PAGE;
    return openSection.lessons.slice(start, start + LESSONS_PER_PAGE);
  }, [openSection, safePage]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4 dark:border-slate-800">
        <h2 className="font-(family-name:--font-sans) text-xl font-semibold text-slate-900 dark:text-slate-100">
          {t.lessonSidebar.heading}
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {num(totalLessons)} {t.courses.card.lessonsUnit}
        </span>
      </div>

      {/* Course progress — backend course-progress API */}
      {isAuthenticated && courseProgress && (
        <div className="space-y-2 border-b border-slate-200/80 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center justify-between text-lg font-semibold text-slate-800 dark:text-slate-200">
            <span className="opacity-80">{t.lessonSidebar.progressTitle}</span>
            <span className="text-primary-color">{num(progressPercent)}%</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-primary-color transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.max(0, progressPercent))}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              {t.lessonSidebar.completedPrefix} {num(completedVideos)}{" "}
              {t.lessonSidebar.completedMiddle} {num(totalVideos)}{" "}
              {t.lessonSidebar.completedSuffix}
            </span>
            {typeof xp?.totalXp === "number" && (
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                {num(xp.totalXp)} XP
              </span>
            )}
          </div>
        </div>
      )}

      {/* Sections List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {sections.map((section) => {
          const isOpen = openSectionId === section.id;

          return (
            <div key={section.id}>
              {/* Section Trigger */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <span className="min-w-0 whitespace-normal break-words pr-3 text-xl leading-8 font-semibold text-slate-800 dark:text-slate-200">
                  {section.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {num(section.lessons.length)} {t.courses.card.lessonsUnit}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Lesson Items (paginated) */}
              {isOpen && (
                <div className="space-y-0.5 border-t border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/30 px-2 py-2">
                  {visibleLessons.map((lesson) => (
                    <LessonRow
                      key={lesson.id}
                      lesson={lesson}
                      courseSlug={courseSlug}
                      canQueryProgress={isAuthenticated}
                    />
                  ))}

                  {pageCount > 1 && (
                    <Pagination className="mx-0 w-auto pt-2">
                      <PaginationContent className="gap-1.5">
                        <PaginationItem>
                          <PaginationPrevious
                            label={t.lessonSidebar.previous}
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            className={`h-8 rounded-lg border border-slate-200 text-xs text-primary-color dark:border-slate-800 ${
                              safePage === 1
                                ? "pointer-events-none opacity-40"
                                : "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          />
                        </PaginationItem>

                        {pageSlots.map((slot, i) =>
                          slot === "ellipsis" ? (
                            <PaginationItem key={`ellipsis-${i}`}>
                              <span className="flex h-8 w-8 items-end justify-center text-lg leading-none text-slate-400 dark:text-slate-500">
                                …
                              </span>
                            </PaginationItem>
                          ) : (
                            <PaginationItem key={slot}>
                              <button
                                type="button"
                                onClick={() => setPage(slot)}
                                aria-current={
                                  slot === safePage ? "page" : undefined
                                }
                                className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors ${
                                  slot === safePage
                                    ? "border border-primary-color/30 bg-primary-color/10 text-primary-color"
                                    : "border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                                }`}
                              >
                                {num(slot)}
                              </button>
                            </PaginationItem>
                          ),
                        )}

                        <PaginationItem>
                          <PaginationNext
                            label={t.lessonSidebar.next}
                            onClick={() =>
                              setPage((p) => Math.min(p + 1, pageCount))
                            }
                            className={`h-8 rounded-lg border border-slate-200 text-xs text-primary-color dark:border-slate-800 ${
                              safePage === pageCount
                                ? "pointer-events-none opacity-40"
                                : "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

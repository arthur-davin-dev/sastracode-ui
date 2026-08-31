"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChevronDown, CheckCircle2, Circle, PlayCircle } from "lucide-react";

import { CourseSection, LessonItem } from "@/types/lesson-player";
import { toKhmerNumerals } from "@/lib/khmer-numerals";
import { Progress } from "@/components/ui/progress";
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
  courseId: string;
}

// The backend returns every section video inside the sections payload (no
// server-side pagination for section videos), so the list is paginated on the
// client to keep long sections readable.
const LESSONS_PER_PAGE = 8;

/**
 * One lesson link. Its completion checkmark reflects the persisted backend
 * video-progress state, never local UI state. Only mounted for the visible
 * page of the open section, so at most LESSONS_PER_PAGE progress requests run.
 */
function LessonRow({
  lesson,
  courseId,
  canQueryProgress,
}: {
  lesson: LessonItem;
  courseId: string;
  canQueryProgress: boolean;
}) {
  const { data: progress } = useGetVideoProgressQuery(lesson.id, {
    skip: !canQueryProgress,
  });

  const isCurrent = lesson.status === "current";
  const isCompleted = !isCurrent && progress?.completed === true;

  return (
    <Link
      href={`/courses/${courseId}/learn/${lesson.id}`}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors ${
        isCurrent
          ? "bg-indigo-50 ring-1 ring-inset ring-indigo-100 dark:bg-indigo-500/10 dark:ring-indigo-500/20"
          : "hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
      }`}
    >
      {isCurrent ? (
        <PlayCircle className="h-4 w-4 shrink-0 fill-indigo-600 text-white dark:fill-indigo-400 dark:text-slate-900" />
      ) : isCompleted ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
      ) : (
        <Circle className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />
      )}
      <span
        className={`min-w-0 flex-1 whitespace-normal break-words text-lg leading-7 ${
          isCurrent
            ? "font-semibold text-indigo-600 dark:text-indigo-300"
            : "text-slate-600 dark:text-slate-400"
        }`}
      >
        {lesson.title}
      </span>
      <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
        {lesson.duration}
      </span>
    </Link>
  );
}

export function CourseContentSidebar({
  sections,
  totalLessons,
  courseId,
}: CourseContentSidebarProps) {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const [openSectionId, setOpenSectionId] = useState<string | null>(
    sections.find((s) => s.lessons.some((l) => l.status === "current"))?.id ??
      sections[0]?.id ??
      null,
  );
  const [page, setPage] = useState(1);

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
  const progressPercent = Math.round(
    courseProgress?.percentage ??
      (totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0),
  );

  const openSection = sections.find((s) => s.id === openSectionId) ?? null;
  const pageCount = openSection
    ? Math.max(1, Math.ceil(openSection.lessons.length / LESSONS_PER_PAGE))
    : 1;
  const safePage = Math.min(page, pageCount);
  const visibleLessons = useMemo(() => {
    if (!openSection) return [];
    const start = (safePage - 1) * LESSONS_PER_PAGE;
    return openSection.lessons.slice(start, start + LESSONS_PER_PAGE);
  }, [openSection, safePage]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4 dark:border-slate-800">
        <h2 className="font-(family-name:--font-sans) text-xl font-semibold text-slate-900 dark:text-slate-100">
          ខ្លឹមសារវគ្គសិក្សា
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {toKhmerNumerals(totalLessons)} មេរៀន
        </span>
      </div>

      {/* Course progress — backend course-progress API */}
      {isAuthenticated && courseProgress && (
        <div className="space-y-2 border-b border-slate-200/80 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center justify-between text-lg font-semibold text-slate-800 dark:text-slate-200">
            <span className="opacity-80">វឌ្ឍនភាពសិក្សា</span>
            <span className="text-primary-color">
              {toKhmerNumerals(progressPercent)}%
            </span>
          </div>

          <Progress
            value={progressPercent}
            className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 [&>div]:bg-primary-color"
          />

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              បានបញ្ចប់ {toKhmerNumerals(completedVideos)} លើ{" "}
              {toKhmerNumerals(totalVideos)} វីដេអូ
            </span>
            {typeof xp?.totalXp === "number" && (
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                {toKhmerNumerals(xp.totalXp)} XP
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
                    {toKhmerNumerals(section.lessons.length)} មេរៀន
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
                      courseId={courseId}
                      canQueryProgress={isAuthenticated}
                    />
                  ))}

                  {pageCount > 1 && (
                    <Pagination className="mx-0 w-auto pt-2">
                      <PaginationContent className="gap-1.5">
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            className={`h-8 rounded-lg border border-slate-200 text-xs text-primary-color dark:border-slate-800 ${
                              safePage === 1
                                ? "pointer-events-none opacity-40"
                                : "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          />
                        </PaginationItem>

                        {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                          (p) => (
                            <PaginationItem key={p}>
                              <button
                                type="button"
                                onClick={() => setPage(p)}
                                aria-current={p === safePage ? "page" : undefined}
                                className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors ${
                                  p === safePage
                                    ? "border border-primary-color/30 bg-primary-color/10 text-primary-color"
                                    : "border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                                }`}
                              >
                                {toKhmerNumerals(p)}
                              </button>
                            </PaginationItem>
                          ),
                        )}

                        <PaginationItem>
                          <PaginationNext
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

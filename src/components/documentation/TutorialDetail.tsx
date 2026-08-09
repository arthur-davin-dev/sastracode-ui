"use client";

import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

import Link from "next/link";

import { useMemo, useState } from "react";

import { useGetTutorialByIdQuery } from "@/redux/api/tutorial-api";

import SidebarLeftLesson from "@/components/documentation/SidebarLeftLesson";

import SidebarRightLesson, {
  getBlockAnchor,
} from "@/components/documentation/SidebarRightLesson";

import LessonBlockRenderer from "@/components/documentation/LessonBlockRenderer";

import TodayLessonHero from "@/components/documentation/TodayLessonHero";

import type {
  TutorialDetailData,
  TutorialLesson,
  TutorialSection,
} from "@/types/tutorial-reader";

function sortSections(sections: TutorialSection[]) {
  return [...sections].sort((a, b) => a.orderIndex - b.orderIndex);
}

/*
 * Turn:
 *
 * Section
 *   Subsection A
 *   Subsection B
 *
 * into:
 *
 * [
 *   Subsection A,
 *   Subsection B
 * ]
 *
 * DIRECT section becomes its own lesson.
 */
function createLessons(sections: TutorialSection[]): TutorialLesson[] {
  const lessons: TutorialLesson[] = [];

  sortSections(sections).forEach((section) => {
    const subsections = [...(section.subsections ?? [])].sort(
      (a, b) => a.orderIndex - b.orderIndex,
    );

    const isDirect =
      section.contentMode === "DIRECT" || subsections.length === 0;

    /*
     * W3Schools-like direct lesson.
     */
    if (isDirect) {
      lessons.push({
        id: section.id,

        sectionId: section.id,

        type: "SECTION",

        title: section.title,

        sectionTitle: section.title,

        orderIndex: section.orderIndex,

        blocks: [...(section.blocks ?? [])].sort(
          (a, b) => a.orderIndex - b.orderIndex,
        ),
      });
    }

    /*
     * Grouped lessons.
     */
    subsections.forEach((subsection) => {
      lessons.push({
        id: subsection.id,

        sectionId: section.id,

        type: "SUBSECTION",

        title: subsection.title,

        sectionTitle: section.title,

        orderIndex: subsection.orderIndex,

        blocks: [...(subsection.blocks ?? [])].sort(
          (a, b) => a.orderIndex - b.orderIndex,
        ),
      });
    });
  });

  return lessons;
}

export default function TutorialDetail({ tutorialId }: { tutorialId: string }) {
  const { data, isLoading, error, refetch } =
    useGetTutorialByIdQuery(tutorialId);

  const [activeLessonId, setActiveLessonId] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tutorial = data?.data as TutorialDetailData | undefined;

  const sections = useMemo(
    () => sortSections(tutorial?.sections ?? []),
    [tutorial?.sections],
  );

  const lessons = useMemo(() => createLessons(sections), [sections]);

  const selectedLessonId = lessons.some(
    (lesson) => lesson.id === activeLessonId,
  )
    ? activeLessonId
    : lessons[0]?.id;

  const activeIndex = Math.max(
    0,
    lessons.findIndex((lesson) => lesson.id === selectedLessonId),
  );

  const activeLesson = lessons[activeIndex];

  const previousLesson = activeIndex > 0 ? lessons[activeIndex - 1] : null;

  const nextLesson =
    activeIndex < lessons.length - 1 ? lessons[activeIndex + 1] : null;

  /*
   * This is reading-position progress.
   *
   * Later you can replace it with your real
   * lesson completion/progress API.
   */
  const progress = lessons.length
    ? Math.round(((activeIndex + 1) / lessons.length) * 100)
    : 0;

  function selectLesson(lessonId: string) {
    setActiveLessonId(lessonId);

    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="grid min-h-screen lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_250px]">
          <div className="hidden animate-pulse bg-slate-200 lg:block dark:bg-slate-900" />

          <div className="mx-auto w-full max-w-4xl space-y-6 px-6 py-10">
            <div className="h-12 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

            <div className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />

            <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div className="h-40 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !tutorial) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold">Tutorial could not be loaded</h1>

          <button
            type="button"
            className="mt-4 font-semibold text-blue-600 underline"
            onClick={() => refetch()}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!activeLesson) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">Tutorial នេះមិនទាន់មានមេរៀនទេ។</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfcfe] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* ================= MOBILE SIDEBAR BUTTON ================= */}

      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#002455] text-white shadow-xl lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="mx-auto grid min-h-screen max-w-[1700px] lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_250px]">
        {/* ================= LEFT ================= */}

        <div
          className={`fixed inset-y-0 left-0 z-50 w-[280px] transform bg-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:w-auto lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 rounded-lg p-2 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

          <SidebarLeftLesson
            sections={sections}
            activeLessonId={activeLesson.id}
            onSelectLesson={selectLesson}
          />
        </div>

        {/* ================= CENTER ================= */}

        <article className="min-w-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 lg:px-10">
            {/* Back */}
            <Link
              href="/documentation/lessons"
              className="mb-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              <ChevronLeft className="h-4 w-4" />
              ត្រឡប់ក្រោយ
            </Link>

            {/* Breadcrumb */}
            <div className="font-khmer mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span>{tutorial.title}</span>

              <span>/</span>

              <span className="font-semibold text-[#002455] dark:text-blue-400">
                {activeLesson.sectionTitle}
              </span>
            </div>

            {/* YOUR EXISTING HERO */}
            <TodayLessonHero
              title={activeLesson.title}
              description={tutorial.summary || `រៀនអំពី ${activeLesson.title}`}
              percent={progress}
              href="#lesson-content"
            />

            {/* ================= CONTENT ================= */}

            <div id="lesson-content" className="mt-10 scroll-mt-24">
              <div className="mb-8">
                <span className="font-khmer text-sm font-semibold text-blue-600">
                  មេរៀនទី {activeIndex + 1} ក្នុងចំណោម {lessons.length}
                </span>

                <h1 className="font-khmer mt-2 text-3xl font-bold tracking-tight text-primary-color sm:text-4xl dark:text-white">
                  {activeLesson.title}
                </h1>
              </div>

              {activeLesson.blocks.length > 0 ? (
                <div className="space-y-7">
                  {activeLesson.blocks.map((block) => (
                    <div
                      key={block.id}
                      id={getBlockAnchor(block.id)}
                      className="scroll-mt-28"
                    >
                      <LessonBlockRenderer block={block} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500 dark:border-slate-700">
                  មេរៀននេះមិនទាន់មានមាតិកាទេ។
                </div>
              )}

              {/* ================= PREVIOUS / NEXT ================= */}

              <div className="mt-14 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-slate-800">
                <div>
                  {previousLesson && (
                    <button
                      type="button"
                      onClick={() => selectLesson(previousLesson.id)}
                      className="group flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                      <ChevronLeft className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:-translate-x-1" />

                      <div className="min-w-0">
                        <span className="text-xs text-slate-400">មេរៀនមុន</span>

                        <p className="font-khmer truncate font-semibold text-[#002455] dark:text-white">
                          {previousLesson.title}
                        </p>
                      </div>
                    </button>
                  )}
                </div>

                <div>
                  {nextLesson && (
                    <button
                      type="button"
                      onClick={() => selectLesson(nextLesson.id)}
                      className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="min-w-0">
                        <span className="text-xs text-slate-400">
                          មេរៀនបន្ទាប់
                        </span>

                        <p className="font-khmer truncate font-semibold text-[#002455] dark:text-white">
                          {nextLesson.title}
                        </p>
                      </div>

                      <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ================= RIGHT ================= */}

        <div className="hidden xl:block">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <SidebarRightLesson blocks={activeLesson.blocks} />
          </div>
        </div>
      </div>
    </main>
  );
}

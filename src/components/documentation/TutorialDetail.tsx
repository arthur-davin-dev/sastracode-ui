"use client";

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  RefreshCw,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import LessonBlockRenderer, {
  QuizResultsProvider,
} from "@/components/documentation/LessonBlockRenderer";
import ScrollReveal from "@/components/home/ScrollReveal";
import SidebarLeftLesson from "@/components/documentation/SidebarLeftLesson";
import { CodingTaskLessonSection } from "@/components/coding-task-player/CodingTaskLessonSection";
import { getBlockAnchor } from "@/components/documentation/SidebarRightLesson";
import {
  useGetTutorialByIdQuery,
  useGetTutorialProgressQuery,
  useCompleteTutorialLessonMutation,
  useIncrementTutorialViewMutation,
} from "@/redux/api/tutorial-api";
import type {
  TutorialDetailData,
  TutorialLesson,
  TutorialSection,
} from "@/types/tutorial-reader";

const LESSONS_ROUTE = "/documentation/lessons";

function sortSections(sections: TutorialSection[]) {
  return [...sections].sort((a, b) => a.orderIndex - b.orderIndex);
}

function createLessons(sections: TutorialSection[]): TutorialLesson[] {
  const lessons: TutorialLesson[] = [];

  sortSections(sections).forEach((section) => {
    const subsections = [...(section.subsections ?? [])].sort(
      (a, b) => a.orderIndex - b.orderIndex,
    );

    const isDirect =
      section.contentMode === "DIRECT" || subsections.length === 0;

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

function TutorialLoading() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="mx-auto grid min-h-screen max-w-[1720px] lg:grid-cols-[264px_minmax(0,1fr)]">
        <aside className="hidden border-r border-slate-200 bg-slate-50/80 p-5 lg:block dark:border-slate-800 dark:bg-slate-950">
          <div className="animate-pulse space-y-3">
            <div className="h-7 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-11 rounded-xl bg-slate-200/70 dark:bg-slate-900" />
            <div className="h-11 rounded-xl bg-slate-200/70 dark:bg-slate-900" />
          </div>
        </aside>

        <section className="min-w-0 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-[920px] animate-pulse space-y-6">
            <div className="h-10 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-72 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-64 rounded-[26px] bg-slate-100 dark:bg-slate-900" />
            <div className="h-8 w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-900" />
          </div>
        </section>
      </div>
    </main>
  );
}

function TutorialError({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <RefreshCw className="h-5 w-5" />
        </div>
        <h1 className="font-khmer mt-5 text-xl font-bold text-slate-900 dark:text-white">
          មិនអាចបង្ហាញមេរៀនបានទេ
        </h1>
        <p className="font-khmer mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          សូមព្យាយាមផ្ទុកទិន្នន័យម្តងទៀត។
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="font-khmer mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#002455] px-5 text-sm font-semibold text-white transition hover:bg-[#00346f]"
        >
          <RefreshCw className="h-4 w-4" />
          ព្យាយាមម្តងទៀត
        </button>
      </div>
    </main>
  );
}

function EmptyTutorial() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002455] dark:bg-blue-950/40 dark:text-blue-300">
          <BookOpen className="h-5 w-5" />
        </div>
        <h1 className="font-khmer mt-5 text-xl font-bold text-slate-900 dark:text-white">
          មិនទាន់មានមេរៀន
        </h1>
        <p className="font-khmer mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Tutorial នេះមិនទាន់មានមាតិកាសម្រាប់អានទេ។
        </p>
        <Link
          href={LESSONS_ROUTE}
          className="font-khmer mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ChevronLeft className="h-4 w-4" />
          ត្រឡប់ទៅបញ្ជីមេរៀន
        </Link>
      </div>
    </main>
  );
}

export default function TutorialDetail({ tutorialId }: { tutorialId: string }) {
  const { data, isLoading, error, refetch } =
    useGetTutorialByIdQuery(tutorialId);
  const { data: progressData, refetch: refetchProgress } =
    useGetTutorialProgressQuery(tutorialId);
  const [incrementView] = useIncrementTutorialViewMutation();
  const [completeLesson, { isLoading: isCompletingLesson }] =
    useCompleteTutorialLessonMutation();
  const countedTutorialRef = useRef<string | null>(null);

  const [activeLessonId, setActiveLessonId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completionError, setCompletionError] = useState("");

  const tutorial: TutorialDetailData | undefined = data?.data;

  useEffect(() => {
    if (!tutorial || countedTutorialRef.current === tutorialId) return;

    countedTutorialRef.current = tutorialId;
    void incrementView(tutorialId)
      .unwrap()
      .catch(() => {
        // Reading the tutorial must continue even when analytics is unavailable.
      });
  }, [incrementView, tutorial, tutorialId]);

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
  const isLastLesson = activeIndex === lessons.length - 1;
  const lessonBlocks = [...(activeLesson?.blocks ?? [])].sort(
    (first, second) =>
      Number(first.type.trim().toUpperCase() === "QUIZ") -
      Number(second.type.trim().toUpperCase() === "QUIZ"),
  );
  const tutorialProgress = progressData?.data;
  // The backend only tracks progress per top-level section — its schemas
  // (LessonProgressResponse, TutorialLessonProgressItemResponse) have no
  // subsectionId at all, and POSTing a subsection's own id to /complete
  // fails ("Unable to save lesson progress"). So sectionId here really is
  // the parent section, shared by every subsection under it.
  const completedLessonIds = useMemo(
    () =>
      new Set(
        tutorialProgress?.lessons
          .filter((lesson) => lesson.completed)
          .map((lesson) => lesson.sectionId) ?? [],
      ),
    [tutorialProgress?.lessons],
  );
  const activeLessonCompleted = completedLessonIds.has(
    activeLesson?.sectionId ?? "",
  );
  // Since completion is section-wide, only let it be marked once the
  // learner reaches the last part of that section — otherwise clicking
  // "finished" on the first of several subsections would misleadingly mark
  // the whole section (and every sibling subsection) done immediately.
  const canCompleteActiveLesson =
    !!activeLesson &&
    (!nextLesson || nextLesson.sectionId !== activeLesson.sectionId);

  async function markActiveLessonComplete() {
    if (!activeLesson || activeLessonCompleted || !canCompleteActiveLesson)
      return;

    setCompletionError("");

    try {
      await completeLesson({
        tutorialId,
        sectionId: activeLesson.sectionId,
      }).unwrap();
      void refetchProgress();
    } catch {
      setCompletionError(
        "Unable to save lesson progress. Please try again shortly.",
      );
    }
  }

  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [sidebarOpen]);

  function selectLesson(lessonId: string) {
    setActiveLessonId(lessonId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (isLoading) return <TutorialLoading />;
  if (error || !tutorial) return <TutorialError onRetry={() => refetch()} />;
  if (!activeLesson) return <EmptyTutorial />;

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        aria-label="បើកបញ្ជីមេរៀន"
        aria-expanded={sidebarOpen}
        className="fixed bottom-5 right-5 z-40 inline-flex h-11 items-center gap-2 rounded-full bg-[#002455] px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#00346f] lg:hidden"
      >
        <Menu className="h-4 w-4" />
        <span className="font-khmer">មេរៀន</span>
      </button>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="បិទបញ្ជីមេរៀន"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <div className="mx-auto grid min-h-screen max-w-[1720px] lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[286px] transform border-r border-slate-200 bg-slate-50/95 shadow-2xl transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:w-auto lg:translate-x-0 lg:shadow-none dark:border-slate-800 dark:bg-slate-950 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="បិទបញ្ជីមេរៀន"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="h-full overflow-y-auto overscroll-contain">
            <SidebarLeftLesson
              sections={sections}
              activeLessonId={activeLesson.id}
              completedLessonIds={completedLessonIds}
              onSelectLesson={selectLesson}
            />
          </div>
        </aside>

        <article className="min-w-0 bg-slate-50 dark:bg-slate-950">
          <div className="w-full px-5 py-7 sm:px-8 lg:px-12 lg:py-8">
            <section id="lesson-content" className="scroll-mt-28">
              <ScrollReveal>
                <header className="mb-6">
                  <h1 className="font-khmer text-[28px] font-bold leading-[1.45] text-blue-600 sm:text-[32px] dark:text-blue-400">
                    {activeLesson.title}
                  </h1>
                </header>
              </ScrollReveal>

              {lessonBlocks.length > 0 ? (
                <QuizResultsProvider
                  total={
                    lessonBlocks.filter(
                      (block) => block.type.trim().toUpperCase() === "QUIZ",
                    ).length
                  }
                  tutorialId={tutorial.id}
                  scope={
                    activeLesson.type === "SECTION" ? "SECTION" : "SUBSECTION"
                  }
                  scopeId={activeLesson.id}
                >
                  <div className="space-y-7 sm:space-y-8">
                    {lessonBlocks.map((block) => (
                      <ScrollReveal key={block.id}>
                        <div
                          id={getBlockAnchor(block.id)}
                          className="scroll-mt-32"
                        >
                          <LessonBlockRenderer block={block} />
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </QuizResultsProvider>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
                  <BookOpen className="mx-auto h-6 w-6 text-slate-300 dark:text-slate-600" />
                  <p className="font-khmer mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                    មេរៀននេះមិនទាន់មានមាតិកាទេ។
                  </p>
                </div>
              )}

              <CodingTaskLessonSection
                tutorialId={tutorial.id}
                lessonType={activeLesson.type}
                lessonId={activeLesson.id}
                isLastLesson={isLastLesson}
              />

              <nav
                aria-label="Lesson navigation"
                className="mt-12 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2 dark:border-slate-800"
              >
                {canCompleteActiveLesson && (
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => void markActiveLessonComplete()}
                      disabled={activeLessonCompleted || isCompletingLesson}
                      className="font-khmer inline-flex min-h-12 items-center justify-center rounded-xl bg-[#002455] px-4 text-sm font-semibold text-white transition hover:bg-[#00346f] disabled:cursor-not-allowed disabled:bg-emerald-600 disabled:opacity-80"
                    >
                      {activeLessonCompleted
                        ? "បានបញ្ចប់"
                        : isCompletingLesson
                          ? "កំពុងរក្សាទុក..."
                          : "សម្គាល់ថាបានបញ្ចប់"}
                    </button>
                    {completionError && (
                      <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">
                        {completionError}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex justify-start">
                  {previousLesson && (
                    <button
                      type="button"
                      onClick={() => selectLesson(previousLesson.id)}
                      className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
                    >
                      <ChevronLeft className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:-translate-x-0.5" />
                      <span className="font-khmer text-sm font-semibold text-[#002455] dark:text-white">
                        ថយក្រោយ
                      </span>
                    </button>
                  )}
                </div>

                <div className="flex justify-end">
                  {nextLesson && (
                    <button
                      type="button"
                      onClick={() => selectLesson(nextLesson.id)}
                      className="group inline-flex items-center gap-1.5 rounded-xl bg-primary-color px-4 py-2.5 text-white transition hover:opacity-90"
                    >
                      <span className="font-khmer text-sm font-semibold">
                        បន្ទាប់
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
                    </button>
                  )}
                </div>
              </nav>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}

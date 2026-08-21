"use client";

import { BookOpen, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import type { TutorialSection } from "@/types/tutorial-reader";

interface SidebarLeftLessonProps {
  sections: TutorialSection[];
  activeLessonId: string;
  completedLessonIds: Set<string>;
  onSelectLesson: (lessonId: string) => void;
}

export default function SidebarLeftLesson({
  sections,
  activeLessonId,
  completedLessonIds,
  onSelectLesson,
}: SidebarLeftLessonProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set(),
  );

  const sortedSections = [...sections].sort(
    (a, b) => a.orderIndex - b.orderIndex,
  );

  function toggleSection(sectionId: string, isOpen: boolean) {
    setOpenSections((previous) => {
      const next = new Set(previous);

      if (isOpen) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }

      return next;
    });

    // The active lesson opens by default, but the learner can still close it.
    // Removing a section from this set restores that helpful default state.
    setCollapsedSections((previous) => {
      const next = new Set(previous);

      if (isOpen) {
        next.add(sectionId);
      } else {
        next.delete(sectionId);
      }

      return next;
    });
  }

  return (
    <aside className="h-full bg-slate-50/80 dark:bg-slate-950">
      <div className="px-4 pb-8 pt-6">
        <div className="mb-5 flex items-center justify-between gap-3 px-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <BookOpen className="h-4 w-4 shrink-0 text-[#002455] dark:text-blue-300" />
            <h2 className="font-khmer text-sm font-bold text-[#002455] dark:text-white">
              មាតិកាមេរៀន
            </h2>
          </div>

          <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-slate-400 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            {sortedSections.length}
          </span>
        </div>

        <div className="space-y-2">
          {sortedSections.map((section) => {
            const subsections = [...(section.subsections ?? [])].sort(
              (a, b) => a.orderIndex - b.orderIndex,
            );

            const hasSubsections = subsections.length > 0;
            const isDirect =
              section.contentMode === "DIRECT" || !hasSubsections;
            const sectionActive = activeLessonId === section.id;
            // Progress is tracked per section only — a subsection has no
            // completion state of its own, so a completed section means
            // every subsection under it is done too.
            const sectionCompleted = completedLessonIds.has(section.id);
            const containsActiveLesson =
              sectionActive ||
              subsections.some(
                (subsection) => subsection.id === activeLessonId,
              );
            const isOpen =
              !collapsedSections.has(section.id) &&
              (openSections.has(section.id) || containsActiveLesson);

            return (
              <div key={section.id} className="rounded-2xl">
                <div className="flex items-center gap-1 rounded-2xl border border-transparent p-1 transition-colors has-[:focus-visible]:border-[#002455]/30">
                  <button
                    type="button"
                    onClick={() => {
                      if (isDirect) {
                        onSelectLesson(section.id);
                      } else {
                        toggleSection(section.id, isOpen);
                      }
                    }}
                    className={`group flex min-w-0 flex-1 items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/20 ${
                      sectionActive
                        ? "bg-[#002455] text-white shadow-md"
                        : containsActiveLesson
                          ? "bg-white text-[#002455] shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-blue-300 dark:ring-slate-800"
                          : "bg-white/40 text-slate-700 hover:bg-white hover:text-[#002455] dark:bg-slate-900/30 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span className="min-w-0 flex-1 whitespace-normal break-words font-khmer text-lg font-semibold leading-7">
                      {section.title}
                    </span>
                    {sectionCompleted && (
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                    )}
                  </button>

                  {hasSubsections && (
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id, isOpen)}
                      aria-label={
                        isOpen ? "Collapse section" : "Expand section"
                      }
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/20 ${
                        isOpen
                          ? "bg-blue-50 text-[#002455] dark:bg-blue-950/30 dark:text-blue-300"
                          : "text-slate-400 hover:bg-white hover:text-[#002455] dark:hover:bg-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>

                {hasSubsections && isOpen && (
                  <div className="relative ml-5 mt-1 border-l-2 border-blue-100 pl-3 dark:border-blue-900/50">
                    <div className="space-y-1 py-1">
                      {subsections.map((subsection) => {
                        const active = activeLessonId === subsection.id;
                        const subsectionCompleted = sectionCompleted;

                        return (
                          <button
                            key={subsection.id}
                            type="button"
                            onClick={() => onSelectLesson(subsection.id)}
                            className={`font-khmer group relative flex w-full items-start gap-2 rounded-xl px-3 py-2.5 text-left text-base leading-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/20 ${
                              active
                                ? "bg-blue-50 font-semibold text-[#002455] shadow-sm dark:bg-blue-950/25 dark:text-blue-300"
                                : "text-slate-500 hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                            }`}
                          >
                            {active && (
                              <span className="absolute -left-[18px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#002455] ring-4 ring-slate-50 dark:bg-blue-400 dark:ring-slate-950" />
                            )}

                            <span className="min-w-0 flex-1 whitespace-normal break-words">
                              {subsection.title}
                            </span>

                            {subsectionCompleted && (
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

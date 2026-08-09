"use client";

import { ChevronDown, ChevronRight, Layers3 } from "lucide-react";

import { useState } from "react";

import type { TutorialSection } from "@/types/tutorial-reader";

interface SidebarLeftLessonProps {
  sections: TutorialSection[];

  activeLessonId: string;

  onSelectLesson: (lessonId: string) => void;
}

export default function SidebarLeftLesson({
  sections,
  activeLessonId,
  onSelectLesson,
}: SidebarLeftLessonProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const sortedSections = [...sections].sort(
    (a, b) => a.orderIndex - b.orderIndex,
  );

  function toggleSection(sectionId: string) {
    setOpenSections((previous) => {
      const next = new Set(previous);

      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }

      return next;
    });
  }

  return (
    <aside className="h-full overflow-y-auto border-r border-slate-200 bg-[#f7f9fc] dark:border-slate-800 dark:bg-slate-950">
      <div className="p-4">
        <div className="mb-5 flex items-center gap-2 px-2">
          <Layers3 className="h-5 w-5 text-primary-color dark:text-blue-400" />

          <span className="font-khmer text-[18px] font-bold text-primary-color dark:text-white">
            មាតិកាមេរៀន
          </span>
        </div>

        <div className="space-y-2">
          {sortedSections.map((section, sectionIndex) => {
            const subsections = [...(section.subsections ?? [])].sort(
              (a, b) => a.orderIndex - b.orderIndex,
            );

            const hasSubsections = subsections.length > 0;

            const containsActiveLesson =
              section.id === activeLessonId ||
              subsections.some((subsection) => subsection.id === activeLessonId);

            const isOpen = openSections.has(section.id) || containsActiveLesson;

            /*
             * DIRECT sections behave like lessons themselves.
             */
            const isDirect =
              section.contentMode === "DIRECT" || !hasSubsections;

            const sectionActive = activeLessonId === section.id;

            return (
              <div key={section.id} className="overflow-hidden rounded-xl">
                {/* Section heading */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (isDirect) {
                        onSelectLesson(section.id);
                      } else {
                        toggleSection(section.id);
                      }
                    }}
                    className={`flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-3 text-left text-[18px] font-semibold leading-7 transition ${
                      sectionActive
                        ? "bg-[#002455] text-white shadow-sm"
                        : "text-primary-color hover:bg-slate-200/70 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="shrink-0 text-xs opacity-60">
                      {String(sectionIndex + 1).padStart(2, "0")}
                    </span>

                    <span className="font-khmer min-w-0 flex-1 truncate">
                      {section.title}
                    </span>
                  </button>

                  {hasSubsections && (
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 hover:text-primary-color dark:hover:bg-slate-800"
                      aria-label={
                        isOpen ? "Collapse section" : "Expand section"
                      }
                    >
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Dropdown lessons */}
                {hasSubsections && isOpen && (
                  <div className="mt-1 space-y-1 pb-2 pl-4">
                    {subsections.map((subsection, index) => {
                      const active = activeLessonId === subsection.id;

                      return (
                        <button
                          key={subsection.id}
                          type="button"
                          onClick={() => onSelectLesson(subsection.id)}
                          className={`font-khmer relative flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[17px] leading-7 transition ${
                            active
                              ? "bg-white font-semibold text-primary-color shadow-sm dark:bg-slate-800 dark:text-blue-400"
                              : "text-slate-700 hover:bg-white hover:text-primary-color dark:text-slate-300 dark:hover:bg-slate-800"
                          }`}
                        >
                          {active && (
                            <span className="absolute top-2 bottom-2 left-0 w-[3px] rounded-full bg-primary-color dark:bg-blue-400" />
                          )}

                          <span className="w-4 text-xs opacity-50">
                            {index + 1}.
                          </span>

                          <span className="line-clamp-2">
                            {subsection.title}
                          </span>
                        </button>
                      );
                    })}
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

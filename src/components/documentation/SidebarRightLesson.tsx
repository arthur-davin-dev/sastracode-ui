"use client";

import { useEffect, useMemo, useState } from "react";

import type { TutorialBlock } from "@/types/tutorial-reader";

interface SidebarRightLessonProps {
  blocks: TutorialBlock[];
}

function getBlockTitle(block: TutorialBlock): string {
  const data = block.data ?? {};
  const keys = ["title", "heading", "label", "name"];

  for (const key of keys) {
    const value = data[key];

    if (typeof value === "string" && value.trim()) {
      return value.replace(/<[^>]*>/g, "").trim();
    }
  }

  // Heading blocks commonly store their title in `text` or `content`.
  if (isHeadingBlock(block)) {
    for (const key of ["text", "content"]) {
      const value = data[key];
      if (typeof value === "string" && value.trim()) {
        return value.replace(/<[^>]*>/g, "").trim();
      }
    }
  }

  return "";
}

function isHeadingBlock(block: TutorialBlock) {
  const type = block.type.toUpperCase();

  return (
    type.includes("HEADING") ||
    type.includes("TITLE") ||
    type === "H1" ||
    type === "H2" ||
    type === "H3"
  );
}

export function getBlockAnchor(blockId: string) {
  return `lesson-block-${blockId}`;
}

export default function SidebarRightLesson({
  blocks,
}: SidebarRightLessonProps) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  const headings = useMemo(
    () =>
      [...blocks]
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((block) => ({
          id: getBlockAnchor(block.id),
          title: getBlockTitle(block),
        }))
        .filter((heading) => Boolean(heading.title)),
    [blocks],
  );

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (visible) {
          setActiveHeading(visible.target.id);
        }
      },
      {
        rootMargin: "-100px 0px -65% 0px",

        threshold: 0,
      },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="h-full border-l border-slate-200 bg-[#f8faff] px-5 py-7 text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
      <div className="sticky top-24">
        <h3 className="font-khmer mb-5 text-[16px] font-bold leading-6 text-primary-color dark:text-white">
          នៅក្នុងទំព័រនេះ
        </h3>

        <nav className="space-y-1">
          {headings.map((heading) => {
            const active = activeHeading === heading.id;

            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`font-khmer relative block rounded-r-lg px-4 py-2.5 text-[15px] leading-6 transition ${
                  active
                    ? "bg-white font-semibold text-primary-color shadow-sm dark:bg-slate-900 dark:text-blue-400"
                    : "text-slate-700 hover:bg-white hover:text-primary-color dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400"
                }`}
              >
                {active && (
                  <span className="absolute top-1 bottom-1 left-0 w-[3px] rounded-full bg-primary-color dark:bg-blue-400" />
                )}

                {heading.title}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

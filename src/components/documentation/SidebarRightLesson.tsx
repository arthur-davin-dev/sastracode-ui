"use client";

import { ListTree } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { TutorialBlock } from "@/types/tutorial-reader";

interface SidebarRightLessonProps {
  blocks: TutorialBlock[];
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

export function isHeadingBlock(block: TutorialBlock): boolean {
  const type = block.type.trim().toUpperCase();

  return (
    type === "HEADING" ||
    type === "TITLE" ||
    type === "H1" ||
    type === "H2" ||
    type === "H3" ||
    type === "H4"
  );
}

export function hasHeadingBlocks(blocks: TutorialBlock[]): boolean {
  return blocks.some(
    (block) => isHeadingBlock(block) && Boolean(getBlockTitle(block)),
  );
}

function getBlockTitle(block: TutorialBlock): string {
  if (!isHeadingBlock(block)) return "";

  const data = block.data ?? {};

  for (const key of ["title", "heading", "text", "content", "label", "name"]) {
    const value = data[key];

    if (typeof value === "string" && value.trim()) {
      return stripHtml(value);
    }
  }

  return "";
}

export function getBlockAnchor(blockId: string) {
  return `lesson-block-${blockId}`;
}

export default function SidebarRightLesson({
  blocks,
}: SidebarRightLessonProps) {
  const headings = useMemo(
    () =>
      [...blocks]
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .filter(isHeadingBlock)
        .map((block) => ({
          id: getBlockAnchor(block.id),
          title: getBlockTitle(block),
        }))
        .filter((heading) => heading.title.length > 0),
    [blocks],
  );

  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

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
        rootMargin: "-120px 0px -68% 0px",
        threshold: 0,
      },
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="px-5 py-8">
      <div className="sticky top-24">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <ListTree className="h-4 w-4 shrink-0 text-[#002455] dark:text-blue-300" />
            <h2 className="font-khmer truncate text-sm font-bold text-slate-900 dark:text-white">
              នៅក្នុងទំព័រនេះ
            </h2>
          </div>

          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {headings.length}
          </span>
        </div>

        <nav
          aria-label="Table of contents"
          className="relative border-l border-slate-200 dark:border-slate-800"
        >
          <div className="space-y-0.5 pl-4">
            {headings.map((heading, index) => {
              const active = activeHeading === heading.id;

              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  onClick={() => setActiveHeading(heading.id)}
                  className={`font-khmer group relative block rounded-lg px-2.5 py-2 text-[13.5px] leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/20 ${
                    active
                      ? "font-semibold text-[#002455] dark:text-blue-300"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  <span
                    className={`absolute -left-[18px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ring-4 ring-white transition dark:ring-slate-950 ${
                      active
                        ? "bg-[#002455] dark:bg-blue-400"
                        : "bg-slate-300 dark:bg-slate-700"
                    }`}
                  />

                  <span className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-[10px] font-bold tabular-nums text-slate-300 dark:text-slate-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{heading.title}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}

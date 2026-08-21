"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { trackTocGroups, lessonsById } from "@/lib/data/lessions";
import { TrackSlug } from "@/types/course";

export default function DocsSidebar({
  activeTrack,
  activeLessonId,
}: {
  activeTrack: TrackSlug;
  activeLessonId: string;
}) {
  const groups = trackTocGroups[activeTrack] || [];

  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({
    [activeLessonId]: true,
  });

  const toggleLessonDropdown = (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  return (
    // Removed "hidden md:flex" so it actually displays on mobile!
    <aside className="flex h-full w-full flex-col bg-[#F2F6FF] p-4 dark:bg-slate-900">
      
      {/* 1. LOGO HEADER */}
      <div className="mb-6 mt-2 flex justify-center">
        {/* <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Image 
            src="/images/sastra_code_logo.png" 
            alt="Logo"
            width={56}
            height={56}
            className="object-contain"
          />
        </div> */}
      </div>

      {/* 2. ACCORDION NAVIGATION */}
      <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-1">
        {groups.map((group) => (
          <div key={group.id} className="space-y-3">
            
            {/* Group Header */}
            <div className="flex items-center justify-between px-3 py-1 text-base font-bold text-[#002455] dark:text-slate-100">
              <span>{group.label}</span>
              <ChevronDown size={16} className="text-[#002455]/60 dark:text-slate-400" />
            </div>

            {/* Sub-lessons */}
            <div className="space-y-1.5">
              {group.items.map((item) => {
                const isActiveLesson = item.id === activeLessonId;
                const isDropdownOpen = !!expandedLessons[item.id];
                const detailedLessonData = lessonsById[item.id];
                const anchors = detailedLessonData?.pageAnchors || [];

                return (
                  <div key={item.id} className="space-y-1">
                    <div className="group relative flex w-full items-center">
                      <Link
                        href={item.href}
                        className={`flex-1 rounded-xl px-4 py-2.5 text-sm transition-all duration-150 text-left ${
                          isActiveLesson
                            ? "bg-[#002455] font-medium text-white shadow-md dark:bg-blue-600 dark:text-white"
                            : "text-slate-700 hover:bg-white/60 hover:text-[#002455] dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>

                      {anchors.length > 0 && (
                        <button
                          type="button"
                          onClick={(e) => toggleLessonDropdown(item.id, e)}
                          className={`absolute right-2 rounded-lg p-1 transition-colors ${
                            isActiveLesson 
                              ? "text-white hover:bg-white/20" 
                              : "text-slate-400 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800"
                          }`}
                        >
                          <ChevronRight 
                            size={16} 
                            className={`transform transition-transform duration-200 ${
                              isDropdownOpen ? "rotate-90" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Anchors Dropdown */}
                    {anchors.length > 0 && (
                      <div 
                        className={`space-y-1 pl-5 pr-1 transition-all duration-200 overflow-hidden ${
                          isDropdownOpen ? "max-h-64 opacity-100 py-1" : "max-h-0 opacity-0 pointer-events-none"
                        }`}
                      >
                        {anchors.map((anchor) => (
                          <a
                            key={anchor.id}
                            href={`#${anchor.id}`}
                            className={`block rounded-lg px-3 py-1.5 text-xs text-left transition-colors ${
                              anchor.active 
                                ? "font-semibold text-[#002455] bg-white/70 dark:bg-slate-800 dark:text-blue-400" 
                                : "text-slate-500 hover:text-[#002455] hover:bg-white/40 dark:text-slate-400 dark:hover:bg-slate-800/40 dark:hover:text-slate-200"
                            }`}
                          >
                            {anchor.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </nav>
    </aside>
  );
}

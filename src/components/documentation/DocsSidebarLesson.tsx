"use client";

import Link from "next/link";
import Image from "next/image";
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

  // State to track which sub-lesson ID dropdown is expanded
  // Initialized to keep the active lesson open by default
  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({
    [activeLessonId]: true,
  });

  const toggleLessonDropdown = (lessonId: string, e: React.MouseEvent) => {
    // Prevent navigating instantly if someone clicks exactly on the expansion logic area
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  return (
    <aside className="w-64 shrink-0 bg-[#F2F6FF] p-4 hidden md:flex flex-col h-screen">
      {/* 1. LOGO HEADER */}
      <div className="flex justify-center mb-6 mt-2">
        <div className="relative w-17 h-17 bg-white rounded-full flex items-center justify-center overflow-hidden border">
          <Image 
            src="/images/sastra_code_logo.png" 
            alt="Logo"
            width={70}
            height={70}
            className="object-contain"
          />
        </div>
      </div>

      {/* 2. MULTILEVEL ACCORDION NAVIGATION */}
      <nav className="flex-1 space-y-5 overflow-y-auto pr-1">
        {groups.map((group) => (
          <div key={group.id} className="space-y-3">
            
            {/* Main Course Group Title (Stays static as a header container) */}
            <div className="px-3 py-1 text-[18px] font-bold text-[#002455] flex items-center justify-between">
              <span>{group.label}</span>
              <ChevronDown size={16} className="text-[#002455]/60" />
            </div>

            {/* List of Sub-Lessons */}
            <div className="space-y-2">
              {group.items.map((item) => {
                const isActiveLesson = item.id === activeLessonId;
                const isDropdownOpen = !!expandedLessons[item.id];
                
                // Fetch the corresponding lesson data to get its nested anchors/headers
                const detailedLessonData = lessonsById[item.id];
                const anchors = detailedLessonData?.pageAnchors || [];

                return (
                  <div key={item.id} className="space-y-1">
                    
                    {/* Sub-Lesson Row Control Container */}
                    <div className="flex items-center w-full group relative">
                      {/* Clicking the main link handles normal navigation */}
                      <Link
                        href={item.href}
                        className={`flex-1 px-4 py-2.5 text-[16px] transition-all duration-150 text-left rounded-[16px] ${
                          isActiveLesson
                            ? "bg-[#002455] text-white font-medium shadow-md shadow-[#002455]/10"
                            : "text-slate-700 hover:text-[#002455] hover:bg-white/60"
                        }`}
                      >
                        {item.label}
                      </Link>

                      {/* Dropdown Toggle Icon Trigger (Clickable area to reveal dynamic sub-contents) */}
                      {anchors.length > 0 && (
                        <button
                          type="button"
                          onClick={(e) => toggleLessonDropdown(item.id, e)}
                          className={`absolute right-2 p-1 rounded-[16px] transition-colors ${
                            isActiveLesson 
                              ? "text-white hover:bg-white/20" 
                              : "text-slate-400 hover:bg-slate-200"
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

                    {/* Third-Level Dropdown: Displays nested headings inside this exact lesson */}
                    {anchors.length > 0 && (
                      <div 
                        className={`pl-6 pr-2 space-y-1 transition-all duration-200 overflow-hidden ${
                          isDropdownOpen ? "max-h-64 opacity-100 py-1" : "max-h-0 opacity-0 pointer-events-none"
                        }`}
                      >
                        {anchors.map((anchor) => (
                          <a
                            key={anchor.id}
                            href={`#${anchor.id}`}
                            className={`block px-4 py-2 text-[16px] rounded-xl transition-all text-left ${
                              anchor.active 
                                ? "text-[#002455] font-semibold bg-white/50" 
                                : "text-slate-500 hover:text-[#002455] hover:bg-white/30"
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
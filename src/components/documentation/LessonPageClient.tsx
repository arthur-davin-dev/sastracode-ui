"use client";

import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import DocsSidebar from "@/components/documentation/DocsSidebarLesson";
import DocsToc from "@/components/documentation/DocsTocLesson";
import HeroLesson from "@/components/documentation/HeroLesson";
import LearningGoals from "@/components/documentation/LearningGoals";
import VideoCard from "@/components/documentation/VideoCard";
import QuickQuiz from "@/components/documentation/QuickQuiz";
import LessonFooterNav from "@/components/documentation/LessonFooterNav";
import Backbutton from "@/components/documentation/Backbutton";
import { CodeExample } from "@/components/documentation/CodeExample";
import { KeyPoint } from "@/components/documentation/KeyPoint";

interface LessonPageClientProps {
  lesson: any;
}

export default function LessonPageClient({ lesson }: LessonPageClientProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!lesson) return null;

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* ========================================================== */}
      {/* MOBILE TOP BAR (W3Schools Style Nav Strip)                 */}
      {/* ========================================================== */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-slate-900 px-4 py-2.5 text-white md:hidden dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-medium hover:bg-slate-700 active:scale-95 transition-all"
        >
          {mobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          <span>{mobileSidebarOpen ? "បិទ" : "មេរៀន"}</span>
        </button>

        <div className="text-sm font-semibold truncate max-w-[180px]">
          {lesson.title || "មេរៀន"}
        </div>

        <Backbutton />
      </div>

      <div className="flex min-h-[calc(100vh-48px)]">
        
        {/* ========================================================== */}
        {/* 1. DESKTOP SIDEBAR (Static Left)                           */}
        {/* ========================================================== */}
        <div className="hidden md:block sticky top-0 h-screen shrink-0 border-r border-slate-200 dark:border-slate-800">
          <DocsSidebar activeTrack={lesson.trackSlug} activeLessonId={lesson.id} />
        </div>

        {/* ========================================================== */}
        {/* 2. MOBILE PARTIAL OVERLAY SIDEBAR (W3Schools-style Slide)  */}
        {/* ========================================================== */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden top-[53px]">
            {/* Left Sliding Menu Panel (Width ~ 75% like W3Schools) */}
            <div className="relative w-[78%] max-w-[300px] h-full bg-[#F2F6FF] dark:bg-slate-900 shadow-2xl border-r border-slate-200 dark:border-slate-800 overflow-y-auto z-10 transition-transform duration-300">
              <DocsSidebar activeTrack={lesson.trackSlug} activeLessonId={lesson.id} />
            </div>

            {/* Backdrop / Dimmed Area over rest of content */}
            <div 
              className="flex-1 bg-black/40 backdrop-blur-[2px] transition-opacity" 
              onClick={() => setMobileSidebarOpen(false)}
            />
          </div>
        )}

        {/* ========================================================== */}
        {/* 3. CENTER MAIN CONTENT AREA                                */}
        {/* ========================================================== */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 lg:px-8 xl:px-12 max-w-5xl mx-auto space-y-8">
          
          <div className="hidden md:block">
            <Backbutton />
          </div>
          
          <HeroLesson lesson={lesson} />
          <LearningGoals objectives={lesson.objectives} />
          <KeyPoint summary={lesson.summary} />
          <CodeExample filename={lesson.codeFilename} code={lesson.code} />
          <VideoCard instructor={lesson.instructor} />
          <QuickQuiz quiz={lesson.quiz} />
          <LessonFooterNav lesson={lesson} />
        </main>

        {/* ========================================================== */}
        {/* 4. RIGHT TABLE OF CONTENTS                                 */}
        {/* ========================================================== */}
        {lesson.pageAnchors && lesson.pageAnchors.length > 0 && (
          <div className="hidden lg:block sticky top-0 h-screen w-64 shrink-0 p-6 border-l border-slate-200 dark:border-slate-800 overflow-y-auto">
            <DocsToc anchors={lesson.pageAnchors} />
          </div>
        )}

      </div>
    </div>
  );
}
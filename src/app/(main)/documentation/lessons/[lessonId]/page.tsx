import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import DocsSidebar from "@/components/documentation/DocsSidebarLesson";
import DocsToc from "@/components/documentation/DocsTocLesson";
import HeroLesson from "@/components/documentation/HeroLesson";
import LearningGoals from "@/components/documentation/LearningGoals";
import KeyPoint from "@/components/documentation/KeyPoint";
import CodeExample from "@/components/documentation/CodeExample";
import TipsSection from "@/components/documentation/TipsSection";
import VideoCard from "@/components/documentation/VideoCard";
import QuickQuiz from "@/components/documentation/QuickQuiz";
import LessonFooterNav from "@/components/documentation/LessonFooterNav";
import { getLessonById, trackTabs } from "@/lib/data/lessions";
import Quiz from "@/components/quiz/Quiz";
import Backbutton from "@/components/documentation/Backbutton";
export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-[#F5F6F8] text-[#1A1A1A]" style={{ fontSize: 18 }}>
      <DocsSidebar activeTrack={lesson.trackSlug} activeLessonId={lesson.id} />
      
      <main className="flex-1 max-w-5xl mx-auto py-5 px-4">
        
        {/* 1. HORIZONTAL TRACK NAVIGATION TABS (PLACED AT THE VERY TOP) */}
        {/* <div className="flex items-center gap-8 mb-8 flex-wrap px-2  border-gray-200 ">
          {trackTabs.map((tab) => {
            const isActive = tab.slug === lesson.trackSlug;
            return (
              <Link
                key={tab.slug}
                href={tab.href}
                className={`text-sm font-extrabold tracking-wider uppercase transition-all duration-150 ${
                  isActive
                    ? "bg-[#002455] text-white px-5 py-2 rounded-full shadow-sm"
                    : "text-slate-500 hover:text-[#002455] py-2"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div> */}
        <Backbutton/>
        <HeroLesson lesson={lesson} />
      
        <LearningGoals objectives={lesson.objectives} />
        <KeyPoint summary={lesson.summary} />
        <CodeExample filename={lesson.codeFilename} code={lesson.code} />
        {/* <TipsSection tips={lesson.tips} /> */}
        <VideoCard instructor={lesson.instructor} />
        <QuickQuiz quiz={lesson.quiz} />
        <LessonFooterNav lesson={lesson} />
      </main>
      <DocsToc anchors={lesson.pageAnchors} />
    </div>
  );
}

import { notFound } from "next/navigation";
import DocsSidebar from "@/components/documentation/DocsSidebarLesson";
import DocsToc from "@/components/documentation/DocsTocLesson";
import HeroLesson from "@/components/documentation/HeroLesson";
import LearningGoals from "@/components/documentation/LearningGoals";
import VideoCard from "@/components/documentation/VideoCard";
import QuickQuiz from "@/components/documentation/QuickQuiz";
import LessonFooterNav from "@/components/documentation/LessonFooterNav";
import Backbutton from "@/components/documentation/Backbutton";
import { getLessonById } from "@/lib/data/lessions";
import { CodeExample } from "@/components/documentation/CodeExample";
import { KeyPoint } from "@/components/documentation/KeyPoint";

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
    <div className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 text-lg transition-colors duration-300">
      {/* Left Navigation Sidebar */}
      <DocsSidebar activeTrack={lesson.trackSlug} activeLessonId={lesson.id} />

      {/* Center Main Content */}
      <main className="flex-1 min-w-0 max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
        <Backbutton />
        
        <HeroLesson lesson={lesson} />
        <LearningGoals objectives={lesson.objectives} />
        <KeyPoint summary={lesson.summary} />
        <CodeExample filename={lesson.codeFilename} code={lesson.code} />
        {/* <TipsSection tips={lesson.tips} /> */}
        <VideoCard instructor={lesson.instructor} />
        <QuickQuiz quiz={lesson.quiz} />
        <LessonFooterNav lesson={lesson} />
      </main>

      {/* Right Table of Contents */}
      <DocsToc anchors={lesson.pageAnchors} />
    </div>
  );
}
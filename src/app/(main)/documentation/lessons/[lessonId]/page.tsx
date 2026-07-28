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
import { getLessonById } from "@/lib/data/lessions";

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

      <main className="flex-1 max-w-3xl mx-auto py-8 px-4">
        <Link href="/documentation" className="flex items-center gap-1 text-sm text-gray-500 mb-4 w-fit">
          <ChevronLeft size={16} /> ត្រឡប់ក្រោយ
        </Link>

        <HeroLesson lesson={lesson} />
        <LearningGoals objectives={lesson.objectives} />
        <KeyPoint summary={lesson.summary} />
        <CodeExample filename={lesson.codeFilename} code={lesson.code} />
        <TipsSection tips={lesson.tips} />
        <VideoCard instructor={lesson.instructor} />
        <QuickQuiz quiz={lesson.quiz} />
        <LessonFooterNav lesson={lesson} />
      </main>

      <DocsToc anchors={lesson.pageAnchors} />
    </div>
  );
}

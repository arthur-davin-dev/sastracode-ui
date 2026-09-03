"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { VideoPlayer } from "./VideoPlayer";
import { LessonHeader } from "./LessonHeader";
import { QASection } from "./qa/QASection";
import { CourseContentSidebar } from "./CourseContentSidebar";
import { UpNextCard } from "./UpNextCard";
import {
  defaultSections,
  getTotalLessons,
  buildSectionsFromCurriculum,
  findLessonById,
} from "@/lib/videoplayer/videoplayer";
import { Course } from "@/lib/course/courses";
import { toKhmerNumerals } from "@/lib/khmer-numerals";
import { useLanguage } from "@/lib/language-context";
import { useTranslation } from "@/hooks/useTranslations";

interface LessonPlayerPageProps {
  course: Course;
  lessonId: string;
}

const fallbackVideoUrl =
  "https://youtu.be/6Gwxa9_qjJw?si=2ln0xHCwZu_khIqq";

export default function LessonPlayerPage({
  course,
  lessonId,
}: LessonPlayerPageProps) {
  const [autoplay, setAutoplay] = useState(true);
  const router = useRouter();
  const t = useTranslation();
  const { lang } = useLanguage();

  const num = (value: string | number) =>
    lang === "km" ? toKhmerNumerals(value) : String(value);
  const lessonPositionLabel = (index: number, total: number) =>
    `${t.lessonPlayer.positionPrefix} ${num(index)} ${t.lessonPlayer.positionMiddle} ${num(total)}`;

  const chapters = course.curriculum ?? [];
  const found = findLessonById(chapters, lessonId);

  const rawSections =
    chapters.length > 0
      ? buildSectionsFromCurriculum(chapters, lessonId)
      : defaultSections;

  const sections = rawSections.map((section) => ({
    ...section,
    lessons: section.lessons.map((lesson) => ({
      ...lesson,
      status:
        lesson.id === lessonId
          ? ("current" as const)
          : lesson.status === "current"
            ? ("upcoming" as const)
            : lesson.status,
    })),
  }));

  const totalLessons = getTotalLessons(sections);
  const sectionLesson = sections
    .flatMap((section) =>
      section.lessons.map((lesson) => ({ lesson, section })),
    )
    .find(({ lesson }) => lesson.id === lessonId);

  const lessonTitle =
    found?.lesson.title ??
    sectionLesson?.lesson.title.replace(/^\d+\.\s*/, "") ??
    t.lessonPlayer.lessonFallback;
  const sectionLabel =
    found?.chapter.title ??
    sectionLesson?.section.title ??
    t.lessonPlayer.chapterFallback;
  const levelLabel = course.level
    ? t.courses.card.level[course.level]
    : t.courses.card.level.BEGINNER;

  // find the lesson's position (e.g. "Lesson 6 of 12") across all chapters
  const flatLessons =
    chapters.length > 0
      ? chapters.flatMap((chapter) => chapter.lessons)
      : sections.flatMap((section) => section.lessons);
  const lessonIndex = flatLessons.findIndex((l) => l.id === lessonId);
  const nextLesson =
    lessonIndex >= 0 ? flatLessons[lessonIndex + 1] : undefined;
  const nextLessonHref = nextLesson
    ? `/courses/${course.slug || course.id}/learn/${nextLesson.id}`
    : undefined;

  // Autoplay: when the current video ends and the toggle is on, advance to the
  // next lesson. `autoplay` is read at call time so toggling it mid-video works.
  const handleVideoEnded = () => {
    if (autoplay && nextLessonHref) {
      router.push(nextLessonHref);
    }
  };

  const lessonPosition =
    lessonIndex >= 0
      ? lessonPositionLabel(lessonIndex + 1, flatLessons.length)
      : lessonPositionLabel(1, Math.max(flatLessons.length, 1));
  const nextLessonPosition = nextLesson
    ? lessonPositionLabel(lessonIndex + 2, flatLessons.length)
    : lessonPosition;

  return (
    <div className="min-h-screen bg-slate-50 py-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          {/* Main Video & Discussion Section */}
          <div className="space-y-6">
            <VideoPlayer
              src={found?.lesson.videoUrl ?? fallbackVideoUrl}
              poster={course.image}
              title={lessonTitle}
              autoplay={autoplay}
              onEnded={handleVideoEnded}
            />

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
              <LessonHeader
                videoId={lessonId}
                courseId={course.id}
                title={lessonTitle}
                sectionLabel={sectionLabel}
                lessonPosition={lessonPosition}
                level={levelLabel}
              />
            </div>

            <Suspense fallback={null}>
              <QASection videoId={lessonId} />
            </Suspense>
          </div>

          {/* Right Sidebar Section */}
          <div className="space-y-6">
            <CourseContentSidebar
              sections={sections}
              totalLessons={totalLessons}
              courseId={course.id}
              courseSlug={course.slug || course.id}
            />
            <UpNextCard
              thumbnail={course.image}
              title={
                nextLesson?.title.replace(/^\d+\.\s*/, "") ?? lessonTitle
              }
              description={course.description}
              lessonPosition={nextLessonPosition}
              duration={nextLesson?.duration ?? "10:00"}
              autoplay={autoplay}
              onAutoplayChange={setAutoplay}
              href={nextLessonHref}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

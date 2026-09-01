"use client";

import { useState } from "react";
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

interface LessonPlayerPageProps {
  course: Course;
  lessonId: string;
}

const fallbackVideoUrl =
  "https://youtu.be/6Gwxa9_qjJw?si=2ln0xHCwZu_khIqq";

const LEVEL_LABELS_KM: Record<string, string> = {
  BEGINNER: "កម្រិតដំបូង",
  INTERMEDIATE: "កម្រិតមធ្យម",
  ADVANCED: "កម្រិតខ្ពស់",
};

function lessonPositionLabel(index: number, total: number) {
  return `មេរៀនទី ${toKhmerNumerals(index)} ក្នុងចំណោម ${toKhmerNumerals(total)}`;
}

export default function LessonPlayerPage({
  course,
  lessonId,
}: LessonPlayerPageProps) {
  const [autoplay, setAutoplay] = useState(true);

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
    "មេរៀន";
  const sectionLabel =
    found?.chapter.title ?? sectionLesson?.section.title ?? "ជំពូក";
  const levelLabel = LEVEL_LABELS_KM[course.level ?? ""] ?? "កម្រិតដំបូង";

  // find the lesson's position (e.g. "មេរៀនទី ៦ ក្នុងចំណោម ១២") across all chapters
  const flatLessons =
    chapters.length > 0
      ? chapters.flatMap((chapter) => chapter.lessons)
      : sections.flatMap((section) => section.lessons);
  const lessonIndex = flatLessons.findIndex((l) => l.id === lessonId);
  const nextLesson =
    lessonIndex >= 0 ? flatLessons[lessonIndex + 1] : undefined;
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
            />

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
              <LessonHeader
                videoId={lessonId}
                courseId={course.id}
                title={lessonTitle}
                sectionLabel={sectionLabel}
                lessonPosition={lessonPosition}
                level={levelLabel}
                likeCount={128}
              />
            </div>

            <QASection videoId={lessonId} />
          </div>

          {/* Right Sidebar Section */}
          <div className="space-y-6">
            <CourseContentSidebar
              sections={sections}
              totalLessons={totalLessons}
              courseId={course.id}
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
              href={
                nextLesson
                  ? `/courses/${course.id}/learn/${nextLesson.id}`
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

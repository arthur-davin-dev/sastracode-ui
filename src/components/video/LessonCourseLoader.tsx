"use client";

import Link from "next/link";
import { AlertCircle, BookOpen, LockKeyhole } from "lucide-react";
import LessonPlayerPage from "./LessonPlayerPage";
import { useTranslation } from "@/hooks/useTranslations";
import {
  mapApiCourseToCourse,
  mergeCourseSections,
} from "@/lib/course/course-adapter";
import {
  useGetCourseBySlugQuery,
  useGetCourseSectionsQuery,
} from "@/redux/api/course-api";

interface LessonCourseLoaderProps {
  slug: string;
  lessonId: string;
}

interface LessonStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  action: string;
}

function LessonState({ icon, title, description, href, action }: LessonStateProps) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 py-20 dark:bg-slate-950">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-color/10 text-primary-color dark:bg-primary-color/15">
          {icon}
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">
          {title}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
        <Link
          href={href}
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-color px-6 text-sm font-semibold text-white transition hover:bg-primary-color/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-color"
        >
          {action}
        </Link>
      </div>
    </main>
  );
}

export default function LessonCourseLoader({
  slug,
  lessonId,
}: LessonCourseLoaderProps) {
  const t = useTranslation();
  const states = t.lessonPlayer.states;
  const courseQuery = useGetCourseBySlugQuery(slug);
  const embeddedSections = courseQuery.data?.sections;
  // Sections are still fetched by the course's real UUID (backend
  // /v1/courses/{courseId}/sections is unchanged).
  const sectionsQuery = useGetCourseSectionsQuery(courseQuery.data?.id ?? "", {
    skip:
      !courseQuery.data ||
      (courseQuery.data.accessType === "PRIVATE" &&
        courseQuery.data.hasFullAccess !== true),
  });

  const isLoading =
    courseQuery.isLoading ||
    (sectionsQuery.isLoading && !embeddedSections?.length);

  if (isLoading) {
    return (
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-20">
        <div className="aspect-video animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="mt-6 h-40 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  if (courseQuery.error || !courseQuery.data) {
    return (
      <LessonState
        icon={<AlertCircle className="h-7 w-7" />}
        title={states.courseErrorTitle}
        description={states.courseErrorDescription}
        href={`/courses/${slug}`}
        action={states.backToCourse}
      />
    );
  }

  const availableSections = sectionsQuery.data ?? embeddedSections;

  if (sectionsQuery.error && !availableSections?.length) {
    return (
      <LessonState
        icon={<AlertCircle className="h-7 w-7" />}
        title={states.contentErrorTitle}
        description={states.contentErrorDescription}
        href={`/courses/${slug}`}
        action={states.viewCourseInfo}
      />
    );
  }

  const merged = mergeCourseSections(courseQuery.data, availableSections);

  if (merged.accessType === "PRIVATE" && merged.hasFullAccess !== true) {
    return (
      <LessonState
        icon={<LockKeyhole className="h-7 w-7" />}
        title={states.noAccessTitle}
        description={states.noAccessDescription}
        href="/courses/private-courses"
        action={states.viewMyPrivateCourses}
      />
    );
  }

  const course = mapApiCourseToCourse(merged);
  const lesson = course.curriculum
    ?.flatMap((chapter) => chapter.lessons)
    .find((item) => item.id === lessonId);

  if (!lesson) {
    return (
      <LessonState
        icon={<BookOpen className="h-7 w-7" />}
        title={states.lessonNotFoundTitle}
        description={states.lessonNotFoundDescription}
        href={`/courses/${slug}`}
        action={states.viewCurriculum}
      />
    );
  }

  if (lesson.locked) {
    return (
      <LessonState
        icon={<LockKeyhole className="h-7 w-7" />}
        title={states.lockedTitle}
        description={states.lockedDescription}
        href={`/courses/${slug}`}
        action={states.viewEnrollInfo}
      />
    );
  }

  return <LessonPlayerPage course={course} lessonId={lessonId} />;
}

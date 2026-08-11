"use client";

import Link from "next/link";
import { AlertCircle, BookOpen, LockKeyhole } from "lucide-react";
import LessonPlayerPage from "./LessonPlayerPage";
import {
  mapApiCourseToCourse,
  mergeCourseSections,
} from "@/lib/course/course-adapter";
import {
  useGetCourseByIdQuery,
  useGetCourseSectionsQuery,
} from "@/redux/api/course-api";

interface LessonCourseLoaderProps {
  courseId: string;
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
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#002455] dark:bg-blue-950/50 dark:text-blue-300">
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
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#002455] px-6 text-sm font-semibold text-white transition hover:bg-[#003b80] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002455]"
        >
          {action}
        </Link>
      </div>
    </main>
  );
}

export default function LessonCourseLoader({
  courseId,
  lessonId,
}: LessonCourseLoaderProps) {
  const courseQuery = useGetCourseByIdQuery(courseId);
  const embeddedSections = courseQuery.data?.sections;
  const sectionsQuery = useGetCourseSectionsQuery(courseId, {
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
        title="មិនអាចបើកវគ្គសិក្សាបាន"
        description="សូមពិនិត្យការតភ្ជាប់របស់អ្នក ឬសាកល្បងម្ដងទៀតនៅពេលក្រោយ។"
        href={`/courses/${courseId}`}
        action="ត្រឡប់ទៅវគ្គសិក្សា"
      />
    );
  }

  const availableSections = sectionsQuery.data ?? embeddedSections;

  if (sectionsQuery.error && !availableSections?.length) {
    return (
      <LessonState
        icon={<AlertCircle className="h-7 w-7" />}
        title="មិនអាចទាញយកមាតិកាមេរៀនបាន"
        description="មាតិកាវគ្គសិក្សាមិនទាន់អាចប្រើបានទេ។ សូមសាកល្បងម្ដងទៀត។"
        href={`/courses/${courseId}`}
        action="មើលព័ត៌មានវគ្គសិក្សា"
      />
    );
  }

  const merged = mergeCourseSections(courseQuery.data, availableSections);

  if (merged.accessType === "PRIVATE" && merged.hasFullAccess !== true) {
    return (
      <LessonState
        icon={<LockKeyhole className="h-7 w-7" />}
        title="អ្នកមិនទាន់មានសិទ្ធិចូលរៀនវគ្គនេះ"
        description="វគ្គសិក្សាឯកជននេះត្រូវការការអនុញ្ញាត មុនពេលអ្នកអាចមើលមេរៀនបាន។"
        href="/courses/private-courses"
        action="មើលវគ្គឯកជនរបស់ខ្ញុំ"
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
        title="រកមិនឃើញមេរៀននេះ"
        description="មេរៀនអាចត្រូវបានផ្លាស់ទី ឬដកចេញពីវគ្គសិក្សានេះ។"
        href={`/courses/${courseId}`}
        action="មើលមាតិកាវគ្គសិក្សា"
      />
    );
  }

  if (lesson.locked) {
    return (
      <LessonState
        icon={<LockKeyhole className="h-7 w-7" />}
        title="មេរៀននេះត្រូវបានចាក់សោ"
        description="សូមចុះឈ្មោះក្នុងវគ្គសិក្សា ដើម្បីទទួលបានសិទ្ធិមើលមេរៀនពេញលេញ។"
        href={`/courses/${courseId}`}
        action="មើលព័ត៌មានចុះឈ្មោះ"
      />
    );
  }

  return <LessonPlayerPage course={course} lessonId={lessonId} />;
}

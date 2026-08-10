"use client";

import Link from "next/link";
import LessonPlayerPage from "./LessonPlayerPage";
import { mapApiCourseToCourse, mergeCourseSections } from "@/lib/course/course-adapter";
import { useGetCourseByIdQuery, useGetCourseSectionsQuery } from "@/redux/api/course-api";

interface LessonCourseLoaderProps {
  courseId: string;
  lessonId: string;
}

export default function LessonCourseLoader({ courseId, lessonId }: LessonCourseLoaderProps) {
  const courseQuery = useGetCourseByIdQuery(courseId);
  const sectionsQuery = useGetCourseSectionsQuery(courseId, {
    skip:
      !courseQuery.data ||
      (courseQuery.data.accessType === "PRIVATE" &&
        courseQuery.data.hasFullAccess !== true),
  });

  console.log("SECTION VIDEO RESPONSE:", sectionsQuery.data);

  if (courseQuery.isLoading || sectionsQuery.isLoading) {
    return <div className="mx-auto min-h-screen max-w-7xl px-6 py-20"><div className="h-96 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" /></div>;
  }

  if (courseQuery.error || sectionsQuery.error || !courseQuery.data) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">មិនអាចបើកមេរៀនបាន</h1>
        <p className="mt-2 text-slate-500">សូមពិនិត្យសិទ្ធិចូលប្រើ ឬព្យាយាមម្ដងទៀត។</p>
        <Link href={`/courses/${courseId}`} className="mt-6 inline-block rounded-xl bg-[#002455] px-5 py-3 text-sm font-semibold text-white">ត្រឡប់ទៅវគ្គសិក្សា</Link>
      </div>
    );
  }

  const merged = mergeCourseSections(courseQuery.data, sectionsQuery.data ?? courseQuery.data.sections);
  if (merged.accessType === "PRIVATE" && merged.hasFullAccess !== true) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">មិនមានសិទ្ធិចូលវគ្គ PRIVATE</h1>
        <Link href="/courses/private-courses" className="mt-6 inline-block rounded-xl bg-[#002455] px-5 py-3 text-sm font-semibold text-white">វគ្គឯកជនរបស់ខ្ញុំ</Link>
      </div>
    );
  }

  const course = mapApiCourseToCourse(merged);
  const lesson = course.curriculum?.flatMap((chapter) => chapter.lessons).find((item) => item.id === lessonId);
  if (!lesson || lesson.locked) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">មេរៀននេះមិនអាចបើកបាន</h1>
        <p className="mt-2 text-slate-500">មេរៀនអាចត្រូវការចុះឈ្មោះ ឬសិទ្ធិពេញលេញ។</p>
        <Link href={`/courses/${courseId}`} className="mt-6 inline-block rounded-xl bg-[#002455] px-5 py-3 text-sm font-semibold text-white">មើលមាតិកាវគ្គ</Link>
      </div>
    );
  }

  return <LessonPlayerPage course={course} lessonId={lessonId} />;
}

"use client";

import Link from "next/link";
import EnrollmentPage from "./EnrollmentPage";
import { mapApiCourseToCourse, mergeCourseSections } from "@/lib/course/course-adapter";
import { useGetCourseByIdQuery, useGetCourseSectionsQuery } from "@/redux/api/course-api";

export default function EnrollmentCourseLoader({ courseId }: { courseId: string }) {
  const courseQuery = useGetCourseByIdQuery(courseId);
  const sectionsQuery = useGetCourseSectionsQuery(courseId, {
    skip:
      !courseQuery.data ||
      (courseQuery.data.accessType === "PRIVATE" &&
        courseQuery.data.hasFullAccess !== true),
  });

  if (courseQuery.isLoading || sectionsQuery.isLoading) {
    return <div className="mx-auto min-h-screen max-w-6xl px-6 py-16"><div className="h-96 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" /></div>;
  }

  if (courseQuery.error || !courseQuery.data) {
    return <div className="mx-auto min-h-[60vh] max-w-xl px-6 py-20 text-center"><h1 className="text-2xl font-bold">រកមិនឃើញវគ្គសិក្សា</h1><Link href="/courses" className="mt-6 inline-block rounded-xl bg-[#002455] px-5 py-3 text-white">ត្រឡប់ទៅវគ្គសិក្សា</Link></div>;
  }

  const raw = mergeCourseSections(courseQuery.data, sectionsQuery.data ?? courseQuery.data.sections);
  if (raw.accessType === "PRIVATE" && raw.hasFullAccess !== true) {
    return <div className="mx-auto min-h-[60vh] max-w-xl px-6 py-20 text-center"><h1 className="text-2xl font-bold">វគ្គ PRIVATE ត្រូវការសិទ្ធិ</h1><Link href="/courses/private-courses" className="mt-6 inline-block rounded-xl bg-[#002455] px-5 py-3 text-white">វគ្គឯកជនរបស់ខ្ញុំ</Link></div>;
  }

  return <EnrollmentPage course={mapApiCourseToCourse(raw)} enrollmentHistory={[]} />;
}

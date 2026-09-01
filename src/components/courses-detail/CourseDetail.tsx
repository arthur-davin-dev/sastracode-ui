"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import { DetailBanner } from "./DetailBanner";
import { InstructorBar } from "./InstroctorBar";
import { WhatYouLearn } from "./WhatYouLearn";
import { CurriculumSection } from "./CurriculumSection";
import { PurchaseCard } from "./PurchaseCard";
import { RelatedCourses } from "./RelatedCourses";
import { mapApiCourseToCourse, mergeCourseSections } from "@/lib/course/course-adapter";
import {
  useGetCourseBySlugQuery,
  useGetCourseSectionsQuery,
  useGetPublicCoursesQuery,
} from "@/redux/api/course-api";

interface CourseDetailPageProps {
  slug: string;
}

export default function CourseDetailPage({ slug }: CourseDetailPageProps) {
  const courseQuery = useGetCourseBySlugQuery(slug);
  // Sections are still fetched by the course's real UUID (backend
  // /v1/courses/{courseId}/sections is unchanged), which only exists once
  // the by-slug lookup above has resolved.
  const sectionsQuery = useGetCourseSectionsQuery(courseQuery.data?.id ?? "", {
    skip:
      !courseQuery.data ||
      (courseQuery.data.accessType === "PRIVATE" &&
        courseQuery.data.hasFullAccess !== true),
  });
  const relatedQuery = useGetPublicCoursesQuery({ sort: "NEWEST" });

  if (courseQuery.isLoading) {
    return (
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <div className="h-72 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  if (courseQuery.error || !courseQuery.data) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">រកមិនឃើញវគ្គសិក្សា</h1>
        <p className="mt-2 text-slate-500">មិនអាចទាញយកព័ត៌មានវគ្គសិក្សាពី API បាន។</p>
        <Link href="/courses" className="mt-6 inline-block rounded-xl bg-[#002455] px-5 py-3 text-sm font-semibold text-white">ត្រឡប់ទៅវគ្គសិក្សា</Link>
      </div>
    );
  }

  const rawCourse = mergeCourseSections(courseQuery.data, sectionsQuery.data ?? courseQuery.data.sections);

  // PRIVATE courses are never listed in the public catalog. A direct URL only
  // renders learning content when the backend says this user has full access.
  if (rawCourse.accessType === "PRIVATE" && rawCourse.hasFullAccess !== true) {
    return (
      <div className="mx-auto flex min-h-[65vh] max-w-3xl items-center justify-center px-6 py-16">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <LockKeyhole className="mx-auto h-12 w-12 text-[#002455] dark:text-blue-300" />
          <h1 className="mt-4 text-2xl font-bold text-[#002455] dark:text-white">វគ្គសិក្សាឯកជន</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">វគ្គនេះមិនបង្ហាញជាសាធារណៈទេ។ សូមចូលទៅ Dashboard ដើម្បីមើលវគ្គ PRIVATE ដែលបានផ្តល់សិទ្ធិឱ្យអ្នក។</p>
          <Link href="/courses/private-courses" className="mt-6 inline-block rounded-xl bg-[#002455] px-5 py-3 text-sm font-semibold text-white">វគ្គសិក្សាឯកជនរបស់ខ្ញុំ</Link>
        </div>
      </div>
    );
  }

  const course = mapApiCourseToCourse(rawCourse);
  const categoryIds = new Set(rawCourse.categories?.map((category) => category.id) ?? []);
  const instructorId = rawCourse.instructorId?.id;
  const relatedCourses = [...(relatedQuery.data ?? [])]
    .filter((item) => {
      if (item.id === rawCourse.id || item.accessType === "PRIVATE") return false;

      const sharesCategory = item.categories?.some((category) => categoryIds.has(category.id));
      const sharesInstructor = Boolean(
        instructorId && item.instructorId?.id === instructorId,
      );
      return sharesCategory || sharesInstructor;
    })
    .sort(
      (first, second) =>
        new Date(second.updatedAt ?? second.publishedAt ?? second.createdAt ?? 0).getTime() -
        new Date(first.updatedAt ?? first.publishedAt ?? first.createdAt ?? 0).getTime(),
    )
    .slice(0, 6)
    .map(mapApiCourseToCourse);

  return (
    <div className="min-h-screen bg-slate-50 py-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <DetailBanner course={course} />
            <InstructorBar course={course} />
            <WhatYouLearn course={course} />
            {sectionsQuery.isLoading ? (
              <div className="h-64 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
            ) : (
              <CurriculumSection course={course} />
            )}
          </div>
          <div className="relative">
            <div className="sticky top-24 z-10">
              <PurchaseCard course={course} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <RelatedCourses courses={relatedCourses} />
      </div>
    </div>
  );
}

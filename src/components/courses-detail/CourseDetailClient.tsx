"use client";

import Link from "next/link";
import { useGetCourseQuery, useListCoursesQuery } from "@/redux/api/course-api";
import { toUiCourse } from "@/lib/course/course-adapter";
import CourseDetailPage from "./CourseDetail";

export default function CourseDetailClient({ courseId }: { courseId: string }) {
  const { data, isLoading, error, refetch } = useGetCourseQuery(courseId);
  const { data: relatedData } = useListCoursesQuery({ page: 0, size: 5, sort: "RECOMMEND" });

  if (isLoading) {
    return <p className="min-h-screen py-24 text-center text-slate-500">Loading course...</p>;
  }

  if (error || !data) {
    return (
      <div className="mx-auto min-h-screen max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Unable to load course</h1>
        <p className="mt-3 text-slate-500">The course may not exist, or the API request failed.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button className="rounded-lg bg-primary-color px-4 py-2 text-white" onClick={() => refetch()}>Try again</button>
          <Link className="rounded-lg border px-4 py-2" href="/courses">Back to courses</Link>
        </div>
      </div>
    );
  }

  const course = toUiCourse(data);
  const relatedCourses = (relatedData?.content ?? [])
    .filter(({ id }) => id !== data.id)
    .slice(0, 4)
    .map(toUiCourse);

  return <CourseDetailPage course={course} relatedCourses={relatedCourses} />;
}

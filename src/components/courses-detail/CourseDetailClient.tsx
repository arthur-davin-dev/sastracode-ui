"use client";

import CourseDetailPage from "./CourseDetail";

export default function CourseDetailClient({ courseId }: { courseId: string }) {
  return <CourseDetailPage courseId={courseId} />;
}

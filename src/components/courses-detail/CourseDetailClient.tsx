"use client";

import CourseDetailPage from "./CourseDetail";

export default function CourseDetailClient({ slug }: { slug: string }) {
  return <CourseDetailPage slug={slug} />;
}

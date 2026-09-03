"use client";

import { useEffect } from "react";
import { useGetCourseProgressQuery } from "@/redux/api";

export function CourseCompletionProbe({
  courseId,
  onResolved,
}: {
  courseId: string;
  onResolved: (courseId: string, percent: number) => void;
}) {
  const { data: progress, isSuccess } = useGetCourseProgressQuery(courseId);

  useEffect(() => {
    if (!isSuccess) return;
    const totalVideos = progress?.totalVideos ?? 0;
    const completedVideos = Math.min(
      progress?.completedVideos ?? 0,
      totalVideos,
    );
    const percent =
      progress?.percentage ??
      (totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0);
    onResolved(courseId, percent);
  }, [courseId, isSuccess, progress, onResolved]);

  return null;
}

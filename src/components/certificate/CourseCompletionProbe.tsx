"use client";

import { useEffect } from "react";
import { useGetCourseProgressQuery } from "@/redux/api";

/**
 * Renders nothing. Fetches one course's progress and reports back whether
 * it has hit 100% watch progress, so a parent list can place the course in
 * the right tab even before the backend's enrollment status catches up.
 */
export function CourseCompletionProbe({
  courseId,
  onResolved,
}: {
  courseId: string;
  onResolved: (courseId: string, completed: boolean) => void;
}) {
  const { data: progress, isSuccess } = useGetCourseProgressQuery(courseId);

  useEffect(() => {
    if (!isSuccess) return;
    const totalVideos = progress?.totalVideos ?? 0;
    const completedVideos = Math.min(progress?.completedVideos ?? 0, totalVideos);
    const percent = Math.round(
      progress?.percentage ??
        (totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0),
    );
    onResolved(courseId, percent >= 100);
  }, [courseId, isSuccess, progress, onResolved]);

  return null;
}

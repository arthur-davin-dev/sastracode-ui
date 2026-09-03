"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { useGetMyEnrollmentsQuery } from "@/redux/api";

/**
 * Map of course UUID → course slug, built from the signed-in user's enrollments.
 *
 * Notification deep links for course events (completion, enrollment, …) arrive
 * with the course UUID, but the frontend course routes resolve by slug. Every
 * such notification is about a course the user is enrolled in, so the
 * enrollments list is a complete source for the id → slug translation.
 */
export function useCourseSlugById(): Record<string, string> {
  const { status } = useSession();
  const { data } = useGetMyEnrollmentsQuery(
    { size: 100 },
    { skip: status !== "authenticated" },
  );

  return useMemo(() => {
    const map: Record<string, string> = {};
    for (const enrollment of data?.content ?? []) {
      if (enrollment.courseId && enrollment.courseSlug) {
        map[enrollment.courseId.toLowerCase()] = enrollment.courseSlug;
      }
    }
    return map;
  }, [data]);
}

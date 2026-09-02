"use client";

import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { CourseCompletionProbe } from "@/components/certificate/CourseCompletionProbe";
import { useGetMyEnrollmentsQuery } from "@/redux/api";
import type { EnrollmentResponse } from "@/types/api/course";

/**
 * Course-progress percentage at which a certificate becomes claimable. The
 * backend issues certificates from here on — not only at 100% — so every claim
 * path (the claim card's button + checklist, the claim section deciding which
 * courses get a card) gates on this one value.
 *
 * This is NOT the same as course completion: an 80% course can claim its
 * certificate but is still "in progress" — see COURSE_COMPLETE_PERCENT.
 */
export const CERTIFICATE_ISSUE_PERCENT = 80;

/**
 * Course-progress percentage at which a course counts as finished — drives tab
 * placement, the "completed" badge, and the stats "courses completed" count.
 */
export const COURSE_COMPLETE_PERCENT = 100;

const ENROLLMENT_PAGE_SIZE = 50;

export interface CourseCompletionMap {
  /** ACTIVE + COMPLETED enrollments, de-duplicated by enrollment id. */
  enrollments: EnrollmentResponse[];
  /** Enrollments not yet finished (below 100% and not marked COMPLETED). */
  processingList: EnrollmentResponse[];
  /** Enrollments finished (100% watch progress, or already COMPLETED). */
  completedList: EnrollmentResponse[];
  /**
   * True once a course's real watch progress reaches 100%, falling back to the
   * enrollment status until a probe has resolved.
   */
  isCourseCompleted: (enrollment: EnrollmentResponse) => boolean;
  /**
   * True once a course is far enough along to claim its certificate (80%+, or
   * already COMPLETED). A superset of isCourseCompleted.
   */
  isCourseCertifiable: (enrollment: EnrollmentResponse) => boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  retry: () => void;
  /**
   * Invisible progress probes. Render once per section so the completion map
   * stays accurate even while the enrollment status lags real watch progress.
   */
  probes: React.ReactNode;
}

/**
 * Owns the two enrollment queries, the per-course progress probes, and the
 * "is this course complete / certifiable" decisions that CertificateStatsRow,
 * InProgressCertificatesSection and ClaimCertificateSection all need. Behaviour
 * matches the copy-pasted logic those three used to carry individually.
 */
export function useCourseCompletionMap(): CourseCompletionMap {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const activeQuery = useGetMyEnrollmentsQuery(
    { status: "ACTIVE", size: ENROLLMENT_PAGE_SIZE },
    { skip: !isAuthenticated },
  );
  const completedQuery = useGetMyEnrollmentsQuery(
    { status: "COMPLETED", size: ENROLLMENT_PAGE_SIZE },
    { skip: !isAuthenticated },
  );

  // courseId -> latest raw watch percentage reported by that course's probe.
  const [completionMap, setCompletionMap] = useState<Record<string, number>>({});
  const handleResolved = useCallback((courseId: string, percent: number) => {
    setCompletionMap((prev) =>
      prev[courseId] === percent ? prev : { ...prev, [courseId]: percent },
    );
  }, []);

  const enrollments = useMemo(() => {
    const merged = [
      ...(activeQuery.data?.content ?? []),
      ...(completedQuery.data?.content ?? []),
    ];
    return Array.from(new Map(merged.map((e) => [e.id, e])).values());
  }, [activeQuery.data, completedQuery.data]);

  const isCourseCompleted = useCallback(
    (enrollment: EnrollmentResponse) => {
      const percent = completionMap[enrollment.courseId];
      if (percent !== undefined) return percent >= COURSE_COMPLETE_PERCENT;
      return enrollment.status === "COMPLETED";
    },
    [completionMap],
  );

  const isCourseCertifiable = useCallback(
    (enrollment: EnrollmentResponse) => {
      const percent = completionMap[enrollment.courseId];
      if (percent !== undefined) return percent >= CERTIFICATE_ISSUE_PERCENT;
      return enrollment.status === "COMPLETED";
    },
    [completionMap],
  );

  const processingList = useMemo(
    () => enrollments.filter((enrollment) => !isCourseCompleted(enrollment)),
    [enrollments, isCourseCompleted],
  );
  const completedList = useMemo(
    () => enrollments.filter(isCourseCompleted),
    [enrollments, isCourseCompleted],
  );

  const isLoading =
    status === "loading" ||
    (isAuthenticated && (activeQuery.isFetching || completedQuery.isFetching));
  const isError = activeQuery.isError || completedQuery.isError;

  const retry = useCallback(() => {
    activeQuery.refetch();
    completedQuery.refetch();
  }, [activeQuery, completedQuery]);

  const probes = useMemo(
    () => (
      <>
        {enrollments.map((enrollment) => (
          <CourseCompletionProbe
            key={enrollment.id}
            courseId={enrollment.courseId}
            onResolved={handleResolved}
          />
        ))}
      </>
    ),
    [enrollments, handleResolved],
  );

  return {
    enrollments,
    processingList,
    completedList,
    isCourseCompleted,
    isCourseCertifiable,
    isAuthenticated,
    isLoading,
    isError,
    retry,
    probes,
  };
}

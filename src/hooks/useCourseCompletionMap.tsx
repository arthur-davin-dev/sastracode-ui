"use client";

import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { CourseCompletionProbe } from "@/components/certificate/CourseCompletionProbe";
import {
  useGetContinueLearningQuery,
  useGetMyEnrollmentsQuery,
  useGetMyPrivateCoursesQuery,
  useGetPublicCoursesQuery,
} from "@/redux/api";
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
  /**
   * Every course the user is working toward a certificate on, shaped as an
   * enrollment:
   *   - ACTIVE + COMPLETED enrollments (de-duplicated by course), plus
   *   - any FREE or accessible PRIVATE course the user has watch progress in
   *     without an enrollment row.
   * Certificate eligibility is progress-based, not enrollment-based, so the
   * not-enrolled courses show as "in progress" and become claimable at
   * >= CERTIFICATE_ISSUE_PERCENT just like enrolled ones.
   */
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
  // Certificate eligibility is progress-based, NOT enrollment-based, so the
  // certificate page must also account for courses the user has watch progress
  // in without an enrollment row. There is no "my in-progress courses" endpoint,
  // so candidates are drawn from:
  //   - continue-learning (the course being watched right now), and
  //   - the FREE catalog + the user's accessible PRIVATE courses,
  // then each candidate's real progress is resolved by the same probe the
  // enrolled courses use. Only candidates with progress > 0 are surfaced.
  const continueLearningQuery = useGetContinueLearningQuery(undefined, {
    skip: !isAuthenticated,
  });
  const publicCoursesQuery = useGetPublicCoursesQuery(undefined, {
    skip: !isAuthenticated,
  });
  const privateCoursesQuery = useGetMyPrivateCoursesQuery(undefined, {
    skip: !isAuthenticated,
  });

  // courseId -> latest raw watch percentage reported by that course's probe.
  const [completionMap, setCompletionMap] = useState<Record<string, number>>({});
  const handleResolved = useCallback((courseId: string, percent: number) => {
    setCompletionMap((prev) =>
      prev[courseId] === percent ? prev : { ...prev, [courseId]: percent },
    );
  }, []);

  // Real enrollments (ACTIVE + COMPLETED), de-duplicated by course.
  const realEnrollments = useMemo(() => {
    const merged = [
      ...(activeQuery.data?.content ?? []),
      ...(completedQuery.data?.content ?? []),
    ];
    const byCourseId = new Map<string, EnrollmentResponse>();
    for (const enrollment of merged) {
      if (!byCourseId.has(enrollment.courseId)) {
        byCourseId.set(enrollment.courseId, enrollment);
      }
    }
    return Array.from(byCourseId.values());
  }, [activeQuery.data, completedQuery.data]);

  // Courses the user might have progress in without an enrollment: the one being
  // watched now, every FREE course, and every PRIVATE course they can access.
  // Anything already enrolled is dropped — the enrollment row wins.
  const notEnrolledCandidates = useMemo(() => {
    const enrolledIds = new Set(realEnrollments.map((e) => e.courseId));
    const byId = new Map<
      string,
      { courseId: string; courseSlug?: string; courseTitle?: string }
    >();

    const add = (courseId?: string, courseSlug?: string, courseTitle?: string) => {
      if (!courseId || enrolledIds.has(courseId) || byId.has(courseId)) return;
      byId.set(courseId, { courseId, courseSlug, courseTitle });
    };

    const continued = continueLearningQuery.data;
    add(continued?.courseId, continued?.courseSlug, continued?.courseTitle);

    for (const course of publicCoursesQuery.data ?? []) {
      if (course.accessType === "FREE") {
        add(course.id, course.slug, course.title);
      }
    }
    for (const course of privateCoursesQuery.data ?? []) {
      add(course.id, course.slug, course.title);
    }

    return Array.from(byId.values());
  }, [
    continueLearningQuery.data,
    publicCoursesQuery.data,
    privateCoursesQuery.data,
    realEnrollments,
  ]);

  // A candidate only counts once its probe reports real watch progress (> 0),
  // so the certificate page never fills with the whole catalog. Shaped like an
  // enrollment so every gate below treats it uniformly.
  const progressedCandidates = useMemo<EnrollmentResponse[]>(
    () =>
      notEnrolledCandidates
        .filter((candidate) => (completionMap[candidate.courseId] ?? 0) > 0)
        .map((candidate) => ({
          id: `progress:${candidate.courseId}`,
          courseId: candidate.courseId,
          courseTitle: candidate.courseTitle,
          courseSlug: candidate.courseSlug,
          status: "ACTIVE" as const,
        })),
    [notEnrolledCandidates, completionMap],
  );

  // Real enrollments + not-enrolled courses that have progress.
  const enrollments = useMemo(
    () => [...realEnrollments, ...progressedCandidates],
    [realEnrollments, progressedCandidates],
  );

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

  const probes = useMemo(() => {
    // Probe every enrolled course AND every not-enrolled candidate — the
    // candidates' progress has to be resolved before they can qualify. RTK Query
    // de-duplicates these requests across the page's sections.
    const courseIds = new Set(realEnrollments.map((e) => e.courseId));
    for (const candidate of notEnrolledCandidates) {
      courseIds.add(candidate.courseId);
    }
    return (
      <>
        {Array.from(courseIds).map((courseId) => (
          <CourseCompletionProbe
            key={courseId}
            courseId={courseId}
            onResolved={handleResolved}
          />
        ))}
      </>
    );
  }, [realEnrollments, notEnrolledCandidates, handleResolved]);

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

import { sastraApi } from "./sastra-code";

import type {
  ContinueLearningResponse,
  CourseAccessType,
  CourseDetailResponse,
  CourseProgressResponse,
  CourseSectionResponse,
  EnrollmentResponse,
  PagedResponseCourseDetailResponse,
  PagedResponseEnrollmentResponse,
  PublicCourseQueryArgs,
  UpdateCourseRequest,
} from "@/types/api/course";

const ALL_PAGE_SIZE = 100;

export interface CourseLearningProgress {
  courseId: string;
  courseTitle: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
  percentage: number;
}

function courseTag(id: string) {
  return { type: "Course" as const, id };
}

function sortCourses(
  courses: CourseDetailResponse[],
  sort: PublicCourseQueryArgs["sort"] = "NEWEST",
) {
  const copy = [...courses];

  if (sort === "POPULAR" || sort === "RECOMMEND") {
    return copy.sort(
      (a, b) => (b.enrollmentCount ?? 0) - (a.enrollmentCount ?? 0),
    );
  }

  return copy.sort((a, b) => {
    const aDate = new Date(a.publishedAt ?? a.createdAt ?? 0).getTime();
    const bDate = new Date(b.publishedAt ?? b.createdAt ?? 0).getTime();
    return bDate - aDate;
  });
}

export const courseApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Public catalog intentionally fetches FREE + PREMIUM separately.
     * PRIVATE is never requested here, so it cannot appear on public pages.
     * All backend pages are collected, instead of only showing the first page.
     */
    getPublicCourses: builder.query<CourseDetailResponse[], PublicCourseQueryArgs | void>({
      async queryFn(args, _api, _extra, baseQuery) {
        const filters: PublicCourseQueryArgs = args ?? {};
        const accessTypes: CourseAccessType[] = ["FREE", "PREMIUM"];
        const merged: CourseDetailResponse[] = [];

        for (const accessType of accessTypes) {
          let page = 0;
          let totalPages = 1;

          do {
            const result = await baseQuery({
              url: "/v1/courses",
              params: {
                categoryId: filters.categoryId,
                tagId: filters.tagId,
                level: filters.level,
                accessType,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                sort: filters.sort ?? "NEWEST",
                page,
                size: ALL_PAGE_SIZE,
              },
            });

            if (result.error) {
              return { error: result.error };
            }

            const payload = result.data as PagedResponseCourseDetailResponse;
            merged.push(
              ...(payload.content ?? []).filter(
                (course) => course.accessType !== "PRIVATE" && course.isDeleted !== true,
              ),
            );

            totalPages = Math.max(payload.totalPages ?? 1, 1);
            page += 1;
          } while (page < totalPages);
        }

        const unique = Array.from(
          new Map(merged.map((course) => [course.id, course])).values(),
        );

        return { data: sortCourses(unique, filters.sort) };
      },
      providesTags: (result) => [
        { type: "Course", id: "PUBLIC_LIST" },
        ...(result?.map((course) => courseTag(course.id)) ?? []),
      ],
    }),

    // Backend GET/PATCH/DELETE /v1/courses/{slug} now take the course SLUG,
    // not its UUID (sections/progress/enroll/etc. below are unaffected and
    // still take the UUID). Tagged by both slug and the response's real id
    // so invalidation from either identifier — callers elsewhere in the app
    // still only have the UUID (enrollments, video progress) — busts this
    // cache entry too.
    getCourseBySlug: builder.query<CourseDetailResponse, string>({
      query: (slug) => `/v1/courses/${encodeURIComponent(slug)}`,
      providesTags: (result, _error, slug) => [
        courseTag(slug),
        ...(result?.id ? [courseTag(result.id)] : []),
      ],
    }),

    updateCourseBySlug: builder.mutation<
      CourseDetailResponse,
      { slug: string; body: UpdateCourseRequest }
    >({
      query: ({ slug, body }) => ({
        url: `/v1/courses/${encodeURIComponent(slug)}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, _error, { slug }) => [
        courseTag(slug),
        ...(result?.id ? [courseTag(result.id)] : []),
        { type: "Course", id: "PUBLIC_LIST" },
      ],
    }),

    deleteCourseBySlug: builder.mutation<void, string>({
      query: (slug) => ({
        url: `/v1/courses/${encodeURIComponent(slug)}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, slug) => [
        courseTag(slug),
        { type: "Course", id: "PUBLIC_LIST" },
      ],
    }),

    getCourseSections: builder.query<CourseSectionResponse[], string>({
      query: (courseId) =>
        `/v1/courses/${encodeURIComponent(courseId)}/sections`,
      providesTags: (_result, _error, courseId) => [courseTag(courseId)],
    }),

    getMyPrivateCourses: builder.query<CourseDetailResponse[], void>({
      async queryFn(_arg, _api, _extra, baseQuery) {
        const merged: CourseDetailResponse[] = [];
        let page = 0;
        let totalPages = 1;

        do {
          const result = await baseQuery({
            url: "/v1/users/me/private-courses",
            params: { page, size: ALL_PAGE_SIZE },
          });

          if (result.error) return { error: result.error };

          const payload = result.data as PagedResponseCourseDetailResponse;
          merged.push(
            ...(payload.content ?? []).filter(
              (course) => course.accessType === "PRIVATE" && course.isDeleted !== true,
            ),
          );
          totalPages = Math.max(payload.totalPages ?? 1, 1);
          page += 1;
        } while (page < totalPages);

        return { data: merged };
      },
      providesTags: (result) => [
        { type: "Course", id: "MY_PRIVATE" },
        ...(result?.map((course) => courseTag(course.id)) ?? []),
      ],
    }),

    getMyEnrollments: builder.query<
      PagedResponseEnrollmentResponse,
      { status?: "ACTIVE" | "COMPLETED" | "CANCELLED"; page?: number; size?: number } | void
    >({
      query: (args) => ({
        url: "/v1/users/me/enrollments",
        params: {
          status: args?.status,
          page: args?.page ?? 0,
          size: args?.size ?? 100,
        },
      }),
      providesTags: [{ type: "Course", id: "MY_ENROLLMENTS" }],
    }),

    getContinueLearning: builder.query<ContinueLearningResponse, void>({
      query: () => "/v1/users/me/continue-learning",
      providesTags: [{ type: "Course", id: "CONTINUE_LEARNING" }],
    }),

    getCourseProgress: builder.query<CourseProgressResponse, string>({
      query: (courseId) =>
        `/v1/courses/${encodeURIComponent(courseId)}/progress`,
      providesTags: (_result, _error, courseId) => [courseTag(courseId)],
    }),

    /**
     * Combines each active enrollment with its course-level progress so the
     * achievement page can render a per-course completion bar without the
     * caller juggling one useGetCourseProgressQuery per row.
     */
    getMyLearningProgress: builder.query<CourseLearningProgress[], void>({
      async queryFn(_arg, _api, _extra, baseQuery) {
        const enrollmentsResult = await baseQuery({
          url: "/v1/users/me/enrollments",
          params: { page: 0, size: ALL_PAGE_SIZE },
        });

        if (enrollmentsResult.error) {
          return { error: enrollmentsResult.error };
        }

        const enrollments = (
          (enrollmentsResult.data as PagedResponseEnrollmentResponse).content ?? []
        ).filter((enrollment) => enrollment.status !== "CANCELLED");

        const progress = await Promise.all(
          enrollments.map(async (enrollment) => {
            const result = await baseQuery(
              `/v1/courses/${encodeURIComponent(enrollment.courseId)}/progress`,
            );
            const data = result.data as CourseProgressResponse | undefined;

            return {
              courseId: enrollment.courseId,
              courseTitle: enrollment.courseTitle ?? "",
              status: enrollment.status ?? "ACTIVE",
              percentage: Math.round(
                enrollment.status === "COMPLETED" ? 100 : data?.percentage ?? 0,
              ),
            };
          }),
        );

        return { data: progress };
      },
      providesTags: (result) => [
        { type: "Course", id: "MY_LEARNING_PROGRESS" },
        ...(result?.map((p) => courseTag(p.courseId)) ?? []),
      ],
    }),

    enrollCourse: builder.mutation<EnrollmentResponse, string>({
      query: (courseId) => ({
        url: `/v1/courses/${encodeURIComponent(courseId)}/enroll`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, courseId) => [
        courseTag(courseId),
        { type: "Course", id: "MY_ENROLLMENTS" },
      ],
    }),

    cancelEnrollment: builder.mutation<void, string>({
      query: (courseId) => ({
        url: `/v1/courses/${encodeURIComponent(courseId)}/enroll`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, courseId) => [
        courseTag(courseId),
        { type: "Course", id: "MY_ENROLLMENTS" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPublicCoursesQuery,
  useGetCourseBySlugQuery,
  useUpdateCourseBySlugMutation,
  useDeleteCourseBySlugMutation,
  useGetCourseSectionsQuery,
  useGetMyPrivateCoursesQuery,
  useGetMyEnrollmentsQuery,
  useGetContinueLearningQuery,
  useGetCourseProgressQuery,
  useGetMyLearningProgressQuery,
  useEnrollCourseMutation,
  useCancelEnrollmentMutation,
} = courseApi;

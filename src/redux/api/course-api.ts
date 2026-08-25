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
} from "@/types/api/course";

const ALL_PAGE_SIZE = 100;

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

    getCourseById: builder.query<CourseDetailResponse, string>({
      query: (courseId) => `/v1/courses/${encodeURIComponent(courseId)}`,
      providesTags: (_result, _error, courseId) => [courseTag(courseId)],
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
  useGetCourseByIdQuery,
  useGetCourseSectionsQuery,
  useGetMyPrivateCoursesQuery,
  useGetMyEnrollmentsQuery,
  useGetContinueLearningQuery,
  useGetCourseProgressQuery,
  useEnrollCourseMutation,
  useCancelEnrollmentMutation,
} = courseApi;

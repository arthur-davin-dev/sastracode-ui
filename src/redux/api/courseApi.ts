import { sastraApi } from "./sastra-code";
import type {
  CourseResponse,
  GetCoursesParams,
  PagedCourseResponse,
} from "@/types/course";

/** Payload shapes for write operations — adjust once you confirm real
 *  request bodies from Swagger. */
export interface CreateCourseRequest {
  title: string;
  summary: string;
  accessType: "FREE" | "PAID";
  price: number;
  thumbnailFileId?: string;
  categoryIds: string[];
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  id: string;
}

export const courseApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * GET /v1/courses
     * CONFIRMED from your recap — this is the one your listing page needs.
     */
    getCourses: builder.query<PagedCourseResponse, GetCoursesParams | void>({
      query: (params) => ({
        url: "/v1/courses",
        params: params ?? {},
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({
                type: "Course" as const,
                id,
              })),
              { type: "Course" as const, id: "LIST" },
            ]
          : [{ type: "Course" as const, id: "LIST" }],
    }),

    /**
     * GET /v1/courses/{courseId}
     * CONFIRMED from your recap — only needed if you have a course detail
     * page. Not required for the listing page alone.
     */
    getCourseById: builder.query<CourseResponse, string>({
      query: (courseId) => `/v1/courses/${courseId}`,
      providesTags: (_result, _error, courseId) => [
        { type: "Course" as const, id: courseId },
      ],
    }),

    /**
     * POST /v1/courses
     * SPECULATIVE — not in your Swagger recap. Only keep this if you have
     * (or plan) an admin "create course" screen in this frontend. If
     * courses are managed elsewhere (a separate admin app/CMS), delete
     * this endpoint entirely.
     */
    createCourse: builder.mutation<CourseResponse, CreateCourseRequest>({
      query: (body) => ({
        url: "/v1/courses",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Course" as const, id: "LIST" }],
    }),

    /**
     * PUT /v1/courses/{courseId}
     * SPECULATIVE — same caveat as createCourse. Only needed for admin
     * edit functionality.
     */
    updateCourse: builder.mutation<CourseResponse, UpdateCourseRequest>({
      query: ({ id, ...body }) => ({
        url: `/v1/courses/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Course" as const, id },
        { type: "Course" as const, id: "LIST" },
      ],
    }),

    /**
     * DELETE /v1/courses/{courseId}
     * SPECULATIVE — admin-only use case. Delete if not needed.
     */
    deleteCourse: builder.mutation<void, string>({
      query: (courseId) => ({
        url: `/v1/courses/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, courseId) => [
        { type: "Course" as const, id: courseId },
        { type: "Course" as const, id: "LIST" },
      ],
    }),

    /**
     * POST /v1/courses/{courseId}/enroll
     * SPECULATIVE — this path is a guess, not confirmed against your
     * Swagger at all. Only keep this if your backend actually has an
     * enroll/purchase endpoint under this path. Delete otherwise — a
     * mutation pointed at a nonexistent route will just 404.
     */
    enrollInCourse: builder.mutation<void, string>({
      query: (courseId) => ({
        url: `/v1/courses/${courseId}/enroll`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, courseId) => [
        { type: "Course" as const, id: courseId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useEnrollInCourseMutation,
} = courseApi;
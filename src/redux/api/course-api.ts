import { sastraApi } from "./sastra-code";

export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type CourseAccessType = "FREE" | "PREMIUM" | "PRIVATE";
export type CourseStatus = "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "REJECTED" | "ARCHIVED";

export interface InstructorSummary { id: string; name: string; avatarFileId?: string }
export interface CourseTaxonomy { id: string; name: string; slug: string }
export interface CourseVideo {
  id: string;
  detailId: string;
  youtubeVideoId: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  orderIndex: number;
  lectureNo: number;
  isPreview: boolean;
  isPublished: boolean;
  embedUrl?: string;
}
export interface CourseSection {
  id: string;
  courseId: string;
  title: string;
  youtubePlaylistId?: string;
  orderIndex: number;
  lastSyncedAt?: string;
  videos: CourseVideo[];
}
export interface CourseDetailResponse {
  id: string;
  title: string;
  slug: string;
  description?: string;
  level: CourseLevel;
  accessType: CourseAccessType;
  price: number;
  discount: number;
  currency: string;
  coverFileId?: string;
  instructorId?: InstructorSummary;
  status: CourseStatus;
  publishedAt?: string;
  enrollmentCount: number;
  hasFullAccess: boolean;
  isDeleted: boolean;
  categories: CourseTaxonomy[];
  tags: CourseTaxonomy[];
  sections: CourseSection[];
  createdAt?: string;
  updatedAt?: string;
}
export interface CoursePage {
  content: CourseDetailResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
export interface ListCoursesArgs {
  categoryId?: string;
  tagId?: string;
  level?: CourseLevel;
  accessType?: CourseAccessType;
  minPrice?: number;
  maxPrice?: number;
  sort?: "NEWEST" | "POPULAR" | "RECOMMEND";
  page?: number;
  size?: number;
}
export interface CourseProgressResponse {
  courseId: string;
  completedVideos: number;
  totalVideos: number;
  percentage: number;
}

const courseTag = (id: string) => ({ type: "Course" as const, id });

export const courseApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    listCourses: builder.query<CoursePage, ListCoursesArgs | void>({
      query: (params) => ({ url: "/v1/courses", params: params ?? undefined }),
      providesTags: (result) => [
        courseTag("LIST"),
        ...(result?.content.map(({ id }) => courseTag(id)) ?? []),
      ],
    }),
    getCourse: builder.query<CourseDetailResponse, string>({
      query: (courseId) => `/v1/courses/${courseId}`,
      providesTags: (_result, _error, courseId) => [courseTag(courseId)],
    }),
    getCourseSections: builder.query<CourseSection[], string>({
      query: (courseId) => `/v1/courses/${courseId}/sections`,
      providesTags: (_result, _error, courseId) => [courseTag(courseId)],
    }),
    getCourseProgress: builder.query<CourseProgressResponse, string>({
      query: (courseId) => `/v1/courses/${courseId}/progress`,
      providesTags: (_result, _error, courseId) => [courseTag(`progress-${courseId}`)],
    }),
    enrollCourse: builder.mutation<unknown, string>({
      query: (courseId) => ({ url: `/v1/courses/${courseId}/enroll`, method: "POST" }),
      invalidatesTags: (_result, _error, courseId) => [courseTag(courseId), courseTag(`progress-${courseId}`)],
    }),
    cancelCourseEnrollment: builder.mutation<void, string>({
      query: (courseId) => ({ url: `/v1/courses/${courseId}/enroll`, method: "DELETE" }),
      invalidatesTags: (_result, _error, courseId) => [courseTag(courseId), courseTag(`progress-${courseId}`)],
    }),
  }),
});

export const {
  useListCoursesQuery,
  useGetCourseQuery,
  useGetCourseSectionsQuery,
  useGetCourseProgressQuery,
  useEnrollCourseMutation,
  useCancelCourseEnrollmentMutation,
} = courseApi;

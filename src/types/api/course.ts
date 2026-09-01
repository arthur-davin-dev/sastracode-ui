export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type CourseAccessType = "FREE" | "PREMIUM" | "PRIVATE";
export type CourseStatus =
  | "DRAFT"
  | "IN_REVIEW"
  | "PUBLISHED"
  | "REJECTED"
  | "ARCHIVED";
export type CourseSort = "NEWEST" | "POPULAR" | "RECOMMEND";

/** Backend PATCH /v1/courses/{slug} body — all fields optional (partial update). */
export interface UpdateCourseRequest {
  title?: string;
  /** lowercase, `^[a-z0-9]+(?:-[a-z0-9]+)*$`, max 220 chars. */
  slug?: string;
  description?: string;
  level?: CourseLevel;
  accessType?: CourseAccessType;
  price?: number;
  discount?: number;
  currency?: string;
  thumbnailFileId?: string;
  categoryIds?: string[];
  tagIds?: string[];
}

export interface FileSummaryResponse {
  id?: string;
  url?: string;
}

export interface InstructorSummaryResponse {
  id?: string;
  name?: string;
  avatarFileId?: string;
}

export interface CategorySummaryResponse {
  id: string;
  name: string;
  slug?: string;
}

export interface TagSummaryResponse {
  id: string;
  name: string;
  slug?: string;
}

export interface VideoResponse {
  id: string;
  detailId?: string;
  youtubeVideoId?: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  orderIndex?: number;
  lectureNo?: number;
  isPreview?: boolean;
  isPublished?: boolean;
  embedUrl?: string;
}

export interface CourseSectionResponse {
  id: string;
  courseId?: string;
  title?: string;
  youtubePlaylistId?: string;
  orderIndex?: number;
  lastSyncedAt?: string;
  videos?: VideoResponse[];
}

export interface CourseDetailResponse {
  id: string;
  title?: string;
  slug?: string;
  description?: string;
  level?: CourseLevel;
  accessType?: CourseAccessType;
  price?: number;
  discount?: number;
  currency?: string;
  thumbnailFileId?: FileSummaryResponse;
  instructorId?: InstructorSummaryResponse;
  status?: CourseStatus;
  publishedAt?: string;
  enrollmentCount?: number;
  hasFullAccess?: boolean;
  isDeleted?: boolean;
  categories?: CategorySummaryResponse[];
  tags?: TagSummaryResponse[];
  sections?: CourseSectionResponse[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type PagedResponseCourseDetailResponse = PagedResponse<CourseDetailResponse>;

export interface EnrollmentResponse {
  id: string;
  userId?: string;
  courseId: string;
  courseTitle?: string;
  courseSlug?: string;
  status?: "ACTIVE" | "COMPLETED" | "CANCELLED";
  enrolledAt?: string;
  completedAt?: string;
}

export type PagedResponseEnrollmentResponse = PagedResponse<EnrollmentResponse>;

export interface CourseProgressResponse {
  courseId?: string;
  completedVideos?: number;
  totalVideos?: number;
  percentage?: number;
}

export interface ContinueLearningResponse {
  courseId?: string;
  courseTitle?: string;
  courseSlug?: string;
  sectionId?: string;
  sectionTitle?: string;
  videoId?: string;
  videoTitle?: string;
  youtubeVideoId?: string;
  positionSeconds?: number;
  lastWatchedAt?: string;
}

export interface PublicCourseQueryArgs {
  categoryId?: string;
  tagId?: string;
  level?: CourseLevel;
  minPrice?: number;
  maxPrice?: number;
  sort?: CourseSort;
}

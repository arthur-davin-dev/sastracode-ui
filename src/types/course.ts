export type TechTag = "Python" | "JavaScript" | "Java" | "CSS" | "HTML";

export interface TechOption {
  id: string;
  label: TechTag;
  icon: string; // path or icon name under /public/icons
}

<<<<<<< HEAD
export interface Course {
  id: string;
  title: string;
  titleKm: string;
  description: string;
  tag: TechTag;
  href: string;
  coverImage: string;
  ctaLabel: string;
=======
// export interface Course {
//   id: string;
//   title: string;
//   titleKm: string;
//   description: string;
//   tag: TechTag;
//   href: string;
//   coverImage: string;
//   ctaLabel: string;
// }

export type CourseLevel =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED";

export type CourseAccessType =
  | "FREE"
  | "PREMIUM"
  | "PRIVATE";

export type CourseStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export interface CourseThumbnail {
  id: string;
  url: string;
}

export interface CourseInstructor {
  id: string;
  name: string;
  avatarFileId?: string | null;
}

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
}

export interface CourseTag {
  id: string;
  name: string;
  slug: string;
}

export interface CourseVideo {
  id: string;
  detailId: string;

  youtubeVideoId: string;

  title: string;
  description: string;

  thumbnailUrl: string;

  durationSeconds: number;
  orderIndex: number;
  lectureNo: number;

  isPreview: boolean;
  isPublished: boolean;

  embedUrl: string;
}

export interface CourseSection {
  id: string;
  courseId: string;

  title: string;

  youtubePlaylistId?: string | null;

  orderIndex: number;

  lastSyncedAt?: string | null;

  videos: CourseVideo[];
}

export interface Course {
  /*
   * =========================
   * API COURSE DATA
   * =========================
   */

  id: string;

  title: string;
  slug: string;

  description: string;

  level: CourseLevel;

  accessType: CourseAccessType;

  /*
   * Price before discount
   */
  price: number;

  /*
   * Percentage:
   * 0, 10, 20, 50...
   */
  discount: number;

  currency: string;

  thumbnailFileId?: CourseThumbnail | null;

  instructorId?: CourseInstructor | null;

  status: CourseStatus;

  publishedAt?: string | null;

  enrollmentCount: number;

  /*
   * This is important for course access.
   */
  hasFullAccess: boolean;

  isDeleted: boolean;

  categories: CourseCategory[];

  tags: CourseTag[];

  sections: CourseSection[];

  createdAt: string;

  updatedAt: string;

  /*
   * =========================
   * FRONTEND / UI FIELDS
   * =========================
   *
   * These are not directly returned
   * by your API.
   */

  titleKm?: string;

  tag?: TechTag;

  href?: string;

  coverImage?: string;

  ctaLabel?: string;

  /*
   * Derived UI fields if your
   * existing components use them.
   */

  originalPrice?: number;

  lessons?: number;

  duration?: string;

  totalDuration?: string;

  curriculum?: {
    id?: string;
    title: string;

    lessons: {
      id: string;
      title: string;

      locked?: boolean;

      videoUrl?: string;

      thumbnail?: string;

      duration?: string;
    }[];
  }[];
>>>>>>> origin/kongkea-new
}

export interface CourseProgress {
  courseTitle: string;
  lessonLabel: string; 
  percent: number; // 0-100
  href: string;
}

export type ForumPostType = "post" | "sql";

export interface ForumPost {
  id: string;
  type: ForumPostType;
  author: string;
  timeAgo: string;
  title: string;
  excerpt: string;
  href: string;
}

export interface PromoBannerData {
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: string;
}

export type TrackSlug = "html" | "css" | "javascript" | "java" | "python";

export interface SidebarNavItem {
  id: string;
  label: string;
  href: string;
  icon: string; // lucide icon name, resolved in the component
}

export interface TrackTab {
  slug: TrackSlug;
  label: string;
}

export interface LearningPathBannerData {
  trackLabel: string;
  title: string;
  description: string;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
}

export type CardLevel = "Beginner" | "Intermediate" | "Advanced";

export interface ProgressLessonCard {
  id: string;
  title: string;
  image: string;
  badge?: string;
  lessonsCompleted: number;
  lessonsTotal: number;
  percent: number;
  ctaLabel: string;
  href: string;
}

export interface LessonCatalogItem {
  id: string;
  category: string; // e.g. "JAVA"
  title: string;
  image: string;
  level: CardLevel;
  lessonsCount: number;
  hours: number;
  rating: number;
  students: number;
  progressPercent?: number;
  completed?: boolean;
  locked?: boolean;
  href: string;
}

export interface ProjectCatalogItem {
  id: string;
  category: string;
  title: string;
  image: string;
  level: CardLevel;
  duration: string; // e.g. "5h", "8h30"
  rating: number;
  students: number;
  progressPercent?: number;
  completed?: boolean;
  locked?: boolean;
  href: string;
}

export interface OverallProgressSubject {
  label: string;
  percent: number;
  barColorClass: string;
}

export interface OverallProgressData {
  headline: string;
  subheadline: string;
  overallPercent: number;
  subjects: OverallProgressSubject[];
}

export interface BookmarkedCourse {
  id: string;
  thumbnailUrl: string;
  category: string;
  title: string;
  description: string;
  studentsCount?: string;
  duration: string;
  isBookmarked: boolean;
  status?: "in_progress" | "not_started" | "paid" | "free";
  progressPercent?: number; // Optional progress percentage (e.g. 30, 50, 75)
}
export interface MyCourse {
  id: string;
  thumbnailUrl: string;
  category: string;
  title: string;
  description: string;
  studentsCount: string;
  duration: string;
  status: "not_started" | "in_progress"; 
}
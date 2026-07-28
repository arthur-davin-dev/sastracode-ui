export type TechTag = "Python" | "JavaScript" | "Java" | "CSS" | "HTML";

export interface TechOption {
  id: string;
  label: TechTag;
  icon: string; // path or icon name under /public/icons
}

export interface Course {
  id: string;
  title: string;
  titleKm: string;
  description: string;
  tag: TechTag;
  href: string;
  coverImage: string;
  ctaLabel: string;
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
  studentsCount: string;
  duration: string;
  isBookmarked: boolean;
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
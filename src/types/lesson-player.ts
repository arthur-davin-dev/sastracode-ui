export interface LessonItem {
  id: string;
  title: string;
  duration: string;
  status: "completed" | "current" | "upcoming";
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: LessonItem[];
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  postedAt: string;
  content: string;
  likeCount: number;
}
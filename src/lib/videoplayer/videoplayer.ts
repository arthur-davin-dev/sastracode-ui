import { Chapter } from "@/lib/course/courses";
import { CourseSection, Comment, LessonItem } from "@/types/lesson-player";

// Fallback content used only if a course has no curriculum defined yet
export const defaultSections: CourseSection[] = [
  {
    id: "s1",
    title: "Section 1: HTML Basics",
    lessons: [
      { id: "l1", title: "1. Introduction to HTML", duration: "12:15", status: "completed" },
      { id: "l2", title: "2. Introduction to CSS", duration: "10:32", status: "upcoming" },
      { id: "l3", title: "3. CSS Selectors", duration: "10:32", status: "upcoming" },
      { id: "l4", title: "4. Colors and Typography", duration: "10:32", status: "upcoming" },
      { id: "l5", title: "5. The CSS Box Model", duration: "10:32", status: "upcoming" },
    ],
  },
];

export const comments: Comment[] = [
  {
    id: "c1",
    authorName: "Theoun Seyha",
    authorAvatar: "/assets/images/photo_2024-09-03_12-13-14.jpg",
    postedAt: "2 hours ago",
    content: "Great explanation! Now I understand the basic structure of HTML.",
    likeCount: 12,
  },
  {
    id: "c2",
    authorName: "Theoun Seyha",
    authorAvatar: "/assets/images/photo_2024-09-03_12-13-14.jpg",
    postedAt: "5 hours ago",
    content: "Can you make a video about HTML attributes next?",
    likeCount: 8,
  },
];

export function getTotalLessons(sections: CourseSection[]): number {
  return sections.reduce((sum, s) => sum + s.lessons.length, 0);
}

/**
 * Converts a course's Chapter[] curriculum into the CourseSection[] shape
 * the sidebar expects, marking the clicked lesson as "current".
 */
export function buildSectionsFromCurriculum(
  chapters: Chapter[],
  currentLessonId: string
): CourseSection[] {
  return chapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    lessons: chapter.lessons.map((lesson): LessonItem => ({
      id: lesson.id,
      title: lesson.title,
      duration: lesson.duration,
      status:
        lesson.id === currentLessonId
          ? "current"
          : lesson.locked
          ? "upcoming"
          : "completed",
    })),
  }));
}

export function findLessonById(chapters: Chapter[], lessonId: string) {
  for (const chapter of chapters) {
    const lesson = chapter.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, chapter };
  }
  return undefined;
}

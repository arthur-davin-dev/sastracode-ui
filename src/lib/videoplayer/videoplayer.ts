// import { CourseSection, Comment } from "@/types/lesson-player";

// export const sections: CourseSection[] = [
//   {
//     id: "s1",
//     title: "Section 1: HTML Basics",
//     lessons: [
//       { id: "l1", title: "1. Introduction to HTML", duration: "12:15", status: "completed" },
//       { id: "l2", title: "2. HTML Document Structure", duration: "10:32", status: "completed" },
//       { id: "l3", title: "3. HTML Elements & Tags", duration: "13:45", status: "completed" },
//       { id: "l4", title: "4. Creating Your First Web Page", duration: "15:20", status: "completed" },
//     ],
//   },
//   {
//     id: "s2",
//     title: "Section 2: CSS Fundamentals",
//     lessons: [
//       { id: "l5", title: "5. Introduction to CSS", duration: "11:20", status: "completed" },
//       { id: "l6", title: "6. CSS Selectors", duration: "14:30", status: "current" },
//       { id: "l7", title: "7. Colors & Typography", duration: "12:10", status: "upcoming" },
//       { id: "l8", title: "8. The Box Model", duration: "13:25", status: "upcoming" },
//     ],
//   },
//   {
//     id: "s3",
//     title: "Section 3: Layout",
//     lessons: [
//       { id: "l9", title: "9. Flexbox Fundamentals", duration: "16:00", status: "upcoming" },
//       { id: "l10", title: "10. CSS Grid", duration: "18:10", status: "upcoming" },
//     ],
//   },
//   {
//     id: "s4",
//     title: "Section 4: Responsive Design",
//     lessons: [
//       { id: "l11", title: "11. Media Queries", duration: "14:00", status: "upcoming" },
//       { id: "l12", title: "12. Mobile-First Workflow", duration: "17:35", status: "upcoming" },
//     ],
//   },
// ];

// export const comments: Comment[] = [
//   {
//     id: "c1",
//     authorName: "Theoun Seyha",
//     authorAvatar: "/assets/images/photo_2024-09-03_12-13-14.jpg",
//     postedAt: "2 hours ago",
//     content: "Great explanation! Now I understand the basic structure of HTML.",
//     likeCount: 12,
//   },
//   {
//     id: "c2",
//     authorName: "Dara Vichea",
//     authorAvatar: "/assets/images/user-2.png",
//     postedAt: "5 hours ago",
//     content: "Can you make a video about HTML attributes next?",
//     likeCount: 8,
//   },
// ];

// // ---- helpers ----

// export function getTotalLessons(courseSections: CourseSection[]): number {
//   return courseSections.reduce((sum, s) => sum + s.lessons.length, 0);
// }

// export function getCurrentLesson(courseSections: CourseSection[]): LessonItemWithSection | undefined {
//   for (const section of courseSections) {
//     const lesson = section.lessons.find((l) => l.status === "current");
//     if (lesson) return { ...lesson, sectionTitle: section.title };
//   }
//   return undefined;
// }

// export function getNextLesson(courseSections: CourseSection[]): LessonItemWithSection | undefined {
//   const flat = courseSections.flatMap((section) =>
//     section.lessons.map((lesson) => ({ ...lesson, sectionTitle: section.title }))
//   );
//   const currentIndex = flat.findIndex((l) => l.status === "current");
//   if (currentIndex === -1 || currentIndex + 1 >= flat.length) return undefined;
//   return flat[currentIndex + 1];
// }

// interface LessonItemWithSection {
//   id: string;
//   title: string;
//   duration: string;
//   status: "completed" | "current" | "upcoming";
//   sectionTitle: string;
// }


import { Chapter } from "@/lib/course/courses";
import { CourseSection, Comment, LessonItem } from "@/types/lesson-player";

// Fallback content used only if a course has no curriculum defined yet
export const defaultSections: CourseSection[] = [
  {
    id: "s1",
    title: "Section 1: HTML Basics",
    lessons: [
      { id: "l1", title: "1. Introduction to HTML", duration: "12:15", status: "completed" },
      { id: "l2", title: "2. HTML Document Structure", duration: "10:32", status: "current" },
      { id: "l3", title: "3. HTML Document Structure", duration: "10:32", status: "current" },
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
    authorName: "Dara Vichea",
    authorAvatar: "/assets/images/user-2.png",
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
import { EnrollmentHistoryItem } from "@/lib/course/courses";

export const mockEnrollmentHistory: EnrollmentHistoryItem[] = [
  {
    courseId: "1",
    title: "HTML & CSS Fundamentals",
    thumbnail: "/images/frontend-banner.png",
    status: "completed",
    progressPercent: 100,
  },
  {
    courseId: "7",
    title: "Modern JavaScript",
    thumbnail: "/images/javascript-banner.png",
    status: "completed",
    progressPercent: 100,
  },
  {
    courseId: "6",
    title: "React Basics",
    thumbnail: "/images/react-banner.png",
    status: "in-progress",
    progressPercent: 60,
  },
];
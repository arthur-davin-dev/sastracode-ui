import { EnrollmentHistoryItem } from "@/lib/course/enrollhistory";

export const mockEnrollmentHistory: EnrollmentHistoryItem[] = [
  {
    historyId: "1",
    title: "HTML & CSS Fundamentals",
    thumbnail: "/images/frontend-banner.png",
    status: "completed",
    progressPercent: 100,
  },
  {
    historyId: "7",
    title: "Modern JavaScript",
    thumbnail: "/images/javascript-banner.png",
    status: "completed",
    progressPercent: 100,
  },
  {
    historyId: "6",
    title: "React Basics",
    thumbnail: "/images/react-banner.png",
    status: "in-progress",
    progressPercent: 60,
  },
];

export interface Benefit {
  icon: "video" | "download" | "certificate" | "qa" | "pace" | "devices";
  title: string;
  description: string;
}

export interface EnrollmentHistoryItem {
  historyId: string;
  title: string;
  thumbnail: string;
  status: "completed" | "in-progress";
  progressPercent: number;
  
}
export const enrollhistory: EnrollmentHistoryItem[] = [
  {
    historyId: "1",
    title: "HTML & CSS Fundamentals",
    thumbnail: "/assets/images/HTML & CSS.jpg",
    status: "completed",
    progressPercent: 100,
  },
  {
    historyId: "2",
    title: "Advanced CSS Layouts",
    thumbnail: "/assets/images/CSS.jpg",
    status: "completed",
    progressPercent: 100,
  },
  {
    historyId: "3",
    title: "HTML & CSS Fundamentals",
    thumbnail: "/assets/images/HTML & CSS.jpg",
    status: "in-progress",
    progressPercent: 60,
  },
];

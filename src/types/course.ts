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
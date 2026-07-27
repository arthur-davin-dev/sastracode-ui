import {
  Course,
  courses as sharedCourses,
  getAllCourses as getSharedAllCourses,
  getCourseById as getSharedCourseById,
  getRelatedCourses as getSharedRelatedCourses,
} from "@/lib/course/courses";

export const categories = [
  "ទាំងអស់",
  "HTML",
  "CSS",
  "Free Course",
  "Frontend",
  "Backend",
  "JavaScript",
  "UI/UX",
] as const;

export const courses: Course[] = sharedCourses;

// ---- data-access helpers ----

export async function getAllCourses(): Promise<Course[]> {
  return getSharedAllCourses();
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  return getSharedCourseById(id);
}

export async function getRelatedCourses(
  currentId: string,
  category?: string,
  limit = 4,
): Promise<Course[]> {
  return getSharedRelatedCourses(currentId, category, limit);
}

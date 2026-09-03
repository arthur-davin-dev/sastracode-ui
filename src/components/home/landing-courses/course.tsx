import type { CourseDetailResponse } from "@/types/api/course";
import { mapApiCourseToCourse } from "@/lib/course/course-adapter";
import { fetchPublicBackendJson } from "@/lib/server/public-backend-fetch";
import LandingCoursesView from "./LandingCoursesView";

interface CourseApiResponse {
  content: CourseDetailResponse[];
}

async function fetchCourses(sort: "NEWEST" | "RECOMMEND", size: number) {
  const response = await fetchPublicBackendJson<CourseApiResponse>(
    "/api/v1/courses",
    { sort, page: 0, size },
  );
  return response?.content ?? [];
}

export default async function LandingCourses() {
  const [newData, recommendedData] = await Promise.all([
    fetchCourses("NEWEST", 8),
    fetchCourses("RECOMMEND", 8),
  ]);

  const newCourses = newData.map(mapApiCourseToCourse).slice(0, 6);
  const newCourseIds = new Set(newCourses.map((course) => course.id));
  const recommendedCourses = recommendedData
    .map(mapApiCourseToCourse)
    .filter((course) => !newCourseIds.has(course.id))
    .slice(0, 6);

  return (
    <LandingCoursesView
      newCourses={newCourses}
      recommendedCourses={recommendedCourses}
    />
  );
}

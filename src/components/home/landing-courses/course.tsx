"use client";

import { useEffect, useState } from "react";

import type { Course } from "@/lib/course/courses";
import type { CourseDetailResponse } from "@/types/api/course";
import { mapApiCourseToCourse } from "@/lib/course/course-adapter";
import CardSection from "./card-section";

interface CourseApiResponse {
  content: CourseDetailResponse[];
}

export default function LandingCourses() {
  const [newCourses, setNewCourses] = useState<Course[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);

        // ADD THEM HERE
        const newCoursesResponse = await fetch(
          "/api/backend/v1/courses?sort=NEWEST&page=0&size=8",
          {
            cache: "no-store",
          },
        );

        const recommendedCoursesResponse = await fetch(
          "/api/backend/v1/courses?sort=RECOMMEND&page=0&size=8",
          {
            cache: "no-store",
          },
        );

        if (!newCoursesResponse.ok) {
          throw new Error("Failed to load new courses");
        }

        if (!recommendedCoursesResponse.ok) {
          throw new Error("Failed to load recommended courses");
        }

        const newData: CourseApiResponse = await newCoursesResponse.json();

        const recommendedData: CourseApiResponse =
          await recommendedCoursesResponse.json();

        const mappedNewCourses = (newData.content ?? []).map(
          mapApiCourseToCourse,
        );
        const visibleNewCourses = mappedNewCourses.slice(0, 6);
        const visibleNewCourseIds = new Set(
          visibleNewCourses.map((course) => course.id),
        );

        const uniqueRecommendedCourses = (recommendedData.content ?? [])
          .map(mapApiCourseToCourse)
          .filter((course) => !visibleNewCourseIds.has(course.id))
          .slice(0, 6);

        setNewCourses(visibleNewCourses);
        setRecommendedCourses(uniqueRecommendedCourses);
      } catch (error) {
        console.error("LANDING COURSE ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  if (loading) {
    return <div className="py-10 text-center">Loading courses...</div>;
  }

  return (
    <>
      <CardSection title="វគ្គសិក្សាថ្មីៗ" courses={newCourses} />

      <CardSection title="វគ្គសិក្សាអនុសាសន៍" courses={recommendedCourses} />
    </>
  );
}

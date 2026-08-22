"use client";

import { useEffect, useState } from "react";

import type { Course } from "@/lib/course/courses";
import type { CourseDetailResponse } from "@/types/api/course";
import { mapApiCourseToCourse } from "@/lib/course/course-adapter";
import { Skeleton } from "@/components/ui/skeleton";
import CardSection from "./card-section";
import { useTranslation } from "@/hooks/useTranslations";

interface CourseApiResponse {
  content: CourseDetailResponse[];
}

function CourseSectionSkeleton() {
  return (
    <section className="py-10" aria-hidden="true">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="mb-6 h-9 w-64 bg-slate-200 dark:bg-slate-800" />

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              <Skeleton className="aspect-video w-full rounded-none bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-4 p-5">
                <Skeleton className="h-3 w-24 bg-slate-200 dark:bg-slate-800" />
                <Skeleton className="h-5 w-4/5 bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-800" />
                  <Skeleton className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800" />
                </div>
                <Skeleton className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingCourses() {
  const currentT = useTranslation();
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
    return (
      <div role="status" aria-label={currentT.homeCourses.loading}>
        <CourseSectionSkeleton />
        <CourseSectionSkeleton />
        <span className="sr-only">{currentT.homeCourses.loading}</span>
      </div>
    );
  }

  return (
    <>
      <CardSection title={currentT.homeCourses.new} courses={newCourses} />

      <CardSection title={currentT.homeCourses.recommended} courses={recommendedCourses} />
    </>
  );
}

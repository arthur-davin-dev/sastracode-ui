"use client";

import type { Course } from "@/lib/course/courses";
import CardSection from "./card-section";
import { useTranslation } from "@/hooks/useTranslations";

interface LandingCoursesViewProps {
  newCourses: Course[];
  recommendedCourses: Course[];
}

export default function LandingCoursesView({
  newCourses,
  recommendedCourses,
}: LandingCoursesViewProps) {
  const currentT = useTranslation();

  return (
    <>
      <CardSection title={currentT.homeCourses.new} courses={newCourses} />
      <CardSection
        title={currentT.homeCourses.recommended}
        courses={recommendedCourses}
      />
    </>
  );
}

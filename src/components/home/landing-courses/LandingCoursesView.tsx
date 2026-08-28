"use client";

import type { Course } from "@/lib/course/courses";
import CardSection from "./card-section";
import ScrollReveal from "@/components/home/ScrollReveal";
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
      <ScrollReveal direction="up" distance={44} duration={0.7} amount={0.05}>
        <CardSection title={currentT.homeCourses.new} courses={newCourses} />
      </ScrollReveal>
      <ScrollReveal direction="up" distance={44} duration={0.7} amount={0.05}>
        <CardSection
          title={currentT.homeCourses.recommended}
          courses={recommendedCourses}
        />
      </ScrollReveal>
    </>
  );
}

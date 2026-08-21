"use client";

import { useMemo, useState } from "react";
import { CourseGrid } from "../courses/CourseGrid";
import { CategoryFilter } from "../courses/CategoryFilter";
import { Course } from "@/lib/course/courses";
import { useTranslation } from "@/hooks/useTranslations";

interface RelatedCoursesProps {
  courses: Course[];
}

const ALL = "__ALL__";

export function RelatedCourses({ courses }: RelatedCoursesProps) {
  const t = useTranslation();

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        courses
          .map((course) => course.category?.trim())
          .filter((category): category is string => Boolean(category))
      )
    );

    return [
      {
        id: ALL,
        label: t.courses.categories.all,
      },
      ...unique.map((category) => ({
        id: category,
        label: category,
      })),
    ];
  }, [courses, t]);

  const [activeCategory, setActiveCategory] = useState(ALL);

  const counts = useMemo(() => {
    const map: Record<string, number> = { [ALL]: courses.length };
    courses.forEach((course) => {
      const category = course.category?.trim();
      if (category) {
        map[category] = (map[category] ?? 0) + 1;
      }
    });
    return map;
  }, [courses]);

  const filtered = useMemo(() => {
    if (activeCategory === ALL) {
      return courses;
    }

    return courses.filter(
      (course) =>
        course.category.trim().toLowerCase() ===
        activeCategory.trim().toLowerCase()
    );
  }, [courses, activeCategory]);

  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="mb-5 text-xl font-bold text-primary-color font-(family-name:--font-sans)">
        ថ្នាក់រៀនទាំងអស់
      </h2>

      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          active={[activeCategory]}
          counts={counts}
          onToggle={(categoryId) => setActiveCategory(categoryId)}
        />
      </div>

      <CourseGrid courses={filtered} />
    </section>
  );
}
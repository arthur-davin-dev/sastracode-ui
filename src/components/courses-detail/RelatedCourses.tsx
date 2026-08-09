"use client";

import { useMemo, useState } from "react";
import { CourseGrid } from "../courses/CourseGrid";
import { CategoryFilter } from "../courses/CategoryFilter";
import { Course } from "@/lib/course/courses";

interface RelatedCoursesProps {
  courses: Course[];
}

const ALL_LABEL = "មេរៀនទាំងអស់";

export function RelatedCourses({ courses }: RelatedCoursesProps) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.category)));
    return [ALL_LABEL, ...unique];
  }, [courses]);

  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);

  const filtered = useMemo(() => {
    if (activeCategory === ALL_LABEL) return courses;
    return courses.filter(
      (c) => c.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [courses, activeCategory]);

  if (courses.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="mb-5 text-2xl font-bold text-primary-color font-sans">
        ថ្នាក់រៀនទាំងអស់
      </h2>
      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>
      <CourseGrid courses={filtered} />
    </section>
  );
}
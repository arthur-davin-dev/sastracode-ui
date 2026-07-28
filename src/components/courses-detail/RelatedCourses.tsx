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
    <section className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            ថ្នាក់រៀនពាក់ព័ន្ធ
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            ស្វែងរកវគ្គសិក្សាផ្សេងទៀតដែលសមស្របសម្រាប់អ្នក
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Filtered Course Grid */}
        <CourseGrid courses={filtered} />
      </div>
    </section>
  );
}
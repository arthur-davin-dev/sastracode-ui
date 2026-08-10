"use client";

import { useMemo, useState } from "react";
import { useListCoursesQuery } from "@/redux/api/course-api";
import { toUiCourse } from "@/lib/course/course-adapter";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { CourseGrid } from "./CourseGrid";
import CourseBanner from "./course-banner";

const ALL_COURSES = "All";

export default function CourseListingPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_COURSES);
  const { data, isLoading, isFetching, error, refetch } = useListCoursesQuery({
    page: 0,
    size: 100,
    sort: "NEWEST",
  });

  const courses = useMemo(
    () => (data?.content ?? []).map(toUiCourse),
    [data],
  );
  const categories = useMemo(
    () => [
      ALL_COURSES,
      ...Array.from(
        new Set(
          (data?.content ?? []).flatMap((course) =>
            course.categories.map((category) => category.name),
          ),
        ),
      ),
    ],
    [data],
  );
  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === ALL_COURSES || course.category === activeCategory;
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, courses, search]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <CourseBanner />
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
        </div>

        {isLoading ? (
          <p className="py-16 text-center text-slate-500">Loading courses...</p>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
            <p>Unable to load courses from the API.</p>
            <button className="mt-4 rounded-lg bg-primary-color px-4 py-2 text-white" onClick={() => refetch()}>
              Try again
            </button>
          </div>
        ) : (
          <>
            {isFetching && <p className="mb-4 text-sm text-slate-500">Refreshing courses...</p>}
            <CourseGrid title="Courses" courses={filteredCourses} />
          </>
        )}
      </main>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";

import CourseBanner from "./course-banner";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { CourseGrid } from "./CourseGrid";
import { Skeleton } from "@/components/ui/skeleton";

import type { Course } from "@/lib/course/courses";
import { mapApiCourseToCourse } from "@/lib/course/course-adapter";
import { useGetPublicCoursesQuery } from "@/redux/api/course-api";

const ALL = "ទាំងអស់";
const FREE = "Free Course";
const PREMIUM = "Premium";

function CourseCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
      aria-hidden="true"
    >
      <div className="relative">
        <Skeleton className="aspect-video w-full rounded-none bg-slate-200 dark:bg-slate-800" />
        <Skeleton className="absolute left-3 top-3 h-7 w-20 rounded-full bg-slate-300 dark:bg-slate-700" />
        <Skeleton className="absolute right-3 top-3 h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
      </div>

      <div className="space-y-4 p-5">
        <Skeleton className="h-3 w-24 bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-5/6 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-5 w-2/3 bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-4 w-28 bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}

function removeDuplicateCourses(courses: Course[]) {
  return Array.from(
    new Map(courses.map((course) => [course.id, course])).values(),
  );
}

interface CourseSection {
  id?: string;
  title: string;
  seeAllHref: string;
  courses: Course[];
}

export default function CourseListingPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);

  /*
   * ===============================
   * FETCH COURSES FROM API
   * ===============================
   */

  const latestQuery = useGetPublicCoursesQuery({ sort: "NEWEST" });
  const recommendedQuery = useGetPublicCoursesQuery({ sort: "RECOMMEND" });
  const popularQuery = useGetPublicCoursesQuery({ sort: "POPULAR" });

  /*
   * ===============================
   * CONVERT API DATA TO UI COURSE
   * ===============================
   */

  const latestCourses = useMemo(() => {
    return (latestQuery.data ?? []).map(mapApiCourseToCourse);
  }, [latestQuery.data]);

  const recommendedCourses = useMemo(() => {
    return (recommendedQuery.data ?? []).map(mapApiCourseToCourse);
  }, [recommendedQuery.data]);

  const popularCourses = useMemo(() => {
    return (popularQuery.data ?? []).map(mapApiCourseToCourse);
  }, [popularQuery.data]);

  /*
   * Combine all public courses.
   * PRIVATE courses are already excluded by useGetPublicCoursesQuery.
   */
  const allCourses = useMemo(() => {
    return removeDuplicateCourses([
      ...latestCourses,
      ...recommendedCourses,
      ...popularCourses,
    ]);
  }, [latestCourses, recommendedCourses, popularCourses]);

  /*
   * ===============================
   * DEFAULT SECTIONS (no search/filter)
   * ===============================
   */
  const sections: CourseSection[] = useMemo(
    () => [
      {
        id: "latest-courses",
        title: "វគ្គសិក្សាថ្មីបំផុត",
        seeAllHref: "/courses?sort=NEWEST",
        courses: latestCourses.slice(0, 6),
      },
      {
        title: "វគ្គសិក្សាអនុសាសន៍",
        seeAllHref: "/courses?sort=RECOMMEND",
        courses: recommendedCourses.slice(0, 6),
      },
      {
        title: "វគ្គសិក្សាពេញនិយម",
        seeAllHref: "/courses?sort=POPULAR",
        courses: popularCourses.slice(0, 6),
      },
    ],
    [latestCourses, recommendedCourses, popularCourses],
  );

  /*
   * ===============================
   * CATEGORY FILTER
   * ===============================
   */
  const categories = useMemo(() => {
    const apiCategories = Array.from(
      new Set(
        allCourses
          .map((course) => course.category?.trim())
          .filter((category): category is string => Boolean(category)),
      ),
    );

    return [ALL, FREE, PREMIUM, ...apiCategories];
  }, [allCourses]);

  /*
   * ===============================
   * SEARCH + FILTER
   * ===============================
   */
  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allCourses.filter((course) => {
      const category = course.category?.toLowerCase() ?? "";

      const matchesCategory =
        activeCategory === ALL ||
        (activeCategory === FREE && course.accessType === "FREE") ||
        (activeCategory === PREMIUM && course.accessType === "PREMIUM") ||
        category === activeCategory.toLowerCase();

      const matchesSearch =
        query.length === 0 ||
        course.title.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query) ||
        course.tags?.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [allCourses, search, activeCategory]);

  /*
   * ===============================
   * LOADING
   * ===============================
   */
  const isLoading =
    latestQuery.isLoading || recommendedQuery.isLoading || popularQuery.isLoading;

  /*
   * Only show main error if all course requests failed.
   */
  const hasError =
    Boolean(latestQuery.error) &&
    Boolean(recommendedQuery.error) &&
    Boolean(popularQuery.error);

  const isFiltering = search.trim().length > 0 || activeCategory !== ALL;

  /*
   * ===============================
   * RETRY
   * ===============================
   */
  const handleRetry = () => {
    void latestQuery.refetch();
    void recommendedQuery.refetch();
    void popularQuery.refetch();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <CourseBanner />

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {isLoading && allCourses.length === 0 ? (
          <div
            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
            role="status"
            aria-label="កំពុងទាញយកវគ្គសិក្សា"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
            <span className="sr-only">Loading courses...</span>
          </div>
        ) : hasError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/20">
            <p className="text-sm font-medium text-red-700 dark:text-red-300">
              មិនអាចទាញយកវគ្គសិក្សាបានទេ
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 rounded-xl bg-[#002455] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              ព្យាយាមម្ដងទៀត
            </button>
          </div>
        ) : isFiltering ? (
          <CourseGrid title="លទ្ធផលស្វែងរក" courses={filteredCourses} />
        ) : (
          <div className="space-y-12">
            {sections.map((section) => (
              <section
                key={section.title}
                id={section.id}
                className={section.id ? "scroll-mt-24" : undefined}
              >
                <CourseGrid
                  title={section.title}
                  courses={section.courses}
                  seeAllHref={section.seeAllHref}
                />
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
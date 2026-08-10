"use client";


import { useMemo, useState } from "react";


import CourseBanner from "./course-banner";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { CourseGrid } from "./CourseGrid";


import type { Course } from "@/lib/course/courses";
import { mapApiCourseToCourse } from "@/lib/course/course-adapter";
import { useGetPublicCoursesQuery } from "@/redux/api/course-api";


const ALL = "ទាំងអស់";
const FREE = "Free Course";
const PREMIUM = "Premium";


function removeDuplicateCourses(courses: Course[]) {
  return Array.from(
    new Map(courses.map((course) => [course.id, course])).values(),
  );
}


export default function CourseListingPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);


  /*
   * ===============================
   * FETCH COURSES FROM API
   * ===============================
   */


  const latestQuery = useGetPublicCoursesQuery({
    sort: "NEWEST",
  });


  const recommendedQuery = useGetPublicCoursesQuery({
    sort: "RECOMMEND",
  });


  const popularQuery = useGetPublicCoursesQuery({
    sort: "POPULAR",
  });


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
   *
   * PRIVATE courses are already excluded
   * by useGetPublicCoursesQuery.
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
        !query ||
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
    latestQuery.isLoading ||
    recommendedQuery.isLoading ||
    popularQuery.isLoading;


  /*
   * Only show main error if all
   * course requests failed.
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
      {/* =========================
          COURSE BANNER
      ========================== */}


      <CourseBanner />


      {/* =========================
          MAIN
      ========================== */}


      <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
        {/* Search + Category */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={search} onChange={setSearch} />


          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>


        {/* =========================
            LOADING
        ========================== */}


        {isLoading && allCourses.length === 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : hasError ? (
          /* =========================
              ERROR
          ========================== */


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
          /* =========================
              SEARCH RESULT
          ========================== */


          <CourseGrid title="លទ្ធផលស្វែងរក" courses={filteredCourses} />
        ) : (
          /* =========================
              DEFAULT COURSE SECTIONS
          ========================== */


          <div className="space-y-12">
            {/* Latest */}
            <CourseGrid
              title="វគ្គសិក្សាថ្មីបំផុត"
              courses={latestCourses.slice(0, 6)}
              seeAllHref="/courses?sort=NEWEST"
            />


            {/* Recommended */}
            <CourseGrid
              title="វគ្គសិក្សាណែនាំសម្រាប់អ្នក"
              courses={recommendedCourses.slice(3, 8)}
              seeAllHref="/courses?sort=RECOMMEND"
            />


            {/* Popular */}
            <CourseGrid
              title="វគ្គសិក្សាពេញនិយម"
              courses={popularCourses.slice(5, 1)}
              seeAllHref="/courses?sort=POPULAR"
            />
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


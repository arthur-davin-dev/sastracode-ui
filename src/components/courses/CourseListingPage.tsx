"use client";

import { useMemo, useState } from "react";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { CourseGrid } from "./CourseGrid";
import { Course } from "@/lib/course/courses";
import { useGetCoursesQuery } from "@/redux/api";
import type { CourseResponse } from "@/types/course";
import CourseBanner from "./course-banner";

const categories = [
  "ទាំងអស់",
  "HTML",
  "CSS",
  "Free Course",
  "Frontend",
  "Backend",
  "JavaScript",
  "UI/UX",
];

function mapApiCourseToCourse(course: CourseResponse): Course {
  const lessons =
    course.sections?.reduce(
      (sum, section) => sum + (section.videos?.length ?? 0),
      0,
    ) || 0;

  const isFree = course.accessType === "FREE" || course.price === 0;

  return {
    id: course.id,
    category:
      course.categories?.[0]?.name || (isFree ? "ឥតគិតថ្លៃ" : "ថ្នាក់គិតថ្លៃ"),
    title: course.title,
    description: course.summary ?? course.description ?? "",
    lessons,
    duration:
      course.level === "BEGINNER"
        ? "Beginner"
        : course.level === "INTERMEDIATE"
        ? "Intermediate"
        : course.level === "ADVANCED"
        ? "Advanced"
        : "មិនមាន",
    image:
      course.thumbnailFileId?.url || "/assets/images/javascript-course.png",
    href: `/courses/${course.id}`,
    price: course.price,
    accessType: course.accessType,
    locked: course.accessType === "PRIVATE" || course.hasFullAccess === false,
  };
}

interface CourseSectionDefinition {
  title: string;
  seeAllHref: string;
  getCourses: (courses: Course[]) => Course[];
}

const courseSections: CourseSectionDefinition[] = [
  {
    title: "ចុងក្រោយបំផុត",
    seeAllHref: "/documentation/lessons?category=latest",
    getCourses: (courses) => courses.slice(0, 6),
  },
  {
    title: "ណែនាំសម្រាប់អ្នក",
    seeAllHref: "/documentation/lessons?category=recommended",
    getCourses: (courses) =>
      courses
        .filter(
          (course) =>
            course.accessType === "FREE" ||
            course.category.toLowerCase().includes("frontend"),
        )
        .slice(0, 6),
  },
  {
    title: "មេរៀនពេញនិយម",
    seeAllHref: "/documentation/lessons?category=popular",
    getCourses: (courses) => courses.slice(6, 12),
  },
];

export default function CourseListingPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const { data, isLoading, isError } = useGetCoursesQuery();

  const apiCourses = useMemo(
    () => (data?.content ?? []).map(mapApiCourseToCourse),
    [data],
  );

  const filteredCourses = useMemo(() => {
    return apiCourses.filter((course) => {
      const matchesCategory =
        activeCategory === categories[0] ||
        course.category.toLowerCase() === activeCategory.toLowerCase();

      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory, apiCourses]);

  const sectionCourses = courseSections.map((section) => ({
    ...section,
    courses: section.getCourses(apiCourses),
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <CourseBanner />
        <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
            កំពុងទាញយកវគ្គសិក្សាសូមរង់ចាំ...
          </p>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <CourseBanner />
        <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            <p className="font-semibold">មានកំហុសក្នុងការទាញទិន្ន័យវគ្គសិក្សា</p>
            <p className="mt-2 text-sm">
              សូមព្យាយាមឡើងវិញ ឬពិនិត្យឲ្យแน่ใจថាប្រូសេស API មានស្រាប់។
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Top Hero Banner */}
      <CourseBanner />

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
        {/* Search & Filter Row */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {search.trim() || activeCategory !== categories[0] ? (
          <CourseGrid title="លទ្ធផលស្វែងរក" courses={filteredCourses} />
        ) : (
          <div className="space-y-12">
            {sectionCourses.map((section) => (
              <CourseGrid
                key={section.title}
                title={section.title}
                courses={section.courses}
                seeAllHref={section.seeAllHref}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import CourseGrid from "@/components/documentation/CourseGrid";
import {
  type TutorialSummary,
  useListTutorialsQuery,
} from "@/redux/api/tutorial-api";
import type { Course, TechTag } from "@/types/course";

interface DocumentationTutorialsProps {
  showSections?: boolean;
}

function getTechTag(tutorial: TutorialSummary): TechTag {
  const value = `${tutorial.title} ${tutorial.slug}`.toLowerCase();

  if (value.includes("python")) return "Python";
  if (value.includes("javascript") || value.includes("js")) return "JavaScript";
  if (value.includes("java")) return "Java";
  if (value.includes("css")) return "CSS";
  return "HTML";
}

function toCourse(tutorial: TutorialSummary): Course {
  return {
    id: tutorial.id,
    title: tutorial.title,
    titleKm: tutorial.title,
    description: tutorial.summary || "Open this tutorial to start learning.",
    tag: getTechTag(tutorial),
    href: `/documentation/lessons/${tutorial.id}`,
    coverImage: tutorial.coverFileId
      ? `/api/v1/files/${encodeURIComponent(tutorial.coverFileId)}`
      : "/images/doc-hero.png",
    ctaLabel: "រៀនឥឡូវ",
  };
}

function LoadingGrid() {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="កំពុងទាញយកមេរៀន"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
        />
      ))}
    </div>
  );
}

export default function DocumentationTutorials({
  showSections = true,
}: DocumentationTutorialsProps) {
  const { data, isLoading, isFetching, error, refetch } = useListTutorialsQuery({
    status: "PUBLISHED",
    page: 0,
    size: 100,
    sort: "publishedAt,desc",
  });

  if (isLoading) return <LoadingGrid />;

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 font-khmer text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
        <p>មិនអាចទាញយកមេរៀនបានទេ។ សូមព្យាយាមម្ដងទៀត។</p>
        <button
          type="button"
          className="mt-3 font-semibold underline"
          onClick={() => refetch()}
        >
          ព្យាយាមម្ដងទៀត
        </button>
      </div>
    );
  }

  const tutorials = data?.data?.content ?? [];
  const courses = tutorials.map(toCourse);

  if (!courses.length) {
    return (
      <p className="rounded-2xl bg-white p-8 text-center font-khmer text-slate-500 dark:bg-slate-900">
        មិនទាន់មានមេរៀនដែលបានបោះពុម្ពទេ។
      </p>
    );
  }

  if (!showSections) {
    return (
      <div aria-busy={isFetching}>
        <CourseGrid title="មេរៀនទាំងអស់" courses={courses} />
      </div>
    );
  }

  const latestCourses = courses.slice(0, 3);
  const recommendedCourses = courses.slice(1, 4);
  const popularCourses = [...tutorials]
    .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
    .slice(0, 3)
    .map(toCourse);

  return (
    <div className="contents" aria-busy={isFetching}>
      <CourseGrid
        title="ចុងក្រោយបំផុត"
        courses={latestCourses}
        seeAllHref="/documentation/lessons?category=latest"
      />
      <CourseGrid
        title="ណែនាំសម្រាប់អ្នក"
        courses={recommendedCourses}
        seeAllHref="/documentation/lessons?category=recommended"
      />
      <CourseGrid
        title="មេរៀនពេញនិយម"
        courses={popularCourses}
        seeAllHref="/documentation/lessons?category=popular"
      />
      <CourseGrid
        title="មេរៀនទាំងអស់"
        courses={courses}
        seeAllHref="/documentation/lessons"
      />
    </div>
  );
}

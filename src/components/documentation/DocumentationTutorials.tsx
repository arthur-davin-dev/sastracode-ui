"use client";

import CourseGrid from "@/components/documentation/CourseGrid";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type TutorialSummary,
  useListTutorialsQuery,
} from "@/redux/api/tutorial-api";
import type { Course, TechTag } from "@/types/course";

interface DocumentationTutorialsProps {
  showSections?: boolean;
}

export function getTechTag(tutorial: TutorialSummary): TechTag {
  const value = `${tutorial.title} ${tutorial.slug}`.toLowerCase();

  if (value.includes("python")) return "Python";
  if (value.includes("javascript") || value.includes("js")) return "JavaScript";
  if (value.includes("java")) return "Java";
  if (value.includes("css")) return "CSS";
  return "HTML";
}

export function toCourse(tutorial: TutorialSummary): Course {
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
    viewCount: tutorial.viewCount ?? 0,
    ctaLabel: "រៀនឥឡូវ",
  };
}

function DocumentationCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900"
      aria-hidden="true"
    >
      <div className="relative">
        <Skeleton className="h-44 w-full rounded-none bg-slate-200 dark:bg-slate-800" />
        <Skeleton className="absolute left-3 top-3 h-7 w-20 rounded-lg bg-slate-300 dark:bg-slate-700" />
        <Skeleton className="absolute right-3 top-3 h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
      </div>

      <div className="space-y-4 p-5">
        <Skeleton className="h-6 w-4/5 bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800" />
        </div>
        <Skeleton className="h-4 w-24 bg-slate-200 dark:bg-slate-800" />
        <Skeleton className="h-11 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

function LoadingGrid({ showSections }: { showSections: boolean }) {
  const sections = showSections ? 3 : 1;
  const cardsPerSection = showSections ? 3 : 6;

  return (
    <div
      className="contents"
      role="status"
      aria-label="កំពុងទាញយកមេរៀន"
    >
      {Array.from({ length: sections }, (_, sectionIndex) => (
        <section key={sectionIndex} className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-56 bg-slate-200 dark:bg-slate-800" />
            {showSections && (
              <Skeleton className="h-5 w-24 bg-slate-200 dark:bg-slate-800" />
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: cardsPerSection }, (_, cardIndex) => (
              <DocumentationCardSkeleton key={cardIndex} />
            ))}
          </div>
        </section>
      ))}
      <span className="sr-only">Loading documentation...</span>
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

  if (isLoading) return <LoadingGrid showSections={showSections} />;

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
        title="មេរៀនចុងក្រោយបំផុត"
        courses={latestCourses}
        seeAllHref="/documentation/lessons?category=latest"
      />
      <CourseGrid
        title="មេរៀនសិក្សាអនុសាសន៍"
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

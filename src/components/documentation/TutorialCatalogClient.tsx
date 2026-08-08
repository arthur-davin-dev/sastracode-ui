"use client";

import CourseGrid from "@/components/documentation/CourseGrid";
import { useListTutorialsQuery, type TutorialSummary } from "@/redux/api/tutorial-api";
import type { Course, TechTag } from "@/types/course";
import { AlertCircle, LoaderCircle } from "lucide-react";

interface TutorialCatalogClientProps {
  mode?: "home" | "all";
}

function inferTag(tutorial: TutorialSummary): TechTag {
  const value = `${tutorial.title} ${tutorial.slug}`.toLowerCase();
  if (value.includes("python")) return "Python";
  if (value.includes("javascript") || value.includes("js")) return "JavaScript";
  if (value.includes("css")) return "CSS";
  if (value.includes("html")) return "HTML";
  return "Java";
}

function toCourse(tutorial: TutorialSummary): Course {
  return {
    id: tutorial.id,
    title: tutorial.title,
    titleKm: tutorial.title,
    description: tutorial.summary || "Open this tutorial to start learning.",
    tag: inferTag(tutorial),
    href: `/documentation/lessons/${tutorial.id}`,
    coverImage: "/images/html.png",
    ctaLabel: "Learn now",
  };
}

export default function TutorialCatalogClient({ mode = "home" }: TutorialCatalogClientProps) {
  const { data: response, error, isLoading, refetch } = useListTutorialsQuery({
    status: "PUBLISHED",
    page: 0,
    size: 30,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-48 items-center justify-center gap-3 text-slate-600 dark:text-slate-300">
        <LoaderCircle className="size-6 animate-spin" />
        <span>Loading tutorials…</span>
      </div>
    );
  }

  if (error) {
    const status = "status" in error ? error.status : "FETCH_ERROR";
    return (
      <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-red-200 p-6 text-center dark:border-red-900">
        <AlertCircle className="mb-3 size-8 text-red-500" />
        <p className="font-semibold text-slate-900 dark:text-white">Unable to load tutorials</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Request status: {String(status)}</p>
        <button type="button" onClick={() => refetch()} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Try again
        </button>
      </div>
    );
  }

  const source = response?.data.content ?? [];
  const tutorials = source.map(toCourse);

  if (tutorials.length === 0) {
    return <p className="py-12 text-center text-slate-600 dark:text-slate-300">No published tutorials found.</p>;
  }

  if (mode === "all") return <CourseGrid title="All lessons" courses={tutorials} />;

  const latest = tutorials.slice(0, 3);
  const recommended = tutorials.slice(3, 6).length ? tutorials.slice(3, 6) : latest;
  const popularIds = [...source].sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0)).slice(0, 3).map(({ id }) => id);
  const popular = popularIds.map((id) => tutorials.find((tutorial) => tutorial.id === id)).filter((tutorial): tutorial is Course => Boolean(tutorial));

  return (
    <>
      <CourseGrid title="Latest lessons" courses={latest} seeAllHref="/documentation/lessons" />
      <CourseGrid title="Recommended for you" courses={recommended} seeAllHref="/documentation/lessons" />
      <CourseGrid title="Popular lessons" courses={popular} seeAllHref="/documentation/lessons" />
      <CourseGrid title="All lessons" courses={tutorials} seeAllHref="/documentation/lessons" />
    </>
  );
}

"use client";

import CourseGrid from "@/components/documentation/CourseGrid";
import { toCourse } from "@/components/documentation/DocumentationTutorials";
import { useListTutorialsQuery } from "@/redux/api/tutorial-api";

export default function HomePopularDocumentation() {
  const { data, isLoading, isFetching, isError, refetch } =
    useListTutorialsQuery({
      status: "PUBLISHED",
      page: 0,
      size: 3,
      sort: "viewCount,desc",
    });

  if (isLoading) {
    return (
      <section className="space-y-6" aria-label="Loading popular lessons">
        <div className="h-8 w-52 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
        <p className="font-khmer font-semibold text-red-700 dark:text-red-300">
          មិនអាចទាញយកមេរៀនពេញនិយមបានទេ។
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 rounded-xl bg-primary-color px-4 py-2 text-sm font-bold text-white"
        >
          ព្យាយាមម្តងទៀត
        </button>
      </section>
    );
  }

  const courses = (data?.data.content ?? []).map(toCourse);

  if (!courses.length) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="font-khmer text-slate-600 dark:text-slate-300">
          មិនទាន់មានមេរៀនពេញនិយមទេ។
        </p>
      </section>
    );
  }

  return (
    <div className={isFetching ? "opacity-70" : undefined} aria-busy={isFetching}>
      <CourseGrid
        title="មេរៀនពេញនិយម"
        courses={courses}
        seeAllHref="/documentation/lessons?category=popular"
      />
    </div>
  );
}

import CourseGrid from "@/components/documentation/CourseGrid";
import { toCourse } from "@/lib/documentation/tutorial-to-course";
import RetryButton from "./RetryButton";
import { fetchPublicBackendJson } from "@/lib/server/public-backend-fetch";
import type { ApiResponse, TutorialPage } from "@/redux/api/tutorial-api";

async function fetchPopularTutorials() {
  const response = await fetchPublicBackendJson<ApiResponse<TutorialPage>>(
    "/api/v1/tutorials",
    { status: "PUBLISHED", page: 0, size: 3, sort: "viewCount,desc" },
  );

  if (!response) return { courses: null, error: true } as const;

  const courses = (response.data?.content ?? []).map((tutorial) =>
    toCourse(tutorial),
  );
  return { courses, error: false } as const;
}

export default async function HomePopularDocumentation() {
  const { courses, error } = await fetchPopularTutorials();

  if (error) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
        <p className="font-khmer font-semibold text-red-700 dark:text-red-300">
          មិនអាចទាញយកមេរៀនពេញនិយមបានទេ។
        </p>
        <RetryButton label="ព្យាយាមម្តងទៀត" />
      </section>
    );
  }

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
    <CourseGrid
      title="មេរៀនពេញនិយម"
      courses={courses}
      seeAllHref="/documentation/lessons?category=popular"
    />
  );
}

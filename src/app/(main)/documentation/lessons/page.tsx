import Link from "next/link";
import HeroSearchBar from "@/components/documentation/HeroSearchBar";
import Backbutton from "@/components/documentation/Backbutton";
import DocumentationTutorials from "@/components/documentation/DocumentationTutorials";

const filters = [
  { value: "all", label: "ទាំងអស់" },
  { value: "latest", label: "ថ្មីបំផុត" },
  { value: "recommended", label: "ណែនាំ" },
  { value: "popular", label: "ពេញនិយម" },
] as const;

export default async function AllLessonsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category: requestedCategory, page: requestedPage } = await searchParams;
  const category = filters.some((filter) => filter.value === requestedCategory)
    ? (requestedCategory as (typeof filters)[number]["value"])
    : "all";
  const parsedPage = Number.parseInt(requestedPage ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        {/* Top Navigation & Search Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Backbutton />
          <div className="w-full sm:w-auto">
            <HeroSearchBar />
          </div>
        </div>

        <nav className="flex flex-wrap gap-2" aria-label="Filter lessons">
          {filters.map((filter) => (
            <Link
              key={filter.value}
              href={
                filter.value === "all"
                  ? "/documentation/lessons"
                  : `/documentation/lessons?category=${filter.value}`
              }
              aria-current={category === filter.value ? "page" : undefined}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                category === filter.value
                  ? "border-primary-color bg-primary-color text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:border-primary-color hover:text-primary-color dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {filter.label}
            </Link>
          ))}
        </nav>

        <DocumentationTutorials
          showSections={false}
          category={category}
          page={page}
        />
      </div>
    </main>
  );
}

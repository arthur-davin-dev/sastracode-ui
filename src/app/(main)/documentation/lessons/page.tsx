import Link from "next/link";
import HeroSearchBar from "@/components/documentation/HeroSearchBar";
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
    <main className="min-h-screen bg-transparent transition-colors duration-300 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24">
            <div>
              <h1 className="mb-4 font-khmer text-2xl font-bold text-[#002455] dark:text-white">
                ស្វែងរកមេរៀន
              </h1>
              <HeroSearchBar />
            </div>

            <div className="border-t border-slate-200 pt-5 dark:border-slate-700">
              <h2 className="mb-3 font-khmer text-lg font-bold text-[#002455] dark:text-white">
                តម្រង
              </h2>
              <nav
                className="grid grid-cols-2 gap-2 lg:grid-cols-1"
                aria-label="Filter lessons"
              >
                {filters.map((filter) => (
                  <Link
                    key={filter.value}
                    href={
                      filter.value === "all"
                        ? "/documentation/lessons"
                        : `/documentation/lessons?category=${filter.value}`
                    }
                    aria-current={category === filter.value ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 font-khmer text-lg font-semibold transition-colors ${
                      category === filter.value
                        ? "bg-primary-color text-white shadow-sm dark:bg-blue-600"
                        : "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {filter.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            <DocumentationTutorials showSections={false} category={category} page={page} />
          </div>
        </div>
      </div>
    </main>
  );
}

import { Search } from "lucide-react";

import DocsShell from "@/components/documentation/DocsShell";
import FilterTabs from "@/components/documentation/FilterTabs";
import SearchResultCard from "@/components/documentation/SearchResultCard";
import SortDropdown from "@/components/documentation/SortDropdown";

import { searchResults } from "@/lib/data/documentation";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

export default async function SearchDocsPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  const query = Array.isArray(params.q)
    ? params.q[0] ?? ""
    : params.q ?? "";

  const normalizedQuery = query.toLowerCase().trim();

  const filteredResults = normalizedQuery
    ? searchResults.filter((result) => {
        const title = result.title?.toLowerCase() ?? "";
        const description = result.description?.toLowerCase() ?? "";

        const content =
          "content" in result && typeof result.content === "string"
            ? result.content.toLowerCase()
            : "";

        return (
          title.includes(normalizedQuery) ||
          description.includes(normalizedQuery) ||
          content.includes(normalizedQuery)
        );
      })
    : [];

  return (
    <DocsShell>
      <div className="flex flex-col gap-6">
        <form
          action="/documentation/search"
          method="get"
          className="relative w-full"
        >
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="ស្វែងរកមេរៀន..."
            className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </form>

        <FilterTabs
          options={[
            "កម្រិតមូលដ្ឋាន",
            "កម្រិតមធ្យម",
            "កម្រិតខ្ពស់",
          ]}
        />

        {normalizedQuery ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                រកឃើញលទ្ធផល{" "}
                <span className="font-semibold text-foreground">
                  {filteredResults.length}
                </span>{" "}
                សម្រាប់{" "}
                <span className="font-semibold text-primary">
                  &ldquo;{query}&rdquo;
                </span>
              </p>

              <SortDropdown />
            </div>

            {filteredResults.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredResults.map((result) => (
                  <SearchResultCard
                    key={result.id}
                    result={result}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <p className="font-khmer text-sm text-destructive">
                  មិនមានលទ្ធផលស្វែងរកទេ!
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <p className="font-khmer text-sm">
              សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរកមេរៀន...
            </p>
          </div>
        )}
      </div>
    </DocsShell>
  );
}

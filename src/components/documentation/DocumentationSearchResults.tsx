"use client";

import FilterTabs from "@/components/documentation/FilterTabs";
import SearchResultCard from "@/components/documentation/SearchResultCard";
import SortDropdown from "@/components/documentation/SortDropdown";
import { useGlobalSearchQuery } from "@/redux/service/searchApi";

export default function DocumentationSearchResults({ query }: { query: string }) {
  const normalizedQuery = query.trim();
  const { data, isLoading, isFetching, error, refetch } = useGlobalSearchQuery(
    {
      q: normalizedQuery,
      type: "TUTORIAL",
      sort: "popular",
      page: 0,
      size: 20,
    },
    { skip: normalizedQuery.length < 2 },
  );

  if (!normalizedQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p className="font-khmer text-sm">
          សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរកមេរៀន...
        </p>
      </div>
    );
  }

  if (normalizedQuery.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p className="font-khmer text-sm">សូមបញ្ចូលយ៉ាងហោចណាស់ ២ តួអក្សរ។</p>
      </div>
    );
  }

  const results = data?.data?.items ?? [];
  const total = data?.data?.total ?? results.length;

  return (
    <div className="flex flex-col gap-6" aria-busy={isFetching}>
      <FilterTabs options={["កម្រិតមូលដ្ឋាន", "កម្រិតមធ្យម", "កម្រិតខ្ពស់"]} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          រកឃើញលទ្ធផល{" "}
          <span className="font-semibold text-foreground">{total}</span>{" "}
          សម្រាប់{" "}
          <span className="font-semibold text-primary">&ldquo;{query}&rdquo;</span>
        </p>
        <SortDropdown />
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-4" aria-label="កំពុងស្វែងរក">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <p className="font-khmer text-sm text-destructive">
            មិនអាចទាញយកលទ្ធផលស្វែងរកបានទេ។
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="font-khmer text-sm font-semibold text-primary underline"
          >
            ព្យាយាមម្ដងទៀត
          </button>
        </div>
      ) : results.length > 0 ? (
        <div className="flex flex-col gap-4">
          {results.map((result) => (
            <SearchResultCard key={`${result.type}-${result.id}`} result={result} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <p className="font-khmer text-sm text-destructive">
            មិនមានលទ្ធផលស្វែងរកទេ!
          </p>
        </div>
      )}
    </div>
  );
}

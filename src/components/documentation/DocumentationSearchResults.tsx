"use client";

import Link from "next/link";
import { SearchX } from "lucide-react";
import { useMemo, useState } from "react";

import FilterTabs from "@/components/documentation/FilterTabs";
import SearchResultCard from "@/components/documentation/SearchResultCard";
import SortDropdown from "@/components/documentation/SortDropdown";
import { useGlobalSearchQuery } from "@/redux/service/searchApi";
import {
  apiSortFor,
  filterByLevel,
  LEVEL_FILTER_OPTIONS,
  SORT_OPTIONS,
  sortResults,
  type LevelFilterValue,
  type SortKey,
} from "@/utils/search-filters";

const PAGE_SIZE = 20;

export default function DocumentationSearchResults({ query }: { query: string }) {
  const normalizedQuery = query.trim();
  const [level, setLevel] = useState<LevelFilterValue>("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("relevance");
  const [size, setSize] = useState(PAGE_SIZE);

  const { data, isLoading, isFetching, error, refetch } = useGlobalSearchQuery(
    {
      q: normalizedQuery,
      type: "TUTORIAL",
      sort: apiSortFor(sortKey),
      page: 0,
      size,
    },
    { skip: normalizedQuery.length < 2 },
  );

  const rawResults = useMemo(() => data?.data?.items ?? [], [data]);
  const results = useMemo(
    () => sortResults(filterByLevel(rawResults, level), sortKey),
    [rawResults, level, sortKey],
  );
  const total = data?.data?.total ?? rawResults.length;
  const canLoadMore = rawResults.length < total && rawResults.length >= size;

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

  return (
    <div className="flex flex-col gap-6" aria-busy={isFetching}>
      <FilterTabs options={LEVEL_FILTER_OPTIONS} value={level} onChange={setLevel} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          រកឃើញលទ្ធផល{" "}
          <span className="font-semibold text-foreground">{results.length}</span>
          {level !== "ALL" && (
            <>
              {" "}
              ក្នុងចំណោម{" "}
              <span className="font-semibold text-foreground">{rawResults.length}</span>
            </>
          )}{" "}
          សម្រាប់{" "}
          <span className="font-semibold text-primary">&ldquo;{query}&rdquo;</span>
        </p>
        <SortDropdown options={SORT_OPTIONS} value={sortKey} onChange={setSortKey} />
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

          {canLoadMore && (
            <button
              type="button"
              onClick={() => setSize((current) => current + PAGE_SIZE)}
              disabled={isFetching}
              className="mx-auto mt-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isFetching ? "កំពុងផ្ទុក..." : "មើលបន្ថែម"}
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
            <SearchX className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="font-khmer text-sm text-destructive">
            {rawResults.length > 0
              ? "មិនមានលទ្ធផលសម្រាប់តម្រងកម្រិតនេះទេ។"
              : "មិនមានលទ្ធផលស្វែងរកទេ!"}
          </p>
          {rawResults.length > 0 ? (
            <button
              type="button"
              onClick={() => setLevel("ALL")}
              className="font-khmer text-sm font-semibold text-primary underline"
            >
              សម្អាតតម្រង
            </button>
          ) : (
            <Link
              href="/documentation"
              className="font-khmer text-sm font-semibold text-primary underline"
            >
              មើលមេរៀនទាំងអស់
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

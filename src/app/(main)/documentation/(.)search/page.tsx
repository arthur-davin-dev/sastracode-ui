"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import FilterTabs from "@/components/documentation/FilterTabs";
import SearchResultCard from "@/components/documentation/SearchResultCard";
import SortDropdown from "@/components/documentation/SortDropdown";
import { useGlobalSearchQuery } from "@/redux/service/searchApi";

function SearchDocsModalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(initialQuery);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  // Close the modal when the user presses Escape.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  // Update the URL query after the user stops typing for 300ms.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const trimmedInput = inputValue.trim();

      if (trimmedInput) {
        params.set("q", trimmedInput);
      } else {
        params.delete("q");
      }

      const queryString = params.toString();

      router.replace(queryString ? `?${queryString}` : "?", {
        scroll: false,
      });
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [inputValue, router]);

  const query = inputValue.trim();
  const { data, isFetching, error } = useGlobalSearchQuery(
    { q: query, type: "TUTORIAL", sort: "popular", page: 0, size: 20 },
    { skip: query.length < 2 },
  );
  const filteredResults = data?.data?.items ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[10vh] backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close search modal"
        className="absolute inset-0 cursor-default"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl animate-in zoom-in-95 duration-200 dark:bg-zinc-950">
        <div className="flex justify-end px-4 pb-1 pt-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground shadow-sm transition-colors hover:bg-accent"
          >
            Esc
          </button>
        </div>

        <div className="flex flex-col gap-1 space-y-6 overflow-y-auto p-6 pt-1">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="relative w-full"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              name="q"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="ស្វែងរកមេរៀន..."
              autoFocus
              className="w-full rounded-[16px] border border-border bg-card py-3 pl-11 pr-4 text-[18px] outline-none transition-all focus:border-[#002455] focus:ring-1 focus:ring-[#002455]"
            />
          </form>

          {inputValue.trim() ? (
            <div className="flex flex-col gap-1 space-y-6">
              <FilterTabs
                options={[
                  "កម្រិតមូលដ្ឋាន",
                  "កម្រិតមធ្យម",
                  "កម្រិតខ្ពស់",
                ]}
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[18px] text-muted-foreground">
                  រកឃើញលទ្ធផល{" "}
                  <span className="font-semibold text-foreground">
                    {data?.data?.total ?? filteredResults.length}
                  </span>{" "}
                  សម្រាប់{" "}
                  <span className="font-semibold text-primary">
                    &ldquo;{inputValue}&rdquo;
                  </span>
                </p>

                <SortDropdown />
              </div>

              {isFetching ? (
                <div className="flex flex-col gap-4 pb-2">
                  {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="h-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  ))}
                </div>
              ) : error ? (
                <div className="py-12 text-center font-khmer text-sm text-destructive">
                  មិនអាចទាញយកលទ្ធផលស្វែងរកបានទេ។
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="flex flex-col gap-4 pb-2">
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
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <p className="font-khmer text-sm">
                សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរកមេរៀន...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchDocsModal() {
  return (
    <Suspense fallback={null}>
      <SearchDocsModalContent />
    </Suspense>
  );
}

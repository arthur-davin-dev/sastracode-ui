"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, LoaderCircle, SearchX } from "lucide-react";

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

function SearchDocsModalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = useState(initialQuery);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  /* -------------------------------------------------------------------------- */
  /*                              Close with ESC                                */
  /* -------------------------------------------------------------------------- */

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

  /* -------------------------------------------------------------------------- */
  /*                            Update search params                            */
  /* -------------------------------------------------------------------------- */

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

  /* -------------------------------------------------------------------------- */
  /*                                  Search                                    */
  /* -------------------------------------------------------------------------- */

  const query = inputValue.trim();

  const [level, setLevel] = useState<LevelFilterValue>("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("relevance");

  const { data, isFetching, error } = useGlobalSearchQuery(
    {
      q: query,
      type: "TUTORIAL",
      sort: apiSortFor(sortKey),
      page: 0,
      size: 20,
    },
    {
      skip: query.length < 2,
    },
  );

  const rawResults = useMemo(() => data?.data?.items ?? [], [data]);
  const filteredResults = useMemo(
    () => sortResults(filterByLevel(rawResults, level), sortKey),
    [rawResults, level, sortKey],
  );
  const totalResults = data?.data?.total ?? rawResults.length;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-start justify-center
        bg-slate-950/55
        px-4
        pt-[10vh]
        backdrop-blur-[3px]
      "
      onMouseDown={handleClose}
    >
      {/* Modal */}
      <div
        onMouseDown={(event) => event.stopPropagation()}
        className="
          relative
          flex
          max-h-[80vh]
          w-full
          max-w-[760px]
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-[0_24px_80px_rgba(0,0,0,0.28)]
          animate-in
          fade-in
          zoom-in-95
          duration-200

          dark:border-zinc-800
          dark:bg-zinc-950
        "
      >
        {/* ------------------------------------------------------------------ */}
        {/* Search Header                                                      */}
        {/* ------------------------------------------------------------------ */}

        <div
          className="
            shrink-0
            border-b
            border-slate-100
            bg-white
            p-5

            dark:border-zinc-800
            dark:bg-zinc-950
          "
        >
          <form
            onSubmit={(event) => event.preventDefault()}
            className="relative"
          >
            {/* Search Icon */}
            <Search
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                size-5
                -translate-y-1/2
                text-[#002455]

                dark:text-violet-400
              "
            />

            {/* Input */}
            <input
              type="search"
              name="q"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="ស្វែងរកមេរៀន..."
              autoFocus
              autoComplete="off"
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-white
                pl-12
                pr-20
                font-khmer
                text-[16px]
                font-medium
                text-slate-900
                outline-none
                transition-all
                duration-200

                placeholder:font-normal
                placeholder:text-slate-400

                hover:border-slate-400

                focus:border-[#002455]
                focus:ring-4
                focus:ring-[#002455]/10

                dark:border-zinc-700
                dark:bg-zinc-900
                dark:text-slate-100
                dark:placeholder:text-zinc-500
                dark:hover:border-zinc-600
                dark:focus:border-violet-500
                dark:focus:ring-violet-500/10
              "
            />

            {/* ESC */}
            <button
              type="button"
              onClick={handleClose}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                rounded-lg
                border
                border-slate-200
                bg-slate-50
                px-2.5
                py-1.5
                text-xs
                font-medium
                text-slate-500
                shadow-sm
                transition

                hover:border-slate-300
                hover:bg-slate-100
                hover:text-slate-700

                dark:border-zinc-700
                dark:bg-zinc-800
                dark:text-zinc-400
                dark:hover:bg-zinc-700
                dark:hover:text-zinc-200
              "
            >
              Esc
            </button>
          </form>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Content                                                            */}
        {/* ------------------------------------------------------------------ */}

        <div
          className="
            min-h-[220px]
            flex-1
            overflow-y-auto
            overscroll-contain
            px-5
            py-5
          "
        >
          {/* -------------------------------------------------------------- */}
          {/* Empty initial state                                            */}
          {/* -------------------------------------------------------------- */}

          {!query ? (
            <div
              className="
                flex
                min-h-[190px]
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <div
                className="
                  mb-4
                  flex
                  size-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-100

                  dark:bg-zinc-900
                "
              >
                <Search
                  className="
                    size-5
                    text-slate-500

                    dark:text-zinc-400
                  "
                />
              </div>

              <p
                className="
                  font-khmer
                  text-[15px]
                  font-medium
                  text-slate-700

                  dark:text-slate-200
                "
              >
                ស្វែងរកមេរៀនដែលអ្នកចង់រៀន
              </p>

              <p
                className="
                  mt-1.5
                  max-w-sm
                  font-khmer
                  text-sm
                  leading-6
                  text-slate-500

                  dark:text-zinc-400
                "
              >
                សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរកមេរៀន...
              </p>
            </div>
          ) : query.length < 2 ? (
            /* ------------------------------------------------------------ */
            /* Query too short                                              */
            /* ------------------------------------------------------------ */

            <div
              className="
                flex
                min-h-[190px]
                items-center
                justify-center
                text-center
              "
            >
              <p
                className="
                  font-khmer
                  text-sm
                  font-medium
                  text-slate-600

                  dark:text-zinc-300
                "
              >
                សូមបញ្ចូលយ៉ាងហោចណាស់ 2 តួអក្សរ
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Filter */}
              <FilterTabs
                options={LEVEL_FILTER_OPTIONS}
                value={level}
                onChange={setLevel}
              />

              {/* Result Header */}
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-3
                  border-b
                  border-slate-100
                  pb-4

                  dark:border-zinc-800
                "
              >
                <p
                  className="
                    font-khmer
                    text-sm
                    text-slate-600

                    dark:text-zinc-300
                  "
                >
                  រកឃើញលទ្ធផល{" "}
                  <span
                    className="
                      font-semibold
                      text-slate-900

                      dark:text-white
                    "
                  >
                    {filteredResults.length}
                  </span>{" "}
                  {level !== "ALL" && (
                    <>
                      ក្នុងចំណោម{" "}
                      <span
                        className="
                          font-semibold
                          text-slate-900

                          dark:text-white
                        "
                      >
                        {totalResults}
                      </span>{" "}
                    </>
                  )}
                  សម្រាប់{" "}
                  <span
                    className="
                      font-semibold
                      text-[#534AB7]

                      dark:text-violet-400
                    "
                  >
                    &ldquo;{query}&rdquo;
                  </span>
                </p>

                <SortDropdown
                  options={SORT_OPTIONS}
                  value={sortKey}
                  onChange={setSortKey}
                />
              </div>

              {/* ---------------------------------------------------------- */}
              {/* Loading                                                    */}
              {/* ---------------------------------------------------------- */}

              {isFetching ? (
                <div className="space-y-3 pb-2">
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      py-3
                      font-khmer
                      text-sm
                      text-slate-500

                      dark:text-zinc-400
                    "
                  >
                    <LoaderCircle className="size-4 animate-spin" />

                    <span>កំពុងស្វែងរក...</span>
                  </div>

                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="
                          h-24
                          animate-pulse
                          rounded-2xl
                          border
                          border-slate-100
                          bg-slate-50

                          dark:border-zinc-800
                          dark:bg-zinc-900
                        "
                    />
                  ))}
                </div>
              ) : error ? (
                /* -------------------------------------------------------- */
                /* Error                                                    */
                /* -------------------------------------------------------- */

                <div
                  className="
                    flex
                    min-h-[180px]
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >
                  <SearchX
                    className="
                      mb-3
                      size-8
                      text-red-400
                    "
                  />

                  <p
                    className="
                      font-khmer
                      text-sm
                      font-medium
                      text-red-600

                      dark:text-red-400
                    "
                  >
                    មិនអាចទាញយកលទ្ធផលស្វែងរកបានទេ។
                  </p>

                  <p
                    className="
                      mt-1
                      font-khmer
                      text-xs
                      text-slate-500

                      dark:text-zinc-400
                    "
                  >
                    សូមព្យាយាមម្តងទៀត។
                  </p>
                </div>
              ) : filteredResults.length > 0 ? (
                /* -------------------------------------------------------- */
                /* Results                                                  */
                /* -------------------------------------------------------- */

                <div className="space-y-3 pb-2">
                  {filteredResults.map((result) => (
                    <SearchResultCard key={result.id} result={result} />
                  ))}
                </div>
              ) : (
                /* -------------------------------------------------------- */
                /* No results                                               */
                /* -------------------------------------------------------- */

                <div
                  className="
                    flex
                    min-h-[190px]
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >
                  <div
                    className="
                      mb-4
                      flex
                      size-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-slate-100

                      dark:bg-zinc-900
                    "
                  >
                    <SearchX
                      className="
                        size-5
                        text-slate-500

                        dark:text-zinc-400
                      "
                    />
                  </div>

                  <p
                    className="
                      font-khmer
                      text-[15px]
                      font-semibold
                      text-slate-800

                      dark:text-slate-100
                    "
                  >
                    {rawResults.length > 0
                      ? "មិនមានលទ្ធផលសម្រាប់តម្រងកម្រិតនេះទេ"
                      : "មិនមានលទ្ធផលស្វែងរកទេ"}
                  </p>

                  <p
                    className="
                      mt-1.5
                      font-khmer
                      text-sm
                      text-slate-500

                      dark:text-zinc-400
                    "
                  >
                    {rawResults.length > 0
                      ? "សាកល្បងផ្លាស់ប្តូរតម្រងកម្រិត។"
                      : "សាកល្បងស្វែងរកដោយប្រើពាក្យផ្សេងទៀត។"}
                  </p>

                  {rawResults.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setLevel("ALL")}
                      className="
                        mt-3
                        font-khmer
                        text-sm
                        font-semibold
                        text-[#534AB7]
                        underline

                        dark:text-violet-400
                      "
                    >
                      សម្អាតតម្រង
                    </button>
                  )}
                </div>
              )}

              {filteredResults.length > 0 && (
                <a
                  href={`/documentation/search?q=${encodeURIComponent(query)}`}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-xl
                    border
                    border-slate-100
                    py-2.5
                    font-khmer
                    text-sm
                    font-semibold
                    text-[#534AB7]
                    transition

                    hover:bg-slate-50

                    dark:border-zinc-800
                    dark:text-violet-400
                    dark:hover:bg-zinc-900
                  "
                >
                  មើលលទ្ធផលទាំងអស់នៅទំព័រពេញ
                </a>
              )}
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

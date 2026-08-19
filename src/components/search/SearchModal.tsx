// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Search, X } from "lucide-react";
// import { useGlobalSearchQuery } from "@/redux/service/searchApi";

// interface SearchModalProps {
//   open: boolean;
//   initialQuery?: string;
//   onClose: () => void;
// }

// function resultHref(result: { id: string; type: string; deepLink?: string }) {
//   if (result.deepLink?.startsWith("/")) return result.deepLink;
//   if (result.type === "TUTORIAL") return `/documentation/lessons/${result.id}`;
//   if (result.type === "COURSE") return `/courses/${result.id}`;
//   if (result.type === "CODING_TASK") return `/playground/editor?task=${result.id}`;
//   return "/documentation";
// }

// export default function SearchModal({ open, initialQuery = "", onClose }: SearchModalProps) {
//   const [input, setInput] = useState(initialQuery);
//   const [query, setQuery] = useState(initialQuery.trim());

//   useEffect(() => {
//     const timeout = window.setTimeout(() => setQuery(input.trim()), 300);
//     return () => window.clearTimeout(timeout);
//   }, [input]);
//   useEffect(() => {
//     if (!open) return;
//     const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
//     window.addEventListener("keydown", closeOnEscape);
//     return () => window.removeEventListener("keydown", closeOnEscape);
//   }, [onClose, open]);

//   const { data, isFetching, error } = useGlobalSearchQuery(
//     { q: query, size: 12, sort: "popular" },
//     { skip: !open || query.length < 2 },
//   );
//   if (!open) return null;
//   const results = data?.data?.items ?? [];

//   return <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[8vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Global search">
//     <button type="button" className="absolute inset-0 cursor-default" aria-label="Close search" onClick={onClose} />
//     <div className="relative flex max-h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
//       <div className="flex items-center gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
//         <Search className="h-5 w-5 shrink-0 text-slate-400" />
//         <input autoFocus type="search" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Search courses, tutorials, videos, and coding tasks..." className="w-full bg-transparent text-lg text-slate-900 outline-none placeholder:text-slate-400 dark:text-white" />
//         {isFetching && <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" aria-label="Searching" />}
//         <button type="button" onClick={onClose} aria-label="Close search"><X className="h-5 w-5 text-slate-500" /></button>
//       </div>
//       <div className="overflow-y-auto p-4">
//         {query.length < 2 ? <p className="py-12 text-center text-slate-500">Enter at least 2 characters to search.</p> : error ? <p className="py-12 text-center text-red-600">Search could not be loaded. Please try again.</p> : !isFetching && !results.length ? <p className="py-12 text-center text-slate-500">No results found for “{query}”.</p> : <div className="space-y-2">{results.map((result) => <Link key={`${result.type}-${result.id}`} href={resultHref(result)} onClick={onClose} className="block rounded-xl border border-transparent p-4 hover:border-blue-200 hover:bg-blue-50 dark:hover:border-blue-900 dark:hover:bg-blue-950/30">
//           <div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold text-slate-900 dark:text-white">{result.title}</h3>{result.description && <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{result.description}</p>}</div><span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{result.type.replace("_", " ")}</span></div>
//         </Link>)}</div>}
//       </div>
//     </div>
//   </div>;
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Search, X, ChevronRight } from "lucide-react";

import { useGlobalSearchQuery } from "@/redux/service/searchApi";

import {
  getUserSidebarSearchItems,
  type UserSidebarSearchItem,
} from "@/components/layout/user-sidebar-nav";

interface SearchModalProps {
  open: boolean;
  initialQuery?: string;
  onClose: () => void;
}

/* =========================================================
   API RESULT ROUTE
========================================================= */

function resultHref(result: { id: string; type: string; deepLink?: string }) {
  if (result.deepLink?.startsWith("/")) {
    return result.deepLink;
  }

  if (result.type === "TUTORIAL") {
    return `/documentation/lessons/${result.id}`;
  }

  if (result.type === "COURSE") {
    return `/courses/${result.id}`;
  }

  if (result.type === "CODING_TASK") {
    return `/playground/editor?task=${result.id}`;
  }

  return "/documentation";
}

/* =========================================================
   NORMALIZE SEARCH TEXT
========================================================= */

function normalize(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase()
    .replace(/[-_/]+/g, " ")
    .replace(/\s+/g, " ");
}

/* =========================================================
   SIDEBAR SEARCH SCORE
========================================================= */

function getSidebarSearchScore(
  item: UserSidebarSearchItem,
  query: string,
): number {
  const q = normalize(query);

  const label = normalize(item.label);
  const href = normalize(item.href);
  const slug = normalize(item.slug);
  const parent = normalize(item.parentLabel ?? "");

  const keywords = item.keywords.map(normalize);

  // Exact label
  if (label === q) {
    return 0;
  }

  // Exact keyword
  if (keywords.some((keyword) => keyword === q)) {
    return 1;
  }

  // Exact slug
  if (slug === q) {
    return 2;
  }

  // Label starts with
  if (label.startsWith(q)) {
    return 3;
  }

  // Keyword starts with
  if (keywords.some((keyword) => keyword.startsWith(q))) {
    return 4;
  }

  // Slug starts with
  if (slug.startsWith(q)) {
    return 5;
  }

  // Label contains
  if (label.includes(q)) {
    return 6;
  }

  // Keyword contains
  if (keywords.some((keyword) => keyword.includes(q))) {
    return 7;
  }

  // Route / slug contains
  if (href.includes(q) || slug.includes(q)) {
    return 8;
  }

  // Parent contains
  if (parent.includes(q)) {
    return 9;
  }

  return 999;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function SearchModal({
  open,
  initialQuery = "",
  onClose,
}: SearchModalProps) {
  const [input, setInput] = useState(initialQuery);

  const [query, setQuery] = useState(initialQuery.trim());

  /* =======================================================
     SYNC INITIAL QUERY WHEN OPENING
  ======================================================= */

  useEffect(() => {
    if (!open) {
      return;
    }

    setInput(initialQuery);
    setQuery(initialQuery.trim());
  }, [open, initialQuery]);

  /* =======================================================
     DEBOUNCE
  ======================================================= */

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setQuery(input.trim());
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [input]);

  /* =======================================================
     ESC CLOSE
  ======================================================= */

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open]);

  /* =======================================================
     SIDEBAR ITEMS
  ======================================================= */

  const sidebarItems = useMemo(() => getUserSidebarSearchItems(), []);

  /* =======================================================
     SIDEBAR SEARCH RESULTS
  ======================================================= */

  const sidebarResults = useMemo(() => {
    const normalizedQuery = normalize(query);

    if (normalizedQuery.length < 2) {
      return [];
    }

    return sidebarItems
      .map((item) => ({
        item,
        score: getSidebarSearchScore(item, normalizedQuery),
      }))
      .filter(({ score }) => score < 999)
      .sort((a, b) => a.score - b.score)
      .map(({ item }) => item)
      .slice(0, 6);
  }, [query, sidebarItems]);

  /* =======================================================
     API SEARCH
  ======================================================= */

  const { data, isFetching, error } = useGlobalSearchQuery(
    {
      q: query,
      size: 12,
      sort: "popular",
    },
    {
      skip: !open || query.length < 2,
    },
  );

  if (!open) {
    return null;
  }

  const contentResults = data?.data?.items ?? [];

  const hasSidebarResults = sidebarResults.length > 0;

  const hasContentResults = contentResults.length > 0;

  const hasAnyResults = hasSidebarResults || hasContentResults;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-start
        justify-center
        bg-black/50
        px-4
        pt-[8vh]
        backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-label="Global search"
    >
      {/* Background */}
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close search"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative
          flex
          max-h-[82vh]
          w-full
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {/* ================================================= */}
        {/* SEARCH INPUT */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-slate-200
            p-4
            dark:border-slate-800
          "
        >
          <Search
            className="
              h-5 w-5
              shrink-0
              text-slate-400
            "
          />

          <input
            autoFocus
            type="search"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="ស្វែងរកទំព័រ វគ្គសិក្សា មេរៀន ឬ coding task..."
            className="
              w-full
              bg-transparent
              text-lg
              text-slate-900
              outline-none
              placeholder:text-slate-400
              dark:text-white
            "
          />

          {isFetching && (
            <span
              className="
                h-5 w-5
                shrink-0
                animate-spin
                rounded-full
                border-2
                border-primary-color
                border-t-transparent
              "
              aria-label="Searching"
            />
          )}

          {input && (
            <button
              type="button"
              onClick={() => {
                setInput("");
                setQuery("");
              }}
              aria-label="Clear search"
              className="
                rounded-lg
                p-1
                text-slate-400
                transition-colors
                hover:bg-slate-100
                hover:text-slate-700
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="
              rounded-lg
              p-1
              transition-colors
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* ================================================= */}
        {/* RESULTS */}
        {/* ================================================= */}

        <div className="overflow-y-auto p-4">
          {/* Less than 2 characters */}

          {query.length < 2 ? (
            <div className="py-12 text-center">
              <Search
                className="
                  mx-auto mb-3
                  h-8 w-8
                  text-slate-300
                "
              />

              <p className="font-medium text-slate-500">
                Enter at least 2 characters to search.
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Search pages, courses, tutorials, videos and coding tasks.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* ============================================= */}
              {/* SIDEBAR / PAGE RESULTS */}
              {/* ============================================= */}

              {hasSidebarResults && (
                <section>
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      justify-between
                      px-1
                    "
                  >
                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                      "
                    >
                      Pages
                    </p>

                    <span className="text-xs text-slate-400">
                      {sidebarResults.length}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {sidebarResults.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="
                              group
                              flex
                              items-center
                              gap-3
                              rounded-xl
                              border
                              border-transparent
                              p-3
                              transition-all
                              hover:border-primary-color/20
                              hover:bg-primary-color/5
                              dark:hover:bg-slate-800
                            "
                        >
                          {/* Icon */}

                          <div
                            className="
                                flex
                                h-10 w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary-color/10
                                text-primary-color
                              "
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          {/* Information */}

                          <div className="min-w-0 flex-1">
                            <p
                              className="
                                  truncate
                                  font-semibold
                                  text-slate-900
                                  dark:text-white
                                "
                            >
                              {item.label}
                            </p>

                            <div
                              className="
                                  mt-0.5
                                  flex
                                  items-center
                                  gap-2
                                  text-xs
                                  text-slate-500
                                  dark:text-slate-400
                                "
                            >
                              {item.parentLabel && (
                                <>
                                  <span className="truncate">
                                    {item.parentLabel}
                                  </span>

                                  <span>•</span>
                                </>
                              )}

                              <span className="truncate">{item.href}</span>
                            </div>
                          </div>

                          <ChevronRight
                            className="
                                h-4 w-4
                                shrink-0
                                text-slate-400
                                transition-transform
                                group-hover:translate-x-0.5
                                group-hover:text-primary-color
                              "
                          />
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ============================================= */}
              {/* API CONTENT RESULTS */}
              {/* ============================================= */}

              {hasContentResults && (
                <section>
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      justify-between
                      px-1
                    "
                  >
                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                      "
                    >
                      Content
                    </p>

                    <span className="text-xs text-slate-400">
                      {contentResults.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {contentResults.map((result) => (
                      <Link
                        key={`${result.type}-${result.id}`}
                        href={resultHref(result)}
                        onClick={onClose}
                        className="
                            block
                            rounded-xl
                            border
                            border-transparent
                            p-4
                            transition-all
                            hover:border-blue-200
                            hover:bg-blue-50
                            dark:hover:border-blue-900
                            dark:hover:bg-blue-950/30
                          "
                      >
                        <div
                          className="
                              flex
                              items-start
                              justify-between
                              gap-4
                            "
                        >
                          <div className="min-w-0 flex-1">
                            <h3
                              className="
                                  truncate
                                  font-semibold
                                  text-slate-900
                                  dark:text-white
                                "
                            >
                              {result.title}
                            </h3>

                            {result.description && (
                              <p
                                className="
                                    mt-1
                                    line-clamp-2
                                    text-sm
                                    text-slate-600
                                    dark:text-slate-400
                                  "
                              >
                                {result.description}
                              </p>
                            )}

                            {result.slug && (
                              <p
                                className="
                                    mt-1
                                    truncate
                                    text-xs
                                    text-slate-400
                                  "
                              >
                                /{result.slug}
                              </p>
                            )}
                          </div>

                          <span
                            className="
                                shrink-0
                                rounded-full
                                bg-slate-100
                                px-2.5
                                py-1
                                text-xs
                                font-semibold
                                text-slate-600
                                dark:bg-slate-800
                                dark:text-slate-300
                              "
                          >
                            {result.type.replaceAll("_", " ")}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* ============================================= */}
              {/* API ERROR */}
              {/* Do NOT hide sidebar results */}
              {/* ============================================= */}

              {error && !hasContentResults && (
                <div
                  className="
                      rounded-xl
                      bg-red-50
                      px-4
                      py-3
                      text-sm
                      text-red-600
                      dark:bg-red-500/10
                      dark:text-red-400
                    "
                >
                  Content search could not be loaded. Sidebar pages are still
                  available.
                </div>
              )}

              {/* ============================================= */}
              {/* NOTHING FOUND */}
              {/* ============================================= */}

              {!isFetching && !hasAnyResults && !error && (
                <div className="py-12 text-center">
                  <Search
                    className="
                        mx-auto mb-3
                        h-8 w-8
                        text-slate-300
                      "
                  />

                  <p className="font-semibold text-slate-700 dark:text-slate-200">
                    No results found for “{query}”
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Try a page name, keyword, route or content title.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

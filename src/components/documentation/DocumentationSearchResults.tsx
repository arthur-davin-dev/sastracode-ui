"use client";

import SearchResultCard from "@/components/documentation/SearchResultCard";
import { useSearchContentQuery } from "@/redux/api/search-api";
import { AlertCircle, LoaderCircle } from "lucide-react";

interface DocumentationSearchResultsProps {
  query: string;
}

export default function DocumentationSearchResults({ query }: DocumentationSearchResultsProps) {
  const normalizedQuery = query.trim();
  const { data: response, error, isLoading } = useSearchContentQuery(
    { q: normalizedQuery, type: "TUTORIAL", sort: "popular", page: 0, size: 20 },
    { skip: !normalizedQuery },
  );

  if (!normalizedQuery) {
    return <p className="py-12 text-center text-sm text-muted-foreground">Enter a keyword to search tutorials.</p>;
  }

  if (isLoading) {
    return <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground"><LoaderCircle className="size-5 animate-spin" />Searching…</div>;
  }

  if (error) {
    const status = "status" in error ? error.status : "FETCH_ERROR";
    return <div className="flex items-center justify-center gap-2 py-12 text-destructive"><AlertCircle className="size-5" />Search failed: {String(status)}</div>;
  }

  const results = response?.data.items ?? [];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Found <span className="font-semibold text-foreground">{response?.data.total ?? results.length}</span> results for <span className="font-semibold text-primary">&ldquo;{query}&rdquo;</span>
      </p>
      {results.length ? results.map((result) => (
        <SearchResultCard key={`${result.type}-${result.id}`} result={result} />
      )) : <p className="py-12 text-center text-sm text-muted-foreground">No tutorials found.</p>}
    </div>
  );
}

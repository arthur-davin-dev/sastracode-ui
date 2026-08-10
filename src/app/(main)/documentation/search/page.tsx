import { Search, Sparkles } from "lucide-react";

import DocsShell from "@/components/documentation/DocsShell";
import DocumentationSearchResults from "@/components/documentation/DocumentationSearchResults";

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function SearchDocsPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const query = Array.isArray(params.q)
    ? params.q[0] ?? ""
    : params.q ?? "";

  return (
    <DocsShell>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-gradient-to-br from-primary-color/10 via-card to-card px-5 py-6 sm:px-8 sm:py-8">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary-color">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Documentation
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Search the documentation
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Find tutorials and lessons by topic, technology, or keyword.
            </p>
          </div>

          <form action="/documentation/search" method="get" role="search" className="p-4 sm:p-6">
            <label htmlFor="documentation-search" className="sr-only">
              Search documentation
            </label>
            <div className="relative flex items-center rounded-2xl border border-input bg-background shadow-sm transition focus-within:border-primary-color focus-within:ring-4 focus-within:ring-primary-color/10">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <input
                id="documentation-search"
                type="search"
                name="q"
                defaultValue={query}
                placeholder="ស្វែងរកមេរៀន..."
                autoFocus
                className="min-w-0 flex-1 bg-transparent py-3.5 pl-12 pr-3 text-base text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="mr-1.5 shrink-0 rounded-xl bg-primary-color px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Search
              </button>
            </div>
          </form>
        </section>

        <DocumentationSearchResults query={query} />
      </div>
    </DocsShell>
  );
}

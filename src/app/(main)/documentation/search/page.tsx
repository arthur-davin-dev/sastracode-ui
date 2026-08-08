import { Search } from "lucide-react";
import DocsShell from "@/components/documentation/DocsShell";
import DocumentationSearchResults from "@/components/documentation/DocumentationSearchResults";

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function SearchDocsPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = Array.isArray(params.q) ? params.q[0] ?? "" : params.q ?? "";

  return (
    <DocsShell>
      <div className="flex flex-col gap-6">
        <form action="/documentation/search" method="get" className="relative w-full">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search tutorials…"
            className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </form>
        <DocumentationSearchResults query={query} />
      </div>
    </DocsShell>
  );
}

import { Search } from "lucide-react";
import DocsShell from "@/components/documentation/DocsShell";
import FilterTabs from "@/components/documentation/FilterTabs";
import SearchResultCard from "@/components/documentation/SearchResultCard";
import SortDropdown from "@/components/documentation/SortDropdown";
import { searchResults } from "@/lib/data/documentation";

export default async function SearchDocsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "variable";

  return (
    <DocsShell>
      <div className="flex flex-col gap-6">
        <form className="relative w-full">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="ស្វែងរកមេរៀន..."
            className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </form>

        <FilterTabs options={["កម្រិតមូលដ្ឋាន", "កម្រិតមធ្យម", "កម្រិតខ្ពស់"]} />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            រកឃើញលទ្ធផល <span className="font-semibold text-foreground">24</span> សម្រាប់{" "}
            <span className="font-semibold text-primary">&ldquo;{query}&rdquo;</span>
          </p>

          <SortDropdown />
        </div>

        <div className="flex flex-col gap-4">
          {searchResults.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </div>
      </div>
    </DocsShell>
  );
}

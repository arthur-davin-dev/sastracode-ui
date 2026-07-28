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
      <div className="flex flex-col gap-6 mx-auto">
        <form className="relative w-full transition-all duration-300 ease-out focus-within:scale-[1.01] focus-within:drop-shadow-sm">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform duration-300 ease-out font-semibold group-focus-within:scale-110" />
      <input
        type="text"
        name="q"
        defaultValue={query}
        placeholder="ស្វែងរកមេរៀន..."
        className="w-full rounded-[16px] border border-border bg-card py-3 pl-11 pr-4 text-[18px] outline-none placeholder:text-muted-foreground transition-all duration-300 focus:border-[#002455] focus:ring-1 focus:ring-[#002455] focus:bg-background"
      />
    </form>

        <FilterTabs options={["កម្រិតមូលដ្ឋាន", "កម្រិតមធ្យម", "កម្រិតខ្ពស់"]} />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[18px] text-muted-foreground">
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
  );
}

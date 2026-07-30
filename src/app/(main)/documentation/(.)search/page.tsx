// src/app/(main)/documentation/(.)search/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import FilterTabs from "@/components/documentation/FilterTabs";
import SearchResultCard from "@/components/documentation/SearchResultCard";
import SortDropdown from "@/components/documentation/SortDropdown";
import { searchResults } from "@/lib/data/documentation";

export default function SearchDocsModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(initialQuery);

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // FIXED: Added initialization for URLSearchParams here
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      
      if (inputValue.trim()) {
        params.set("q", inputValue);
      } else {
        params.delete("q");
      }
      
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, router]);

  // FIXED: Safer filtering without breaking on missing schema types
  const filteredResults = useMemo(() => {
    const query = inputValue.toLowerCase().trim();
    if (!query) return [];

    return searchResults.filter((result) => {
      const matchTitle = result.title?.toLowerCase().includes(query);
      const matchDescription = result.description?.toLowerCase().includes(query);
      
      // Using an optional fallback check in case 'content' isn't explicitly defined in your data types
      const matchContent = (result as any).content?.toLowerCase().includes(query);

      return matchTitle || matchDescription || matchContent;
    });
  }, [inputValue]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-end px-4 pt-3 pb-1">
          <button 
            onClick={handleClose} 
            className="text-xs border border-border px-1.5 py-0.5 rounded shadow-sm bg-muted text-muted-foreground hover:bg-accent transition-colors"
          >
            Esc
          </button>
        </div>

        <div className="overflow-y-auto p-6 pt-1 space-y-6 flex flex-col gap-1">
          
          <form onSubmit={(e) => e.preventDefault()} className="relative w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              name="q"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="ស្វែងរកមេរៀន..."
              autoFocus
              className="w-full rounded-[16px] border border-border bg-card py-3 pl-11 pr-4 text-[18px] outline-none transition-all focus:border-[#002455] focus:ring-1 focus:ring-[#002455]"
            />
          </form>

          {inputValue.trim().length > 0 ? (
            <div className="space-y-6 flex flex-col gap-1">
              <FilterTabs options={["កម្រិតមូលដ្ឋាន", "កម្រិតមធ្យម", "កម្រិតខ្ពស់"]} />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[18px] text-muted-foreground">
                  រកឃើញលទ្ធផល <span className="font-semibold text-foreground">{filteredResults.length}</span> សម្រាប់{" "}
                  <span className="font-semibold text-primary">&ldquo;{inputValue}&rdquo;</span>
                </p>
                <SortDropdown />
              </div>

              {filteredResults.length > 0 ? (
                <div className="flex flex-col gap-4 pb-2">
                  {filteredResults.map((result) => (
                    <SearchResultCard key={result.id} result={result} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <p className="text-sm font-khmer text-destructive">មិនមានលទ្ធផលស្វែងរកទេ!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <p className="text-sm font-khmer">សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរកមេរៀន...</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
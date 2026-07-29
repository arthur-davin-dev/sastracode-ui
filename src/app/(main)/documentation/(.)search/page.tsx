// src/app/(main)/documentation/(.)search/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import FilterTabs from "@/components/documentation/FilterTabs";
import SearchResultCard from "@/components/documentation/SearchResultCard";
import SortDropdown from "@/components/documentation/SortDropdown";
import { searchResults } from "@/lib/data/documentation";

export default function SearchDocsModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 1. Initialize local state to track input changes instantly
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
          
          {/* Custom Form Input with onChange */}
          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="relative w-full transition-all duration-300 ease-out focus-within:scale-[1.01] focus-within:drop-shadow-sm"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform duration-300 ease-out font-semibold group-focus-within:scale-110" />
            <input
              type="text"
              name="q"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Update state on every keystroke
              placeholder="ស្វែងរកមេរៀន..."
              autoFocus
              className="w-full rounded-[16px] border border-border bg-card py-3 pl-11 pr-4 text-[18px] outline-none placeholder:text-muted-foreground transition-all duration-300 focus:border-[#002455] focus:ring-1 focus:ring-[#002455] focus:bg-background"
            />
          </form>

          {/* 2. Conditional Rendering: Only display if text has been entered */}
          {inputValue.trim().length > 0 ? (
            <div className="space-y-6 flex flex-col gap-1 animate-in fade-in duration-200">
              <FilterTabs options={["កម្រិតមូលដ្ឋាន", "កម្រិតមធ្យម", "កម្រិតខ្ពស់"]} />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[18px] text-muted-foreground">
                  រកឃើញលទ្ធផល <span className="font-semibold text-foreground">24</span> សម្រាប់{" "}
                  <span className="font-semibold text-primary">&ldquo;{inputValue}&rdquo;</span>
                </p>
                <SortDropdown />
              </div>

              <div className="flex flex-col gap-4 pb-2">
                {searchResults.map((result) => (
                  <SearchResultCard key={result.id} result={result} />
                ))}
              </div>
            </div>
          ) : (
            // Optional: Replicates a clean empty state helper UI when no text is provided
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <p className="text-sm font-khmer">សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរកមេរៀន...</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import DocumentationSearchResults from "@/components/documentation/DocumentationSearchResults";

function SearchDocsModalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("q") ?? "");
  const handleClose = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[10vh] backdrop-blur-sm">
      <button type="button" aria-label="Close search modal" className="absolute inset-0 cursor-default" onClick={handleClose} />
      <div className="relative flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl dark:bg-zinc-950">
        <div className="flex justify-end px-4 pb-1 pt-3">
          <button type="button" onClick={handleClose} className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">Esc</button>
        </div>
        <div className="flex flex-col gap-6 overflow-y-auto p-6 pt-1">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Search tutorials…"
              autoFocus
              className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-lg outline-none focus:border-[#002455] focus:ring-1 focus:ring-[#002455]"
            />
          </div>
          <DocumentationSearchResults query={inputValue} />
        </div>
      </div>
    </div>
  );
}

export default function SearchDocsModal() {
  return <Suspense fallback={null}><SearchDocsModalContent /></Suspense>;
}

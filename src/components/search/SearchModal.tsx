"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useGlobalSearchQuery } from "@/redux/service/searchApi";

interface SearchModalProps {
  open: boolean;
  initialQuery?: string;
  onClose: () => void;
}

function resultHref(result: { id: string; type: string; deepLink?: string }) {
  if (result.deepLink?.startsWith("/")) return result.deepLink;
  if (result.type === "TUTORIAL") return `/documentation/lessons/${result.id}`;
  if (result.type === "COURSE") return `/courses/${result.id}`;
  if (result.type === "CODING_TASK") return `/playground/editor?task=${result.id}`;
  return "/documentation";
}

export default function SearchModal({ open, initialQuery = "", onClose }: SearchModalProps) {
  const [input, setInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery.trim());

  useEffect(() => {
    const timeout = window.setTimeout(() => setQuery(input.trim()), 300);
    return () => window.clearTimeout(timeout);
  }, [input]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  const { data, isFetching, error } = useGlobalSearchQuery(
    { q: query, size: 12, sort: "popular" },
    { skip: !open || query.length < 2 },
  );
  if (!open) return null;
  const results = data?.data?.items ?? [];

  return <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[8vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Global search">
    <button type="button" className="absolute inset-0 cursor-default" aria-label="Close search" onClick={onClose} />
    <div className="relative flex max-h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
        <Search className="h-5 w-5 shrink-0 text-slate-400" />
        <input autoFocus type="search" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Search courses, tutorials, videos, and coding tasks..." className="w-full bg-transparent text-lg text-slate-900 outline-none placeholder:text-slate-400 dark:text-white" />
        {isFetching && <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" aria-label="Searching" />}
        <button type="button" onClick={onClose} aria-label="Close search"><X className="h-5 w-5 text-slate-500" /></button>
      </div>
      <div className="overflow-y-auto p-4">
        {query.length < 2 ? <p className="py-12 text-center text-slate-500">Enter at least 2 characters to search.</p> : error ? <p className="py-12 text-center text-red-600">Search could not be loaded. Please try again.</p> : !isFetching && !results.length ? <p className="py-12 text-center text-slate-500">No results found for “{query}”.</p> : <div className="space-y-2">{results.map((result) => <Link key={`${result.type}-${result.id}`} href={resultHref(result)} onClick={onClose} className="block rounded-xl border border-transparent p-4 hover:border-blue-200 hover:bg-blue-50 dark:hover:border-blue-900 dark:hover:bg-blue-950/30">
          <div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold text-slate-900 dark:text-white">{result.title}</h3>{result.description && <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{result.description}</p>}</div><span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{result.type.replace("_", " ")}</span></div>
        </Link>)}</div>}
      </div>
    </div>
  </div>;
}

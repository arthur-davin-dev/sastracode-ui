import Link from "next/link";
import { Search } from "lucide-react";

export default function HeroSearchBar() {
  return (
    <Link 
      href="/documentation/search"
      className="relative block w-full max-w-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.99]"
    >
      <div className="relative cursor-pointer">
        {/* Search Icon */}
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        
        {/* Fake Input Layer */}
        <div className="flex h-10 w-full select-none items-center rounded-xl border border-slate-200/80 bg-white pl-10 pr-4 text-sm text-slate-400 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 font-khmer">
          តើអ្នកចង់រៀនអ្វី?
        </div>
      </div>
    </Link>
  );
}
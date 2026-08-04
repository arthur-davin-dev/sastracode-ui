import Link from "next/link";
import { Search } from "lucide-react";

export default function HeroSearchBar() {
  return (
    <Link 
      href="/documentation/search"
      className="group relative block w-full max-w-md transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
    >
      <div className="relative flex items-center">
        {/* Search Icon */}
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200 z-10" />
        
        {/* Fake Input Layer */}
        <div className="flex h-11 w-full select-none items-center justify-between rounded-xl border border-slate-200 bg-white/80 pl-10 pr-3.5 text-sm font-khmer text-slate-500 shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:border-slate-300 group-hover:bg-white group-hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-400 dark:group-hover:border-slate-700 dark:group-hover:bg-slate-900 dark:group-hover:text-slate-300">
          <span>តើអ្នកចង់រៀនអ្វី?</span>

          {/* Quick Keyboard Hint (Visual Polish) */}
          <div className="hidden sm:flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-500">
            <kbd className="font-sans">⌘</kbd>
            <kbd className="font-sans">K</kbd>
          </div>
        </div>
      </div>
    </Link>
  );
}
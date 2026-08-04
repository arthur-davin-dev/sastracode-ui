import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Backbutton() {
  return (
    <Link 
      href="/documentation" 
      className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-[0.99] font-khmer w-fit"
    >
      <ChevronLeft className="h-4 w-4" />
      <span>ទំព័រដើម</span>
    </Link>
  );
}
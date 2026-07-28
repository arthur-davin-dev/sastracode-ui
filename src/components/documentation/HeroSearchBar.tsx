"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export default function HeroSearchBar() {
  return (
    <Link 
      href="/documentation/search"
      className="relative block w-full max-w-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.99]"
    >
      <div className="relative w-full cursor-pointer">
        {/* Search Icon */}
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        
        {/* Fake Input Layer (Styled Div) */}
        <div className="font-khmer text-slate-400 w-full rounded-[16px] bg-white py-4.5 pl-13 pr-20 text-[18px] border border-transparent select-none flex items-center h-[44px]">
          តើអ្នកចង់រៀនអ្វី?
        </div>
      </div>
    </Link>
  );
}
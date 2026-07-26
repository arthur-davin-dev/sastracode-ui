"use client";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";

interface HeroSearchBarProps {
  onSearch?: (query: string) => void;
}

export default function HeroSearchBar({ onSearch }: HeroSearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="តើអ្នកចង់រៀនអ្វី?"
        className=" font-khmer text-primary-colorw-full rounded-[16px] bg-white py-3 pl-11 pr-20 text-sm text-slate-700  outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </form>
  );
}

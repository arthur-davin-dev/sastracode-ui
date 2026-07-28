"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "ស្វែងរកវគ្គសិក្សា ភាសាកម្មវិធី ឬជំនាញ...",
}: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-[320px]">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 rounded-lg border-gray-200 pl-9 text-sm font-khmer placeholder:text-gray-400"
      />
    </div>
  );
}
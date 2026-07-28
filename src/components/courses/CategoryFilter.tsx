"use client";

import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <Button
            key={category}
            onClick={() => onChange(category)}
            variant={isActive ? "default" : "outline"}
            className={`h-9 rounded-full border-[#e5e7eb] px-4 text-sm font-medium font-khmer ${
              isActive
                ? "bg-[#06295c] text-white hover:bg-[#082f6e]"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
}
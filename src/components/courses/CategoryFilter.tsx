"use client";

import { Button } from "@/components/ui/button";

interface CategoryOption {
  id: string;
  label: string;
}

interface CategoryFilterProps {
  categories: CategoryOption[];
  active: string;
  onChange: (categoryId: string) => void;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {categories.map(({ id, label }) => {
        const isActive = id === active;

        return (
          <Button
            key={id}
            onClick={() => onChange(id)}
            variant={isActive ? "default" : "outline"}
            className={`h-9 rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
              isActive
                ? "bg-indigo-800 dark:bg-indigo-600 text-white hover:bg-indigo-900 dark:hover:bg-indigo-500 border-transparent shadow-sm"
                : "border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
"use client";

import { useState } from "react";

interface FilterTabsProps {
  options: string[];
  defaultActive?: string;
  onChange?: (value: string) => void;
}

export default function FilterTabs({ options, defaultActive, onChange }: FilterTabsProps) {
  const [active, setActive] = useState(defaultActive ?? options[0]);

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-muted/60 p-1.5" aria-label="Filter by level">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            setActive(option);
            onChange?.(option);
          }}
          aria-pressed={active === option}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors sm:text-base ${
            active === option
              ? "bg-primary-color text-white shadow-sm"
              : "text-muted-foreground hover:bg-background hover:text-foreground"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

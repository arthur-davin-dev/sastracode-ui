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
    <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-muted p-1.5">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            setActive(option);
            onChange?.(option);
          }}
          className={`rounded-2xl px-4 py-1.5 text-xs font-semibold transition-colors ${
            active === option
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";

interface FilterTabsProps<T extends string> {
  options: { label: string; value: T }[];
  value?: T;
  defaultActive?: T;
  onChange?: (value: T) => void;
}

export default function FilterTabs<T extends string>({
  options,
  value,
  defaultActive,
  onChange,
}: FilterTabsProps<T>) {
  const [localActive, setLocalActive] = useState(
    defaultActive ?? options[0]?.value,
  );
  const active = value ?? localActive;

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-muted/60 p-1.5" aria-label="Filter by level">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            setLocalActive(option.value);
            onChange?.(option.value);
          }}
          aria-pressed={active === option.value}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors sm:text-base ${
            active === option.value
              ? "bg-primary-color text-white shadow-sm"
              : "text-muted-foreground hover:bg-background hover:text-foreground"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

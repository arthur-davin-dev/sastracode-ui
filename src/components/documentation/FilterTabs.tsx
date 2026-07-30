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
    <div className="flex flex-wrap items-center gap-2 rounded-[16px] bg-muted p-1.5  ">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            setActive(option);
            onChange?.(option);
          }}
          className={`rounded-[16px] px-5 py-2 font-semibold text-[18px] max-sm:text-sm dark:text-white ${
            active === option
              ? "bg-[#002455] text-primary-foreground "
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

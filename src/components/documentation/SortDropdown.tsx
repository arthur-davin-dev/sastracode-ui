"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortDropdownProps<T extends string> {
  options: { label: string; value: T }[];
  value?: T;
  onChange?: (value: T) => void;
}

export default function SortDropdown<T extends string>({
  options,
  value,
  onChange,
}: SortDropdownProps<T>) {
  const [localActive, setLocalActive] = useState(value ?? options[0]?.value);
  const active = value ?? localActive;
  const activeLabel = options.find((option) => option.value === active)?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-2 text-[14px] font-medium text-foreground hover:bg-muted">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
            តម្រៀបតម៖ <span className="font-semibold">{activeLabel}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        }
      />
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              setLocalActive(option.value);
              onChange?.(option.value);
            }}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = ["ភាពពាក់ព័ន្ធ", "ថ្មីបំផុត", "ពេញនិយមបំផុត", "កម្រិតងាយ → ពិបាក"];

export default function SortDropdown() {
  const [active, setActive] = useState(options[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
            តម្រៀបតម៖ <span className="font-semibold">{active}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        }
      />
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem key={option} onClick={() => setActive(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

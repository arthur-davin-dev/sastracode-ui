"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import DocsSidebar from "./DocsSidebar";

interface DocsShellProps {
  children: React.ReactNode;
}

export default function DocsShell({ children }: DocsShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto flex max-w-[1440px]">
      {/* Desktop sidebar */}
      <div className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 lg:block">
        <DocsSidebar />
      </div>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg lg:hidden"
        aria-label="បើកម៉ឺនុយ"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[80vw]">
            <DocsSidebar className="h-full" onNavigate={() => setOpen(false)} />
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-2xl bg-muted text-foreground"
              aria-label="បិទម៉ឺនុយ"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}

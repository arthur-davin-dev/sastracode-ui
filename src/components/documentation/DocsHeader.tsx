"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { trackTabs } from "@/lib/data/courses";


export default function DocsHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-backdrop-blur:bg-card/80">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/documentation" className="flex shrink-0 items-center gap-2">
          <Image
            src="/images/sastra_code_logo.png"
            alt="SastraCode"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {trackTabs.map((tab) => {
            const isActive = pathname?.includes(`/documentation/${tab.slug}`);
            return (
              <Link
                key={tab.slug}
                href={`/documentation/${tab.slug}`}
                className={`rounded-2xl px-3.5 py-2 text-xs font-bold tracking-wide transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-3">
          <form className="relative hidden w-full max-w-[240px] sm:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="ស្វែងរកមេរៀន..."
              className="w-full rounded-2xl border border-border bg-muted/60 py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </form>


          <Link
            href="/register"
            className="hidden rounded-2xl bg-secondary px-4 py-2 text-xs font-bold text-secondary-foreground transition-colors hover:bg-secondary/90 sm:inline-flex"
          >
            ចុះឈ្មោះ
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
        {trackTabs.map((tab) => {
          const isActive = pathname?.includes(`/documentation/${tab.slug}`);
          return (
            <Link
              key={tab.slug}
              href={`/documentation/${tab.slug}`}
              className={`shrink-0 rounded-2xl px-3 py-1.5 text-xs font-bold tracking-wide transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

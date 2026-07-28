"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  FolderOpen,
  Bookmark,
  HelpCircle,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { docsNavItems } from "@/lib/data/documentation";
import { DocsNavItem } from "@/types/documentation";

const iconMap: Record<DocsNavItem["icon"], LucideIcon> = {
  home: Home,
  book: BookOpen,
  folder: FolderOpen,
  bookmark: Bookmark,
  help: HelpCircle,
};

interface DocsSidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export default function DocsSidebar({ className = "", onNavigate }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex h-full w-full flex-col justify-between gap-8 border-r border-border bg-card px-4 py-6 ${className}`}
    >
      <div className="flex flex-col gap-8">
        <div className="px-2 text-[24px] font-extrabold text-[#002455] dark:text-white">Learning Path</div>

<nav className="flex flex-col gap-1">
  {docsNavItems.map((item) => {
    const Icon = iconMap[item.icon];
    const isActive = pathname === item.href || (item.href !== "/documentation/dashboard" && pathname?.startsWith(item.href));
    
    return (
      <Link
        key={item.id}
        href={item.href}
        onClick={onNavigate}
        // Tailwind utilities added: transition-all, duration, ease-out, hover scale, hover translate, and active shrink
        className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[18px] font-medium 
          transition-all duration-200 ease-out origin-left
          hover:scale-[1.03] hover:translate-x-1 active:scale-[0.98] ${
          isActive
            ? "bg-[#002455] text-white shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {item.label}
      </Link>
    );
  })}
</nav>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-accent p-4 text-center  transition-all duration-200 ease-out origin-left
          hover:scale-[1.03] hover:translate-x-1 active:scale-[0.98]">
        <p className="text-[16px] font-medium text-accent-foreground ">ដំឡើងទៅ Pro</p>
        <button className="w-full rounded-[16px] bg-[#002455] px-4 py-2 text-[16px]  text-white transition-colors hover:bg-[#002455]/90">
          ចាប់ផ្ដើម
        </button>
      </div>
    </aside>
  );
}

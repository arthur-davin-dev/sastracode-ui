import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { trackTocGroups } from "@/lib/data/lessions";
import { TrackSlug } from "@/types/course";

export default function DocsSidebar({
  activeTrack,
  activeLessonId,
}: {
  activeTrack: TrackSlug;
  activeLessonId: string;
}) {
  const groups = trackTocGroups[activeTrack] || [];

  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 flex-col border-r border-slate-200/80 bg-[#F2F6FF] p-4 font-khmer hidden md:flex dark:border-slate-800 dark:bg-slate-900 transition-colors duration-300">
      
      {/* 1. Logo Badge Section */}
      <div className="mb-6 mt-2 flex justify-center">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Image 
            src="/images/sastra_code_logo.png" 
            alt="Sastra Code Logo"
            width={64}
            height={64}
            className="object-contain p-1"
            priority
          />
        </div>
      </div>

      {/* 2. Navigation Links Track Section */}
      <nav className="flex-1 space-y-6 overflow-y-auto pr-1 text-sm scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        {groups.map((group) => (
          <div key={group.id} className="space-y-2">
            
            {/* Group Title Section */}
            <div className="flex items-center justify-between rounded-xl px-3 py-2 text-base font-bold text-[#002455] dark:text-blue-400 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
              <span>{group.label}</span>
              <ChevronRight className="h-4 w-4 text-[#002455]/70 dark:text-blue-400/70" />
            </div>

            {/* Sub-lesson links */}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = item.id === activeLessonId;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`block rounded-xl px-4 py-2 text-sm transition-all duration-150 ${
                      active
                        ? "bg-[#002455] dark:bg-blue-600 text-white font-medium shadow-md shadow-[#002455]/10 dark:shadow-none"
                        : "text-slate-600 hover:text-[#002455] hover:bg-white/60 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

          </div>
        ))}
      </nav>

    </aside>
  );
}
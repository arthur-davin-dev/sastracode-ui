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
    <aside className="w-64 shrink-0 bg-[#F2F6FF]  p-4 hidden md:flex flex-col h-screen">
<div className="flex justify-center mb-6 mt-2">
  <div className="relative w-17 h-17 bg-white rounded-full  flex items-center justify-center overflow-hidden border">
    <Image 
      src="/images/sastra_code_logo.png" 
      alt="Logo"
      width={70}
      height={70}
      className="object-contain"
    />
  </div>
</div>

      {/* 2. NAVIGATION LINKS TRACK SECTION */}
      <nav className="flex-1 space-y-5 overflow-y-auto pr-1">
        {groups.map((group) => (
          <div key={group.id} className="space-y-2">
            
            {/* Group Title Section mimicking the dynamic level header items with a right chevron */}
            <div className="flex items-center justify-between px-3 py-2 text-[18px] font-bold text-[#002455] cursor-pointer hover:bg-white/45 rounded-xl transition-colors">
              <span>{group.label}</span>
              <ChevronRight size={16} className="text-[#002455]/80" />
            </div>

            {/* Sub lesson navigation links */}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = item.id === activeLessonId;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`block px-4 py-2 text-[16px] transition-all duration-150 ${
                      active
                        ? "bg-[#002455] text-white font-medium rounded-xl shadow-md shadow-[#002455]/10"
                        : "text-slate-700 hover:text-[#002455] hover:bg-white/60 rounded-xl"
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
import { Timer } from "lucide-react"; // Import necessary UI icon
import { LessonPageAnchor } from "@/types/documentation";

interface DocsTocProps {
  anchors: LessonPageAnchor[];
  levelLabel?: string;     // e.g., "កម្រិតមូលដ្ឋាន"
  progressPercent?: number; // e.g., 75
  timeLabel?: string;       // e.g., "ចំណាយពេលអាន ៨ នាទី"
}

export default function DocsToc({
  anchors,
  levelLabel = "កម្រិតមូលដ្ឋាន",
  progressPercent = 75,
  timeLabel = "ចំណាយពេលអាន ៨ នាទី"
}: DocsTocProps) {
  
  return (
    // Clean, wider layout container matching the UI styling
    <aside className="w-64 shrink-0 p-4 hidden lg:block border-l border-gray-100 bg-[#eff4ff] space-y-6">
      
      {/* 1. TOP SECTION: PROGRESS CARD */}
      <div className="bg-[#EDF3FC] rounded-2xl p-4 border border-[#D9E6F7]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 font-medium text-[16px]">
            {levelLabel}
          </span>
          <span className="text-[#002455] font-bold text-sm">
            {progressPercent}%
          </span>
        </div>
        {/* Progress Bar Track */}
        <div className="w-full bg-[#E1ECFA] h-1.5 rounded-full mb-3 overflow-hidden">
          <div 
            className="bg-[#002455] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {/* Time Spent */}
        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
          <Timer size={14} className="shrink-0" />
          <span>{timeLabel}</span>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: TABLE OF CONTENTS */}
      <div>
        <div className="text-[16px] font-bold text-[#002455] mb-4 px-3">
          នៅក្នុងទំព័រនេះ
        </div>
        
        {anchors && anchors.length > 0 && (
          <ul className="text-[16px] space-y-1">
            {anchors.map((a) => (
              <li key={a.id} className="relative group">
                {/* Active left indicator line */}
                {a.active && (
                  <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#002455] rounded-r" />
                )}
                
                <a 
                  href={`#${a.id}`} 
                  className={`block pl-4 pr-3 py-2 rounded-r transition-colors duration-150 ${
                    a.active 
                      ? "font-semibold text-[#002455]" 
                      : "text-gray-600 hover:text-[#002455] hover:bg-gray-100/70"
                  }`}
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

    </aside>
  );
}
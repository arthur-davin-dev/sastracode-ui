import { Timer } from "lucide-react";
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
    <aside className="w-full space-y-6 bg-[#eff4ff] p-4 font-khmer transition-colors duration-300 dark:bg-slate-900">
      
      {/* 1. TOP SECTION: PROGRESS CARD */}
      <div className="bg-[#EDF3FC] dark:bg-slate-800/80 rounded-2xl p-4 border border-[#D9E6F7] dark:border-slate-700/60 transition-colors">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-600 dark:text-slate-300 font-medium text-sm">
            {levelLabel}
          </span>
          <span className="text-[#002455] dark:text-blue-400 font-bold text-sm">
            {progressPercent}%
          </span>
        </div>
        
        {/* Progress Bar Track */}
        <div className="w-full bg-[#E1ECFA] dark:bg-slate-700 h-1.5 rounded-full mb-3 overflow-hidden">
          <div 
            className="bg-[#002455] dark:bg-blue-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        {/* Time Spent */}
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
          <Timer className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
          <span>{timeLabel}</span>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: TABLE OF CONTENTS */}
      <div>
        <div className="text-sm font-bold text-[#002455] dark:text-slate-100 mb-3 px-3">
          នៅក្នុងទំព័រនេះ
        </div>
        
        {anchors && anchors.length > 0 && (
          <ul className="text-sm space-y-1">
            {anchors.map((a) => (
              <li key={a.id} className="relative group">
                {/* Active left indicator line */}
                {a.active && (
                  <div className="absolute left-0 top-1 bottom-1 w-1 bg-[#002455] dark:bg-blue-500 rounded-r" />
                )}
                
                <a 
                  href={`#${a.id}`} 
                  className={`block pl-4 pr-3 py-2 rounded-r text-sm transition-colors duration-150 ${
                    a.active 
                      ? "font-semibold text-[#002455] dark:text-blue-400 bg-white/60 dark:bg-slate-800/60" 
                      : "text-slate-600 dark:text-slate-400 hover:text-[#002455] dark:hover:text-slate-100 hover:bg-white/40 dark:hover:bg-slate-800/40"
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

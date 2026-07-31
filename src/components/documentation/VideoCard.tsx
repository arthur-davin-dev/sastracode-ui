import Image from "next/image";
import { Play, Eye } from "lucide-react";
import { InstructorProps } from "@/types/documentation";

export default function VideoCard({ instructor }: InstructorProps) {
  if (!instructor.videoTitle) return null;

  return (
    <div className="my-4 group flex flex-col w-full overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl transition-all duration-300 font-khmer shadow-sm hover:shadow-md">
      
      {/* Top Section: Video Thumbnail */}
      <div className="relative w-full aspect-[16/7] md:aspect-[16/6] bg-indigo-50 dark:bg-slate-800 overflow-hidden cursor-pointer">
        <Image
          src="/images/video-thumbnail.png" 
          alt={instructor.videoTitle}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Centered Play Button Circle */}
        <div className="absolute z-10 inset-0 m-auto w-14 h-14 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#5b4eff] dark:group-hover:bg-[#5b4eff] group-hover:shadow-indigo-200/50 transition-all duration-300">
          <Play className="text-[#5b4eff] fill-[#5b4eff] group-hover:text-white group-hover:fill-white ml-0.5 transition-colors duration-200" size={24} />
        </div>
      </div>

      {/* Bottom Section: Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-5">
        
        {/* Titles */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-[#002455] dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-[#5b4eff] dark:group-hover:text-indigo-400 transition-colors duration-200">
            {instructor.videoTitle}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 whitespace-pre-line leading-relaxed">
            {instructor.videoSubtitle}
          </p>
        </div>

        {/* Dynamic Meta & Footer Actions */}
        <div className="space-y-4">
          {/* Instructor Meta & Views Row */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
            {/* Avatar + Name */}
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-slate-100 dark:ring-slate-800">
                <Image
                  src="/images/ben_thona.JPG" 
                  alt="Instructor Avatar"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm text-[#002455] dark:text-slate-200 truncate">
                  Vibol Meas
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  គ្រូបង្រៀន
                </span>
              </div>
            </div>

            {/* Views Counter */}
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-sm font-medium">
              <Eye size={16} className="stroke-[2]" />
              <span>{instructor.studentsLabel || "999 អ្នកមើល"}</span>
            </div>
          </div>

          {/* Action Button */}
          <button 
            type="button"
            className="w-full bg-[#002455] dark:bg-blue-600 hover:bg-[#5b4eff] dark:hover:bg-blue-700 text-white font-medium text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            <Play className="text-white fill-white stroke-[3]" size={12} />
            <span>ចាប់ផ្តើមសិក្សា</span>
          </button>
        </div>

      </div>
    </div>
  );
}
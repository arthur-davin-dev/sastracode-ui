import Image from "next/image";
import { Play, Eye } from "lucide-react";
import { InstructorProps } from "@/types/documentation";

export default function VideoCard({ instructor }: InstructorProps) {
  if (!instructor.videoTitle) return null;

  return (
    <div className="my-4 group flex flex-col w-full overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 font-sans dark:border-slate-800 dark:bg-slate-900">
      {/* Top Section: Video Thumbnail (Changed aspect ratio to make it shorter/smaller) */}
      <div className="relative w-full aspect-16/7 bg-indigo-50 overflow-hidden cursor-pointer md:aspect-16/6 dark:bg-slate-800">
        {/* Main Background Thumbnail Image */}
        <Image
          src="/images/video-thumbnail.png"
          alt={instructor.videoTitle}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Subtle Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Centered Play Button Circle */}
        <div className="absolute z-10 inset-0 m-auto w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#5b4eff] group-hover:shadow-indigo-200 transition-all duration-300">
          <Play
            className="text-[#5b4eff] fill-[#5b4eff] group-hover:text-white group-hover:fill-white ml-0.5 transition-colors duration-200"
            size={24}
          />
        </div>
      </div>

      {/* Bottom Section: Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-5">
        {/* Titles */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-[#002455] line-clamp-2 leading-snug transition-colors duration-200 group-hover:text-[#5b4eff] dark:text-slate-100">
            {instructor.videoTitle}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2 whitespace-pre-line leading-relaxed dark:text-slate-300">
            {instructor.videoSubtitle}
          </p>
        </div>

        {/* Dynamic Meta & Footer Actions */}
        <div className="space-y-4">
          {/* Instructor Meta & Views Row */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            {/* Avatar + Name */}
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-slate-50 dark:ring-slate-900">
                <Image
                  src="/images/ben_thona.JPG"
                  alt="Instructor Avatar"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="truncate text-sm font-semibold text-[#002455] dark:text-slate-100">
                  Vibol Meas
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-400">
                  គ្រូបង្រៀន
                </span>
              </div>
            </div>

            {/* Views Counter */}
            <div className="flex items-center gap-1.5 text-[14px] font-medium text-slate-400 dark:text-slate-300">
              <Eye size={16} className="stroke-2" />
              <span>{instructor.studentsLabel || "999 អ្នកមើល"}</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#002455] px-4 py-3 text-sm font-medium text-white shadow-sm shadow-slate-200 transition-all duration-200 hover:bg-[#5b4eff] hover:shadow-indigo-100 active:scale-[0.98] dark:shadow-slate-950/40">
            <Play className="fill-white stroke-3 text-white" size={12} />
            ចាប់ផ្តើមសិក្សា
          </button>
        </div>
      </div>
    </div>
  );
}

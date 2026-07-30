"use client";

import { HelpCircle, ArrowRight } from "lucide-react";
import { LessonQuiz } from "@/types/documentation";

interface QuickQuizProps {
  quiz?: LessonQuiz;
  trackLabel?: string; // Added to dynamically pass "html", "css", "javascript", etc.
}

export default function QuickQuiz({ quiz, trackLabel }: QuickQuizProps) {
  if (!quiz) return null;

  // Helper to safely format the track name for display
  const formatTrackName = (track?: string) => {
    if (!track) return "HTML";
    const lower = track.toLowerCase();
    if (lower === "javascript") return "JavaScript";
    if (lower === "python") return "Python";
    if (lower === "java") return "Java";
    return lower.toUpperCase(); // Handles "html", "css", etc.
  };

  const currentTrack = formatTrackName(trackLabel);

  return (
    <div className="w-full bg-white border border-gray-200 p-5 sm:p-6 mb-6 rounded-[16px] shadow-sm flex flex-col sm:flex-row items-start gap-4 sm:gap-5 box-border overflow-hidden transition-all hover:shadow-md">
      
      {/* Decorative Icon Badge */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#eef2ff] rounded-[12px] flex items-center justify-center shrink-0">
        <HelpCircle className="text-[#002455]" size={26} />
      </div>

      {/* Main content layout block */}
      <div className="flex-1 min-w-0 w-full flex flex-col gap-1">
        
        {/* Upper Micro-Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold bg-[#eef2ff] text-[#002455] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            តេស្តសមត្ថភាព (Quiz)
          </span>
        </div>

        {/* Updated Dynamic Header Text in Khmer */}
        <h3 className="font-bold text-[17px] sm:text-[19px] text-[#002455] mt-1 break-words leading-snug">
          សាកល្បងសមត្ថភាព {currentTrack} របស់អ្នកជាមួយកម្រងសំណួរ {currentTrack} របស់យើង!
        </h3>

        {/* Description / Question Hint */}
        <p className="text-[13px] sm:text-[14px] text-gray-500 break-words leading-relaxed max-w-2xl">
          ចុចប៊ូតុងខាងក្រោមដើម្បីចាប់ផ្តើមឆ្លើយសំណួរអនុវត្តន៍ និងពង្រឹងការចងចាំមេរៀនរបស់អ្នក។
        </p>

        {/* Action Button */}
        <div className="mt-3 w-full sm:w-auto self-start sm:self-auto">
          <button 
            onClick={() => alert("Quiz feature is coming soon!")}
            className="w-full sm:w-auto bg-[#002455] hover:bg-[#001a3e] text-white font-medium text-[14px] sm:text-[15px] px-6 py-2.5 sm:py-3 rounded-[12px] flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] shadow-sm"
          >
            ចាប់ផ្តើមតេស្ត ({currentTrack} )
            <ArrowRight size={16} className="mt-0.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { InProgressCertificate } from "@/types/certificate";
import { PlayCircle, Clock, Hourglass } from "lucide-react";

export function InProgressCertificateCard({
  certificate,
}: {
  certificate: InProgressCertificate;
}) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 group">
      
      {/* Top Accent Line (Red Secondary & Yellow Accent) */}
      <div className="absolute top-0 left-0 w-full h-2 
      " />

      <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
        
        {/* Thumbnail Image Container */}
        <div className="relative shrink-0 overflow-hidden rounded-2xl border-2 border-yellow-400/40 shadow-sm">
          <img
            src={certificate.thumbnailUrl}
            alt={certificate.title}
            className="h-28 w-full md:w-44 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors" />
        </div>

        {/* Details Content */}
        <div className="flex-1 min-w-0 w-full space-y-3">
          
          {/* Header Row: Title & Status Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg text-bold font-extrabold text-primary-color truncate">
              {certificate.title}
            </h3>
            
            {/* Status Badge */}
            <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-init-color/20 text-primary-color dark:text-yellow-300 border border-yellow-400/50 text-lg font-bold w-fit shrink-0">
              <Hourglass className="h-4 w-4 text-secondary-color animate-pulse" />
              កំពុងដំណើរការ
            </span>
          </div>

          {/* Progress Percent Text */}
          <div className="flex items-center justify-between text-lg font-bold text-primary-color">
            <span className="opacity-80">វឌ្ឍនភាពសិក្សា</span>
            <span className="text-secondary-color">{certificate.progressPercent}%</span>
          </div>

          {/* Styled Progress Bar (Yellow Progress Bar Fill) */}
          <Progress
            value={certificate.progressPercent}
            className="h-2.5 bg-slate-100 dark:bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-primary-color [&>div]:to-blue-400 rounded-full"
          />

          {/* Remaining Days Info */}
          <div className="flex items-center gap-2 text-lg font-medium text-primary-color opacity-80 pt-1">
            <Clock className="h-5 w-5 text-secondary-color shrink-0" />
            <span>
              បញ្ចប់ក្នុងរយៈពេល <span className="font-bold text-primary-color">{certificate.daysLeft} ថ្ងៃ</span> (ពី {certificate.totalDays} ថ្ងៃ)
            </span>
          </div>

        </div>

        {/* Action Button (Red Secondary with Yellow Hover) */}
        <Button
          size="lg"
          className="w-full md:w-auto h-14 px-6 rounded-2xl text-lg font-bold text-white bg-primary-color hover:bg-blue-400 hover:text-slate-950 shadow-md transition-all duration-300 gap-2 shrink-0 flex items-center justify-center group/btn"
        >
          <PlayCircle className="h-6 w-6 transition-transform duration-300 group-hover/btn:scale-110" />
          <span>បន្តការសិក្សា</span>
        </Button>

      </CardContent>
    </Card>
  );
}
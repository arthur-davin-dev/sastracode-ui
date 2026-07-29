"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";

interface SkillsCardProps {
  skills: string[];
  qrCodeUrl: string;
  grade: string;
  quizScore: string;
  studyDuration: string;
  completionWeeks: string;
}

export function SkillsCard({
  skills,
  qrCodeUrl,
  grade,
  quizScore,
  studyDuration,
  completionWeeks,
}: SkillsCardProps) {
  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <CardTitle className="text-[18px] font-semibold text-slate-900 dark:text-slate-100">
          ជំនាញដែលទទួលបាន
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Skills & QR Section */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-1.5 flex-1">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="py-1 px-3 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-100 dark:border-indigo-900/50 font-normal text-xs"
              >
                {skill}
              </Badge>
            ))}
          </div>

          <div className="h-20 w-20 p-1.5 rounded-xl bg-white border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs">
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Academic Achievements Section */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <p className="text-[18px] font-semibold text-indigo-950 dark:text-indigo-300">
            សមិទ្ធផលសិក្សា
          </p>

          <div className="flex items-start gap-2.5">
            <Star className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-[18px] font-medium text-slate-800 dark:text-slate-200">
                គ្រោងបញ្ចប់ការសិក្សា
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                និទ្ទេស: {grade}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="h-4 w-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[18px] font-medium text-slate-800 dark:text-slate-200">
                រយៈពេលសិក្សា {studyDuration}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                បញ្ចប់ក្នុងរយៈពេល {completionWeeks}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
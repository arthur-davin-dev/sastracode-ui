"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Sparkles, Award } from "lucide-react";

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
    <Card className="relative w-full overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 transition-all duration-300">
      
      {/* Top Accent Gradient Line (Red Secondary & Yellow Accent) */}
      <div className="absolute top-0 left-0 w-full h-2 " />

      <CardHeader className="pt-8 pb-4">
        {/* Title Section (text-2xl & text-primary-color) */}
        <CardTitle className="text-2xl font-extrabold text-primary-color dark:text-white flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-init-color/20 border border-init-color/50 flex items-center justify-center">
            <Sparkles className="h-7 w-7 text-init-color/20 fill-init-color" />
          </div>
          ជំនាញដែលទទួលបាន
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Skills List & QR Code Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          
          {/* Skills Badges (text-lg) */}
          <div className="flex flex-wrap gap-2.5 flex-1">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-4 py-4 rounded-xl bg-init-color/20 text-primary-color dark:text-yellow-300 border border-yellow-400/50 text-lg font-bold transition-all hover:bg-yellow-400 hover:text-slate-950 shadow-xs"
              >
                {skill}
              </Badge>
            ))}
          </div>

          {/* Framed QR Code */}
          <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-yellow-400 shadow-md shrink-0">
            <img src={qrCodeUrl} alt="QR Code" className="h-20 w-20 object-contain rounded-lg" />
          </div>
        </div>

        {/* Academic Achievements Section */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          
          {/* Subtitle (text-2xl & text-primary-color) */}
          <h3 className="text-lg font-bold text-primary-color dark:text-white flex items-center gap-2">
            <Award className="h-6 w-6 text-secondary-color" />
            សមិទ្ធផលសិក្សា
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Achievement Card 1: Grade & Quiz Score */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-init-color/20 text-init-color shrink-0 shadow-sm mt-0.5">
                <Star className="h-6 w-6 fill-init-color" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-primary-color dark:text-white">គ្រោងបញ្ចប់ការសិក្សា</p>
                <p className="text-lg font-medium text-primary-color dark:text-white opacity-80">
                  និទ្ទេស: <span className="font-bold text-red-600">{grade}</span>
                </p>
                {quizScore && (
                  <p className="text-lg font-medium text-primary-color dark:text-white opacity-70">
                    ពិន្ទុប្រឡង: <span className="font-bold text-primary-color">{quizScore}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Achievement Card 2: Duration */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-secondary-color text-white shrink-0 shadow-sm mt-0.5">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-primary-color dark:text-white">
                  រយៈពេលសិក្សា {studyDuration}
                </p>
                <p className="text-base font-medium text-primary-color dark:text-white opacity-80">
                  បញ្ចប់ក្នុងរយៈពេល <span className="font-bold text-secondary-color">{completionWeeks}</span>
                </p>
              </div>
            </div>

          </div>
        </div>

      </CardContent>
    </Card>
  );
}
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Gauge, Sparkles, Award, type LucideIcon } from "lucide-react";
import { SimilarBadge } from "@/types/achievement";

const iconMap: Record<string, LucideIcon> = {
  terminal: Terminal,
  gauge: Gauge,
};

export function SimilarBadgesCard({ badges }: { badges: SimilarBadge[] }) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl hover:border-blue-50 transition-all duration-300">
      
      {/* Background Decorative Ambient Glow */}
      <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full  blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-blue-600/10 blur-3xl" />

      <CardHeader className="relative z-10 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <CardTitle className="text-2xl font-bold text-primary-color dark:text-white flex items-center gap-2.5 transition-colors duration-300">
          <div className="p-2 rounded-xl bg-primary-color/20 border border-primary-color/40 text-slate-950 dark:text-yellow-400">
            <Award className="h-6 w-6 text-primary-color " />
          </div>
          <span>មេដាយពាក់ព័ន្ធ</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 p-6 space-y-4">
        {badges.map((badge) => {
          const Icon = iconMap[badge.icon] || Terminal;
          const isCompleted = badge.status === "បានបញ្ចប់" || badge.status === "Completed";

          return (
            <div
              key={badge.id}
              className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50
               dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-50 shadow-2xs hover:shadow-md transition-all duration-300 gap-4"
            >
              {/* Left Side: Icon Housing & Name */}
              <div className="flex items-center gap-4">
                {/* Dynamic Icon Housing */}
                <div className="relative shrink-0">
                  <div className="h-12 w-12 rounded-2xl  flex items-center justify-center border border-primary-color
                   shadow-xs group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-slate-950" />
                  </div>
                </div>

                {/* Badge Name (text-lg & text-primary-color) */}
                <div>
                  <p className="text-lg font-bold text-primary-color dark:text-white transition-colors duration-300 leading-snug">
                    {badge.name}
                  </p>
                </div>
              </div>   
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

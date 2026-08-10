"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Gift, Sparkles, Zap } from "lucide-react";

interface XpRewardCardProps {
  xpReward: number;
  progressPercent: number;
}

export function XpRewardCard({ xpReward, progressPercent }: XpRewardCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl hover:border-blue-50 transition-all duration-300">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-12 -left-12 h-36 w-36 rounded-full  blur-3xl" />
      <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-blue-600/10 blur-3xl" />

      <CardContent className="relative z-10 p-7 space-y-5">
        
        {/* Top Header: Reward Label & Animated Gift Box */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-init-color fill-init-color" />
              <p className="text-lg font-bold text-slate-600 dark:text-slate-300">
                រង្វាន់ដែលទទួលបាន
              </p>
            </div>
            
            {/* Reward XP Stat (text-2xl & text-primary-color) */}
            <h3 className="text-2xl font-extrabold text-primary-color dark:text-white flex items-center gap-2">
              <span className="text-secondary-color dark:text-red-400">+{xpReward.toLocaleString()}</span> XP
            </h3>
          </div>

          {/* Floating Gift Box Housing (Yellow Accent Glow) */}
          <div className="relative group shrink-0">
            <div className="absolute inset-0  rounded-2xl blur-md group-hover:bg-blue-600/40 transition-all duration-300" />
            <div className="relative h-14 w-14 rounded-2xl  flex items-center justify-center border border-init-color  group-hover:scale-110 transition-transform duration-300">
              <Gift className="h-7 w-7 text-primary-color" />
            </div>
          </div>
        </div>

        {/* Custom Progress Bar Section (Blue Primary Bar with Red Glow Accent) */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span className="text-slate-600 dark:text-slate-300">
              វឌ្ឍនភាពបន្ថែម
            </span>
            <span className="text-secondary-color dark:text-red-400 font-bold">
              {progressPercent}%
            </span>
          </div>

          {/* Custom Progress Bar */}
          <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-primary-color via-blue-500 to-primary-color rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Footer Subtext (text-lg) */}
        <div className="flex items-center gap-2 pt-1 text-lg font-medium text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/80">
          <Zap className="h-5 w-5 text-init-color fill-init-color shrink-0" />
          <span>XP នេះត្រូវបានបូកបញ្ចូលទៅក្នុងពិន្ទុសរុប</span>
        </div>

      </CardContent>
    </Card>
  );
}
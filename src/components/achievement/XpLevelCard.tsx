"use client";

import { Card, CardContent } from "@/components/ui/card";
import { XpLevelBadge } from "@/components/ui/xp-level-badge";
import { Zap, Sparkles } from "lucide-react";

interface XpLevelCardProps {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  progressPercent: number;
}

export function XpLevelCard({ level, currentXp, nextLevelXp, progressPercent }: XpLevelCardProps) {
  const xpRemaining = nextLevelXp - currentXp;

  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white
     dark:bg-slate-900 hover:border-primary-color/25 hover:-translate-y-0.5 transition-all duration-300">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-blue-400/40 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-blue-600/10 blur-3xl" />

      <CardContent className="relative z-10 p-7 md:p-8 space-y-6">
        
        {/* Card Header Title */}
        <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/20 text-primary-color dark:text-blue-400 border border-blue-500/40 shadow-xs">
              <Zap className="h-6 w-6 text-init-color fill-init-color" />
            </div>
            <h3 className="text-2xl font-bold text-primary-color dark:text-white transition-colors duration-300">
              កម្រិត និងពិន្ទុ XP
            </h3>
          </div>

          {/* Level Booster Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-color text-white text-lg font-bold shadow-xs">
            <Zap className="h-6 w-6 text-init-color fill-init-color" />
            <span>កម្រិត {level}</span>
          </div>
        </div>

        {/* Content Section: Badge & Progress details */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* XP Level Badge Icon Container */}
          <div className="shrink-0 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 shadow-inner">
            <XpLevelBadge level={level} size={84} /> 
          </div>

          {/* Progress Details */}
          <div className="flex-1 w-full space-y-3">
            
            {/* Top Stat Numbers */}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-2xl font-extrabold text-primary-color dark:text-blue-400 transition-colors duration-300">
                {currentXp.toLocaleString()} <span className="text-lg text-primary-color dark:text-white font-semibold">XP</span>
              </p>
              <span className="text-lg font-semibold text-red-600 dark:text-red-400 transition-colors duration-300">
                ទៅកាន់កម្រិតបន្ទាប់ ({progressPercent}%)
              </span>
            </div>

            {/* Custom Modern Progress Bar (Red Secondary Fill on Slate/Yellow Track) */}
            <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-500 shadow-sm" 
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>

            {/* Bottom Progress Footers */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-lg font-medium text-slate-600 dark:text-slate-300 pt-1 gap-1">
              <span>{currentXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP</span>
              <span className="text-slate-500 dark:text-slate-400">
                នៅសល់ <strong className="text-primary-color dark:text-white font-bold">{xpRemaining.toLocaleString()} XP</strong> ទៀតដើម្បីឡើងកម្រិត
              </span>
            </div>

          </div>

        </div>

      </CardContent>
    </Card>
  );
}
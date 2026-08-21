"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Award, TrendingUp, FileBadge, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { UserSummary } from "@/types/achievement";

export function ProfileSummaryCard({ user }: { user: UserSummary }) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900
    hover:border-primary-color/25 hover:-translate-y-1.5 transition-all duration-300">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary-color/10 blur-3xl" />

      <CardContent className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-8">
        
        {/* Left Section: User Avatar & Main Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto text-center sm:text-left">
          
          {/* Avatar with Ring & Level Badge Overlay */}
          <div className="relative shrink-0">
            <Avatar className="h-24 w-24 ring-4 ring-primary-color/20 ring-offset-4 ring-offset-white dark:ring-offset-slate-900 shadow-lg">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-primary-color text-white font-bold text-2xl">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            
            {/* Level Tag Overlay (Red Secondary Accent) */}
            <div className="absolute -bottom-2 -right-2 bg-secondary-color text-white text-base font-bold px-3 py-0.5 rounded-full border-2 border-white dark:border-slate-900 shadow-md flex items-center gap-1">
              <Zap className="h-4 w-4 fill-init-color text-yellow-400" />
              <span>{user.nextLevel - 1} Lv</span>
            </div>
          </div>

          {/* Name & Sub-details */}
          <div className="min-w-0 space-y-3">
            <h2 className="font-bold text-2xl text-primary-color dark:text-white leading-tight break-words">
              {user.name}
            </h2>
            <p className="flex flex-wrap items-center justify-center gap-x-2 sm:justify-start text-lg text-slate-600 dark:text-slate-300 font-medium">
              <span>Bonus Booster</span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span className="text-primary-color dark:text-white font-semibold">
                កម្រិតទី {user.nextLevel - 1}
              </span>
            </p>
          </div>
        </div>

        {/* Center Section: XP Progress Bar */}
        <div className="w-full lg:max-w-md space-y-3 bg-slate-50 dark:bg-slate-800/50 p-5 
        rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-primary-color dark:text-white">
              វឌ្ឍនភាពទៅ Level {user.nextLevel}
            </span>
            <span className="text-secondary-color dark:text-red-400">
              {user.currentXp.toLocaleString()} / {user.nextLevelXp.toLocaleString()} XP
            </span>
          </div>

          {/* Custom Styled Progress Bar (Blue Primary Fill with Yellow Accent Track) */}
          <div className="relative h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-primary-color to-blue-200 rounded-full 
              transition-all duration-500 shadow-inner"
              style={{ width: `${Math.min(user.levelProgressPercent, 100)}%` }}
            />
          </div>

          <p className="text-lg text-right font-medium text-slate-600 dark:text-slate-300">
            {user.levelProgressPercent}% បានបន្ត
          </p>
        </div>

        {/* Right Section: Statistics Counter Grid */}
        <div className="flex items-center gap-4 sm:gap-6 pt-6 lg:pt-0 
        border-t-2 lg:border-t-0 border-slate-100 dark:border-slate-800 w-full lg:w-auto justify-around"> 
          <Stat 
            icon={Award} 
            value={user.badges} 
            label="BADGES" 
            bgColor="bg-yellow-400/20 text-yellow-600 dark:text-yellow-400"
          />
          <Stat 
            icon={TrendingUp} 
            value={`${(user.score / 1000).toFixed(1)}k`} 
            label="SCORE" 
            bgColor="bg-blue-50 dark:bg-blue-950/50 text-primary-color dark:text-blue-400"
          />
          <Stat 
            icon={FileBadge} 
            value={user.certificates} 
            label="CERTIFICATES" 
            bgColor="bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400"
          />
        </div>

      </CardContent>
    </Card>
  );
}

function Stat({ 
  icon: Icon, 
  value, 
  label, 
  bgColor 
}: { 
  icon: LucideIcon;
  value: number | string; 
  label: string;
  bgColor: string;
}) {
  return (
    <div className="flex flex-col items-center min-w-[90px] group">
      {/* Icon Housing Container */}
      <div className={`h-14 w-14 rounded-2xl ${bgColor} flex items-center justify-center mb-2
       shadow-xs group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-7 w-7" />
      </div>

      {/* Number Value */}
      <p className="font-bold text-2xl text-primary-color dark:text-white leading-snug">
        {value}
      </p>

      {/* Label Text */}
      <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Award,
  TrendingUp,
  FileBadge,
  Zap,
  AtSign,
  Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { UserSummary } from "@/types/achievement";

const STAT_TINTS = {
  amber: "bg-amber-400/15 text-amber-600 dark:text-amber-400",
  blue: "bg-blue-500/10 text-primary-color dark:text-blue-400",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
} as const;

export function ProfileSummaryCard({
  user,
  loading = false,
}: {
  user: UserSummary;
  loading?: boolean;
}) {
  if (loading) {
    return <ProfileSummaryCardSkeleton />;
  }

  const progress = Math.min(Math.max(user.levelProgressPercent, 0), 100);
  const currentLevel = user.nextLevel - 1;
  const remainingXp = Math.max(user.nextLevelXp - user.currentXp, 0);
  const scoreValue =
    user.score >= 1000 ? `${(user.score / 1000).toFixed(1)}k` : user.score;

  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary-color/25 hover:-translate-y-1.5 transition-all duration-300">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary-color/10 blur-3xl" />

      <CardContent className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-6 sm:p-8">
        
        {/* Left Section: Fully Centered Avatar + Name Info */}
        <div className="flex flex-col items-center text-center shrink-0 gap-3 w-full lg:w-auto">
          
          {/* Avatar with Level Badge Overlay */}
          <div className="relative shrink-0">
            <Avatar className="h-28 w-28 ring-4 ring-primary-color/20 ring-offset-4 ring-offset-white dark:ring-offset-slate-900 shadow-lg">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-primary-color text-white font-bold text-3xl">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="absolute -bottom-2 -right-1 bg-secondary-color text-white text-xs font-bold px-2.5 py-0.5 rounded-full border-2 border-white dark:border-slate-900 shadow-md flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 fill-init-color text-yellow-400" />
              <span>{user.nextLevel - 1} Lv</span>
            </div>
          </div>

          {/* Name & Sub-details (Centered) */}
          <div className="min-w-0 space-y-1 mt-1">
            <h2 className="font-bold text-2xl text-primary-color dark:text-white leading-tight break-words">
              {user.name}
            </h2>
            <p className="flex flex-wrap items-center justify-center gap-x-2 text-base text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
              <span>Bonus Booster</span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span className="text-primary-color dark:text-white font-semibold">
                កម្រិតទី {user.nextLevel - 1}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-medium text-slate-500 dark:text-slate-400 sm:justify-start">
              {user.username ? (
                <span className="inline-flex items-center gap-1">
                  <AtSign className="h-4 w-4" />
                  {user.username}
                </span>
              ) : null}
              {user.institution ? (
                <span className="inline-flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {user.institution}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right Section: XP Progress Bar & Metric Counters */}
        <div className="flex flex-col justify-between gap-6 w-full lg:flex-1">
          
          {/* XP Progress Bar */}
          <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-base font-bold">
              <span className="text-primary-color dark:text-white">
                វឌ្ឍនភាពទៅ Level {user.nextLevel}
              </span>
              <span className="text-secondary-color dark:text-red-400">
                {user.currentXp.toLocaleString()} / {user.nextLevelXp.toLocaleString()} XP
              </span>
            </div>

            <div className="relative h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-primary-color to-blue-200 rounded-full transition-all duration-500 shadow-inner"
                style={{ width: `${Math.min(user.levelProgressPercent, 100)}%` }}
              />
            </div>

            <p className="text-sm text-right font-medium text-slate-600 dark:text-slate-300">
              {user.levelProgressPercent}% បានបន្ត
            </p>
          </div>

          {/* Metric Counters Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
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

        </div>
      </CardContent>
    </Card>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  tint,
}: {
  icon: LucideIcon;
  value: number | string;
  label: string;
  tint: keyof typeof STAT_TINTS;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 group">
      <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl ${bgColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <p className="font-bold text-lg sm:text-2xl text-primary-color dark:text-white leading-snug">
        {value}
      </p>
      <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
}
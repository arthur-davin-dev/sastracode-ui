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
    <Card
      className="relative overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900 transition-all duration-300 hover:border-primary-color/25"
    >
      {/* Decorative ambient glows */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-primary-color/10 blur-3xl" />

      <CardContent className="relative z-10 space-y-8 p-6 sm:p-8">
        {/* Identity Row */}
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <div className="relative shrink-0">
            <Avatar className="h-24 w-24 shadow-lg ring-4 ring-primary-color/20 ring-offset-4 ring-offset-white dark:ring-offset-slate-900">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-primary-color text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Level tag */}
            <div
              className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap
              rounded-full border-2 border-white bg-secondary-color px-3 py-0.5 text-sm font-bold text-white
              shadow-md dark:border-slate-900"
            >
              <Zap className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span>Lv {currentLevel}</span>
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
              <h2 className="text-2xl font-bold leading-tight text-primary-color dark:text-white">
                {user.name}
              </h2>
              <span
                className="inline-flex shrink-0 items-center rounded-full bg-primary-color/10 px-3 py-1
                text-sm font-bold text-primary-color dark:bg-primary-color/20 dark:text-blue-300"
              >
                កម្រិតទី {currentLevel}
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

        {/* XP Progress */}
        <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-base font-bold text-primary-color dark:text-white">
              វឌ្ឍនភាពទៅ Level {user.nextLevel}
            </span>
            <span className="text-base font-bold text-secondary-color dark:text-red-400">
              {user.currentXp.toLocaleString()} /{" "}
              {user.nextLevelXp.toLocaleString()} XP
            </span>
          </div>

          <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-color to-blue-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-right text-sm font-medium text-slate-500 dark:text-slate-400">
            នៅសល់ {remainingXp.toLocaleString()} XP ទៀត • {progress}%
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <Stat icon={Award} value={user.badges} label="BADGES" tint="amber" />
          <Stat
            icon={TrendingUp}
            value={scoreValue}
            label="SCORE"
            tint="blue"
          />
          <Stat
            icon={FileBadge}
            value={user.certificates}
            label="CERTIFICATES"
            tint="rose"
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
  tint,
}: {
  icon: LucideIcon;
  value: number | string;
  label: string;
  tint: keyof typeof STAT_TINTS;
}) {
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 text-center
      shadow-xs transition-transform duration-300 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${STAT_TINTS[tint]}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-xl font-bold leading-none text-primary-color dark:text-white">
        {value}
      </p>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
}

function ProfileSummaryCardSkeleton() {
  return (
    <Card className="rounded-3xl border-2 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <CardContent className="space-y-8 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="h-24 w-24 shrink-0 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="w-full space-y-3">
            <div className="h-7 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
        <div className="h-28 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800/60" />
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800/60"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

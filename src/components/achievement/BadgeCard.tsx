"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";
import { AchievementBadge } from "@/types/achievement";

export function BadgeCard({ badge }: { badge: AchievementBadge }) {
  const router = useRouter();
  const isClaimable = badge.progressPercent >= 100; // Updated standard claimable threshold (100%)

  const cardContent = (
    <Card
      className={`group relative h-full rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
        badge.locked
          ? "bg-slate-50/80 border-slate-200 dark:bg-slate-800/40 dark:border-slate-800 opacity-80"
          : "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary-color hover:-translate-y-1.5"
      }`}
    >
      {/* Background Accent Glow for unlocked badges */}
      {!badge.locked && (
        <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-yellow-400/20 blur-2xl group-hover:bg-blue-600/20 transition-all duration-500" />
      )}

      <CardContent className="flex flex-col items-center justify-between gap-4 p-6 text-center h-full relative z-10">
        
        {/* Badge Icon Header Container */}
        <div className="relative">
          <div
            className={`h-20 w-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-inner ${
              badge.locked
                ? "bg-slate-200/80 dark:bg-slate-800 text-slate-400"
                : "bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-500 text-slate-950 shadow-amber-300/50 group-hover:scale-105"
            }`}
          >
            {badge.locked ? (
              <Lock className="h-8 w-8 text-slate-400 dark:text-slate-500" />
            ) : (
              <img
                src={badge.iconUrl || "/images/Margin3.png"}
                className="h-12 w-12 object-contain filter drop-shadow-md"
                alt={badge.name}
              />
            )}
          </div>
          
        </div>

        {/* Title (set to text-2xl & text-primary-color) */}
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-primary-color dark:text-white transition-colors duration-300 line-clamp-1">
            {badge.locked ? "មិនទាន់ដោះសោ" : badge.name}
          </h3>

          {!badge.locked && (
            /* Points Content (set to text-lg) */
            <p className="text-lg font-semibold text-red-600 dark:text-red-400 transition-colors duration-300">
              +{badge.points} ពិន្ទុ
            </p>
          )}
        </div>

        {/* Action / Progress Footer */}
        <div className="w-full mt-auto pt-2">
          {isClaimable && !badge.locked ? (
            <Button
              size="lg"
              className="w-full h-12 rounded-2xl bg-yellow-500 hover:bg-yellow-300 text-primary-color text-lg font-bold shadow-md transition-all duration-300 hover:scale-[1.02]"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Claim handler logic
              }}
            >
              ទទួលបាន
            </Button>
          ) : (
            <div className="space-y-2">
              <div className="relative w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    badge.locked ? "bg-slate-300 dark:bg-slate-700" : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(badge.progressPercent, 100)}%` }}
                />
              </div>

              {/* Status Labels (set to text-lg) */}
              <div className="flex justify-between items-center w-full text-lg font-medium text-slate-600 dark:text-slate-400">
                <span>{badge.progressPercent}%</span>
                <span>នៅសល់ {badge.remaining}</span>
              </div>
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  );

  if (badge.locked) {
    return cardContent;
  }

  if (isClaimable) {
    return (
      <div
        className="cursor-pointer h-full"
        onClick={() => router.push(`/achivement/${badge.id}`)}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link href={`/achivement/${badge.id}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
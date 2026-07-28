"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { AchievementBadge } from "@/types/achievement";

export function BadgeCard({ badge }: { badge: AchievementBadge }) {
  const router = useRouter();
  const isClaimable = badge.progressPercent >= 200;

  const cardContent = (
    <Card
      className={`h-full rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        badge.locked
          ? "bg-muted/40 border-slate-200 dark:bg-slate-800/40 dark:border-slate-800"
          : "bg-white border-slate-100 dark:bg-slate-900/90 dark:border-slate-800"
      }`}
    >
      <CardContent className="flex flex-col items-center gap-3 p-6 text-center h-full">
        <div
          className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
            badge.locked
              ? "bg-muted dark:bg-slate-800"
              : "bg-linear-to-br from-yellow-50 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-900/30"
          }`}
        >
          {badge.locked ? (
            <Lock className="h-6 w-6 text-muted-foreground dark:text-slate-400" />
          ) : (
            <img src={badge.iconUrl} className="h-10 w-10 object-contain" alt={badge.name} />
          )}
        </div>

        <p className="text-base font-semibold text-indigo-950 dark:text-white transition-colors duration-300">
          {badge.locked ? "មិនទាន់ដោះសោ" : badge.name}
        </p>

        {!badge.locked && (
          <p className="text-sm font-medium text-muted-foreground dark:text-slate-400 transition-colors duration-300">
            {badge.points} points
          </p>
        )}

        <div className="w-full mt-auto pt-2">
          {isClaimable ? (
            <Button
              size="sm"
              className="w-full rounded-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-semibold"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Claim logic here
              }}
            >
              ទទួលបាន
            </Button>
          ) : (
            <div className="space-y-1.5">
              <Progress
                value={badge.progressPercent}
                className={`h-1.5 rounded-full dark:bg-slate-800 ${
                  badge.locked ? "[&>div]:bg-muted-foreground/40" : "[&>div]:bg-red-500"
                }`}
              />
              <div className="flex justify-between w-full text-xs text-muted-foreground dark:text-slate-400 transition-colors duration-300">
                <span>{badge.progressPercent}%</span>
                <span>Left {badge.remaining}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (badge.locked) {
    return cardContent; // locked → non-clickable
  }

  if (isClaimable) {
    return (
      <div className="cursor-pointer h-full" onClick={() => router.push(`/achivement/${badge.id}`)}>
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
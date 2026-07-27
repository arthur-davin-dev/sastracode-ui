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
      className={`h-full rounded-2xl border-none shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        badge.locked ? "bg-muted/40" : "bg-white"
      }`}
    >
      <CardContent className="flex flex-col items-center gap-3 p-6 text-center h-full">
        <div
          className={`h-16 w-16 rounded-2xl flex items-center justify-center ${
            badge.locked ? "bg-muted" : "bg-gradient-to-br from-yellow-50 to-yellow-100"
          }`}
        >
          {badge.locked ? (
            <Lock className="h-6 w-6 text-muted-foreground" />
          ) : (
            <img src={badge.iconUrl} className="h-10 w-10" alt={badge.name} />
          )}
        </div>

        <p className="text-lg font-semibold text-indigo-950">
          {badge.locked ? "មិនទាន់ដោះសោ" : badge.name}
        </p>

        {!badge.locked && (
          <p className="text-lg text-muted-foreground">{badge.points} points</p>
        )}

        <div className="w-full mt-auto pt-2">
          {isClaimable ? (
            <Button
              size="sm"
              className="w-full rounded-full bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // claim logic ត្រង់នេះ
              }}
            >
              ទទួលបាន
            </Button>
          ) : (
            <>
              <Progress
                value={badge.progressPercent}
                className={`h-1.5 rounded-full ${badge.locked ? "[&>div]:bg-muted-foreground/40" : "[&>div]:bg-red-500"}`}
              />
              <div className="flex justify-between w-full text-lg text-muted-foreground mt-1">
                <span>{badge.progressPercent}%</span>
                <span>Left {badge.remaining}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (badge.locked) {
    return cardContent; // locked → មិនអាចចុចបាន
  }

  if (isClaimable) {
    return (
      <div className="cursor-pointer" onClick={() => router.push(`/achivement/${badge.id}`)}>
        {cardContent}
      </div>
    );
  }

  return <Link href={`/achivement/${badge.id}`}>{cardContent}</Link>;
}
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

  if (badge.locked) {
    return (
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-2 p-6 text-center h-full">
          <Lock className="h-6 w-6 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">មិនទាន់ដោះសោ</p>
        </CardContent>
      </Card>
    );
  }
  if (badge.progressPercent >= 200) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent
          className="flex flex-col items-center gap-2 p-4 text-center cursor-pointer"
          onClick={() => router.push(`/achivement/${badge.id}`)}
        >
          <img src={badge.iconUrl} className="h-12 w-12" alt={badge.name} />
          <p className="font-medium text-sm">{badge.name}</p>
          <p className="text-xs text-muted-foreground">{badge.points} points</p>
        </CardContent>
        <div className="px-4 pb-4">
          <Button
            size="sm"
            className="bg-yellow-400 hover:bg-yellow-500 text-black w-full"
            onClick={(e) => {
              e.stopPropagation(); 
              router.push(`/achivement/${badge.id}`);
            }}
          >
            ទទួលបាន
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Link href={`/achivement/${badge.id}`}>
      <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
          <img src={badge.iconUrl} className="h-12 w-12" alt={badge.name} />
          <p className="font-medium text-sm">{badge.name}</p>
          <p className="text-xs text-muted-foreground">{badge.points} points</p>
          <Progress value={badge.progressPercent} className="h-1.5 w-full [&>div]:bg-red-600" />
          <div className="flex justify-between w-full text-xs text-muted-foreground">
            <span>Reached {badge.progressPercent}%</span>
            <span>Left {badge.remaining}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
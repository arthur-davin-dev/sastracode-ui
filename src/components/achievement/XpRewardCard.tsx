// components/achievement/XpRewardCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gift } from "lucide-react";

interface XpRewardCardProps {
  xpReward: number;
  progressPercent: number;
}

export function XpRewardCard({ xpReward, progressPercent }: XpRewardCardProps) {
  return (
    <Card className="bg-indigo-950 text-white border-0">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-indigo-200 mb-1">រង្វាន់ដែលទទួលបាន</p>
            <p className="text-2xl font-bold">+{xpReward} XP</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
            <Gift className="h-5 w-5" />
          </div>
        </div>
        <Progress value={progressPercent} className="h-1.5 bg-white/20 [&>div]:bg-green-400" />
        <p className="text-xs text-indigo-200 mt-2">XP នេះត្រូវបានបូកបញ្ចូលទៅក្នុងពិន្ទុសរុប</p>
      </CardContent>
    </Card>
  );
}
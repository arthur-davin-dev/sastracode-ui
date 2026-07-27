import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gift } from "lucide-react";

interface XpRewardCardProps {
  xpReward: number;
  progressPercent: number;
}

export function XpRewardCard({ xpReward, progressPercent }: XpRewardCardProps) {
  return (
    <Card className="bg-indigo-950 dark:bg-slate-900/90 text-white border-0 dark:border dark:border-slate-800 transition-colors duration-300">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-indigo-200 dark:text-slate-400 mb-1 transition-colors duration-300">
              រង្វាន់ដែលទទួលបាន
            </p>
            <p className="text-2xl font-bold text-white transition-colors duration-300">
              +{xpReward} XP
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/10 dark:bg-slate-800/80 flex items-center justify-center transition-colors duration-300">
            <Gift className="h-5 w-5 text-amber-400" />
          </div>
        </div>
        <Progress 
          value={progressPercent} 
          className="h-1.5 bg-white/20 dark:bg-slate-800 [&>div]:bg-green-400" 
        />
        <p className="text-xs text-indigo-200 dark:text-slate-400 mt-2 transition-colors duration-300">
          XP នេះត្រូវបានបូកបញ្ចូលទៅក្នុងពិន្ទុសរុប
        </p>
      </CardContent>
    </Card>
  );
}
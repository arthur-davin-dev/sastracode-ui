import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { XpLevelBadge } from "@/components/ui/xp-level-badge";
import { Zap } from "lucide-react";

interface XpLevelCardProps {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  progressPercent: number;
}

export function XpLevelCard({ level, currentXp, nextLevelXp, progressPercent }: XpLevelCardProps) {
  return (
    <Card className="dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-4 w-4 text-amber-500 dark:text-amber-400 shrink-0" />
          <p className="text-lg font-medium text-slate-900 dark:text-white transition-colors duration-300">
            កម្រិត និងពិន្ទុ XP
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          <XpLevelBadge level={level} size={72} /> 

          <div className="flex-1 w-full">
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                {currentXp.toLocaleString()} XP
              </p>
              <span className="text-xs text-muted-foreground dark:text-slate-400 transition-colors duration-300">
                ទៅកាន់កម្រិតបន្ទាប់
              </span>
            </div>
            <Progress 
              value={progressPercent} 
              className="h-2 dark:bg-slate-800 [&>div]:bg-red-600 dark:[&>div]:bg-red-500" 
            />
            <div className="flex justify-between text-xs text-muted-foreground dark:text-slate-400 mt-1.5 transition-colors duration-300">
              <span>{currentXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP</span>
              <span>នៅសល់ត្រូវការឡើងកម្រិត</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
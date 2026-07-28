import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { XpLevelBadge } from "@/components/ui/xp-level-badge"; // ← ប្តូរពី CircularProgress
import { Zap } from "lucide-react";

interface XpLevelCardProps {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  progressPercent: number;
}

export function XpLevelCard({ level, currentXp, nextLevelXp, progressPercent }: XpLevelCardProps) {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-4 w-4 text-muted-foreground " />
          <p className="text-lg text-primary-color font-medium">កម្រិត និងពិន្ទុ XP</p>
        </div>

        <div className="flex items-center gap-5">
          <XpLevelBadge level={level} size={72} /> 

          <div className="flex-1">
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-2xl font-bold text-primary-color">{currentXp.toLocaleString()} XP</p>
              <span className="text-lg text-primary-color not-first-of-type:text-muted-foreground">ទៅកាន់កម្រិតបន្ទាប់</span>
            </div>
            <Progress value={progressPercent} className="h-1.5 [&>div]:bg-secondary-color" />
            <div className="flex justify-between text-primary-color text-lg text-muted-foreground mt-1">
              <span>{currentXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP</span>
              <span>នៅសល់ត្រូវការឡើងកម្រិត</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Activity } from "@/types/achievement";

export function RecentActivityItem({ activity }: { activity: Activity }) {
  return (
    <Card className="mb-3 dark:bg-slate-800/60 dark:border-slate-800/80 transition-colors duration-300">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg transition-colors duration-300">
            {activity.icon}
          </div>
          <div>
            <p className="font-medium text-sm text-slate-900 dark:text-white transition-colors duration-300">
              {activity.title}
            </p>
            <p className="text-xs text-muted-foreground dark:text-slate-400 transition-colors duration-300">
              {activity.subtitle}
            </p>
          </div>
        </div>
        <Badge 
          variant="secondary" 
          className="gap-1 text-green-600 bg-green-50 dark:bg-green-500/20 dark:text-green-400 border-transparent transition-colors duration-300"
        >
          +{activity.xp} XP <CheckCircle2 className="h-3 w-3" />
        </Badge>
      </CardContent>
    </Card>
  );
}
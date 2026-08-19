import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap } from "lucide-react";
import { Activity } from "@/types/achievement";

export function RecentActivityItem({ activity }: { activity: Activity }) {
  return (
    <Card className=" overflow-hidden rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs hover:border-primary-color/25 transition-all duration-300 group">
      <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between p-3">
        
        {/* Left Section: Icon & Text Info */}
        <div className="flex items-start sm:items-center gap-4">
          {/* Activity Icon Box */}
          <div className="h-10 w-10 shrink-0 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-primary-color
           dark:text-blue-600 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform duration-300">
            {activity.icon}
          </div>

          {/* Activity Title & Subtitle */}
          <div className="space-y-1">
            <h4 className="font-normal text-lg text-primary-color dark:text-white transition-colors duration-300 leading-snug">
              {activity.title}
            </h4>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-normal transition-colors duration-300">
              {activity.subtitle}
            </p>
          </div>
        </div>

        {/* Right Section: XP Reward Badge (Yellow Accent with Red Secondary Highlights) */}
        <div className="flex items-center self-start sm:self-center shrink-0">
          <Badge 
            variant="secondary" 
            className="gap-2 px-1.5 py-4 text-lg font-medium bg-primary-color text-white dark:text-white border border-primary-color/40 rounded-xl shadow-xs   transition-all duration-300"
          >
            <Zap className="h-5 w-5 text-red-600 fill-red-600" />
            <span>+{activity.xp} XP</span>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </Badge>
        </div>

      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, CheckCircle2, Flame, BarChart3 } from "lucide-react";
import { UserStat } from "@/types/leaderboard";

const iconMap: Record<string, any> = {
  star: Star,
  check: CheckCircle2,
  flame: Flame,
  chart: BarChart3,
};

export function YourStatsCard({ stats }: { stats: UserStat[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm">Your Stats</CardTitle>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-3">
        {stats.map((stat, i) => {
          const Icon = iconMap[stat.icon];
          return (
            <div key={i} className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-md flex items-center justify-center ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Check } from "lucide-react";
import { WeeklyGoalDay } from "@/types/leaderboard";

export function WeeklyGoalCard({ days, completedCount, totalCount }: { days: WeeklyGoalDay[]; completedCount: number; totalCount: number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm">Weekly Goal</CardTitle>
        <Target className="h-4 w-4 text-red-500" />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-green-600 font-medium mb-3">{completedCount} / {totalCount} days completed</p>
        <div className="flex justify-between">
          {days.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  day.completed
                    ? "bg-green-500 text-white"
                    : day.isToday
                    ? "bg-yellow-400 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {day.completed ? <Check className="h-3 w-3" /> : day.day[0]}
              </div>
              <span className="text-[10px] text-muted-foreground">{day.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
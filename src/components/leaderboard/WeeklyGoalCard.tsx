import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Check } from "lucide-react";
import { WeeklyGoalDay } from "@/types/leaderboard";

export function WeeklyGoalCard({
  days,
  completedCount,
  totalCount,
}: {
  days: WeeklyGoalDay[];
  completedCount: number;
  totalCount: number;
}) {
  const progressPercentage = Math.round((completedCount / totalCount) * 100) || 0;

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      
      {/* Top Accent Bar */}
      <div className="h-1.5 w-full bg-red-600" />

      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-50 dark:bg-red-950/40 text-red-600 rounded-xl">
            <Target size={22} />
          </div>
          <CardTitle className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            គោលដៅប្រចាំសប្តាហ៍
          </CardTitle>
        </div>

        {/* Counter Badge */}
        <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-3 py-1 rounded-full border border-red-200/50 dark:border-red-800/50">
          {completedCount} / {totalCount} ថ្ងៃ
        </span>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* Progress Info & Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-sm font-bold">
            <span className="text-slate-600 dark:text-slate-400">លទ្ធផលសម្រេចបាន</span>
            <span className="text-red-600 dark:text-red-400 font-extrabold">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-primary-color h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Days Circle Tracker */}
        <div className="flex justify-between items-center gap-1 pt-1">
          {days.map((day, i) => {
            const isCompleted = day.completed;
            const isToday = day.isToday;

            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    isCompleted
                      ? "bg-primary-color text-slate-950 font-black scale-105"
                      : isToday
                      ? "bg-red-600 text-white ring-2 ring-red-300 dark:ring-red-900 scale-105"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={18} className="stroke-[3]" />
                  ) : (
                    <span>{day.day?.[0]}</span>
                  )}
                </div>

                <span
                  className={`text-xs font-bold transition-colors ${
                    isToday
                      ? "text-red-600 dark:text-red-400 font-black"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
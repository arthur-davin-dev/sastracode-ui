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
    <Card className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
      
      {/* Top Accent Bar */}
      <div className="h-2 w-full " />

      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-50 dark:bg-red-950/40 text-red-600 rounded-2xl">
            <Target size={28} />
          </div>
          <CardTitle className="text-2xl font-black text-primary-color tracking-tight">
            គោលដៅប្រចាំសប្តាហ៍
          </CardTitle>
        </div>

        {/* Counter Badge */}
        <span className="text-lg font-extrabold text-secondary-color bg-red-50 dark:bg-red-950/50 px-8 py-1.5 rounded-full border border-red-200/50 dark:border-red-800/50">
          {completedCount} / {totalCount} ថ្ងៃ
        </span>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Progress Info & Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-lg font-bold text-primary-color">
            <span className="opacity-80">លទ្ធផលសម្រេចបាន</span>
            <span className="text-secondary-color font-extrabold">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
            <div
              className="bg-init-color h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Days Circle Tracker */}
        <div className="flex justify-between items-center gap-1.5 pt-2">
          {days.map((day, i) => {
            const isCompleted = day.completed;
            const isToday = day.isToday;

            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className={`h-11 w-11 rounded-2xl flex items-center justify-center text-lg font-extrabold transition-all duration-300 shadow-sm ${
                    isCompleted
                      ? "bg-init-color text-primary-color border-2 border-init-color scale-105"
                      : isToday
                      ? "bg-secondary-color text-white ring-4 ring-red-100 dark:ring-red-950 scale-110"
                      : "bg-slate-100 text-primary-color opacity-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={22} className="stroke-[3]" />
                  ) : (
                    <span>{day.day?.[0]}</span>
                  )}
                </div>

                <span
                  className={`text-base font-bold transition-colors ${
                    isToday
                      ? "text-seccondary-color font-black"
                      : "text-primary-color opacity-70"
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
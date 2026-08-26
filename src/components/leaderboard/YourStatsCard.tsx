import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, CheckCircle2, Flame, BarChart3, LucideIcon } from "lucide-react";
import { UserStat } from "@/types/leaderboard";

const iconMap: Record<string, LucideIcon> = {
  star: Star,
  check: CheckCircle2,
  flame: Flame,
  chart: BarChart3,
};

export function YourStatsCard({ stats }: { stats: UserStat[] }) {
  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Top Accent Ribbon */}
      <div className="w-full" />

      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary-color/10 text-primary-color dark:text-white">
            <BarChart3 size={22} />
          </div>
          <CardTitle className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            ស្ថិតិរបស់អ្នក
          </CardTitle>
        </div>

        <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded-full border border-red-200/50 dark:border-red-800/50">
          ផ្ទាល់ខ្លួន
        </span>
      </CardHeader>

      <CardContent className="space-y-3">
        {stats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || BarChart3;

          return (
            <div
              key={i}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200"
            >
              {/* Icon Container */}
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-amber-600 dark:text-white shrink-0">
                <Icon size={20} className="stroke-[2.5]" />
              </div>

              {/* Value and Label */}
              <div className="flex-1 min-w-0">
                <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                  {stat.value}
                </p>
                <p className="text-lg font-bold text-slate-700 dark:text-slate-400 truncate">
                  {stat.label}
                </p>
              </div>

              {/* Accent Dot */}
              <div className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

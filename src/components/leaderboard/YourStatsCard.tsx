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
    <Card className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
      
      {/* Top Accent Ribbon */}
      <div className="h-2 w-full " />

      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6 px-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-init-color/20 text-init-color rounded-2xl">
            <BarChart3 size={28} className="text-init-color" />
          </div>
          <CardTitle className="text-2xl font-black text-primary-color tracking-tight">
            ស្ថិតិរបស់អ្នក
          </CardTitle>
        </div>

        <span className="text-lg font-extrabold text-secondary-color bg-red-50 dark:bg-red-950/40 px-3.5 py-1.5 rounded-full border border-red-200/50 dark:border-red-800/50">
          ផ្ទាល់ខ្លួន
        </span>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {stats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || BarChart3;

          return (
            <div
              key={i}
              className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-yellow-400/10 transition-all duration-200"
            >
              {/* Icon Container with Yellow / Red accents */}
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-init-color/40 text-primary-color shrink-0 shadow-md">
                <Icon size={24} className="stroke-[2.5]" />
              </div>

              {/* Value and Label */}
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-black text-primary-color leading-tight">
                  {stat.value}
                </p>
                <p className="text-lg font-bold text-primary-color opacity-70 truncate">
                  {stat.label}
                </p>
              </div>

              {/* Accent Dot */}
              <div className="h-2.5 w-2.5 rounded-full bg-secondary-color shrink-0" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
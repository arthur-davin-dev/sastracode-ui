import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TopPerformer } from "@/types/leaderboard";
import { Crown } from "lucide-react";

const rankBadges: Record<number, string> = {
  1: "bg-amber-400 text-slate-950 font-black shadow-xs",
  2: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100",
  3: "bg-red-600 text-white font-bold shadow-xs",
};

export function TopPerformersCard({ performers }: { performers: TopPerformer[] }) {
  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      
      {/* Top Gradient Ribbon Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 to-red-600" />

      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-400/10 text-amber-600 dark:text-amber-400 rounded-xl">
            <Crown size={22} className="fill-amber-400" />
          </div>
          <CardTitle className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            អ្នកឆ្នើមប្រចាំខែ
          </CardTitle>
        </div>

        <a
          href="#"
          className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline transition-colors duration-200"
        >
          មើលទាំងអស់
        </a>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        {performers.map((p, index) => (
          <div
            key={`${p.rank}-${p.name}-${index}`}
            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200"
          >
            {/* Rank Badge */}
            <span
              className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                rankBadges[p.rank] || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              {p.rank}
            </span>

            {/* Avatar */}
            <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-700">
              <AvatarImage src={p.avatarUrl} alt={p.name} />
              <AvatarFallback className="bg-amber-400/20 text-amber-700 dark:text-amber-400 text-xs font-extrabold">
                {p.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate leading-tight">
                {p.name}
              </p>
            </div>

            {/* XP Badge */}
            <span className="text-xs font-extrabold text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg shrink-0">
              {p.xp.toLocaleString()} <span className="text-red-600 dark:text-red-400 font-bold">XP</span>
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TopPerformer } from "@/types/leaderboard";
import { Crown, Sparkles } from "lucide-react";

const rankBadges: Record<number, string> = {
  1: "bg-yellow-400 text-slate-950 border-2 border-yellow-300 shadow-md",
  2: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100",
  3: "bg-red-600 text-white shadow-md",
};

export function TopPerformersCard({ performers }: { performers: TopPerformer[] }) {
  return (
    <Card className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
      
      {/* Top Gradient Ribbon Accent */}
      <div className="h-2 w-full " />

      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6 px-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-yellow-400/20 text-yellow-600 rounded-2xl">
            <Crown size={28} className="text-yellow-500 fill-yellow-400" />
          </div>
          <CardTitle className="text-2xl font-black text-primary-color tracking-tight">
            អ្នកឆ្នើមប្រចាំខែ
          </CardTitle>
        </div>

        <a
          href="#"
          className="text-lg font-bold text-red-600 hover:text-yellow-500 hover:underline transition-colors duration-200 flex items-center gap-1"
        >
          <span>មើលទាំងអស់</span>
          <Sparkles size={18} className="inline-block" />
        </a>
      </CardHeader>

      <CardContent className="p-6 space-y-3.5">
        {performers.map((p) => (
          <div
            key={p.rank}
            className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-yellow-400/10 transition-all duration-200"
          >
            {/* Rank Badge */}
            <span
              className={`h-8 w-8 rounded-xl flex items-center justify-center text-lg font-extrabold shrink-0 ${
                rankBadges[p.rank] || "bg-slate-100 text-primary-color"
              }`}
            >
              {p.rank}
            </span>
            {/* Avatar */}
            <Avatar className="h-11 w-11 border-2 border-yellow-400/60 shrink-0">
              <AvatarImage src={p.avatarUrl} alt={p.name} />
              <AvatarFallback className="bg-yellow-400/20 text-red-600 text-lg font-extrabold">
                {p.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-primary-color truncate leading-tight">
                {p.name}
              </p>
            </div>

            {/* XP Badge */}
            <span className="text-lg font-extrabold text-primary-color bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-xl shrink-0 shadow-sm">
              {p.xp.toLocaleString()} <span className="text-red-600 text-base font-bold">XP</span>
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
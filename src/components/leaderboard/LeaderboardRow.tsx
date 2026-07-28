import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LeaderboardEntry } from "@/types/leaderboard";

const rankColors: Record<number, string> = {
  1: "bg-yellow-400 text-slate-950 font-extrabold border-2 border-yellow-300 shadow-md",
  2: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100 font-bold",
  3: "bg-red-600 text-white font-bold shadow-md",
};

export function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  return (
    <div
      className={`flex items-center justify-between p-4 my-1.5 rounded-2xl transition-all duration-300 border ${
        entry.isCurrentUser
          ? "bg-yellow-400/20 border-yellow-400/60 shadow-md"
          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60"
      }`}
    >
      {/* Rank Badge */}
      <div className="flex items-center justify-center w-12 shrink-0">
        {entry.rank <= 3 ? (
          <span
            className={`h-9 w-9 rounded-2xl flex items-center justify-center text-lg ${rankColors[entry.rank]}`}
          >
            {entry.rank}
          </span>
        ) : (
          <span className="text-lg font-bold text-primary-color opacity-70 w-8 text-center">
            #{entry.rank}
          </span>
        )}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0 ml-2">
        <Avatar className="h-12 w-12 border-2 border-slate-200 dark:border-slate-700 shrink-0">
          <AvatarImage src={entry.avatarUrl} alt={entry.name} />
          <AvatarFallback className="bg-yellow-400/20 text-red-600 text-lg font-extrabold">
            {entry.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0">
          <p className="text-lg font-bold text-primary-color truncate leading-tight">
            {entry.name}
            {entry.isCurrentUser && (
              <span className="ml-2 text-sm font-extrabold text-red-600 bg-red-100 dark:bg-red-950/50 px-2.5 py-0.5 rounded-full inline-block">
                អ្នក
              </span>
            )}
          </p>
          <p className="text-base font-medium text-primary-color opacity-70">
            កម្រិត {entry.level}
          </p>
        </div>
      </div>

      {/* XP Score */}
      <div className="text-right shrink-0">
        <span className="text-lg font-extrabold text-primary-color bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 inline-block">
          {entry.xp.toLocaleString()} <span className="text-red-600 text-base font-bold">XP</span>
        </span>
      </div>
    </div>
  );
}
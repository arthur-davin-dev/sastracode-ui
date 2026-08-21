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
      className={`my-1.5 grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-2 rounded-2xl border p-3 transition-all duration-300 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-3 sm:p-4 ${
        entry.isCurrentUser
          ? "bg-init-color/10 border-init-color/60 shadow-md"
          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60"
      }`}
    >
      {/* Rank Badge */}
      <div className="flex w-10 shrink-0 items-center justify-center sm:w-12">
        {entry.rank <= 3 ? (
          <span
            className={`h-9 w-9 rounded-2xl flex items-center justify-center text-lg ${rankColors[entry.rank]}`}
          >
            {entry.rank}
          </span>
        ) : (
          <span className="text-lg font-bold text-primary-color dark:text-white opacity-70 w-8 text-center">
            #{entry.rank}
          </span>
        )}
      </div>

      {/* User Info */}
      <div className="ml-1 flex min-w-0 items-center gap-3 sm:ml-2 sm:gap-4">
        <Avatar className="h-10 w-10 shrink-0 border-2 border-slate-200 dark:border-slate-700 sm:h-12 sm:w-12">
          <AvatarImage src={entry.avatarUrl} alt={entry.name} />
          <AvatarFallback className="bg-init-color/20 text-secondary-color text-lg font-extrabold">
            {entry.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0">
          <p className="truncate text-base font-bold leading-tight text-primary-color dark:text-white sm:text-lg">
            {entry.name}
            {entry.isCurrentUser && (
              <span className="ml-2 inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-extrabold text-secondary-color dark:bg-red-950/50 sm:px-3 sm:text-sm">
                អ្នក
              </span>
            )}
          </p>
          <p className="truncate text-lg font-medium text-primary-color dark:text-white opacity-70">
            {entry.level ? `កម្រិត ${entry.level}` : "Leaderboard member"}
          </p>
        </div>
      </div>

      {/* XP Score */}
      <div className="col-start-2 text-left sm:col-start-auto sm:text-right">
        <span className="inline-block rounded-xl border border-slate-200/50 bg-slate-100 px-3 py-1 text-sm font-extrabold text-primary-color dark:text-white dark:border-slate-700/50 dark:bg-slate-800 sm:px-3.5 sm:py-1.5 sm:text-lg">
          {entry.xp.toLocaleString()} <span className="text-red-600 text-base font-bold">XP</span>
        </span>
      </div>
    </div>
  );
}

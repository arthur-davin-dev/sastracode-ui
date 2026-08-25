import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LeaderboardEntry } from "@/types/leaderboard";
import { Award, Crown, Medal, type LucideIcon } from "lucide-react";

const topRankBadges: Record<
  number,
  { icon: LucideIcon; label: string; className: string }
> = {
  1: {
    icon: Crown,
    label: "លេខ ១",
    className: "bg-[#ffb800] text-slate-950",
  },
  2: {
    icon: Medal,
    label: "លេខ ២",
    className: "bg-[#e8eef5] text-[#29466c]",
  },
  3: {
    icon: Award,
    label: "លេខ ៣",
    className: "bg-[#c94d00] text-white",
  },
};

export function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const topRankBadge = topRankBadges[entry.rank];

  return (
    <div
      className={`my-1 grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-2 rounded-2xl border p-3 transition-all duration-300 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] sm:gap-3 sm:p-2 ${
        entry.isCurrentUser
          ? "bg-primary-color/50 border-primary-color/60 shadow-md"
          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60"
      }`}
    >
      {/* Rank Badge */}
      <div className="flex w-full shrink-0 items-center justify-center">
        {topRankBadge ? (
          <span
            className={`flex h-11 w-full max-w-24 items-center justify-center rounded-full text-base font-extrabold ${topRankBadge.className}`}
          >
            <topRankBadge.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">{topRankBadge.label}</span>
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
          <AvatarFallback className="bg-primary-color text-white dark:bg-slate-300 dark:text-primary-color text-lg font-extrabold">
            {entry.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0">
          <p className="truncate text-sm font-bold leading-tight text-primary-color dark:text-white">
            {entry.name}
            {entry.isCurrentUser && (
              <span className="ml-2 inline-block rounded-full sm:text-sm bg-red-100 px-2 py-1 text-xs font-extrabold text-secondary-color dark:bg-red-950/50 sm:px-3 ">
                អ្នក
              </span>
            )}
          </p>
          <p className="truncate text-base font-medium text-primary-color dark:text-white opacity-70">
            {entry.level ? `កម្រិត ${entry.level}` : "Leaderboard member"}
          </p>
        </div>
      </div>

      {/* XP Score */}
      <div className="col-start-2 text-left sm:col-start-auto sm:text-right">
        <span className="inline-block rounded-xl border border-slate-200/50 bg-slate-100 px-3 py-1 text-base font-extrabold text-primary-color dark:text-white dark:border-slate-700/50 dark:bg-slate-800 sm:px-3.5 sm:py-1.5">
          {entry.xp.toLocaleString()}{" "}
          <span className="text-red-600 text-base font-bold">XP</span>
        </span>
      </div>
    </div>
  );
}

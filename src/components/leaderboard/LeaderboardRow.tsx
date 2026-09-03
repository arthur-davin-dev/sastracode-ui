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
  const profileHref = entry.userId
    ? `/players/${encodeURIComponent(entry.userId)}?${new URLSearchParams({
        name: entry.name,
        avatarUrl: entry.avatarUrl,
        rank: String(entry.rank),
        xp: String(entry.xp),
      }).toString()}`
    : undefined;

  return (
    <Link
      href={profileHref ?? "#"}
      aria-disabled={!profileHref}
      onClick={(event) => {
        if (!profileHref) event.preventDefault();
      }}
      className={`my-1 grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-2 rounded-2xl border p-3 transition-all duration-300 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] sm:gap-3 sm:p-2 ${
        entry.isCurrentUser
          ? "bg-primary-color  border-primary-color/60 shadow-md "
          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60"
      }`}
    >
      {/* Rank Badge */}
      <div className="flex w-full shrink-0 items-center justify-center">
        {topRankBadge ? (
          <span
            aria-label={topRankBadge.label}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ${topRankBadge.className}`}
          >
            <topRankBadge.icon
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />
          </span>
        ) : (
          <span className="w-8 text-center text-sm font-bold text-primary-color opacity-70 dark:text-white">
            #{entry.rank}
          </span>
        )}
      </div>

      {/* User Info */}
      <div className="ml-1 flex min-w-0 items-center gap-2 sm:ml-2 sm:gap-3">
        <Avatar className="h-9 w-9 shrink-0 border-2 border-slate-200 dark:border-slate-700 sm:h-10 sm:w-10">
          <AvatarImage src={entry.avatarUrl} alt={entry.name} />
          <AvatarFallback className="bg-primary-color text-white dark:bg-slate-300 dark:text-primary-color text-base font-extrabold">
            {entry.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0">
          <p
            className={`truncate !text-lg font-bold leading-tight ${
              entry.isCurrentUser
                ? "text-white"
                : "text-primary-color dark:text-white"
            }`}
          >
            {entry.name}
            {entry.isCurrentUser && (
              <span className="ml-2 inline-block rounded-full sm:text-sm bg-red-100 px-2 py-1 text-xs font-extrabold text-secondary-color dark:bg-red-950/50 sm:px-3 ">
                អ្នក
              </span>
            )}
          </p>
          <p
            className={`truncate !text-[14px] font-medium opacity-70 sm:text-sm ${
              entry.isCurrentUser
                ? "text-white"
                : "text-primary-color dark:text-white"
            }`}
          >
            {entry.level ? `កម្រិត ${entry.level}` : "Leaderboard member"}
          </p>
        </div>
      </div>

      {/* XP Score */}
      <div className="text-right">
        <span className="inline-block whitespace-nowrap rounded-full border border-slate-200/50 bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-primary-color dark:border-slate-700/50 dark:bg-slate-800 dark:text-white sm:px-3 sm:py-1.5 sm:text-sm">
          {entry.xp.toLocaleString()}{" "}
          <span className="text-secondary-color text-base font-bold">XP</span>
        </span>
      </div>
    </div>
  );
}

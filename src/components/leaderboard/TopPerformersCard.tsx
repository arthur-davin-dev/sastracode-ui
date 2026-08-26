import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TopPerformer } from "@/types/leaderboard";
import { Crown, Trophy } from "lucide-react";

const podiumStyles: Record<number, { card: string; avatar: string; trophy: string; rankText: string }> = {
  1: {
    card: "border-amber-300 bg-amber-50/70 shadow-md ring-1 ring-amber-300/60 dark:border-amber-500/40 dark:bg-amber-500/10",
    avatar: "h-14 w-14 border-amber-300 dark:border-amber-500/50",
    trophy: "bg-amber-400 text-slate-950",
    rankText: "text-amber-500 dark:text-amber-400",
  },
  2: {
    card: "border-slate-200 bg-slate-50/70 dark:border-slate-700 dark:bg-slate-800/40",
    avatar: "h-11 w-11 border-slate-200 dark:border-slate-700",
    trophy: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100",
    rankText: "text-slate-500 dark:text-slate-300",
  },
  3: {
    card: "border-red-200 bg-red-50/60 dark:border-red-900/50 dark:bg-red-950/20",
    avatar: "h-11 w-11 border-red-200 dark:border-red-900/50",
    trophy: "bg-red-600 text-white",
    rankText: "text-red-500 dark:text-red-400",
  },
};

// Visual podium order: 2nd on the left, 1st elevated in the middle, 3rd on the right.
const podiumOrder = [2, 1, 3];

// Busts stale browser-cached avatar thumbnails (e.g. after a user updates their
// profile picture but the file URL stays the same) by tagging each page load.
const CACHE_BUST = typeof window !== "undefined" ? Date.now() : 0;

function withCacheBust(url?: string) {
  if (!url) return url;
  return `${url}${url.includes("?") ? "&" : "?"}v=${CACHE_BUST}`;
}

export function TopPerformersCard({ performers }: { performers: TopPerformer[] }) {
  const byRank = new Map(performers.map((p) => [p.rank, p]));
  const ordered = podiumOrder
    .map((rank) => byRank.get(rank))
    .filter((p): p is TopPerformer => Boolean(p));
  const display = ordered.length === performers.length ? ordered : performers;

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-primary-color/10 text-amber-600 dark:text-amber-400 rounded-xl">
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

      <CardContent className="grid grid-cols-3 items-end gap-2 pt-6 sm:gap-3">
        {display.map((p) => {
          const style = podiumStyles[p.rank] ?? podiumStyles[3];
          const isFirst = p.rank === 1;

          const profileHref = p.userId
            ? `/players/${encodeURIComponent(p.userId)}?${new URLSearchParams({
                name: p.name,
                avatarUrl: p.avatarUrl ?? "",
                rank: String(p.rank),
                xp: String(p.xp),
              }).toString()}`
            : undefined;

          return (
            <Link
              key={`${p.rank}-${p.name}`}
              href={profileHref ?? "#"}
              aria-disabled={!profileHref}
              onClick={(event) => {
                if (!profileHref) event.preventDefault();
              }}
              className={`relative flex flex-col items-center rounded-2xl border p-3 text-center transition-all duration-200 hover:-translate-y-0.5 ${style.card} ${
                isFirst ? "-translate-y-3 pb-4 pt-4" : "pt-3"
              }`}
            >
              {/* Trophy Badge */}
              <span
                className={`absolute flex items-center justify-center rounded-full shadow-sm ${style.trophy} ${
                  isFirst
                    ? "-top-4 right-2 h-10 w-10 shadow-lg ring-2 ring-amber-300/70"
                    : "-top-3 right-3 h-8 w-8"
                }`}
              >
                <Trophy size={isFirst ? 20 : 16} />
              </span>

              {/* Avatar */}
              <Avatar className={`border-2 ${style.avatar}`}>
                <AvatarImage src={withCacheBust(p.avatarUrl)} alt={p.name} />
                <AvatarFallback className="bg-primary-color/20 text-amber-700 dark:text-amber-400 font-extrabold">
                  {p.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>

              {/* Name */}
              <p className="mt-2 w-full truncate text-sm font-bold text-slate-900 dark:text-white">
                {p.name}
              </p>

              {/* Rank */}
              <p className={`text-2xl font-black leading-none ${style.rankText}`}>#{p.rank}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                សកល
              </p>

              {/* XP Badge */}
              <span
                className={`mt-2 w-full truncate rounded-lg border border-slate-200 bg-white font-extrabold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${
                  isFirst ? "px-2.5 py-1.5 text-lg" : "px-2 py-1 text-base"
                }`}
              >
                {p.xp.toLocaleString()} <span className="text-red-600 dark:text-red-400">XP</span>
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

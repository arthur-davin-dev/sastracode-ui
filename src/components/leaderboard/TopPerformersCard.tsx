import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TopPerformer } from "@/types/leaderboard";
import { Crown, Medal } from "lucide-react";

const podiumStyles: Record<
  number,
  { card: string; avatar: string; trophy: string; rankText: string }
> = {
  1: {
    card: "border-primary-color bg-primary-color shadow-xl shadow-primary-color/20",
    avatar: "border-amber-300 ring-4 ring-white/90",
    trophy: "bg-amber-400 text-slate-950",
    rankText: "text-amber-300",
  },
  2: {
    card: "border-primary-color/80 bg-primary-color/90 shadow-lg shadow-primary-color/15",
    avatar: "border-white/80 ring-4 ring-white/75",
    trophy: "bg-white text-primary-color",
    rankText: "text-white",
  },
  3: {
    card: "border-primary-color/80 bg-primary-color/90 shadow-lg shadow-primary-color/15",
    avatar: "border-white/80 ring-4 ring-white/75",
    trophy: "bg-white text-primary-color",
    rankText: "text-white",
  },
};

const podiumOrder = [2, 1, 3];

const CACHE_BUST = typeof window !== "undefined" ? Date.now() : 0;

function withCacheBust(url?: string) {
  if (!url) return url;
  return `${url}${url.includes("?") ? "&" : "?"}v=${CACHE_BUST}`;
}

// Formats XP into compact notation (e.g., 3.4k)
function formatXP(xp: number) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(xp).toLowerCase();
}

export function TopPerformersCard({ performers }: { performers: TopPerformer[] }) {
  const byRank = new Map(performers.map((p) => [p.rank, p]));
  const ordered = podiumOrder
    .map((rank) => byRank.get(rank))
    .filter((p): p is TopPerformer => Boolean(p));
  const display = ordered.length === performers.length ? ordered : performers;

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      
      <div className="w-full" />

      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary-color/10 text-init-color dark:text-amber-400 rounded-xl">
            <Crown size={22} className="fill-amber-400" />
          </div>
          <CardTitle className="text-lg font-bold text-primary-color dark:text-white tracking-tight">
            អ្នកឆ្នើមប្រចាំខែ
          </CardTitle>
        </div>

        <a
          href="#"
          className="text-base font-bold text-secondary-color dark:text-red-400 hover:underline transition-colors duration-200"
        >
          មើលទាំងអស់
        </a>
      </CardHeader>

      <CardContent className="grid grid-cols-3 items-end gap-1.5 pt-6 sm:gap-3">
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
              className={`relative flex flex-col items-center rounded-2xl border p-2 sm:p-3 text-center transition-all duration-200 hover:-translate-y-0.5 ${style.card} ${
                isFirst ? "-translate-y-3 pb-4 pt-4" : "pt-3"
              }`}
            >
              {/* Trophy Badge */}
              <span
                className={`absolute flex items-center justify-center rounded-full shadow-sm ${style.trophy} ${
                  isFirst
                    ? "-top-4 right-1 sm:right-2 h-8 w-8 sm:h-10 sm:w-10 shadow-lg ring-2 ring-amber-300/70"
                    : "-top-3 right-1 sm:right-3 h-6 w-6 sm:h-8 sm:w-8"
                }`}
              >
                <Trophy size={isFirst ? 18 : 14} className="sm:w-5 sm:h-5" />
              </span>

                <div className="relative">
                  <Avatar
                    className={`border-2 ${style.avatar} ${
                      isFirst ? "h-24 w-24" : "h-20 w-20"
                    }`}
                  >
                    <AvatarImage src={withCacheBust(p.avatarUrl)} alt={p.name} />
                    <AvatarFallback className="bg-white font-extrabold text-primary-color">
                      {p.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute -bottom-3 left-1/2 flex h-7 min-w-7 -translate-x-1/2 items-center justify-center rounded-full px-2 text-xs font-black shadow-md ${style.trophy}`}
                  >
                    {p.rank}
                  </span>
                </div>
              </div>

              {/* Name - Removed truncate, added wrapping and responsive text sizes */}
              <p className="mt-2 w-full break-words text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                {p.name}
              </p>

              {/* Rank */}
              <p className={`text-xl sm:text-2xl font-black leading-none mt-1 sm:mt-0 ${style.rankText}`}>#{p.rank}</p>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                សកល
              </p>

              {/* XP Badge - Removed truncate, adjusted mobile padding & font size */}
              <span
                className={`mt-2 w-full rounded-lg border border-slate-200 bg-white font-extrabold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white break-words ${
                  isFirst ? "px-1 py-1 sm:px-2.5 sm:py-1.5 text-xs sm:text-lg" : "px-1 py-1 sm:px-2 sm:py-1 text-[10px] sm:text-base"
                }`}
              >
                {formatXP(p.xp)} <span className="text-red-600 dark:text-red-400">XP</span>
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
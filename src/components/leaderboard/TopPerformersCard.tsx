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

// Visual podium order: 2nd on the left, 1st elevated in the middle, 3rd on the right.
const podiumOrder = [2, 1, 3];

// Busts stale browser-cached avatar thumbnails (e.g. after a user updates their
// profile picture but the file URL stays the same) by tagging each page load.
const CACHE_BUST = typeof window !== "undefined" ? Date.now() : 0;

function withCacheBust(url?: string) {
  if (!url) return url;
  return `${url}${url.includes("?") ? "&" : "?"}v=${CACHE_BUST}`;
}

export function TopPerformersCard({
  performers,
}: {
  performers: TopPerformer[];
}) {
  const byRank = new Map(performers.map((p) => [p.rank, p]));
  const ordered = podiumOrder
    .map((rank) => byRank.get(rank))
    .filter((p): p is TopPerformer => Boolean(p));
  const display = ordered.length === performers.length ? ordered : performers;

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Top Gradient Ribbon Accent */}
      <div className=" w-full" />

      <CardHeader className="flex flex-row items-center justify-between pb-2  border-b border-slate-100 dark:border-slate-800">
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

      <CardContent className="mx-auto grid w-full max-w-5xl grid-cols-1 items-end gap-x-0 gap-y-24 px-4 pb-6 pt-20 sm:grid-cols-3 sm:px-5 sm:pb-8 sm:pt-28">
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
              className={`relative flex flex-col items-center rounded-3xl border px-4 pb-6 pt-16 text-center text-white transition-all duration-200 hover:brightness-105 ${style.card} ${
                isFirst
                  ? "order-1 min-h-[300px] sm:order-none sm:-translate-y-8 sm:min-h-[330px] sm:rounded-b-3xl sm:rounded-t-[2.5rem]"
                  : p.rank === 2
                    ? "order-2 min-h-[255px] sm:order-none sm:rounded-b-3xl sm:rounded-t-[2.5rem]"
                    : "order-3 min-h-[255px] sm:order-none sm:rounded-b-3xl sm:rounded-t-[2.5rem]"
              }`}
            >
              <div className="absolute -top-20 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
                <span className={`flex items-center justify-center ${style.rankText}`}>
                  {isFirst ? (
                    <Crown className="h-8 w-8 fill-current" strokeWidth={2.2} />
                  ) : (
                    <Medal className="h-6 w-6" strokeWidth={2.4} />
                  )}
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

              {/* Name */}
              <p className="mt-2 w-full truncate text-lg font-bold text-white">
                {p.name}
              </p>

              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/65">
                សកល
              </p>

              {/* XP Badge */}
              <span
                className={`mt-5 w-full truncate rounded-xl border border-white/20 bg-white/10 font-extrabold text-white backdrop-blur-sm ${
                  isFirst ? "px-3 py-2 text-2xl" : "px-3 py-2 text-xl"
                }`}
              >
                {p.xp.toLocaleString()}{" "}
                <span className="text-init-color">XP</span>
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

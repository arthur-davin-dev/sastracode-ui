"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { LeaderboardTabs } from "@/components/leaderboard/LeaderboardTabs";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { YourStatsCard } from "@/components/leaderboard/YourStatsCard";
import { TopPerformersCard } from "@/components/leaderboard/TopPerformersCard";
import type { LeaderboardEntry, LeaderboardPeriod, LeaderboardSnapshotResponse, LeaderboardUserProfile, UserStat } from "@/types/leaderboard";
import {
  useGetLeaderboardQuery,
  useGetMyLeaderboardRankQuery,
  useGetLeaderboardUserProfilesQuery,
} from "@/redux/service/leaderboardApi";
import { useGetMyProfileQuery } from "@/redux/service/profile-api";

type SupportedPeriod = Exclude<LeaderboardPeriod, "COURSE">;

function learnerName(entry: LeaderboardSnapshotResponse, profile?: LeaderboardUserProfile) {
  const leaderboardUser = entry.user;
  return (
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    profile?.username ||
    entry.fullName ||
    entry.name ||
    [entry.firstName, entry.lastName].filter(Boolean).join(" ") ||
    entry.username ||
    leaderboardUser?.fullName ||
    leaderboardUser?.name ||
    [leaderboardUser?.firstName, leaderboardUser?.lastName].filter(Boolean).join(" ") ||
    leaderboardUser?.username ||
    "អ្នកសិក្សា"
  );
}

function learnerAvatar(entry: LeaderboardSnapshotResponse, profile?: LeaderboardUserProfile) {
  const avatarUrl = entry.avatarUrl || entry.user?.avatarUrl;
  if (avatarUrl) return avatarUrl;

  const fileId = profile?.avatarFileId || entry.avatarFileId || entry.user?.avatarFileId;
  return fileId ? `/api/v1/files/${encodeURIComponent(fileId)}` : "";
}

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<SupportedPeriod>("GLOBAL");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isFetching, isError, refetch } =
    useGetLeaderboardQuery({ period: activeTab, size: 50 });
  const { data: myRank } = useGetMyLeaderboardRankQuery(activeTab);
  const { data: myProfile } = useGetMyProfileQuery();
  const { data: profiles } = useGetLeaderboardUserProfilesQuery(undefined, {
    skip: !data?.content.length,
  });

  const profilesByUserId = useMemo(
    () => new Map(profiles?.content.map((profile) => [profile.userId, profile]) ?? []),
    [profiles?.content],
  );

  const entries: LeaderboardEntry[] = useMemo(
    () =>
      (data?.content ?? []).map((entry) => {
        const profile = profilesByUserId.get(entry.userId);
        return {
        id: entry.id || entry.userId,
        rank: entry.rank,
        name: learnerName(entry, profile),
        avatarUrl: learnerAvatar(entry, profile),
        xp: entry.score,
        isCurrentUser: Boolean(myRank?.userId && entry.userId === myRank.userId),
      }}),
    [data?.content, myRank, profilesByUserId],
  );

  const currentUser: LeaderboardEntry | undefined = myRank
    ? {
        id: myRank.id || myRank.userId,
        rank: myRank.rank,
        name:
          [myProfile?.firstName, myProfile?.lastName].filter(Boolean).join(" ") ||
          myProfile?.username ||
          "You",
        avatarUrl: myProfile?.avatarUrl ?? "",
        xp: myRank.score,
        isCurrentUser: true,
      }
    : undefined;

  const userStats: UserStat[] = [
    { icon: "star", value: `${myRank?.score.toLocaleString() ?? "—"} XP`, label: "Your score", color: "" },
    { icon: "chart", value: myRank?.rank ? `#${myRank.rank}` : "—", label: "Your rank", color: "" },
  ];

  const topPerformers = entries.slice(0, 3).map(({ rank, name, xp, avatarUrl }) => ({
    rank,
    name,
    xp,
    avatarUrl,
  }));

  const filteredEntries = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

    if (!normalizedQuery) return entries;

    return entries.filter((entry) =>
      entry.name.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [entries, searchQuery]);

  return (
    <div className="relative min-h-full w-full overflow-hidden rounded-3xl px-4 py-6 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 sm:py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col  sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lg font-bold uppercase tracking-wider text-primary-color dark:text-white">
              Community ranking
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-indigo-950 transition-colors duration-300 dark:text-white">
              តារាងចំណាត់ថ្នាក់
            </h1>
          </div>

          <label className="relative block w-full sm:max-w-xs">
            <span className="sr-only">Search leaderboard by name</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" aria-hidden="true" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by name..."
              className="h-11 rounded-xl border-slate-300 bg-white pl-10 text-indigo-950 shadow-sm placeholder:text-slate-500 focus-visible:ring-primary-color dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400"
            />
          </label>
        </div>

        <LeaderboardTabs
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as SupportedPeriod)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900" aria-label="Loading leaderboard">
                {Array.from({ length: 8 }, (_, index) => (
                  <div key={index} className="h-20 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
                ))}
              </div>
            ) : isError ? (
              <div className="rounded-3xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-slate-900">
                <p className="font-bold text-red-600 dark:text-red-400">Could not load the leaderboard.</p>
                <button type="button" onClick={() => refetch()} className="mt-4 rounded-xl bg-primary-color px-4 py-2 text-sm font-bold text-white">
                  Try again
                </button>
              </div>
            ) : (
              <div className={isFetching ? "opacity-70" : undefined} aria-busy={isFetching}>
                <LeaderboardTable entries={filteredEntries} currentUser={currentUser} />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <YourStatsCard stats={userStats} />
            {topPerformers.length > 0 && <TopPerformersCard performers={topPerformers} />}
          </div>
        </div>
      </div>
    </div>
  );
}

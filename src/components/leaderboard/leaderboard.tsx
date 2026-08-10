"use client";

import { useState } from "react";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { LeaderboardTabs } from "@/components/leaderboard/LeaderboardTabs";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { YourStatsCard } from "@/components/leaderboard/YourStatsCard";
import { TopPerformersCard } from "@/components/leaderboard/TopPerformersCard";
import {
  useGetLeaderboardQuery,
  useGetMyLeaderboardRankQuery,
  useGetMyXpQuery,
  type LeaderboardApiEntry,
  type LeaderboardPeriod,
} from "@/redux/api/leaderboard-api";
import type { LeaderboardEntry, TopPerformer, UserStat } from "@/types/leaderboard";

const periods: Record<string, LeaderboardPeriod> = {
  Global: "ALL_TIME",
  Daily: "DAILY",
  Weekly: "WEEKLY",
  Course: "ALL_TIME",
};

function toEntry(entry: LeaderboardApiEntry, isCurrentUser = false): LeaderboardEntry {
  const avatarUrl = entry.avatarFileId
    ? `/api/profile/avatar/${encodeURIComponent(entry.avatarFileId)}`
    : entry.avatarUrl ?? "";

  return {
    rank: entry.rank,
    name: entry.displayName ?? entry.fullName ?? entry.name ?? entry.username ?? "Anonymous learner",
    avatarUrl,
    level: entry.level ?? 0,
    xp: entry.totalXp ?? entry.xp ?? 0,
    isCurrentUser,
  };
}

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("Global");
  const period = periods[activeTab] ?? "ALL_TIME";
  const leaderboard = useGetLeaderboardQuery({ page: 0, size: 20, period });
  const myRank = useGetMyLeaderboardRankQuery({ period });
  const myXp = useGetMyXpQuery();

  const pageData = leaderboard.data?.data;
  const apiEntries = Array.isArray(pageData) ? pageData : pageData?.content ?? [];
  const entries = apiEntries.map((entry) => toEntry(entry));
  const currentUser = myRank.data?.data ? toEntry(myRank.data.data, true) : undefined;
  const xp = myXp.data?.data;
  const userStats: UserStat[] = [
    { icon: "star", value: `${(xp?.totalXp ?? xp?.xp ?? xp?.currentXp ?? currentUser?.xp ?? 0).toLocaleString()} XP`, label: "Total Experience", color: "" },
    { icon: "chart", value: xp?.level ?? xp?.currentLevel ?? currentUser?.level ?? 0, label: "Current Level", color: "" },
    { icon: "check", value: currentUser?.rank ? `#${currentUser.rank}` : "—", label: "Current Rank", color: "" },
  ];
  const topPerformers: TopPerformer[] = entries.slice(0, 3).map(({ rank, name, xp, avatarUrl }) => ({ rank, name, xp, avatarUrl }));

  const isLoading = leaderboard.isLoading || myRank.isLoading || myXp.isLoading;
  const error = leaderboard.error ?? myRank.error ?? myXp.error;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-[#eaf4ff] via-[#f4f8fe] to-[#eaf4ff] px-4 py-16 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-xl font-bold text-indigo-950 transition-colors duration-300 dark:text-white">Leaderboard</h1>
        <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {isLoading ? (
          <div className="flex min-h-80 items-center justify-center gap-3 text-slate-600 dark:text-slate-300">
            <LoaderCircle className="size-6 animate-spin" /> Loading leaderboard…
          </div>
        ) : error ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-red-200 bg-white/70 p-6 text-center dark:border-red-900 dark:bg-slate-900/70">
            <AlertCircle className="mb-3 size-9 text-red-500" />
            <p className="font-semibold text-slate-900 dark:text-white">Unable to load leaderboard</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Sign in and make sure the backend is available.</p>
            <button type="button" onClick={() => { leaderboard.refetch(); myRank.refetch(); myXp.refetch(); }} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Try again</button>
          </div>
        ) : entries.length === 0 ? (
          <p className="rounded-3xl border border-slate-200 bg-white/70 py-16 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">No leaderboard entries found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LeaderboardTable entries={entries} currentUser={currentUser} />
            </div>
            <div className="space-y-4">
              <YourStatsCard stats={userStats} />
              <TopPerformersCard performers={topPerformers} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { LeaderboardTabs } from "@/components/leaderboard/LeaderboardTabs";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { WeeklyGoalCard } from "@/components/leaderboard/WeeklyGoalCard";
import { YourStatsCard } from "@/components/leaderboard/YourStatsCard";
import { TopPerformersCard } from "@/components/leaderboard/TopPerformersCard";
import { LeaderboardEntry, WeeklyGoalDay, UserStat, TopPerformer } from "@/types/leaderboard";

const entries: LeaderboardEntry[] = [
  { rank: 1, name: "Sokpheap Lim", avatarUrl: "", level: 18, xp: 18450 },
  { rank: 2, name: "Davy Kimsan", avatarUrl: "", level: 17, xp: 16230 },
  { rank: 3, name: "Rithy Chan", avatarUrl: "", level: 17, xp: 14890 },
  { rank: 4, name: "Sreynich Chhorn", avatarUrl: "", level: 16, xp: 13560 },
  { rank: 5, name: "Menghour Tan", avatarUrl: "", level: 16, xp: 12340 },
  { rank: 6, name: "Pichmony Heng", avatarUrl: "", level: 15, xp: 11230 },
  { rank: 7, name: "Vannak Keo", avatarUrl: "", level: 14, xp: 9850 },
  { rank: 8, name: "Bunleap Chhay", avatarUrl: "", level: 14, xp: 8450 },
  { rank: 9, name: "Chenda Pov", avatarUrl: "", level: 13, xp: 7550 },
  { rank: 10, name: "Lim Mechan", avatarUrl: "", level: 13, xp: 6980 },
];

const currentUser: LeaderboardEntry = {
  rank: 24, name: "Vicheka", avatarUrl: "", level: 12, xp: 2880, isCurrentUser: true,
};

const weeklyDays: WeeklyGoalDay[] = [
  { day: "Mon", completed: true },
  { day: "Tue", completed: true },
  { day: "Wed", completed: true },
  { day: "Thu", completed: true },
  { day: "Fri", completed: false, isToday: true },
  { day: "Sat", completed: false },
  { day: "Sun", completed: false },
];

const userStats: UserStat[] = [
  { icon: "star", value: "2,678 xp", label: "Total Experience", color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" },
  { icon: "check", value: 14, label: "Problems solved", color: "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400" },
  { icon: "flame", value: 12, label: "Day Streak", color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400" },
  { icon: "chart", value: 14, label: "Current Level", color: "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400" },
];

const topPerformers: TopPerformer[] = [
  { rank: 1, name: "Dara Kim", xp: 2234 },
  { rank: 2, name: "Sreynich Chhom", xp: 2134 },
  { rank: 3, name: "Sothea Vireak", xp: 2034 },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("Global");

  return (
    <div className="relative w-full min-h-screen bg-linear-to-b from-[#eaf4ff] via-[#f4f8fe] to-[#eaf4ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-16 overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-xl font-bold text-indigo-950 dark:text-white transition-colors duration-300">
          តារាងចំណាត់ថ្នាក់
        </h1>

        <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LeaderboardTable entries={entries} currentUser={currentUser} />
          </div>

          <div className="space-y-4">
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-slate-400" />
              <Input 
                placeholder="Search for courses, lessons, topics..." 
                className="pl-9 dark:bg-slate-900/80 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500 transition-colors duration-300" 
              />
            </div> */}

            <WeeklyGoalCard days={weeklyDays} completedCount={4} totalCount={5} />
            <YourStatsCard stats={userStats} />
            <TopPerformersCard performers={topPerformers} />
          </div>
        </div>
      </div>
    </div>
  );
}
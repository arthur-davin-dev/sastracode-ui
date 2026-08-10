"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LeaderboardEntry } from "@/types/leaderboard";
import { LeaderboardRow } from "./LeaderboardRow";
import { Trophy } from "lucide-react";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUser?: LeaderboardEntry;
}

export function LeaderboardTable({ entries, currentUser }: LeaderboardTableProps) {
  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <CardContent className="p-5 md:p-6">
        
        {/* Table Header / Title Section */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/10 text-amber-600 dark:text-amber-400 rounded-xl">
              <Trophy size={22} className="fill-amber-400" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              ចំណាត់ថ្នាក់ (Leaderboard)
            </h2>
          </div>
          <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded-full border border-red-200/50 dark:border-red-800/50">
            Top Performers
          </span>
        </div>

        {/* Column Labels */}
        <div className="flex items-center justify-between px-3 py-1.5 mb-2 text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider">
          <span className="w-10 text-center">លំដាប់</span>
          <span className="flex-1 ml-10">អ្នកប្រើប្រាស់</span>
          <span className="text-right">ពិន្ទុ XP</span>
        </div>

        {/* Main Entry List */}
        <div className="flex flex-col gap-1.5">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
            >
              <LeaderboardRow entry={entry} />
            </motion.div>
          ))}
        </div>

        {/* Floating / Highlighted Current User Fixed Row */}
        {currentUser && <div className="mt-5 pt-4 border-t border-amber-400/30">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 px-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-600 inline-block animate-pulse" />
            ចំណាត់ថ្នាក់របស់អ្នក:
          </p>
          <LeaderboardRow entry={currentUser} />
        </div>}

      </CardContent>
    </Card>
  );
}

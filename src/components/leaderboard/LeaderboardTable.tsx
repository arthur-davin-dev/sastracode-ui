"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LeaderboardEntry } from "@/types/leaderboard";
import { LeaderboardRow } from "./LeaderboardRow";
import { Trophy } from "lucide-react";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUser: LeaderboardEntry;
}

export function LeaderboardTable({ entries, currentUser }: LeaderboardTableProps) {
  return (
    <Card className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
      <CardContent className="p-6">
        
        {/* Table Header / Title Section */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-400/20 text-yellow-600 rounded-2xl">
              <Trophy size={28} className="text-yellow-500 fill-yellow-400" />
            </div>
            <h2 className="text-2xl font-black text-primary-color tracking-tight">
              ចំណាត់ថ្នាក់ (Leaderboard)
            </h2>
          </div>
          <span className="text-base font-bold text-red-600 bg-red-50 dark:bg-red-950/40 px-3.5 py-1.5 rounded-full border border-red-200/50 dark:border-red-800/50">
            Top Performers
          </span>
        </div>

        {/* Column Labels */}
        <div className="flex items-center justify-between px-4 py-2 mb-2 text-lg font-bold text-primary-color opacity-80 uppercase tracking-wider">
          <span className="w-12 text-center">លំដាប់</span>
          <span className="flex-1 ml-16">អ្នកប្រើប្រាស់</span>
          <span className="text-right">ពិន្ទុ XP</span>
        </div>

        {/* Main Entry List */}
        <div className="flex flex-col gap-1.5">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <LeaderboardRow entry={entry} />
            </motion.div>
          ))}
        </div>

        {/* Floating / Highlighted Current User Fixed Row */}
        <div className="mt-6 pt-4 border-t-2 border-yellow-400/40">
          <p className="text-lg font-bold text-primary-color mb-2 px-2 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 inline-block animate-pulse" />
            ចំណាត់ថ្នាក់របស់អ្នក:
          </p>
          <LeaderboardRow entry={currentUser} />
        </div>

      </CardContent>
    </Card>
  );
}
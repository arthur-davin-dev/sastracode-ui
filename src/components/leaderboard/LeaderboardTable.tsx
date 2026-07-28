"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LeaderboardEntry } from "@/types/leaderboard";
import { LeaderboardRow } from "./LeaderboardRow";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUser: LeaderboardEntry;
}

export function LeaderboardTable({ entries, currentUser }: LeaderboardTableProps) {
  return (
    <Card className="dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between px-3 pb-2 border-b dark:border-slate-800 text-xs font-medium text-muted-foreground dark:text-slate-400 transition-colors duration-300">
          <span>Rank</span>
          <span className="flex-1 ml-16">User</span>
          <span>XP</span>
        </div>

        <div className="divide-y dark:divide-slate-800/60">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }} 
            >
              <LeaderboardRow entry={entry} />
            </motion.div>
          ))}
        </div>

        <div className="border-t-2 dark:border-slate-800 mt-2 pt-2 transition-colors duration-300">
          <LeaderboardRow entry={currentUser} />
        </div>
      </CardContent>
    </Card>
  );
}
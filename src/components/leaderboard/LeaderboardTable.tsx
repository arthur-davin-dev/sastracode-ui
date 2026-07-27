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
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between px-3 pb-2 border-b text-xs font-medium text-muted-foreground">
          <span>Rank</span>
          <span className="flex-1 ml-16">User</span>
          <span>XP</span>
        </div>

        <div className="divide-y">
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

        <div className="border-t-2 mt-2 pt-2">
          <LeaderboardRow entry={currentUser} />
        </div>
      </CardContent>
    </Card>
  );
}
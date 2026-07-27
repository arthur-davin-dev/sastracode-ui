import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LeaderboardEntry } from "@/types/leaderboard";

const rankColors: Record<number, string> = {
  1: "bg-yellow-400 text-white",
  2: "bg-gray-300 text-white dark:bg-slate-600",
  3: "bg-orange-400 text-white",
};

export function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  return (
    <div 
      className={`flex items-center justify-between py-3 transition-colors duration-300 ${
        entry.isCurrentUser 
          ? "bg-blue-50 dark:bg-indigo-950/40 rounded-lg px-3" 
          : "px-3"
      }`}
    >
      <div className="flex items-center gap-4 w-12">
        {entry.rank <= 3 ? (
          <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${rankColors[entry.rank]}`}>
            {entry.rank}
          </span>
        ) : (
          <span className="text-sm font-medium text-muted-foreground dark:text-slate-400 w-6 text-center">
            {entry.rank}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 flex-1">
        <Avatar className="h-9 w-9 dark:border dark:border-slate-700">
          <AvatarImage src={entry.avatarUrl} />
          <AvatarFallback className="dark:bg-slate-800 dark:text-white">
            {entry.name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm text-slate-900 dark:text-white transition-colors duration-300">
            {entry.name}{entry.isCurrentUser ? " (You)" : ""}
          </p>
          <p className="text-xs text-muted-foreground dark:text-slate-400 transition-colors duration-300">
            Level {entry.level}
          </p>
        </div>
      </div>

      <span className="font-semibold text-sm text-indigo-950 dark:text-indigo-300 transition-colors duration-300">
        {entry.xp.toLocaleString()} xp
      </span>
    </div>
  );
}
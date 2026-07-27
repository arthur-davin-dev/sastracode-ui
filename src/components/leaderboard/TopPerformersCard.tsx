// components/leaderboard/TopPerformersCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TopPerformer } from "@/types/leaderboard";

const rankColors: Record<number, string> = {
  1: "bg-yellow-400",
  2: "bg-gray-300",
  3: "bg-orange-400",
};

export function TopPerformersCard({ performers }: { performers: TopPerformer[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm">Top Performers This Month</CardTitle>
        <a href="#" className="text-xs text-green-600 hover:underline">View all</a>
      </CardHeader>
      <CardContent className="space-y-3">
        {performers.map((p) => (
          <div key={p.rank} className="flex items-center gap-3">
            <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${rankColors[p.rank]}`}>
              {p.rank}
            </span>
            <Avatar className="h-8 w-8">
              <AvatarFallback>{p.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{p.name}</p>
            </div>
            <span className="text-xs font-semibold text-indigo-950">{p.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
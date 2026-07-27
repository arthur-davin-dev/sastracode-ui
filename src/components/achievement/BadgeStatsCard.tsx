// components/achievement/BadgeStatsCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface BadgeStatsCardProps {
  completionPercent: number;
  earnedDate: string;
  category: string;
  totalEarners: number;
}

export function BadgeStatsCard({ completionPercent, earnedDate, category, totalEarners }: BadgeStatsCardProps) {
  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex flex-col items-center">
          <div className="relative h-20 w-20 flex items-center justify-center">
            <svg className="absolute -rotate-90" width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" stroke="#f1f1f1" strokeWidth="6" fill="none" />
              <circle
                cx="40" cy="40" r="34"
                stroke="#dc2626" strokeWidth="6" fill="none"
                strokeDasharray={2 * Math.PI * 34}
                strokeDashoffset={2 * Math.PI * 34 * (1 - completionPercent / 100)}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-lg font-bold text-red-600">{completionPercent}%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">បញ្ចប់</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">កាលបរិច្ឆេទទទួល</span>
            <span className="font-medium">{earnedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ប្រភេទ</span>
            <span className="font-medium">{category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ចំនួនអ្នកទទួល</span>
            <span className="font-medium">{totalEarners.toLocaleString()} នាក់</span>
          </div>
        </div>

        <Button className="w-full gap-2">
          <Share2 className="h-4 w-4" /> ចែករំលែកសមិទ្ធផល
        </Button>
      </CardContent>
    </Card>
  );
}
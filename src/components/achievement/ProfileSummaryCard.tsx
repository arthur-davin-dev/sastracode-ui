import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, FileBadge } from "lucide-react";
import { UserSummary } from "@/types/achievement";

export function ProfileSummaryCard({ user }: { user: UserSummary }) {
  return (
    <Card className="dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
      <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
        <Avatar className="h-16 w-16 ring-2 ring-white dark:ring-slate-700 shadow-sm shrink-0">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback className="dark:bg-slate-800 dark:text-white">{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 w-full text-center md:text-left">
          <h2 className="font-semibold text-lg text-slate-900 dark:text-white transition-colors duration-300">
            {user.name}
          </h2>
          <p className="text-xs text-muted-foreground dark:text-slate-400 mb-2 transition-colors duration-300">
            Bonus Booster, {user.nextLevel - 1} lv
          </p>
          <div className="flex justify-between text-xs text-muted-foreground dark:text-slate-400 mb-1 transition-colors duration-300">
            <span>Progress to Level {user.nextLevel}</span>
            <span>{user.currentXp.toLocaleString()} / {user.nextLevelXp.toLocaleString()} XP</span>
          </div>
          <Progress 
            value={user.levelProgressPercent} 
            className="h-2 dark:bg-slate-800 [&>div]:bg-blue-600 dark:[&>div]:bg-blue-500" 
          />
        </div>

        <div className="flex gap-6 sm:gap-8 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 w-full md:w-auto justify-center transition-colors duration-300"> 
          <Stat icon={Award} value={user.badges} label="BADGES" />
          <Stat icon={TrendingUp} value={`${(user.score / 1000).toFixed(1)}k`} label="SCORE" />
          <Stat icon={FileBadge} value={user.certificates} label="CERTIFICATES" />
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ icon: Icon, value, label }: { icon: any; value: number | string; label: string }) {
  return (
    <div className="text-center">
      <Icon className="h-4 w-4 mx-auto text-yellow-500 dark:text-amber-400 mb-1 transition-colors duration-300" />
      <p className="font-semibold text-sm text-slate-900 dark:text-white transition-colors duration-300">{value}</p>
      <p className="text-[10px] text-muted-foreground dark:text-slate-400 transition-colors duration-300">{label}</p>
    </div>
  );
}
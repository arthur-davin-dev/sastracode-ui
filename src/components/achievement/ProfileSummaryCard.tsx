// components/achievement/ProfileSummaryCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, FileBadge } from "lucide-react";
//import { UserSummary } from "@/lib/redux/types/achievement";
import {UserSummary} from "@/types/achievement"

export function ProfileSummaryCard({ user }: { user: UserSummary }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-6 p-8"> {/* ← p-6 to p-8 */}
        <Avatar className="h-16 w-16 ring-2 ring-white shadow-sm"> {/* ← added ring */}
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <p className="text-xs text-muted-foreground mb-2">
            Bonus Booster, {user.nextLevel - 1} lv
          </p>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress to Level {user.nextLevel}</span>
            <span>{user.currentXp.toLocaleString()} / {user.nextLevelXp.toLocaleString()} XP</span>
          </div>
          <Progress value={user.levelProgressPercent} className="h-3 [&>div]:bg-blue-900" /> {/* ← thinner: h-2 to h-1.5 */}
        </div>

        <div className="flex gap-8"> 
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
      <Icon className="h-4 w-4 mx-auto text-yellow-500 mb-1" />
      <p className="font-semibold text-sm">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
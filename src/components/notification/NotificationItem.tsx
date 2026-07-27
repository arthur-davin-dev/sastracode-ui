import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Calendar, Settings } from "lucide-react";
import { NotificationItem as NotificationItemType } from "@/types/notification";

const typeConfig = {
  course: { icon: GraduationCap, color: "bg-blue-500", tagColor: "bg-blue-50 text-blue-600" },
  reward: { icon: Award, color: "bg-yellow-500", tagColor: "bg-yellow-50 text-yellow-600" },
  streak: { icon: Calendar, color: "bg-red-500", tagColor: "bg-red-50 text-red-600" },
  system: { icon: Settings, color: "bg-indigo-900", tagColor: "bg-indigo-50 text-indigo-700" },
};

export function NotificationItem({ notification }: { notification: NotificationItemType }) {
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <Card className={notification.isUnread ? "border-l-4 border-l-blue-500" : ""}>
      <CardContent className="flex gap-3 p-4">
        <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={`text-[10px] ${config.tagColor} hover:${config.tagColor}`}>
              {notification.category}
            </Badge>
            <span className="text-xs text-muted-foreground ml-auto shrink-0">{notification.time}</span>
            {notification.isUnread && <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
          </div>

          <p className="font-semibold text-sm mb-1">{notification.title}</p>
          <p className="text-xs text-muted-foreground">{notification.description}</p>

          {notification.streakData && (
            <div className="mt-2">
              <Progress value={notification.streakData.progressPercent} className="h-1.5 [&>div]:bg-red-500" />
              <p className="text-[10px] text-red-600 mt-1">{notification.streakData.label}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
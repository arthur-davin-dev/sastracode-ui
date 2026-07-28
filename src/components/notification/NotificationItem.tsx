import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Calendar, Settings } from "lucide-react";
import { NotificationItem as NotificationItemType } from "@/types/notification";

const typeConfig = {
  course: { 
    icon: GraduationCap, 
    color: "bg-blue-500", 
    tagColor: "bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" 
  },
  reward: { 
    icon: Award, 
    color: "bg-yellow-500", 
    tagColor: "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400" 
  },
  streak: { 
    icon: Calendar, 
    color: "bg-red-500", 
    tagColor: "bg-red-50 text-red-600 dark:bg-red-500/20 dark:text-red-400" 
  },
  system: { 
    icon: Settings, 
    color: "bg-indigo-900 dark:bg-indigo-600", 
    tagColor: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300" 
  },
};

export function NotificationItem({ notification }: { notification: NotificationItemType }) {
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <Card 
      className={`transition-colors duration-300 dark:bg-slate-900/80 dark:border-slate-800 ${
        notification.isUnread ? "border-l-4 border-l-blue-500 dark:border-l-blue-500" : ""
      }`}
    >
      <CardContent className="flex gap-3 p-4">
        <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${config.color} transition-colors duration-300`}>
          <Icon className="h-4 w-4 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={`text-[10px] ${config.tagColor} border-transparent transition-colors duration-300 hover:opacity-80`}>
              {notification.category}
            </Badge>
            <span className="text-xs text-muted-foreground dark:text-slate-400 ml-auto shrink-0 transition-colors duration-300">
              {notification.time}
            </span>
            {notification.isUnread && (
              <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
            )}
          </div>

          <p className="font-semibold text-sm mb-1 text-slate-900 dark:text-white transition-colors duration-300">
            {notification.title}
          </p>
          <p className="text-xs text-muted-foreground dark:text-slate-400 transition-colors duration-300">
            {notification.description}
          </p>

          {notification.streakData && (
            <div className="mt-2">
              <Progress 
                value={notification.streakData.progressPercent} 
                className="h-1.5 [&>div]:bg-red-500 dark:bg-slate-800" 
              />
              <p className="text-[10px] text-red-600 dark:text-red-400 mt-1 transition-colors duration-300">
                {notification.streakData.label}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
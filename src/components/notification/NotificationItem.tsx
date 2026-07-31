"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Calendar, Settings, Bell } from "lucide-react";
import { NotificationItem as NotificationItemType } from "@/types/notification";
import { cn } from "@/lib/utils";

const typeConfig = {
  course: { 
    icon: GraduationCap, 
    color: "bg-yellow-400/20 text-slate-900 dark:text-yellow-400 border border-yellow-400/50", 
    tagColor: "bg-yellow-400/20 text-primary-color dark:text-yellow-300 border border-yellow-400/50" 
  },
  reward: { 
    icon: Award, 
    color: "bg-yellow-400/20 text-slate-900 dark:text-yellow-400 border border-yellow-400/50", 
    tagColor: "bg-yellow-400/20 text-primary-color dark:text-yellow-300 border border-yellow-400/50" 
  },
  streak: { 
    icon: Calendar, 
    color: "bg-red-600/10 text-red-600 dark:text-red-400 border border-red-600/30", 
    tagColor: "bg-red-600/10 text-red-600 dark:text-red-400 border border-red-600/30" 
  },
  system: { 
    icon: Settings, 
    color: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700", 
    tagColor: "bg-slate-100 dark:bg-slate-800 text-primary-color border border-slate-200 dark:border-slate-700" 
  },
};

export function NotificationItem({ notification }: { notification: NotificationItemType }) {
  const config = typeConfig[notification.type] || typeConfig.system;
  const Icon = config.icon || Bell;

  return (
    <Card 
      className={cn(
        "relative overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 group",
        notification.isUnread && "border-l-8 "
      )}
    >
      {/* Top Gradient Ribbon */}
      <div className="absolute top-0 left-0 w-full h-1.5 " />

      <CardContent className="flex flex-col sm:flex-row items-start gap-5 p-6">
        
        {/* Type Icon Container */}
        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105", config.color)}>
          <Icon className="h-7 w-7" strokeWidth={2.2} />
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0 w-full space-y-3">
          
          {/* Header Row: Category Badge, Timestamp & Unread Indicator */}
          <div className="flex items-center justify-between gap-3">
            <Badge className={cn("text-lg font-bold px-3.5 py-4 rounded-full shadow-xs", config.tagColor)}>
              {notification.category}
            </Badge>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-lg font-medium text-primary-color opacity-70">
                {notification.time}
              </span>
              {notification.isUnread && (
                <span className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
              )}
            </div>
          </div>

          {/* Title (text-2xl & text-primary-color) */}
          <h3 className="text-2xl font-extrabold text-primary-color leading-tight">
            {notification.title}
          </h3>

          {/* Description (text-lg & text-primary-color) */}
          <p className="text-lg font-medium text-primary-color opacity-85 leading-relaxed">
            {notification.description}
          </p>

          {/* Streak Data / Progress Bar Section */}
          {notification.streakData && (
            <div className="mt-3 pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-lg font-bold text-primary-color">
                <span className="text-init-600">{notification.streakData.label}</span>
                <span>{notification.streakData.progressPercent}%</span>
              </div>
              <Progress 
                value={notification.streakData.progressPercent} 
                className="h-2.5 bg-slate-100 dark:bg-slate-800  rounded-full" 
              />
            </div>
          )}

        </div>
      </CardContent>
    </Card>
  );
}
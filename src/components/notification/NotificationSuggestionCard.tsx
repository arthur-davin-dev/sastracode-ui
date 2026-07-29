"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Flame, Trophy, Lock, LucideIcon } from "lucide-react";
import { NotificationSuggestion } from "@/types/notification";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  flame: Flame,
  trophy: Trophy,
  lock: Lock,
};

export function NotificationSuggestionCard({
  suggestion,
}: {
  suggestion: NotificationSuggestion;
}) {
  const Icon = iconMap[suggestion.icon] || Lock;

  const variantStyles = {
    primary:
      "bg-primary-color/80  to-blue-50 text-primary-color border-1  ",
    secondary:
      "bg-white dark:bg-slate-900  border-yellow-400/50 text-primary-color",
    locked:
      " dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 opacity-70",
  };

  const iconStyles = {
    primary:
      "bg-yellow-400 text-orange-500",
    secondary:
      "bg-yellow-400/20 text-red-600 ",
    locked:
      "bg-slate-200 dark:bg-slate-800 text-slate-500  dark:border-slate-700",
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group",
        variantStyles[suggestion.variant]
      )}
    >
      {/* Top Accent Ribbon (Yellow Accent & Red Secondary) */}
      <div className="absolute top-0 left-0 w-full h-2 " />

      <CardContent className="flex flex-col items-center text-center gap-4 p-8">
        
        {/* Icon Container */}
        <div
          className={cn(
            "h-16 w-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
            iconStyles[suggestion.variant]
          )}
        >
          <Icon className="h-8 w-8" strokeWidth={2.2} />
        </div>

        {/* Title (text-2xl) */}
        <h3
          className={cn(
            "text-lg font-extrabold leading-tight",
            suggestion.variant === "primary"
              ? "text-white"
              : "text-primary-color"
          )}
        >
          {suggestion.title}
        </h3>

        {/* Subtitle / Content (text-lg) */}
        <p
          className={cn(
            "text-lg font-medium leading-relaxed",
            suggestion.variant === "primary"
              ? "text-slate-100 opacity-90"
              : "text-primary-color opacity-80"
          )}
        >
          {suggestion.subtitle}
        </p>

      </CardContent>
    </Card>
  );
}
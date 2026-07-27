import { Card, CardContent } from "@/components/ui/card";
import { Flame, Trophy, Lock } from "lucide-react";
import { NotificationSuggestion } from "@/types/notification";

const iconMap: Record<string, any> = {
  flame: Flame,
  trophy: Trophy,
  lock: Lock,
};

export function NotificationSuggestionCard({ suggestion }: { suggestion: NotificationSuggestion }) {
  const Icon = iconMap[suggestion.icon] || Lock;

  const variantStyles = {
    primary: "bg-indigo-950 text-white",
    secondary: "bg-blue-50 text-indigo-950",
    locked: "bg-muted/50 text-muted-foreground",
  };

  return (
    <Card className={`border-0 ${variantStyles[suggestion.variant]}`}>
      <CardContent className="flex flex-col items-center text-center gap-2 p-6">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center ${
            suggestion.variant === "primary" ? "bg-white/10" : "bg-white"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <p className="font-semibold text-sm">{suggestion.title}</p>
        <p className="text-xs opacity-80">{suggestion.subtitle}</p>
      </CardContent>
    </Card>
  );
}
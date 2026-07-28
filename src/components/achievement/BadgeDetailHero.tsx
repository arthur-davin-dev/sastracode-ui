import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeDetail } from "@/types/achievement";

export function BadgeDetailHero({ badge }: { badge: BadgeDetail }) {
  return (
    <Card className="dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300">
      <CardContent className="flex flex-col items-center text-center p-8">
        <img src={badge.iconUrl} alt={badge.name} className="h-24 w-24 mb-4 object-contain" />

        <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 dark:bg-amber-950/50 dark:text-amber-300 dark:hover:bg-amber-950/50 border-transparent mb-3 transition-colors duration-300">
          មេដាយ
        </Badge>

        <h2 className="text-xl font-bold text-indigo-950 dark:text-white mb-2 transition-colors duration-300">
          {badge.name}
        </h2>
        <p className="text-sm text-muted-foreground dark:text-slate-400 max-w-md transition-colors duration-300">
          {badge.description}
        </p>
      </CardContent>
    </Card>
  );
}
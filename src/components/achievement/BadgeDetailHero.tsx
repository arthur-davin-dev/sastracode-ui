// components/achievement/BadgeDetailHero.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeDetail } from "@/types/achievement";

export function BadgeDetailHero({ badge }: { badge: BadgeDetail }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center text-center p-8">
        <img src={badge.iconUrl} alt={badge.name} className="h-24 w-24 mb-4" />

        <Badge className="bg-yellow-50 text-yellow-700 mb-3 hover:bg-yellow-50">
          មេដាយ
        </Badge>

        <h2 className="text-xl font-bold text-indigo-950 mb-2">{badge.name}</h2>
        <p className="text-sm text-muted-foreground max-w-md">{badge.description}</p>
      </CardContent>
    </Card>
  );
}
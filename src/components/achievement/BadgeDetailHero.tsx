import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeDetail } from "@/types/achievement";

export function BadgeDetailHero({ badge }: { badge: BadgeDetail }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center text-center p-8">
        <img src={badge.iconUrl} alt={badge.name} className="h-24 w-24 mb-4" />

        <Badge className="bg-yellow-50 text-lg text-yellow-700 mb-3 hover:bg-yellow-50">
          មេដាយ
        </Badge>

        <h2 className="text-2xl font-bold text-primary-color mb-2">{badge.name}</h2>
        <p className="text-lg text-muted-foreground max-w-md">{badge.description}</p>
      </CardContent>
    </Card>
  );
}
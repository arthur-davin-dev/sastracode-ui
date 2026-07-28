import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Activity } from "@/types/achievement";

export function RecentActivityItem({ activity }: { activity: Activity }) {
  return (
    <Card className="mb-3">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-lg">
            {activity.icon}
          </div>
          <div>
            <p className="font-medium text-lg text-primary-color">{activity.title}</p>
            <p className="text-lg text-primary-color text-muted-foreground">{activity.subtitle}</p>
          </div>
        </div>
        <Badge variant="secondary" className="gap-1 text-lg text-green-600 bg-green-50">
          +{activity.xp} XP <CheckCircle2 className="h-12 w-12" />
        </Badge>
      </CardContent>
    </Card>
  );
}
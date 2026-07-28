import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Gauge } from "lucide-react";
import { SimilarBadge } from "@/types/achievement";

const iconMap: Record<string, any> = {
  terminal: Terminal,
  gauge: Gauge,
};

export function SimilarBadgesCard({ badges }: { badges: SimilarBadge[] }) {
  return (
    <Card className="bg-[#F5F1E8] dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 transition-colors duration-300"> 
      <CardHeader>
        <CardTitle className="text-sub-title font-bold text-indigo-950 dark:text-white transition-colors duration-300">
          មេដាយពាក់ព័ន្ធ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {badges.map((b) => {
          const Icon = iconMap[b.icon] || Terminal;
          return (
            <div key={b.id} className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm shrink-0 transition-colors duration-300">
                <Icon className="h-5 w-5 text-muted-foreground dark:text-slate-400" />
              </div>
              <div>
                <p className="text-content font-semibold text-indigo-950 dark:text-white transition-colors duration-300">
                  {b.name}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 transition-colors duration-300">
                  {b.status}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
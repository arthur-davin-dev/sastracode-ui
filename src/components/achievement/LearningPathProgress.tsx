import { Progress } from "@/components/ui/progress";
import { XpLevelBadge } from "@/components/ui/xp-level-badge"; 
import { LearningPath } from "@/types/achievement";
import { ChevronRight } from "lucide-react";

interface LearningPathProgressProps {
  paths: LearningPath[];
  completedCount: number;
  totalCount: number;
}

export function LearningPathProgress({ paths, completedCount, totalCount }: LearningPathProgressProps) {
  return (
    <div>
      <div className="flex items-center gap-6">
        {/* bracket ring showing X/Y, reusing the same component as the XP card */}
        <div className="flex flex-col items-center">
          <XpLevelBadge level={completedCount} size={64} />
          <span className="text-xs text-muted-foreground mt-1">{completedCount}/{totalCount}</span>
        </div>

        <div className="flex-1 space-y-4">
          {paths.map((path) => (
            <div key={path.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{path.name}</span>
                <span
                  className={
                    path.progressPercent === 100
                      ? "text-orange-500 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {path.progressPercent === 100 ? path.status : `${path.progressPercent}%`}
                </span>
              </div>
              <Progress
                value={path.progressPercent}
                className={`h-1.5 ${
                  path.progressPercent === 100 ? "[&>div]:bg-orange-400" : "[&>div]:bg-blue-500"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <a href="#" className="text-xs font-medium text-foreground flex items-center gap-1 hover:underline">
          បន្តការសិក្សា <ChevronRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
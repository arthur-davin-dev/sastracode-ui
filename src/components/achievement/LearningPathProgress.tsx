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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Bracket ring showing X/Y */}
        <div className="flex flex-col items-center shrink-0">
          <XpLevelBadge level={completedCount} size={64} />
          <span className="text-xs text-muted-foreground dark:text-slate-400 mt-1 transition-colors duration-300">
            {completedCount}/{totalCount}
          </span>
        </div>

        <div className="flex-1 space-y-4 w-full">
          {paths.map((path) => (
            <div key={path.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-900 dark:text-white transition-colors duration-300">
                  {path.name}
                </span>
                <span
                  className={`font-medium transition-colors duration-300 ${
                    path.progressPercent === 100
                      ? "text-orange-500 dark:text-amber-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {path.progressPercent === 100 ? path.status : `${path.progressPercent}%`}
                </span>
              </div>
              <Progress
                value={path.progressPercent}
                className={`h-1.5 dark:bg-slate-800 ${
                  path.progressPercent === 100 ? "[&>div]:bg-orange-400" : "[&>div]:bg-blue-500"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <a 
          href="#" 
          className="text-xs font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white flex items-center gap-1 hover:underline transition-colors duration-300"
        >
          បន្តការសិក្សា <ChevronRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
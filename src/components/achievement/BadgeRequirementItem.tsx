import { CheckCircle2, Circle } from "lucide-react";
import { BadgeRequirement } from "@/types/achievement";

export function BadgeRequirementItem({ requirement }: { requirement: BadgeRequirement }) {
  return (
    <div className="flex items-start justify-between py-3 border-b dark:border-slate-800/80 last:border-0 transition-colors duration-300">
      <div className="flex items-start gap-3">
        {requirement.completed ? (
          <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 shrink-0 transition-colors duration-300" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground dark:text-slate-500 mt-0.5 shrink-0 transition-colors duration-300" />
        )}
        <div>
          <p className="font-medium text-sm text-slate-900 dark:text-white transition-colors duration-300">
            {requirement.title}
          </p>
          <p className="text-xs text-muted-foreground dark:text-slate-400 transition-colors duration-300">
            {requirement.description}
          </p>
        </div>
      </div>
      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 shrink-0 transition-colors duration-300">
        {requirement.progress}
      </span>
    </div>
  );
}
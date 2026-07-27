// components/achievement/BadgeRequirementItem.tsx
import { CheckCircle2, Circle } from "lucide-react";
import { BadgeRequirement } from "@/types/achievement";

export function BadgeRequirementItem({ requirement }: { requirement: BadgeRequirement }) {
  return (
    <div className="flex items-start justify-between py-3 border-b last:border-0">
      <div className="flex items-start gap-3">
        {requirement.completed ? (
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
        )}
        <div>
          <p className="font-medium text-sm">{requirement.title}</p>
          <p className="text-xs text-muted-foreground">{requirement.description}</p>
        </div>
      </div>
      <span className="text-sm font-semibold text-blue-600 shrink-0">{requirement.progress}</span>
    </div>
  );
}
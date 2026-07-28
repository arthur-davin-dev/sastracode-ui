import { CheckCircle2, Circle } from "lucide-react";
import { BadgeRequirement } from "@/types/achievement";

export function BadgeRequirementItem({ requirement }: { requirement: BadgeRequirement }) {
  return (
    <div className="flex items-start justify-between py-3 border-b last:border-0">
      <div className="flex items-start gap-3">
        {requirement.completed ? (
          <CheckCircle2 className="h-5 w-5 text-lg text-green-500 mt-0.5 shrink-0" />
        ) : (
          <Circle className="h-5 w-5 text-lg text-muted-foreground mt-0.5 shrink-0" />
        )}
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-lg text-primary-color">{requirement.title}</p>
          <p className="text-lg text-muted-foreground">{requirement.description}</p>
        </div>
      </div>
      <span className="text-md font-semibold text-secondary-color shrink-0">{requirement.progress}</span>
    </div>
  );
}
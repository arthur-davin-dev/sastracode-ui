import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock } from "lucide-react";
import { CertificateRequirement } from "@/types/certificate";

export function RequirementCard({ requirement }: { requirement: CertificateRequirement }) {
  return (
    <Card className="bg-muted/30 border-dashed">
      <CardContent className="flex items-center gap-3 p-5">
        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-content font-bold text-indigo-950">{requirement.title}</p> {/* ← ប្តូរពី text-sm */}
          <p className="text-xs text-muted-foreground mt-0.5 mb-2">
            បញ្ចប់ចំនេះដឹងមូលដ្ឋាន {requirement.progressPercent}%
          </p>
          <Progress value={requirement.progressPercent} className="h-1 bg-gray-200 [&>div]:bg-indigo-900" />
        </div>
      </CardContent>
    </Card>
  );
}
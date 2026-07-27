import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Award } from "lucide-react";
import { RequirementChecklistItem } from "@/types/certificate";

interface ClaimCertificateCardProps {
  items: RequirementChecklistItem[];
}

export function ClaimCertificateCard({ items }: ClaimCertificateCardProps) {
  const allDone = items.every((item) => item.completed);

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
          <Award className="h-8 w-8 text-indigo-600" />
        </div>

        <div>
          <p className="text-sub-title font-bold text-indigo-950">ចំណេះដឹងវិញ្ញាបនបត្រ</p> {/* ← ប្តូរពី font-bold ធម្មតា */}
          <p className="text-content text-muted-foreground mt-1"> {/* ← ប្តូរពី text-xs */}
            បំពេញគ្រប់ខ្សែខាងក្រោមដើម្បីទទួលបានវិញ្ញាបនបត្រនេះ
          </p>
        </div>

        <div className="w-full space-y-3 text-left max-w-xs mx-auto">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-content"> {/* ← ប្តូរពី text-sm */}
              {item.completed ? (
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span className={item.completed ? "" : "text-muted-foreground"}>{item.label}</span>
            </div>
          ))}
        </div>

        <Button className="w-full max-w-xs" disabled={!allDone} variant={allDone ? "default" : "secondary"}>
          ទាមទារវិញ្ញាបនបត្រ
        </Button>
      </CardContent>
    </Card>
  );
}
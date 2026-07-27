import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";

interface SkillsCardProps {
  skills: string[];
  qrCodeUrl: string;
  grade: string;
  quizScore: string;
  studyDuration: string;
  completionWeeks: string;
}

export function SkillsCard({ skills, qrCodeUrl, grade, quizScore, studyDuration, completionWeeks }: SkillsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sub-title font-semibold">ជំនាញដែលទទួលបាន</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="grid grid-cols-2 gap-2 flex-1">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="justify-center py-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-50 font-normal"
              >
                {skill}
              </Badge>
            ))}
          </div>
          <img src={qrCodeUrl} alt="QR Code" className="h-20 w-20 shrink-0" />
        </div>

        <div className="pt-3 border-t space-y-3">
          <p className="text-content font-semibold text-indigo-950">សមិទ្ធផលសិក្សា</p>

          <div className="flex items-start gap-2">
            <Star className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-content font-medium">គ្រោងបញ្ចប់ការសិក្សា</p>
              <p className="text-xs text-muted-foreground">និទ្ទេស: {grade}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-content font-medium">រយៈពេលសិក្សា {studyDuration}</p>
              <p className="text-xs text-muted-foreground">បញ្ចប់ក្នុងរយៈពេល {completionWeeks}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
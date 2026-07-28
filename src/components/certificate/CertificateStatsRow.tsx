import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, CheckCircle2, Hourglass, Lock } from "lucide-react";

interface CertificateStatsRowProps {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  lockedCourses: number;
}

export function CertificateStatsRow({
  totalCourses,
  completedCourses,
  inProgressCourses,
  lockedCourses,
}: CertificateStatsRowProps) {
  const stats = [
    { icon: GraduationCap, value: totalCourses, label: "វិញ្ញាបនបត្រដែលទទួលបាន", tag: "សរុប", color: "text-blue-500 bg-blue-50", border: "border-b-4 border-blue-400", tagColor: "text-blue-600 bg-blue-50" },
    { icon: CheckCircle2, value: completedCourses, label: "វគ្គសិក្សាបានបញ្ចប់", tag: "ត្រូវបាន", color: "text-green-500 bg-green-50", border: "border-b-4 border-green-400", tagColor: "text-green-600 bg-green-50" },
    { icon: Hourglass, value: inProgressCourses, label: "វគ្គសិក្សាកំពុងបន្ត", tag: "កំពុងសិក្សា", color: "text-orange-500 bg-orange-50", border: "border-b-4 border-orange-400", tagColor: "text-orange-600 bg-orange-50" },
    { icon: Lock, value: lockedCourses, label: "វគ្គសិក្សាជាប់សោ", tag: "មិនទាន់មាន", color: "text-indigo-900 bg-indigo-50", border: "border-b-4 border-indigo-900", tagColor: "text-indigo-900 bg-indigo-50" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className={`relative ${stat.border}`}>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <span className={`text-lg font-medium px-2 py-0.5 rounded-full ${stat.tagColor}`}>
                {stat.tag}
              </span>
            </div>
            <p className="text-sub-title font-bold">{stat.value}</p> {/* ← ប្តូរពី text-2xl */}
            <p className="text-content text-muted-foreground">{stat.label}</p> {/* ← ប្តូរពី text-xs */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { InProgressCertificate } from "@/types/certificate";

export function InProgressCertificateCard({ certificate }: { certificate: InProgressCertificate }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex items-center gap-4 p-4">
        <img src={certificate.thumbnailUrl} alt={certificate.title} className="h-20 w-32 rounded-lg object-cover shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-lg font-bold text-primary-color">{certificate.title}</p> 
            <span className="text-lg font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full shrink-0">
              កំពុងដំណើរការ
            </span>
          </div>

          <p className="text-lg text-muted-foreground mb-1">
            រដ្ឋភាព: {certificate.progressPercent}%
          </p>

          <Progress value={certificate.progressPercent} className="h-1.5 [&>div]:bg-orange-400" />

          <p className="text-lg text-muted-foreground mt-1">
            បញ្ចប់ក្នុងរយៈពេល {certificate.daysLeft} ថ្ងៃ (ពី {certificate.totalDays} ថ្ងៃ)
          </p>
        </div>

        <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 shrink-0">
          បន្តការសិក្សា
        </Button>
      </CardContent>
    </Card>
  );
}
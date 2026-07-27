import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

interface VerificationCardProps {
  status: string;
  issuedDate: string;
  verificationId: string;
}

export function VerificationCard({ status, issuedDate, verificationId }: VerificationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sub-title font-semibold flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-600" />
          ការផ្ទៀងផ្ទាត់
        </CardTitle>
        <p className="text-content text-muted-foreground">
          វិញ្ញាបនបត្រនេះត្រូវបានចេញផ្តល់ដោយផ្លូវការនិងអាចផ្ទៀងផ្ទាត់បាន SastraCode។ អ្នកអាចប្រើប្រាស់ QR Code នេះដើម្បីផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ។
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-content text-muted-foreground">ស្ថានភាព</span>
          <span className="flex items-center gap-1 text-green-600 text-content font-medium">
            <CheckCircle2 className="h-4 w-4" /> ត្រឹមត្រូវ
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-content text-muted-foreground">ការចេញផ្តល់</span>
          <span className="text-content font-medium">{issuedDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-content text-muted-foreground">ID</span>
          <span className="text-content font-mono font-medium">{verificationId}</span>
        </div>

        <Button className="w-full text-white bg-indigo-950 hover:bg-indigo-900 gap-2">
          <ShieldCheck className="h-4 w-4" /> បម្រុងទុកព័ត៌មានវិញ្ញាបនបត្រ
        </Button>
      </CardContent>
    </Card>
  );
}
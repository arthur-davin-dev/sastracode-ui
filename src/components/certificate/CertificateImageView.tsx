import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface CertificateImageViewProps {
  studentName: string;
  courseDescription: string;
  qrCodeUrl: string;
}

export function CertificateImageView({ studentName, courseDescription, qrCodeUrl }: CertificateImageViewProps) {
  return (
    <Card className="relative overflow-hidden p-8 bg-white border-4 border-double border-indigo-900">
      <div className="absolute top-0 right-8 w-8 h-16 bg-indigo-900" />
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.5 }}
            className="absolute top-14 right-6 h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center shadow-md"
            >
            <Award className="h-6 w-6 text-white" />
        </motion.div>

      <div className="flex flex-col items-center text-center space-y-4 py-6">
        <div className="flex items-center gap-4">
          <img src="/images/istad_logo.png" alt="ISTAD" className="h-10" />
          <img src="/images/sastra_code_logo.png" alt="SastraCode" className="h-14" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-wide">CERTIFICATE</h1>
          <h2 className="text-lg font-semibold tracking-wide">OF ACHIEVMENT</h2>
        </div>

        <p className="text-xs text-muted-foreground tracking-widest">PROUDLY PRESENTED TO</p>

        <p className="text-3xl font-bold text-indigo-950 border-b-2 border-indigo-900 pb-1 px-8">
          {studentName}
        </p>

        <p className="text-xs text-muted-foreground max-w-md">
          {courseDescription}
        </p>

        <img src={qrCodeUrl} alt="QR Code" className="h-16 w-16 mt-4" />
      </div>
    </Card>
  );
}
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InProgressCertificateCard } from "@/components/certificate/InProgressCertificateCard";
import { InProgressCertificate } from "@/types/certificate";

interface InProgressCertificatesSectionProps {
  certificates: InProgressCertificate[];
}

export function InProgressCertificatesSection({ certificates }: InProgressCertificatesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center gap-2 text-primary-color dark:text-white">
          ⏳ វិញ្ញាបនបត្រកំពុងដំណើរការ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <InProgressCertificateCard certificate={cert} />
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
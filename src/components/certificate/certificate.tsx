"use client";

import { CertificateStatsRow } from "@/components/certificate/CertificateStatsRow";
import { EarnedCertificatesSection } from "@/components/certificate/EarnedCertificatesSection";
import { InProgressCertificatesSection } from "@/components/certificate/InProgressCertificatesSection";
import { ClaimCertificateSection } from "@/components/certificate/ClaimCertificateSection";
import { CertificateRequirement } from "@/types/certificate";

const requirements: CertificateRequirement[] = [
  { id: "1", title: "DevOps Fundamentals", progressPercent: 30 },
  { id: "2", title: "AI & Machine Learning", progressPercent: 20 },
];

export default function Certificate() {
  return (
    <main className="relative z-10 isolate space-y-6 p-6 text-foreground">
      {/* <PageHeader
        title ="វិញ្ញាបនបត្រ"
        description="មើល និងគ្រប់គ្រងវិញ្ញាបនបត្រនិងវឌ្ឍនភាពសិក្សារបស់អ្នក"
      /> */}
      <h1 className="text-2xl font-bold text-primary-color dark:text-white">
        វិញ្ញាបនបត្រ
      </h1>
      <p className="text-lg text-slate-700 dark:text-slate-300">
        មើល និងគ្រប់គ្រងវិញ្ញាបនបត្រនិងវឌ្ឍនភាពសិក្សារបស់អ្នក
      </p>

      <CertificateStatsRow />

      <EarnedCertificatesSection />

      <InProgressCertificatesSection />

      <ClaimCertificateSection />
    </main>
  );
}

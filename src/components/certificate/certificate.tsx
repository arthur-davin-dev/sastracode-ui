"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/page-header";
import { CertificateStatsRow } from "@/components/certificate/CertificateStatsRow";
import { EarnedCertificatesSection } from "@/components/certificate/EarnedCertificatesSection";
import { InProgressCertificatesSection } from "@/components/certificate/InProgressCertificatesSection";
import { RequirementCard } from "@/components/certificate/RequirementCard";
import { ClaimCertificateCard } from "@/components/certificate/ClaimCertificateCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import {
  EarnedCertificate,
  InProgressCertificate,
  CertificateRequirement,
  RequirementChecklistItem,
} from "@/types/certificate";

const earnedCertificates: EarnedCertificate[] = [
  { id: "1", title: "HTML, CSS & JavaScript", thumbnailUrl: "/images/certi.png", level: "Beginner", date: "12/03/2025", certificateId: "SC-9821-XP", category: "Beginner Web" },
  { id: "2", title: "React.js Fundamental", thumbnailUrl: "/images/certi.png", level: "Intermediate", date: "05/04/2025", certificateId: "SC-7712-XP", category: "Frontend" },
  { id: "3", title: "Java Programming", thumbnailUrl: "/images/certi.png", level: "Advanced", date: "20/04/2025", certificateId: "SC-6611-XP", category: "Backend" },
];

const inProgressCertificates: InProgressCertificate[] = [
  { id: "1", title: "Node.js Advanced", thumbnailUrl: "/images/certificate.png", progressPercent: 68, level: "Advanced", daysLeft: 10, totalDays: 15 },
  { id: "2", title: "Fullstack Web Development", thumbnailUrl: "/images/certificate2.png", progressPercent: 42, level: "Intermediate", daysLeft: 7, totalDays: 20 },
];

const requirements: CertificateRequirement[] = [
  { id: "1", title: "DevOps Fundamentals", progressPercent: 30 },
  { id: "2", title: "AI & Machine Learning", progressPercent: 20 },
];

const checklistItems: RequirementChecklistItem[] = [
  { label: "បញ្ចប់មេរៀន", completed: true },
  { label: "បញ្ចប់លំហាត់", completed: true },
  { label: "ការប្រលង", completed: true },
  { label: "ការសិក្សាបន្ថែម", completed: false },
  { label: "ការវាយតម្លៃចុងក្រោយ", completed: false },
];

export default function Certificate() {
  return (
    <div className="space-y-6 p-6 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <PageHeader
        title="វិញ្ញាបនបត្រ"
        description="មើល និងគ្រប់គ្រងវិញ្ញាបនបត្រនិងវឌ្ឍនភាពសិក្សារបស់អ្នក"
      />

      <CertificateStatsRow
        totalCourses={12}
        completedCourses={8}
        inProgressCourses={2}
        lockedCourses={2}
      />

      <EarnedCertificatesSection certificates={earnedCertificates} />

      <InProgressCertificatesSection certificates={inProgressCertificates} />

      {/* Locked / Requirement Certificates Card */}
      <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-[18px] font-semibold flex items-center gap-2.5 text-slate-900 dark:text-slate-100">
            <span className="h-7 w-7 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center shrink-0">
              <Lock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </span>
            វិញ្ញាបនបត្រមិនទាន់មានបញ្ចប់
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {requirements.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <RequirementCard requirement={r} />
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <ClaimCertificateCard items={checklistItems} />
    </div>
  );
}
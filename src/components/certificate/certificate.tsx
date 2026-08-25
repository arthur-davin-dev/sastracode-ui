"use client";

import { motion } from "framer-motion";
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
  {
    id: "1",
    title: "HTML, CSS & JavaScript",
    thumbnailUrl: "/images/certi.png",
    level: "Beginner",
    date: "12/03/2025",
    certificateId: "SC-9821-XP",
    category: "Beginner Web",
  },
  {
    id: "2",
    title: "React.js Fundamental",
    thumbnailUrl: "/images/certi.png",
    level: "Intermediate",
    date: "05/04/2025",
    certificateId: "SC-7712-XP",
    category: "Frontend",
  },
  {
    id: "3",
    title: "Java Programming",
    thumbnailUrl: "/images/certi.png",
    level: "Advanced",
    date: "20/04/2025",
    certificateId: "SC-6611-XP",
    category: "Backend",
  },
];

const inProgressCertificates: InProgressCertificate[] = [
  {
    id: "1",
    title: "Node.js Advanced",
    thumbnailUrl: "/images/certificate.png",
    progressPercent: 68,
    level: "Advanced",
    daysLeft: 10,
    totalDays: 15,
  },
  {
    id: "2",
    title: "Fullstack Web Development",
    thumbnailUrl: "/images/certificate2.png",
    progressPercent: 42,
    level: "Intermediate",
    daysLeft: 7,
    totalDays: 20,
  },
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

      <CertificateStatsRow
        totalCourses={12}
        completedCourses={8}
        inProgressCourses={2}
        lockedCourses={2}
      />

      <EarnedCertificatesSection certificates={earnedCertificates} />

      <InProgressCertificatesSection certificates={inProgressCertificates} />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-primary-color dark:text-white">
            <span className="h-6 w-6 rounded-full bg-primary-color/20 flex items-center justify-center">
              <Lock className="h-3.5 w-3.5 text-slate-700 dark:text-slate-300" />
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
    </main>
  );
}

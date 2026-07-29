"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Download, Share2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CertificateImageView } from "@/components/certificate/CertificateImageView";
import { VerificationCard } from "@/components/certificate/VerificationCard";
import { SkillsCard } from "@/components/certificate/SkillsCard";
import { CertificateView } from "@/types/certificate";

const certificateData: Record<string, CertificateView> = {
  "1": {
    id: "1",
    studentName: "Student Name",
    courseName: "HTML, CSS & JavaScript",
    courseDescription:
      "For successfully completing the comprehensive e-learning course in HTML, CSS and JavaScript and demonstrating exceptional proficiency in its core fundamentals.",
    qrCodeUrl: "/images/qr-code.png",
    verificationId: "SC-9821-XP",
    status: "ត្រឹមត្រូវ",
    issuedDate: "12/03/2025",
    skills: ["HTML", "CSS", "JavaScript"],
    grade: "A+ (៩៨/១០០)",
    quizScore: "៩០/១០០ ពិន្ទុ",
    studyDuration: "៨០ ម៉ោង",
    completionWeeks: "៦ សប្តាហ៍",
  },
  "2": {
    id: "2",
    studentName: "Student Name",
    courseName: "React.js Fundamental",
    courseDescription:
      "For successfully completing the comprehensive e-learning course in React.js and demonstrating exceptional proficiency in its core fundamentals.",
    qrCodeUrl: "/images/qr-code.png",
    verificationId: "SC-7712-XP",
    status: "ត្រឹមត្រូវ",
    issuedDate: "05/04/2025",
    skills: ["React", "JavaScript", "JSX"],
    grade: "A (៩៤/១០០)",
    quizScore: "៨៦/១០០ ពិន្ទុ",
    studyDuration: "១២០ ម៉ោង",
    completionWeeks: "៨ សប្តាហ៍",
  },
  "3": {
    id: "3",
    studentName: "Student Name",
    courseName: "Java Programming",
    courseDescription:
      "For successfully completing the comprehensive e-learning course in Java Language and demonstrating exceptional proficiency in its core fundamentals.",
    qrCodeUrl: "/images/qr-code.png",
    verificationId: "ACAD-9821-B42X",
    status: "ត្រឹមត្រូវ",
    issuedDate: "20/04/2025",
    skills: ["CSS", "HTML", "Python", "JAVA", "JavaScript"],
    grade: "A+ (៩៨/១០០)",
    quizScore: "៩០/១០០ ពិន្ទុ",
    studyDuration: "២៤០ ម៉ោង",
    completionWeeks: "១៨ សប្តាហ៍",
  },
  "4": {
    id: "4",
    studentName: "Student Name",
    courseName: "Spring Boot Basic",
    courseDescription:
      "For successfully completing the comprehensive e-learning course in Spring Boot Framework and demonstrating exceptional proficiency in its core fundamentals.",
    qrCodeUrl: "/images/qr-code.png",
    verificationId: "SC-5583-XP",
    status: "ត្រឹមត្រូវ",
    issuedDate: "01/05/2025",
    skills: ["Java", "Spring Boot", "REST API"],
    grade: "A (៩២/១០០)",
    quizScore: "៨៤/១០០ ពិន្ទុ",
    studyDuration: "១៦០ ម៉ោង",
    completionWeeks: "១២ សប្តាហ៍",
  },
};

export default function CertificateViewPage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = use(params);
  const certificate = certificateData[certificateId];
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!certificate) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex items-center justify-center transition-colors">
        <Card className="max-w-md w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm p-6 text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle size={24} />
          </div>
          <h2 className="text-[18px] font-semibold text-slate-900 dark:text-slate-100">
            រកមិនឃើញព័ត៌មានវិញ្ញាបនបត្រនេះទេ
          </h2>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[18px]">
            <Link href="/certificate">
              <ChevronLeft className="mr-1 h-4 w-4" /> ត្រឡប់ទៅទំព័រដើម
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 space-y-6 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Top Navigation & Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <Link
          href="/certificate"
          className="inline-flex items-center gap-1.5 text-[18px] font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" /> ត្រឡប់ទៅបញ្ជីវិញ្ញាបនបត្រ
        </Link>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex-1 sm:flex-initial gap-2 text-[18px] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Share2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            )}
            {copied ? "បានចម្លង Link" : "ចែករំលែក"}
          </Button>

          <Button className="flex-1 sm:flex-initial gap-2 text-[18px] bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-xs">
            <Download className="h-4 w-4" /> ទាញយកជា PDF
          </Button>
        </div>
      </motion.div>

      {/* Grid Display Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Certificate Preview Image Panel */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <CertificateImageView
            studentName={certificate.studentName}
            courseDescription={certificate.courseDescription}
            qrCodeUrl={certificate.qrCodeUrl}
          />
        </motion.div>

        {/* Verification and Skills Cards */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <VerificationCard
              status={certificate.status}
              issuedDate={certificate.issuedDate}
              verificationId={certificate.verificationId}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <SkillsCard
              skills={certificate.skills}
              qrCodeUrl={certificate.qrCodeUrl}
              grade={certificate.grade}
              quizScore={certificate.quizScore}
              studyDuration={certificate.studyDuration}
              completionWeeks={certificate.completionWeeks}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
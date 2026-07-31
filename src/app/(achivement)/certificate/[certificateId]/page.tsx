"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  if (!certificate) {
    return <div className="p-6">រកមិនឃើញព័ត៌មានវិញ្ញាបនបត្រនេះទេ</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Top Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <Link
          href="/certificate"
          className="flex items-center gap-1.5 text-lg font-bold text-primary-color hover:text-red-600 transition-colors w-fit"
        >
          <ChevronLeft className="h-5 w-5" /> ត្រឡប់ទៅបញ្ជីវិញ្ញាបនបត្រ
        </Link>

        <div className="flex gap-3">
          <Button className="h-12 px-5 gap-2 bg-red-600 hover:bg-red-700 text-white text-lg font-bold shadow-md rounded-2xl transition-all">
            <Download className="h-5 w-5" /> ទាញយកជា PDF
          </Button>
          <Button variant="outline" className="h-12 px-5 gap-2 text-lg font-bold rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-primary-color hover:bg-slate-100">
            <Share2 className="h-5 w-5" /> ចែករំលែក
          </Button>
        </div>
      </motion.div>

      {/* Main Grid: Certificate Image Preview & Verification Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <CertificateImageView
            studentName={certificate.studentName}
            courseDescription={certificate.courseDescription}
            qrCodeUrl={certificate.qrCodeUrl}
          />
        </motion.div>

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
      </div>

      {/* Full-Width Section for SkillsCard */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
  );
}
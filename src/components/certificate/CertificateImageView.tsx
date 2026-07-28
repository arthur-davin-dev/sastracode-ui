"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface CertificateImageViewProps {
  studentName: string;
  courseDescription: string;
  qrCodeUrl: string;
}

export function CertificateImageView({
  studentName,
  courseDescription,
  qrCodeUrl,
}: CertificateImageViewProps) {
  return (
    <Card className="relative overflow-hidden p-6 sm:p-8 bg-white dark:bg-slate-900 border-4 border-double border-indigo-900 dark:border-indigo-600/60 shadow-md transition-colors duration-300">
      {/* Ribbon Decor */}
      <div className="absolute top-0 right-8 w-8 h-16 bg-indigo-900 dark:bg-indigo-600" />
      
      {/* Animated Seal Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.5 }}
        className="absolute top-14 right-6 h-12 w-12 rounded-full bg-amber-400 dark:bg-amber-500 flex items-center justify-center shadow-md z-10"
      >
        <Award className="h-6 w-6 text-slate-950 dark:text-slate-900" />
      </motion.div>

      {/* Main Certificate Content */}
      <div className="flex flex-col items-center text-center space-y-4 py-6">
        {/* Organization Logos */}
        <div className="flex items-center gap-4">
          <img src="/images/istad_logo.png" alt="ISTAD" className="h-10 object-contain dark:brightness-110" />
          <img src="/images/sastra_code_logo.png" alt="SastraCode" className="h-14 object-contain dark:brightness-110" />
        </div>

        {/* Certificate Title Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide text-slate-900 dark:text-slate-100">
            CERTIFICATE
          </h1>
          <h2 className="text-lg font-semibold tracking-wide text-indigo-900 dark:text-indigo-400">
            OF ACHIEVEMENT
          </h2>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 tracking-widest font-mono">
          PROUDLY PRESENTED TO
        </p>

        {/* Recipient Student Name */}
        <p className="text-2xl sm:text-3xl font-bold text-indigo-950 dark:text-indigo-300 border-b-2 border-indigo-900 dark:border-indigo-500 pb-1 px-8">
          {studentName}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
          {courseDescription}
        </p>

        {/* QR Code Container */}
        <div className="p-1 bg-white rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs mt-4">
          <img src={qrCodeUrl} alt="QR Code" className="h-16 w-16 object-contain" />
        </div>
      </div>
    </Card>
  );
}
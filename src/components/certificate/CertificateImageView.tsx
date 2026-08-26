"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Sparkles } from "lucide-react";

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
    <Card className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-8 shadow-2xl transition-all duration-300">

      {/* Top Accent Gradient Bar (Red Secondary & Yellow Accent) */}
      <div className="absolute top-0 left-0 w-full h-2 sm:h-3 " />

      {/* Modern Red Ribbon Tag */}
      <div className="absolute top-0 right-6 sm:right-10 w-7 h-10 sm:w-10 sm:h-16 bg-secondary-color shadow-md flex items-end justify-center pb-1.5 sm:pb-2 rounded-b-lg">
        <div className="w-0 h-0 border-l-[14px] sm:border-l-20 border-l-transparent border-r-[14px] sm:border-r-20 border-r-transparent border-t-[7px] sm:border-t-10 border-t-secondary-color absolute -bottom-1.5 sm:-bottom-2" />
      </div>

      {/* Animated Award Seal Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
        className="absolute top-6 right-4 sm:top-10 sm:right-7 z-10 flex items-center justify-center"
      >
        <div className="relative flex items-center justify-center p-2 sm:p-3.5 rounded-full bg-yellow-400 text-slate-950 shadow-lg border-2 border-white ring-4 ring-yellow-400/30">
          <Award className="h-5 w-5 sm:h-8 sm:w-8 text-secondary-color" />
        </div>
      </motion.div>

      {/* Background Radial Glow Effects */}
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-yellow-400/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />

      {/* Main Certificate Layout */}
      <div className="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-6 py-4">

        {/* Header Logos */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 pb-2">
          <img src="/images/istad_logo.png" alt="ISTAD" className="h-8 sm:h-12 object-contain" />
          <div className="h-6 sm:h-8 w-0.5 bg-slate-300 dark:bg-slate-700" />
          <img src="/images/sastra_code_logo.png" alt="SastraCode" className="h-9 sm:h-14 object-contain" />
        </div>

        {/* Certificate Title Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-init-color shrink-0" />
            <h1 className="text-lg sm:text-2xl font-extrabold tracking-wide sm:tracking-widest text-primary-color uppercase">
              CERTIFICATE
            </h1>
            <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-secondary-color shrink-0" />
          </div>
          <h2 className="text-lg sm:text-2xl font-bold tracking-wide sm:tracking-wider text-secondary-color uppercase">
            OF ACHIEVEMENT
          </h2>
        </div>

        {/* Presentation Subtitle */}
        <p className="text-sm sm:text-lg font-bold tracking-widest text-primary-color opacity-80 uppercase">
          PROUDLY PRESENTED TO
        </p>

        {/* Student Name Emphasis (with Accent Border) */}
        <div className="relative my-1 sm:my-2 max-w-full px-2">
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary-color break-words px-4 sm:px-8 pb-2 border-b-4 border-yellow-400">
            {studentName}
          </p>
        </div>

        {/* Course Description Content */}
        <p className="text-sm sm:text-lg font-medium text-primary-color max-w-xl leading-relaxed px-2">
          {courseDescription}
        </p>

        {/* Certificate Footer with Verification Status & QR Code */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between w-full max-w-lg gap-4 border-t border-slate-200 dark:border-slate-800">

          {/* Verification Badge */}
          <div className="flex items-center gap-2 text-sm sm:text-lg font-bold text-primary-color text-center sm:text-left">
            <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 shrink-0" />
            <span>ព័ត៌មានវិញ្ញាបនបត្រត្រឹមត្រូវ</span>
          </div>

          {/* Framed QR Code Container */}
          <div className="p-2 rounded-2xl bg-white dark:bg-slate-800 border-2 border-yellow-400 shadow-md shrink-0">
            <img src={qrCodeUrl} alt="QR Code" className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-lg" />
          </div>

        </div>

      </div>
    </Card>
  );
}
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, Fingerprint } from "lucide-react";

interface VerificationCardProps {
  status: string;
  issuedDate: string;
  verificationId: string;
}

export function VerificationCard({
  status,
  issuedDate,
  verificationId,
}: VerificationCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 transition-all duration-300">
      
      {/* Top Accent Gradient Line (Red & Yellow) */}
      <div className="absolute top-0 left-0 w-full h-2 " />

      <CardHeader className="pt-8 pb-4 space-y-4">
        {/* Title Section (text-2xl) */}
        <CardTitle className="text-2xl font-extrabold text-primary-color flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-init-color/20 border border-init-color/50 flex items-center justify-center">
            <ShieldCheck className="h-7 w-7 text-secondary-color" />
          </div>
          ការផ្ទៀងផ្ទាត់
        </CardTitle>
        
        {/* Description Content (text-lg) */}
        <p className="text-lg text-primary-color opacity-80 leading-relaxed">
          វិញ្ញាបនបត្រនេះត្រូវបានចេញផ្តល់ដោយផ្លូវការនិងអាចផ្ទៀងផ្ទាត់បានពី SastraCode។ អ្នកអាចប្រើប្រាស់ QR Code នេះដើម្បីផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ។
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Details Container */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 space-y-4 border border-slate-100 dark:border-slate-800">
          
          {/* Status Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-700">
            <span className="text-lg font-medium text-primary-color opacity-70">ស្ថានភាព</span>
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 border border-green-200 dark:border-green-900 text-lg font-bold w-fit">
              <CheckCircle2 className="h-5 w-5" /> 
              {status || "ត្រឹមត្រូវ"}
            </span>
          </div>

          {/* Issued Date Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-700">
            <span className="text-lg font-medium text-primary-color opacity-70">ការចេញផ្តល់</span>
            <span className="text-lg font-bold text-primary-color">{issuedDate}</span>
          </div>

          {/* ID Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-lg font-medium text-primary-color opacity-70">ID</span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-yellow-400/10 border border-yellow-400/40 text-lg font-mono font-bold text-primary-color w-fit">
              <Fingerprint className="h-5 w-5 text-secondary-color" />
              {verificationId}
            </span>
          </div>

        </div>

        {/* Action Button (Red Primary, Yellow Hover) */}
        <Button className="w-full h-14 rounded-2xl text-lg font-bold text-white bg-primary-color hover:bg-blue-400 hover:text-slate-950 shadow-md transition-all duration-300 gap-2 group flex items-center justify-center">
          <ShieldCheck className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" /> 
          បម្រុងទុកព័ត៌មានវិញ្ញាបនបត្រ
        </Button>
        
      </CardContent>
    </Card>
  );
}
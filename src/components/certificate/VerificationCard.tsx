"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, Calendar, Hash } from "lucide-react";

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
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 space-y-1.5">
        <CardTitle className="text-[18px] font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ការផ្ទៀងផ្ទាត់
        </CardTitle>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          វិញ្ញាបនបត្រនេះត្រូវបានចេញផ្តល់ដោយផ្លូវការនិងអាចផ្ទៀងផ្ទាត់បាន SastraCode។ អ្នកអាចប្រើប្រាស់ QR Code នេះដើម្បីផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ។
        </p>
      </CardHeader>

      <CardContent className="pt-4 space-y-3">
        {/* Status */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <span className="text-[18px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ស្ថានភាព
          </span>
          <span className="inline-flex items-center gap-1 text-[18px] font-medium text-emerald-600 dark:text-emerald-400">
            {status}
          </span>
        </div>

        {/* Issue Date */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <span className="text-[18px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            ការចេញផ្តល់
          </span>
          <span className="text-[18px] font-medium text-slate-800 dark:text-slate-200">
            {issuedDate}
          </span>
        </div>

        {/* Verification ID */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <span className="text-[18px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Hash className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            ID
          </span>
          <span className="text-[18px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
            {verificationId}
          </span>
        </div>

        {/* Action Button */}
        <Button className="w-full text-white bg-indigo-950 hover:bg-indigo-900 dark:bg-indigo-600 dark:hover:bg-indigo-500 gap-2 text-[18px] mt-2 shadow-xs transition-colors">
          <ShieldCheck className="h-4 w-4" /> បម្រុងទុកព័ត៌មានវិញ្ញាបនបត្រ
        </Button>
      </CardContent>
    </Card>
  );
}
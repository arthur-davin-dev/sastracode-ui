"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, CheckCircle2, XCircle } from "lucide-react";

interface VerificationCardProps {
  revoked: boolean;
  issuedDate: string;
  verificationId: string;
  /**
   * The 32-char verification hash encoded in the certificate QR code.
   * Optional: when provided an extra monospace row is shown. Existing
   * (authed) call sites that omit it render exactly as before.
   */
  certificateHash?: string;
}

export function VerificationCard({
  revoked,
  issuedDate,
  verificationId,
  certificateHash,
}: VerificationCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 transition-all duration-300">
      
      {/* Top Accent Gradient Line (Red & Yellow) */}
      <div className="absolute top-0 left-0 w-full h-2 " />

      <CardHeader className="pt-8 pb-4 space-y-4">
        {/* Title Section (text-2xl) */}
        <CardTitle className="text-2xl font-extrabold text-primary-color dark:text-white flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-init-color/20 border border-init-color/50 flex items-center justify-center">
            <ShieldCheck className="h-7 w-7 text-secondary-color" />
          </div>
          ការផ្ទៀងផ្ទាត់
        </CardTitle>
        
        {/* Description Content (text-lg) */}
        <p className="text-lg text-primary-color dark:text-white opacity-80 leading-relaxed">
          វិញ្ញាបនបត្រនេះត្រូវបានចេញផ្តល់ដោយផ្លូវការនិងអាចផ្ទៀងផ្ទាត់បានពី SastraCode។ អ្នកអាចប្រើប្រាស់ QR Code នេះដើម្បីផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ។
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Details Container */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 space-y-4 border border-slate-100 dark:border-slate-800">
          
          {/* Status Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-700">
            <span className="text-lg font-medium text-primary-color dark:text-white opacity-70">ស្ថានភាព</span>
            {revoked ? (
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-200 dark:border-red-900 text-lg font-bold w-fit">
                <XCircle className="h-5 w-5" />
                ដកហូត
              </span>
            ) : (
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 border border-green-200 dark:border-green-900 text-lg font-bold w-fit">
                <CheckCircle2 className="h-5 w-5" />
                ត្រឹមត្រូវ
              </span>
            )}
          </div>

          {/* Issued Date Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-700">
            <span className="text-lg font-medium text-primary-color dark:text-white opacity-70">ការចេញផ្តល់</span>
            <span className="text-lg font-bold text-primary-color dark:text-white">{issuedDate}</span>
          </div>

          {/* ID Row */}
          <div className="flex flex-col gap-2">
            <span className="text-lg font-medium text-primary-color dark:text-white opacity-70">Verification ID</span>
            <span className="block px-3 py-1.5 rounded-xl bg-yellow-400/10 border border-yellow-400/40 text-lg font-mono font-bold text-primary-color dark:text-white break-all">
              {verificationId}
            </span>
          </div>

          {/* Verification Hash Row (public verify only) */}
          {certificateHash ? (
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
              <span className="text-lg font-medium text-primary-color dark:text-white opacity-70">Verification Hash</span>
              <span className="block px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-mono text-primary-color dark:text-white break-all">
                {certificateHash}
              </span>
            </div>
          ) : null}

        </div>

      </CardContent>
    </Card>
  );
}
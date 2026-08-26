"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronDown,
  Download,
  Share2,
  Check,
  AlertCircle,
  Loader2,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CertificateImageView } from "@/components/certificate/CertificateImageView";
import { VerificationCard } from "@/components/certificate/VerificationCard";
import { useGetCertificateByIdQuery } from "@/redux/features/certificate/certificateApi";
import {
  resolveCertificateFileUrl,
  resolveCertificateFileContentUrl,
} from "@/lib/certificate/resolve-certificate-file";
import {
  downloadCertificatePdf,
  downloadCertificatePng,
} from "@/lib/certificate/download-certificate";

const FALLBACK_QR = "/images/qr-code.png";

function formatIssuedDate(issuedAt?: string) {
  if (!issuedAt) return "";
  const date = new Date(issuedAt);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB");
}

export default function CertificateViewPage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = use(params);
  const { data, isFetching, isError } =
    useGetCertificateByIdQuery(certificateId);
  const certificate = data?.data;
  const isRevoked = certificate?.revoked === true;
  const [copied, setCopied] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isGeneratingPng, setIsGeneratingPng] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPdf = async () => {
    if (isRevoked || !certificate) return;
    try {
      setIsDownloadingPdf(true);
      await downloadCertificatePdf(
        certificate.certificateFileId,
        certificate.certificateNumber,
      );
    } catch (error) {
      console.error("Certificate PDF download error:", error);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadPng = async () => {
    if (isRevoked || !certificate) return;
    try {
      setIsGeneratingPng(true);
      await downloadCertificatePng(
        certificate.certificateFileId,
        certificate.certificateNumber,
      );
    } catch (error) {
      console.error("Certificate PNG export error:", error);
    } finally {
      setIsGeneratingPng(false);
    }
  };

  if (isFetching) {
    return (
      <div className="space-y-6 p-6">
        <div className="h-8 w-64 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 h-96 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
          <div className="h-96 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !certificate) {
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

  const canDownload =
    !isRevoked &&
    !!resolveCertificateFileContentUrl(certificate.certificateFileId);
  const isBusy = isDownloadingPdf || isGeneratingPng;

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

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  disabled={isBusy || !canDownload}
                  title={isRevoked ? "វិញ្ញាបនបត្រនេះត្រូវបានដកហូត" : undefined}
                  className="h-12 px-4 sm:px-5 gap-2 flex-1 sm:flex-none justify-center bg-primary-color hover:bg-blue-400 hover:text-slate-950 text-white text-base sm:text-lg font-bold shadow-md rounded-2xl transition-all disabled:opacity-60"
                />
              }
            >
              {isBusy ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Download className="h-5 w-5" />
              )}
              ទាញយក
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                onClick={handleDownloadPdf}
                disabled={isBusy || !canDownload}
                className="text-base gap-2 py-2"
              >
                <FileText className="h-4 w-4" /> ទាញយកជា PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDownloadPng}
                disabled={isBusy || !canDownload}
                className="text-base gap-2 py-2"
              >
                <ImageIcon className="h-4 w-4" /> ទាញយកជា PNG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            onClick={handleShare}
            className="h-12 px-4 sm:px-5 gap-2 flex-1 sm:flex-none justify-center text-base sm:text-lg font-bold rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-primary-color hover:bg-slate-100"
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Share2 className="h-5 w-5" />
            )}
            {copied ? "បានចម្លង" : "ចែករំលែក"}
          </Button>
        </div>
      </motion.div>

      {/* Main Grid: Certificate Image Preview & Verification Side-by-Side */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Certificate Preview Image Panel */}
        <motion.div
          className="xl:col-span-2"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {resolveCertificateFileUrl(certificate.certificateFileId) ? (
            <Card className="relative overflow-hidden rounded-3xl border-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4 shadow-2xl transition-all duration-300">
              {/* PDF content is rendered via the browser's native PDF viewer;
                  an <img> tag cannot display PDF bytes. The PDF's real page
                  ratio never matches our guessed aspect box exactly, so an
                  equal padding frame on every side keeps the leftover space
                  even instead of piling up on one edge. The wrapper clips
                  overflow so the iframe can fill it edge-to-edge, and the
                  iframe is oversized past both the right and bottom edges
                  (Chrome's viewer keeps its own scrollbars even with
                  #scrollbar=0, and at narrower widths it shows both a
                  vertical and a horizontal one) so those scrollbar strips
                  are clipped off instead of shown at any screen size. */}
              <div className="relative w-full aspect-[1.41/1] overflow-hidden rounded-xl">
                <iframe
                  src={resolveCertificateFileUrl(certificate.certificateFileId)}
                  title={`${certificate.courseTitle} certificate`}
                  className="absolute top-0 left-0"
                  style={{
                    width: "calc(96% + 24px)",
                    height: "calc(98% + 24px)",
                  }}
                />
              </div>
            </Card>
          ) : (
            <CertificateImageView
              studentName={certificate.studentName}
              courseDescription={`សម្រាប់ការបញ្ចប់វគ្គសិក្សា "${certificate.courseTitle}" ដោយជោគជ័យ`}
              qrCodeUrl={FALLBACK_QR}
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <VerificationCard
            revoked={isRevoked}
            issuedDate={formatIssuedDate(certificate.issuedAt)}
            verificationId={
              certificate.verificationId ?? certificate.certificateNumber
            }
          />
        </motion.div>
      </div>
    </div>
  );
}

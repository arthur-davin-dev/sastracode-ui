"use client";

import { use, useEffect, useState } from "react";
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
  Link2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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

// lucide-react dropped its brand glyphs, so the social marks are inlined here.
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.53-1.5H17V4.6c-.3-.04-1.3-.13-2.47-.13-2.45 0-4.13 1.5-4.13 4.24v2.37H7.5V14h2.9v8h3.1z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.96 6.82H1.9l7.73-8.84L1.55 2.25h6.82l4.71 6.23 5.16-6.23zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
    </svg>
  );
}

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
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isGeneratingPng, setIsGeneratingPng] = useState(false);

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function",
    );
  }, []);

  // Share targets always point at the PUBLIC verify page — never this
  // authenticated view, which a recipient could not open.
  const verificationRef =
    certificate?.verificationId ?? certificate?.certificateNumber ?? "";

  const buildVerifyUrl = () =>
    `${window.location.origin}/student/certificate/verify/${verificationRef}`;

  const shareText = certificate
    ? `ខ្ញុំបានទទួលវិញ្ញាបនបត្រ "${certificate.courseTitle}" ពី SastraCode`
    : "";

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=640");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildVerifyUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy verification link error:", error);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: certificate ? `${certificate.courseTitle} · SastraCode` : "SastraCode",
        text: shareText,
        url: buildVerifyUrl(),
      });
    } catch {
      /* user dismissed the native share sheet — nothing to do */
    }
  };

  const handleShareFacebook = () =>
    openShareWindow(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(buildVerifyUrl())}`,
    );

  const handleShareX = () =>
    openShareWindow(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(buildVerifyUrl())}&text=${encodeURIComponent(shareText)}`,
    );

  const handleShareLinkedIn = () =>
    openShareWindow(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(buildVerifyUrl())}`,
    );

  const handleShareTelegram = () =>
    openShareWindow(
      `https://t.me/share/url?url=${encodeURIComponent(buildVerifyUrl())}&text=${encodeURIComponent(shareText)}`,
    );

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
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  className="h-12 px-4 sm:px-5 gap-2 flex-1 sm:flex-none justify-center text-base sm:text-lg font-bold rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-primary-color hover:bg-slate-100"
                />
              }
            >
              {copied ? (
                <Check className="h-5 w-5" />
              ) : (
                <Share2 className="h-5 w-5" />
              )}
              {copied ? "បានចម្លង" : "ចែករំលែក"}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              {canNativeShare && (
                <DropdownMenuItem
                  onClick={handleNativeShare}
                  className="text-base gap-2 py-2"
                >
                  <Share2 className="h-4 w-4" /> ចែករំលែក...
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={handleShareFacebook}
                className="text-base gap-2 py-2"
              >
                <FacebookIcon className="h-4 w-4" /> Facebook
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleShareX}
                className="text-base gap-2 py-2"
              >
                <XIcon className="h-4 w-4" /> X (Twitter)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleShareLinkedIn}
                className="text-base gap-2 py-2"
              >
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleShareTelegram}
                className="text-base gap-2 py-2"
              >
                <Send className="h-4 w-4" /> Telegram
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleCopyLink}
                className="text-base gap-2 py-2"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
                {copied ? "បានចម្លងតំណ" : "ចម្លងតំណផ្ទៀងផ្ទាត់"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          {/* {resolveCertificateFileUrl(certificate.certificateFileId) ? ( */}
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
          {/* ) : (
            <CertificateImageView
              studentName={certificate.studentName}
              courseDescription={`សម្រាប់ការបញ្ចប់វគ្គសិក្សា "${certificate.courseTitle}" ដោយជោគជ័យ`}
              qrCodeUrl={FALLBACK_QR}
            />
          )} */}
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

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  LayoutGrid,
  List,
  CheckCircle2,
  Award,
  Download,
  FileText,
  Image as ImageIcon,
  Loader2,
  LockKeyhole,
  AlertTriangle,
} from "lucide-react";
import { useGetMyCertificatesQuery } from "@/redux/features/certificate/certificateApi";
import { resolveCertificateFileUrl } from "@/lib/certificate/resolve-certificate-file";
import {
  downloadCertificatePdf,
  downloadCertificatePng,
} from "@/lib/certificate/download-certificate";
import type { Certificate } from "@/types/certificate";

const FALLBACK_THUMBNAIL = "/images/certi.png";
const DESKTOP_BREAKPOINT_QUERY = "(min-width: 1024px)";

function useIsDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT_QUERY);
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function formatIssuedDate(issuedAt?: string) {
  if (!issuedAt) return "";
  const date = new Date(issuedAt);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB");
}

function CertificateThumbnail({
  certificateFileId,
  title,
}: {
  certificateFileId?: string;
  title: string;
}) {
  const fileUrl = resolveCertificateFileUrl(certificateFileId);

  if (!fileUrl) {
    return (
      <img
        src={FALLBACK_THUMBNAIL}
        alt={title}
        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    );
  }

  return (
    <iframe
      src={fileUrl}
      title={title}
      tabIndex={-1}
      className="absolute top-0 left-0 pointer-events-none group-hover:scale-105 transition-transform duration-300"
      style={{ width: "calc(96% + 24px)", height: "calc(96% + 24px)" }}
    />
  );
}

function CertificateDownloadMenu({
  cert,
  busy,
  onDownloadPdf,
  onDownloadPng,
  className,
}: {
  cert: Certificate;
  busy: boolean;
  onDownloadPdf: (cert: Certificate, e: React.MouseEvent) => void;
  onDownloadPng: (cert: Certificate, e: React.MouseEvent) => void;
  className?: string;
}) {
  const stopLinkNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={stopLinkNavigation}
        render={
          <button
            type="button"
            aria-label="Download Certificate"
            disabled={busy}
            className={`rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors disabled:opacity-60 ${className ?? ""}`}
          />
        }
      >
        {busy ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Download size={16} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          disabled={busy}
          onClick={(e) => onDownloadPdf(cert, e)}
          className="text-sm gap-2 py-1.5"
        >
          <FileText className="h-4 w-4" /> ទាញយកជា PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={busy}
          onClick={(e) => onDownloadPng(cert, e)}
          className="text-sm gap-2 py-1.5"
        >
          <ImageIcon className="h-4 w-4" /> ទាញយកជា PNG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function EarnedCertificatesSection() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [view, setView] = useState<"grid" | "list">("grid");
  const isDesktop = useIsDesktopViewport();
  const effectiveView = isDesktop ? view : "grid";

  // 1. Destructure the `error` object from RTK Query
  const { data, isFetching, isError, error, refetch } =
    useGetMyCertificatesQuery(
      { page: 0, size: 50 },
      { skip: !isAuthenticated },
    );

  // 2. Safely check if the error is a 404 (or the transformed 404 object)
  const is404Error =
    isError &&
    error &&
    typeof error === "object" &&
    (("status" in error && error.status === 404) ||
      ("success" in error && (error as any).success === true));

  // 3. Fallback to an empty array if it's a 404
  const certificates: Certificate[] = is404Error
    ? []
    : (data?.data?.content ?? []);

  const isLoading = status === "loading" || (isAuthenticated && isFetching);
  const [busyCertId, setBusyCertId] = useState<string | null>(null);

  const handleDownloadPdf = async (cert: Certificate, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setBusyCertId(cert.id);
      await downloadCertificatePdf(
        cert.certificateFileId,
        cert.certificateNumber,
      );
    } catch (error) {
      console.error("Certificate PDF download error:", error);
    } finally {
      setBusyCertId(null);
    }
  };

  const handleDownloadPng = async (cert: Certificate, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setBusyCertId(cert.id);
      await downloadCertificatePng(
        cert.certificateFileId,
        cert.certificateNumber,
      );
    } catch (error) {
      console.error("Certificate PNG export error:", error);
    } finally {
      setBusyCertId(null);
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <CardTitle className="text-[18px] font-semibold flex items-center gap-2.5 text-slate-900 dark:text-slate-100">
          <span className="h-7 w-7 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </span>
          វិញ្ញាបនបត្រដែលបានទទួល
        </CardTitle>

        <div className="hidden lg:flex items-center gap-0.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-lg p-1">
          <button
            type="button"
            aria-label="Grid view"
            className={`h-7 w-7 rounded-md flex items-center justify-center transition-colors ${
              view === "grid"
                ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="List view"
            className={`h-7 w-7 rounded-md flex items-center justify-center transition-colors ${
              view === "list"
                ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>

      {/* Content Body */}
      <CardContent className="space-y-5 pt-4">
        {!isAuthenticated ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
            <LockKeyhole className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" />
            <p className="mt-3 font-semibold text-slate-700 dark:text-slate-300">
              សូមចូលគណនីដើម្បីមើលវិញ្ញាបនបត្ររបស់អ្នក
            </p>
          </div>
        ) : isError && !is404Error ? (
          /* 4. Verify it's a real error (like a 500) before showing the red alert */
          <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-8 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-red-500" />
            <p className="mt-3 font-semibold text-red-700 dark:text-red-300">
              មិនអាចទាញយកវិញ្ញាបនបត្របានទេ
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              ព្យាយាមម្ដងទៀត
            </button>
          </div>
        ) : !isLoading && certificates.length === 0 ? (
          /* Empty State View */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50">
              <Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="mt-3 font-bold text-slate-800 dark:text-slate-200">
              មិនទាន់មានវិញ្ញាបនបត្រនៅឡើយទេ
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              សូមបញ្ចប់វគ្គសិក្សាណាមួយដើម្បីទទួលបានវិញ្ញាបនបត្រដំបូងរបស់អ្នក
            </p>
          </div>
        ) : (
          <>
            <div
              className={
                effectiveView === "grid"
                  ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"
                  : "flex flex-col gap-4"
              }
            >
              {isLoading
                ? [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
                    />
                  ))
                : certificates.map((cert, i) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.35 }}
                    >
                      <Link
                        href={`/certificate/${cert.id}`}
                        className="block group"
                      >
                        {effectiveView === "grid" ? (
                          /* GRID CARD VIEW */
                          <div className="relative flex flex-col justify-between h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-300">
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800/80 mb-4">
                              <CertificateThumbnail
                                certificateFileId={cert.certificateFileId}
                                title={cert.courseTitle}
                              />
                            </div>

                            <div className="flex-1 space-y-3">
                              <h3
                                title={cert.courseTitle}
                                className="text-[18px] font-bold leading-snug text-slate-900 dark:text-slate-100 break-words group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                              >
                                {cert.courseTitle}
                              </h3>

                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                  {formatIssuedDate(cert.issuedAt)}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
                                  <CheckCircle2 size={13} />
                                  បានបញ្ចប់
                                </span>
                              </div>

                              <div className="border-t border-slate-100 dark:border-slate-800/80 my-2" />

                              <div className="flex items-start justify-between gap-2 pt-1">
                                <div className="flex min-w-0 flex-1 flex-col">
                                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                                    Certificate No.
                                  </span>
                                  <span className="break-all text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                                    #{cert.certificateNumber}
                                  </span>
                                </div>

                                <CertificateDownloadMenu
                                  cert={cert}
                                  busy={busyCertId === cert.id}
                                  onDownloadPdf={handleDownloadPdf}
                                  onDownloadPng={handleDownloadPng}
                                  className="shrink-0"
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* LIST CARD VIEW */
                          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-300">
                            <div className="relative aspect-[16/10] w-full lg:w-48 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                              <CertificateThumbnail
                                certificateFileId={cert.certificateFileId}
                                title={cert.courseTitle}
                              />
                            </div>

                            <div className="flex-1 space-y-2 w-full min-w-0">
                              <h3
                                title={cert.courseTitle}
                                className="text-[18px] font-bold leading-snug text-slate-900 dark:text-slate-100 break-words group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                              >
                                {cert.courseTitle}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                  {formatIssuedDate(cert.issuedAt)}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                                  <CheckCircle2 size={12} />
                                  បានបញ្ចប់
                                </span>
                              </div>
                            </div>

                            <div className="flex lg:flex-col items-start lg:items-end justify-between gap-2 w-full lg:w-auto lg:max-w-48 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                              <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold shrink-0">
                                Certificate No.
                              </span>
                              <span className="break-all text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-mono lg:text-right">
                                #{cert.certificateNumber}
                              </span>
                            </div>

                            <CertificateDownloadMenu
                              cert={cert}
                              busy={busyCertId === cert.id}
                              onDownloadPdf={handleDownloadPdf}
                              onDownloadPng={handleDownloadPng}
                              className="shrink-0"
                            />
                          </div>
                        )}
                      </Link>
                    </motion.div>
                  ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

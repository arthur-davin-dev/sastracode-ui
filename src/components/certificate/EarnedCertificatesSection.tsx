"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
    // Chrome's built-in PDF viewer keeps its own scrollbar even with
    // #scrollbar=0, so the iframe is widened past the clipped container
    // and the scrollbar strip falls outside the visible area.
    <iframe
      src={fileUrl}
      title={title}
      tabIndex={-1}
      className="h-full pointer-events-none group-hover:scale-105 transition-transform duration-300"
      style={{ width: "calc(96% + 24px)" }}
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

  const { data, isFetching, isError, refetch } = useGetMyCertificatesQuery(
    { page: 0, size: 50 },
    { skip: !isAuthenticated },
  );

  const certificates: Certificate[] = data?.data.content ?? [];
  const isLoading = status === "loading" || (isAuthenticated && isFetching);
  const [busyCertId, setBusyCertId] = useState<string | null>(null);

  const handleDownloadPdf = async (cert: Certificate, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setBusyCertId(cert.id);
      await downloadCertificatePdf(cert.certificateFileId, cert.certificateNumber);
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
      await downloadCertificatePng(cert.certificateFileId, cert.certificateNumber);
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

        <div className="flex items-center gap-0.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-lg p-1">
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
        ) : isError ? (
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
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
            <Award className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" />
            <p className="mt-3 font-semibold text-slate-700 dark:text-slate-300">
              អ្នកមិនទាន់មានវិញ្ញាបនបត្រនៅឡើយទេ
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              បញ្ចប់វគ្គសិក្សាណាមួយដើម្បីទទួលបានវិញ្ញាបនបត្រដំបូងរបស់អ្នក
            </p>
          </div>
        ) : (
          <>
            {/* Dynamic Cards Container */}
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
                        {view === "grid" ? (
                          /* GRID CARD VIEW */
                          <div className="relative flex flex-col justify-between h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-300">
                            {/* Image */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800/80 mb-4">
                              <CertificateThumbnail
                                certificateFileId={cert.certificateFileId}
                                title={cert.courseTitle}
                              />
                            </div>

                            {/* Card Body */}
                            <div className="flex-1 space-y-3">
                              <h3 className="text-[18px] font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {cert.courseTitle}
                              </h3>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                  {formatIssuedDate(cert.issuedAt)}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
                                  <CheckCircle2 size={13} />
                                  Completed
                                </span>
                              </div>

                              <div className="border-t border-slate-100 dark:border-slate-800/80 my-2" />

                              <div className="flex items-center justify-between pt-1">
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                                    Certificate ID
                                  </span>
                                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                                    #{cert.certificateNumber}
                                  </span>
                                </div>

                                <CertificateDownloadMenu
                                  cert={cert}
                                  busy={busyCertId === cert.id}
                                  onDownloadPdf={handleDownloadPdf}
                                  onDownloadPng={handleDownloadPng}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* LIST CARD VIEW */
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-300">
                            <div className="relative aspect-[16/10] w-full sm:w-48 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                              <CertificateThumbnail
                                certificateFileId={cert.certificateFileId}
                                title={cert.courseTitle}
                              />
                            </div>

                            <div className="flex-1 space-y-2 w-full">
                              <h3 className="text-[18px] font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {cert.courseTitle}
                              </h3>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                  {formatIssuedDate(cert.issuedAt)}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                                  <CheckCircle2 size={12} />
                                  Completed
                                </span>
                              </div>
                            </div>

                            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                              <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold">
                                ID
                              </span>
                              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
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

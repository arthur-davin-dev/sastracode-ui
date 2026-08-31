"use client";

import { useState } from "react";
import {
  ChevronDown,
  Download,
  FileText,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  downloadCertificatePdf,
  downloadCertificatePng,
} from "@/lib/certificate/download-certificate";

interface CertificateDownloadProps {
  certificateFileId: string;
  certificateNumber: string;
}

type Format = "pdf" | "png";

/**
 * Split download control for the public verify page. The certificate is stored
 * only as a PDF; the PNG option rasterizes page 1 client-side (pdfjs) via the
 * shared `download-certificate` helpers, same as the authenticated view.
 */
export function CertificateDownload({
  certificateFileId,
  certificateNumber,
}: CertificateDownloadProps) {
  const [busy, setBusy] = useState<Format | null>(null);
  const [failed, setFailed] = useState(false);

  async function run(format: Format) {
    if (busy) return;
    setBusy(format);
    setFailed(false);
    try {
      if (format === "pdf") {
        await downloadCertificatePdf(certificateFileId, certificateNumber);
      } else {
        await downloadCertificatePng(certificateFileId, certificateNumber);
      }
    } catch (error) {
      console.error(`Certificate ${format.toUpperCase()} download failed:`, error);
      setFailed(true);
    } finally {
      setBusy(null);
    }
  }

  const label =
    busy === "png"
      ? "កំពុងបម្លែងទៅ PNG..."
      : busy === "pdf"
        ? "កំពុងទាញយក..."
        : "ទាញយកវិញ្ញាបនបត្រ";

  return (
    <div className="space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              disabled={busy !== null}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#03204c] px-4 text-sm font-bold text-white shadow transition-opacity hover:opacity-90 disabled:opacity-60 dark:bg-blue-600"
            />
          }
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {label}
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-(--anchor-width) min-w-48">
          <DropdownMenuItem
            onClick={() => run("pdf")}
            disabled={busy !== null}
            className="gap-2 py-2 text-sm"
          >
            <FileText className="h-4 w-4" /> ទាញយកជា PDF
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => run("png")}
            disabled={busy !== null}
            className="gap-2 py-2 text-sm"
          >
            <ImageIcon className="h-4 w-4" /> ទាញយកជា PNG
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {failed ? (
        <p className="text-xs font-medium text-red-600 dark:text-red-400">
          ការទាញយកមិនបានសម្រេចទេ។ សូមព្យាយាមម្តងទៀត។
        </p>
      ) : null}
    </div>
  );
}

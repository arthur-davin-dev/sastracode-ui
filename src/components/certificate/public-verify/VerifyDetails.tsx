import type { CertificateVerificationResponse } from "@/types/certificate";
import { formatIssuedDate } from "./format";

interface VerifyDetailsProps {
  certificate: CertificateVerificationResponse;
  verificationId: string;
  revoked: boolean;
}

export function VerifyDetails({
  certificate,
  verificationId,
  revoked,
}: VerifyDetailsProps) {
  const rows: Array<{ label: string; value: string; mono?: boolean }> = [
    { label: "ឈ្មោះសិស្ស", value: certificate.studentName || "—" },
    { label: "វគ្គសិក្សា", value: certificate.courseTitle || "—" },
    {
      label: "Certificate Number",
      value: certificate.certificateNumber || "—",
      mono: true,
    },
    { label: "ថ្ងៃចេញផ្តល់", value: formatIssuedDate(certificate.issuedAt) },
  ];

  return (
    <div
      className={`space-y-4 rounded-2xl border p-5 shadow-sm ${
        revoked
          ? "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
          : "border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      <dl className="space-y-4">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
              index < rows.length - 1
                ? "border-b border-slate-100 pb-4 dark:border-slate-800"
                : ""
            }`}
          >
            <dt className="shrink-0 whitespace-nowrap text-[18px] font-[18px] text-slate-500 dark:text-slate-400">
              {row.label}
            </dt>
            <dd
              className={`min-w-0 text-[18px] font-bold text-slate-900 dark:text-white sm:text-right ${
                row.mono ? "font-mono break-all" : ""
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-[18px] font-[18px] text-slate-500 dark:text-slate-400">
          Verification ID
        </span>
        <span className="block break-all rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2 font-mono text-[14px] text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {verificationId}
        </span>
      </div>
    </div>
  );
}

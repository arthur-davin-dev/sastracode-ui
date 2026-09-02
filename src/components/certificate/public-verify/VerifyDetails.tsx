// import type { CertificateVerificationResponse } from "@/types/certificate";
// import { formatIssuedDate } from "./format";

// interface VerifyDetailsProps {
//   certificate: CertificateVerificationResponse;
//   /** The identifier from the scanned URL — the backend does not echo it back. */
//   verificationId: string;
//   revoked: boolean;
// }

// /**
//  * Read-only detail block for a resolved certificate (valid or revoked).
//  * Khmer labels for human-facing rows, English labels for the machine IDs,
//  * matching the house style in `VerificationCard`.
//  *
//  * Only fields a stranger is meant to see are rendered. `userId` and
//  * `certificateFileId` come back in the payload but are internal — showing them
//  * would leak the Keycloak subject and a direct file handle to anyone who scans
//  * the QR code.
//  */
// export function VerifyDetails({
//   certificate,
//   verificationId,
//   revoked,
// }: VerifyDetailsProps) {
//   const rows: Array<{ label: string; value: string; mono?: boolean }> = [
//     { label: "ឈ្មោះសិស្ស", value: certificate.studentName || "—" },
//     { label: "វគ្គសិក្សា", value: certificate.courseTitle || "—" },
//     {
//       label: "Certificate Number",
//       value: certificate.certificateNumber || "—",
//       mono: true,
//     },
//     { label: "ថ្ងៃចេញផ្តល់", value: formatIssuedDate(certificate.issuedAt) },
//   ];

//   return (
//     <div
//       className={`space-y-4 rounded-2xl border p-5 ${
//         revoked
//           ? "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
//           : "border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50"
//       }`}
//     >
//       <dl className="space-y-4">
//         {rows.map((row, index) => (
//           <div
//             key={row.label}
//             className={`flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
//               index < rows.length - 1
//                 ? "border-b border-slate-200 pb-4 dark:border-slate-700"
//                 : ""
//             }`}
//           >
//             <dt className="text-base font-[18px] text-primary-color/70 dark:text-white/70">
//               {row.label}
//             </dt>
//             <dd
//               className={`text-base font-bold text-primary-color dark:text-white sm:text-right ${
//                 row.mono ? "font-mono break-all" : ""
//               }`}
//             >
//               {row.value}
//             </dd>
//           </div>
//         ))}
//       </dl>

//       <div className="flex flex-col gap-2 pt-2">
//         <span className="text-base font-[18px] text-primary-color/70 dark:text-white/70">
//           Verification ID
//         </span>
//         <span className="block break-all rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-[18px] text-primary-color dark:border-slate-700 dark:bg-slate-900 dark:text-white">
//           {verificationId}
//         </span>
//       </div>
//     </div>
//   );
// }

// =======================================
// import type { CertificateVerificationResponse } from "@/types/certificate";
// import { formatIssuedDate } from "./format";
// import { Download, ExternalLink, FileText } from "lucide-react";

// interface VerifyDetailsProps {
//   certificate: CertificateVerificationResponse;
//   verificationId: string;
//   revoked: boolean;
// }

// export function VerifyDetails({
//   certificate,
//   verificationId,
//   revoked,
// }: VerifyDetailsProps) {
//   // Construct the direct URL for the certificate PDF file
//   const pdfUrl = certificate.certificateFileId
//     ? `/api/v1/files/${certificate.certificateFileId}`
//     : null;

//   const rows: Array<{ label: string; value: string; mono?: boolean }> = [
//     { label: "ឈ្មោះសិស្ស", value: certificate.studentName || "—" },
//     { label: "វគ្គសិក្សា", value: certificate.courseTitle || "—" },
//     {
//       label: "Certificate Number",
//       value: certificate.certificateNumber || "—",
//       mono: true,
//     },
//     { label: "ថ្ងៃចេញផ្តល់", value: formatIssuedDate(certificate.issuedAt) },
//   ];

//   return (
//     <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
//       {/* LEFT COLUMN: Certificate PDF Preview */}
//       {pdfUrl && !revoked ? (
//         <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:col-span-7">
//           <div className="flex items-center justify-between px-1">
//             <h3 className="flex items-center gap-2 text-base font-bold text-primary-color dark:text-white">
//               <FileText className="h-5 w-5" />
//               មើលវិញ្ញាបនបត្រ (Preview)
//             </h3>
//             <a
//               href={pdfUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-1.5 text-[18px] font-[18px] text-primary-color hover:underline dark:text-white"
//             >
//               ពង្រីកពេញអេក្រង់ <ExternalLink className="h-4 w-4" />
//             </a>
//           </div>

//           {/* PDF Frame tuned for landscape certificates */}
//           <div className="relative aspect-[1.4/1] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950">
//             <iframe
//               src={`${pdfUrl}#toolbar=0&navpanes=0`}
//               title="Certificate PDF Preview"
//               className="h-full w-full rounded-xl border-0"
//             />
//           </div>

//           <div className="pt-2">
//             <a
//               href={pdfUrl}
//               download
//               className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary-color px-4 text-[18px] font-bold text-white shadow transition-opacity hover:opacity-90"
//             >
//               <Download className="h-4 w-4" />
//               ទាញយកវិញ្ញាបនបត្រ (Download PDF)
//             </a>
//           </div>
//         </div>
//       ) : null}

//       {/* RIGHT COLUMN: Certificate Data & Details */}
//       <div
//         className={`space-y-4 rounded-2xl border p-5 ${
//           pdfUrl && !revoked ? "lg:col-span-5" : "lg:col-span-12"
//         } ${
//           revoked
//             ? "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
//             : "border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50"
//         }`}
//       >
//         <dl className="space-y-4">
//           {rows.map((row, index) => (
//             <div
//               key={row.label}
//               className={`flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
//                 index < rows.length - 1
//                   ? "border-b border-slate-200 pb-4 dark:border-slate-700"
//                   : ""
//               }`}
//             >
//               <dt className="text-base font-[18px] text-primary-color/70 dark:text-white/70">
//                 {row.label}
//               </dt>
//               <dd
//                 className={`text-base font-bold text-primary-color dark:text-white sm:text-right ${
//                   row.mono ? "font-mono break-all" : ""
//                 }`}
//               >
//                 {row.value}
//               </dd>
//             </div>
//           ))}
//         </dl>

//         <div className="flex flex-col gap-2 pt-2">
//           <span className="text-base font-[18px] text-primary-color/70 dark:text-white/70">
//             Verification ID
//           </span>
//           <span className="block break-all rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-[18px] text-primary-color dark:border-slate-700 dark:bg-slate-900 dark:text-white">
//             {verificationId}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
// ==========================================
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

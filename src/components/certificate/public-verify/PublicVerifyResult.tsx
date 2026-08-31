// import type { VerificationState } from "./verification";
// import { VerifyStatusBanner } from "./VerifyStatusBanner";
// import { VerifyDetails } from "./VerifyDetails";
// import { RetryButton } from "./RetryButton";

// interface PublicVerifyResultProps {
//   state: VerificationState;
//   /** The identifier from the URL, shown verbatim as the verification reference. */
//   verificationId: string;
// }

// export function PublicVerifyResult({
//   state,
//   verificationId,
// }: PublicVerifyResultProps) {
//   const isResolved = state.status === "valid" || state.status === "revoked";

//   // A retry only makes sense when nothing was actually decided about the
//   // certificate. Offering it under "not found" would suggest the answer might
//   // change on a second try, which it will not.
//   const isRetryable =
//     state.status === "service_error" || state.status === "rate_limited";

//   // Populated only in development or when VERIFY_DEBUG=1. Useful for pinning
//   // down what the backend really returns for an unknown verificationId, since
//   // the OpenAPI spec documents no error responses at all.
//   const debug = isResolved ? undefined : state.debug;

//   return (
//     <div className="space-y-6">
//       <VerifyStatusBanner status={state.status} />

//       {isResolved ? (
//         <VerifyDetails
//           certificate={state.certificate}
//           verificationId={verificationId}
//           revoked={state.status === "revoked"}
//         />
//       ) : null}

//       {isRetryable ? <RetryButton /> : null}

//       {debug ? (
//         <details className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm dark:border-slate-700 dark:bg-slate-900">
//           <summary className="cursor-pointer font-mono font-bold text-primary-color dark:text-white">
//             debug ({state.status})
//           </summary>
//           <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all font-mono text-xs text-primary-color/80 dark:text-white/80">
//             {debug}
//           </pre>
//         </details>
//       ) : null}
//     </div>
//   );
// }
// ====================================================
import type { VerificationState } from "./verification";
import { VerifyDetails } from "./VerifyDetails";
import { CertificateDownload } from "./CertificateDownload";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { ExternalLink, FileText } from "lucide-react";

interface PublicVerifyResultProps {
  state: VerificationState;
  verificationId: string;
}

export function PublicVerifyResult({
  state,
  verificationId,
}: PublicVerifyResultProps) {
  if (state.status === "not_found" || state.status === "invalid_input") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/50 dark:bg-amber-950/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="space-y-1">
            <h2 className="text-base font-bold text-amber-900 dark:text-amber-200">
              {state.status === "invalid_input"
                ? "តំណភ្ជាប់មិនត្រឹមត្រូវ"
                : "រកមិនឃើញវិញ្ញាបនបត្រ"}
            </h2>
            <p className="text-sm text-amber-800/90 dark:text-amber-300/90">
              {state.status === "invalid_input"
                ? "Verification ID ក្នុងតំណភ្ជាប់នេះមិនត្រឹមត្រូវ។ សូមពិនិត្យ QR Code ឬចម្លងលេខកូដឡើងវិញ។"
                : `គ្មានវិញ្ញាបនបត្រណាដែលមាន Verification ID “${verificationId}” ឡើយ។`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state.status === "rate_limited" || state.status === "service_error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
          <div className="space-y-1">
            <h2 className="text-base font-bold text-red-900 dark:text-red-200">
              {state.status === "rate_limited"
                ? "សំណើច្រើនពេក"
                : "មិនអាចផ្ទៀងផ្ទាត់បានឥឡូវនេះ"}
            </h2>
            <p className="text-sm text-red-800/90 dark:text-red-300/90">
              {state.status === "rate_limited"
                ? "អ្នកបានព្យាយាមច្រើនដងពេក។ សូមរង់ចាំមួយភ្លែត រួចព្យាយាមម្តងទៀត។"
                : "នេះជាបញ្ហាបច្ចេកទេសខាងម៉ាស៊ីនមេ មិនមែនជាការវិនិច្ឆ័យលើវិញ្ញាបនបត្រនោះទេ។ សូមព្យាយាមម្តងទៀតនៅពេលក្រោយ។"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const cert = state.certificate;
  const isRevoked = cert.revoked;
  const pdfUrl = cert.certificateFileId
    ? `/api/v1/files/${cert.certificateFileId}`
    : null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
      {/* LEFT COLUMN: Large Certificate Preview */}
      <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-4 lg:col-span-7">
        <div className="flex items-center justify-between px-1">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <FileText className="h-5 w-5" />
            មើលវិញ្ញាបនបត្រ (Preview)
          </h3>
          {pdfUrl && !isRevoked && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              ពង្រីកពេញអេក្រង់ <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Embedded PDF Viewer — the iframe is oversized and centered inside an
            overflow-hidden frame so the PDF plugin's scrollbars are clipped out
            of view while the page still fills the frame edge to edge. */}
        {pdfUrl && !isRevoked ? (
          <div className="relative aspect-[1.414/1] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&pagemode=none&view=Fit`}
              title="Certificate PDF Preview"
              className="absolute left-1/2 top-1/2 h-[calc(100%+2rem)] w-[calc(100%+2rem)] -translate-x-1/2 -translate-y-1/2 border-0"
            />
          </div>
        ) : (
          <div className="flex aspect-[1.414/1] w-full items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {isRevoked ? "វិញ្ញាបនបត្រនេះត្រូវបានលុបចោល" : "មិនមានការមើលជាមុន"}
          </div>
        )}

        {/* Download control — PDF (stored file) or PNG (client-rasterized) */}
        {cert.certificateFileId && !isRevoked && (
          <div className="px-1 pt-1">
            <CertificateDownload
              certificateFileId={cert.certificateFileId}
              certificateNumber={cert.certificateNumber}
            />
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Verification Status Banner + Metadata Details */}
      <div className="space-y-4 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
        {/* Top Status Banner */}
        {isRevoked ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600 dark:text-red-400" />
              <div className="space-y-1">
                <h2 className="text-base font-bold text-red-900 dark:text-red-200">
                  វិញ្ញាបនបត្រនេះត្រូវបានលុបចោល
                </h2>
                <p className="text-sm leading-relaxed text-red-800/90 dark:text-red-300/90">
                  វិញ្ញាបនបត្រនេះត្រូវបានលុបចោល ឬលែងមានសុពលភាពនៅក្នុងប្រព័ន្ធ
                  SastraCode។
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-emerald-950 dark:text-emerald-200">
                  វិញ្ញាបនបត្រនេះត្រឹមត្រូវ
                </h2>
                <p className="text-sm leading-relaxed text-emerald-800/90 dark:text-emerald-300/90">
                  វិញ្ញាបនបត្រនេះត្រូវបានចេញផ្សាយដោយ SastraCode ជាផ្លូវការ
                  ហើយនៅមានសុពលភាព។
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Details List Component */}
        <VerifyDetails
          certificate={cert}
          verificationId={verificationId}
          revoked={isRevoked}
        />
      </div>
    </div>
  );
}

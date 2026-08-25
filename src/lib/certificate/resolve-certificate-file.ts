// Certificate files are issued as PDFs, so previews embed them via <iframe>
// (an <img> tag cannot rasterize PDF bytes). The hash params ask the
// browser's built-in PDF viewer (Chrome/Firefox) to hide its own toolbar
// and navigation chrome so the embed reads like a plain preview, and
// view=FitH scales the page to the frame's width instead of opening at
// 100% zoom (which crops the certificate to its top-left corner).
const PDF_VIEWER_PARAMS = "#toolbar=0&navpanes=0&scrollbar=0&view=FitH";

export function resolveCertificateFileUrl(certificateFileId?: string) {
  const value = certificateFileId?.trim();
  if (!value) return undefined;
  return `/api/files/${encodeURIComponent(value)}/content${PDF_VIEWER_PARAMS}`;
}

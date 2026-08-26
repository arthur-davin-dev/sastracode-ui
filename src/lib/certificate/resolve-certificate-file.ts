// Certificate files are issued as PDFs and served through this same-origin
// proxy (no CORS issues, forwards auth) rather than the raw presigned
// storage URL. Both the preview embed and the fetch-to-blob downloads use
// this one route.
export function resolveCertificateFileContentUrl(certificateFileId?: string) {
  const value = certificateFileId?.trim();
  if (!value) return undefined;
  return `/api/files/${encodeURIComponent(value)}/content`;
}

// The hash params ask the browser's built-in PDF viewer (Chrome/Firefox) to
// hide its own toolbar and navigation chrome so the embed reads like a plain
// preview, and view=FitH scales the page to the frame's width instead of
// opening at 100% zoom (which crops the certificate to its top-left corner).
// Hash fragments are never sent to the server, so they're only meaningful
// for <iframe>/viewer use, not for fetch()-based downloads.
const PDF_VIEWER_PARAMS = "#toolbar=0&navpanes=0&scrollbar=0&view=FitH";

export function resolveCertificateFileUrl(certificateFileId?: string) {
  const base = resolveCertificateFileContentUrl(certificateFileId);
  if (!base) return undefined;
  return `${base}${PDF_VIEWER_PARAMS}`;
}

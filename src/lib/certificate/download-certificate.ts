import { resolveCertificateFileContentUrl } from "./resolve-certificate-file";

function triggerBlobDownload(blob: Blob, filename: string) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(blobUrl);
}

export async function downloadCertificatePdf(
  certificateFileId: string | undefined,
  certificateNumber: string,
) {
  const fileUrl = resolveCertificateFileContentUrl(certificateFileId);
  if (!fileUrl) return;

  const response = await fetch(fileUrl);
  if (!response.ok) throw new Error("Failed to fetch certificate PDF");
  const blob = await response.blob();
  triggerBlobDownload(blob, `certificate-${certificateNumber}.pdf`);
}

// The backend only stores the certificate as a PDF, so the PNG option
// rasterizes the real issued document (page 1) via pdfjs-dist rather than
// re-rendering a separate design mockup.
export async function downloadCertificatePng(
  certificateFileId: string | undefined,
  certificateNumber: string,
) {
  const fileUrl = resolveCertificateFileContentUrl(certificateFileId);
  if (!fileUrl) return;

  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const response = await fetch(fileUrl);
  if (!response.ok) throw new Error("Failed to fetch certificate PDF");
  const pdfBytes = await response.arrayBuffer();

  const pdfDocument = await pdfjs.getDocument({ data: pdfBytes }).promise;
  const page = await pdfDocument.getPage(1);
  const viewport = page.getViewport({ scale: 2.5 });

  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas context unavailable");

  await page.render({ canvas, canvasContext: context, viewport }).promise;

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) throw new Error("Failed to encode PNG");

  triggerBlobDownload(blob, `certificate-${certificateNumber}.png`);
  await pdfDocument.cleanup();
}

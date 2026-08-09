import { auth } from "@/auth";

interface FileMetadataResponse {
  data?: { url?: string };
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ fileId: string }> },
) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) return new Response("File service is not configured.", { status: 503 });

  const { fileId } = await context.params;
  const baseUrl = backendUrl.endsWith("/") ? backendUrl : `${backendUrl}/`;
  const session = await auth();
  const headers = new Headers({ Accept: "application/json" });
  if (session?.accessToken) headers.set("Authorization", `Bearer ${session.accessToken}`);

  try {
    const metadataResponse = await fetch(
      new URL(`/api/v1/files/${encodeURIComponent(fileId)}`, baseUrl),
      { headers, cache: "no-store", signal: AbortSignal.timeout(15_000) },
    );
    if (!metadataResponse.ok) return new Response("Image not found.", { status: metadataResponse.status });

    const metadata = (await metadataResponse.json()) as FileMetadataResponse;
    if (!metadata.data?.url) return new Response("Image URL not found.", { status: 404 });

    const assetUrl = new URL(metadata.data.url, baseUrl);
    if (!new Set(["http:", "https:"]).has(assetUrl.protocol)) {
      return new Response("Unsupported image URL.", { status: 400 });
    }

    const assetHeaders = new Headers();
    if (session?.accessToken && assetUrl.origin === new URL(baseUrl).origin) {
      assetHeaders.set("Authorization", `Bearer ${session.accessToken}`);
    }
    const assetResponse = await fetch(assetUrl, {
      headers: assetHeaders,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (!assetResponse.ok) return new Response("Unable to load image.", { status: assetResponse.status });

    return new Response(assetResponse.body, {
      headers: {
        "Content-Type": assetResponse.headers.get("content-type") ?? "image/jpeg",
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch {
    return new Response("Unable to load image.", { status: 502 });
  }
}

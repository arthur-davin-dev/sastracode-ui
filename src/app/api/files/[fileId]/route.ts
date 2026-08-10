import type { ApiResponse, FileResponse } from "@/types/profile";

export async function GET(
  _request: Request,
  context: { params: Promise<{ fileId: string }> },
) {
  try {
    const { fileId } = await context.params;
    const apiUrl = process.env.BACKEND_API_URL;

    if (!apiUrl) {
      return new Response("Backend API is not configured.", { status: 500 });
    }

    const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
    const metadataResponse = await fetch(
      `${baseUrl}/api/v1/files/${encodeURIComponent(fileId)}`,
      { headers: { Accept: "application/json" }, cache: "no-store" },
    );

    if (!metadataResponse.ok) {
      return new Response("File not found.", { status: metadataResponse.status });
    }

    const metadata = (await metadataResponse.json()) as ApiResponse<FileResponse>;

    if (!metadata.data?.url) {
      return new Response("File URL not found.", { status: 404 });
    }

    const assetUrl = new URL(metadata.data.url, `${baseUrl}/`).toString();
    const assetResponse = await fetch(assetUrl, { cache: "no-store" });

    if (!assetResponse.ok) {
      return new Response("Unable to load file.", { status: assetResponse.status });
    }

    return new Response(assetResponse.body, {
      headers: {
        "Content-Type":
          assetResponse.headers.get("content-type") ?? "application/octet-stream",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (error) {
    console.error("File proxy error:", error);
    return new Response("Unable to load file.", { status: 500 });
  }
}

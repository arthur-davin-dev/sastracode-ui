import { auth } from "@/auth";

import type { ApiResponse, FileResponse } from "@/types/profile";

export async function GET(
  _request: Request,

  context: {
    params: Promise<{
      fileId: string;
    }>;
  },
) {
  try {
    const { fileId } = await context.params;

    const apiUrl = process.env.BACKEND_API_URL;

    if (!apiUrl) {
      return new Response("Backend API is not configured.", {
        status: 500,
      });
    }

    const session = await auth();

    if (!session?.accessToken) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;

    // ----------------------------------
    // Get file metadata
    // ----------------------------------

    const metadataResponse = await fetch(
      `${baseUrl}/api/v1/files/${encodeURIComponent(fileId)}`,
      {
        headers: {
          Accept: "application/json",

          Authorization: `Bearer ${session.accessToken}`,
        },

        cache: "no-store",
      },
    );

    if (!metadataResponse.ok) {
      return new Response("Avatar not found.", {
        status: metadataResponse.status,
      });
    }

    const metadata =
      (await metadataResponse.json()) as ApiResponse<FileResponse>;

    if (!metadata.data?.url) {
      return new Response("Avatar URL not found.", {
        status: 404,
      });
    }

    // Supports both:
    // /uploads/example.jpg
    // https://example.com/example.jpg

    const assetUrl = new URL(metadata.data.url, `${baseUrl}/`).toString();

    const assetHeaders = new Headers();

    const backendOrigin = new URL(baseUrl).origin;

    const assetOrigin = new URL(assetUrl).origin;

    // If the image lives on our backend,
    // also forward Bearer token.
    if (backendOrigin === assetOrigin) {
      assetHeaders.set("Authorization", `Bearer ${session.accessToken}`);
    }

    const assetResponse = await fetch(assetUrl, {
      headers: assetHeaders,
      cache: "no-store",
    });

    if (!assetResponse.ok) {
      return new Response("Unable to load avatar.", {
        status: assetResponse.status,
      });
    }

    return new Response(assetResponse.body, {
      status: 200,

      headers: {
        "Content-Type":
          assetResponse.headers.get("content-type") ??
          "application/octet-stream",

        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (error) {
    console.error("Avatar proxy error:", error);

    return new Response("Unable to load avatar.", {
      status: 500,
    });
  }
}

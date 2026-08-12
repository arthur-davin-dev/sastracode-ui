import { auth } from "@/auth";

import type {
  ApiResponse,
  FileResponse,
} from "@/types/profile";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      fileId: string;
    }>;
  },
) {
  try {
    const { fileId } =
      await context.params;

    const apiUrl =
      process.env.BACKEND_API_URL;

    if (!apiUrl) {
      return new Response(
        "Backend API is not configured.",
        {
          status: 500,
        },
      );
    }

    const session = await auth();

    const metadataHeaders =
      new Headers({
        Accept:
          "application/json",
      });

    // Public course thumbnails must also load for signed-out users.
    // The backend decides whether the requested file is public; when a
    // session exists, keep forwarding its token for protected files.
    if (session?.accessToken) {
      metadataHeaders.set(
        "Authorization",
        `Bearer ${session.accessToken}`,
      );
    }

    const baseUrl =
      apiUrl.endsWith("/")
        ? apiUrl.slice(0, -1)
        : apiUrl;

    // ========================================
    // 1. Get file metadata from Spring Boot
    // ========================================

    const metadataResponse =
      await fetch(
        `${baseUrl}/api/v1/files/${encodeURIComponent(
          fileId,
        )}`,
        {
          method: "GET",

          headers:
            metadataHeaders,

          cache: "no-store",
        },
      );

    if (!metadataResponse.ok) {
      const errorBody =
        await metadataResponse.text();

      console.error(
        "File metadata error:",
        metadataResponse.status,
        errorBody,
      );

      return new Response(
        "File not found.",
        {
          status:
            metadataResponse.status,
        },
      );
    }

    const metadata =
      (await metadataResponse.json()) as ApiResponse<FileResponse>;

    if (!metadata.data?.url) {
      return new Response(
        "File URL not found.",
        {
          status: 404,
        },
      );
    }

    // ========================================
    // 2. Resolve actual file URL
    // ========================================
    //
    // Supports:
    //
    // /uploads/example.jpg
    //
    // OR:
    //
    // https://storage.sastracode.tech/
    // sastracode-files/xxx.png?X-Amz-...
    //

    const assetUrl =
      new URL(
        metadata.data.url,
        `${baseUrl}/`,
      ).toString();

    const assetHeaders =
      new Headers();

    const backendOrigin =
      new URL(baseUrl).origin;

    const assetOrigin =
      new URL(assetUrl).origin;

    // If file actually comes from the
    // Spring Boot backend, forward token.
    //
    // If it comes from MinIO presigned URL,
    // do NOT add Authorization.
    if (
      session?.accessToken &&
      backendOrigin === assetOrigin
    ) {
      assetHeaders.set(
        "Authorization",
        `Bearer ${session.accessToken}`,
      );
    }

    // ========================================
    // 3. Fetch actual image/file
    // ========================================

    const assetResponse =
      await fetch(
        assetUrl,
        {
          method: "GET",
          headers: assetHeaders,
          cache: "no-store",
        },
      );

    if (
      !assetResponse.ok ||
      !assetResponse.body
    ) {
      console.error(
        "File asset error:",
        assetResponse.status,
        assetUrl,
      );

      return new Response(
        "Unable to load file.",
        {
          status:
            assetResponse.status,
        },
      );
    }

    // ========================================
    // 4. Send image/file to browser
    // ========================================

    return new Response(
      assetResponse.body,
      {
        status: 200,

        headers: {
          "Content-Type":
            assetResponse.headers.get(
              "content-type",
            ) ??
            metadata.data.fileType ??
            "application/octet-stream",

          "Cache-Control":
            "private, max-age=300",

          "X-Content-Type-Options":
            "nosniff",
        },
      },
    );
  } catch (error) {
    console.error(
      "File proxy error:",
      error,
    );

    return new Response(
      "Unable to load file.",
      {
        status: 500,
      },
    );
  }
}

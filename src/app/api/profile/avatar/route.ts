// import {
//   BackendProxyError,
//   backendFetch,
//   parseBackendResponse,
// } from "@/lib/server/backend-api";

import { backendFetch, BackendProxyError, parseBackendResponse } from "@/types/server/backend-api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const incomingFormData = await request.formData();

    const file = incomingFormData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Avatar file is required.",
          data: null,
        },
        {
          status: 400,
        },
      );
    }

    const formData = new FormData();

    formData.append("file", file);

    const response = await backendFetch("/api/v1/users/me/avatar", {
      method: "POST",

      body: formData,
    });

    const data = await parseBackendResponse(response);

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Avatar upload error:", error);

    if (error instanceof BackendProxyError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          data: null,
        },
        {
          status: error.status,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload avatar.",
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}

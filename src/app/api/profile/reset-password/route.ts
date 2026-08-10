// import {
//   BackendProxyError,
//   backendFetch,
//   parseBackendResponse,
// } from "@/lib/server/backend-api";

import { backendFetch, BackendProxyError, parseBackendResponse } from "@/types/server/backend-api";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await backendFetch("/api/v1/users/me/reset-password", {
      method: "POST",
    });

    const data = await parseBackendResponse(response);

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Reset password error:", error);

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

        message: "Failed to reset password.",

        data: null,
      },
      {
        status: 500,
      },
    );
  }
}

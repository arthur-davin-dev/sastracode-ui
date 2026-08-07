// import {
//   BackendProxyError,
//   backendFetch,
//   parseBackendResponse,
// } from "@/lib/server/backend-api";

import { backendFetch, BackendProxyError, parseBackendResponse } from "@/types/server/backend-api";
import { NextResponse } from "next/server";

function handleError(error: unknown) {
  console.error("Profile API error:", error);

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
      message: "Internal server error",
      data: null,
    },
    {
      status: 500,
    },
  );
}

// =====================================
// GET /api/profile
// =====================================

export async function GET() {
  try {
    const response = await backendFetch("/api/v1/users/me", {
      method: "GET",
    });

    const data = await parseBackendResponse(response);

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    return handleError(error);
  }
}

// =====================================
// PATCH /api/profile
// =====================================

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const response = await backendFetch("/api/v1/users/me", {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });

    const data = await parseBackendResponse(response);

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    return handleError(error);
  }
}

import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function POST(request: Request) {
  try {
    if (!BACKEND_API_URL) {
      return NextResponse.json(
        {
          success: false,
          message: "BACKEND_API_URL is not configured.",
          data: null,
        },
        {
          status: 500,
        },
      );
    }

    const body = await request.json();

    if (!body.language || typeof body.language !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Language is required.",
          data: null,
        },
        {
          status: 400,
        },
      );
    }

    if (!body.code || typeof body.code !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Code is required.",
          data: null,
        },
        {
          status: 400,
        },
      );
    }

    const baseUrl = BACKEND_API_URL.endsWith("/")
      ? BACKEND_API_URL.slice(0, -1)
      : BACKEND_API_URL;

    const response = await fetch(`${baseUrl}/api/v1/code/execute`, {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        language: body.language,

        code: body.code,

        stdin: body.stdin ?? "",
      }),

      cache: "no-store",
    });

    const text = await response.text();

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "Backend returned an empty response.",
          data: null,
        },
        {
          status: response.status,
        },
      );
    }

    try {
      const data = JSON.parse(text);

      return NextResponse.json(data, {
        status: response.status,
      });
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: text,
          data: null,
        },
        {
          status: response.status,
        },
      );
    }
  } catch (error) {
    console.error("PLAYGROUND EXECUTION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to execute code.",
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}

import { parseBackendResponse } from "@/types/server/backend-api";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

function errorResponse(error: unknown) {
  console.error("Backend API proxy error:", error);
  return NextResponse.json(
    { success: false, message: "Internal server error", data: null },
    { status: 500 },
  );
}

async function proxy(request: Request, context: RouteContext) {
  try {
    const apiUrl = process.env.BACKEND_API_URL;

    if (!apiUrl) {
      return NextResponse.json(
        { success: false, message: "Backend API configuration is missing.", data: null },
        { status: 500 },
      );
    }

    const { path } = await context.params;
    const session = await auth();
    const requestUrl = new URL(request.url);
    const backendPath = `/api/v1/${path.map(encodeURIComponent).join("/")}${requestUrl.search}`;
    const body = request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text();
    const headers = new Headers();
    const contentType = request.headers.get("content-type");

    if (contentType) headers.set("Content-Type", contentType);
    headers.set("Accept", "application/json");
    if (session?.accessToken) headers.set("Authorization", `Bearer ${session.accessToken}`);

    const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
    const response = await fetch(`${baseUrl}${backendPath}`, {
      method: request.method,
      headers,
      body: body || undefined,
      cache: "no-store",
    });
    const data = await parseBackendResponse(response);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;

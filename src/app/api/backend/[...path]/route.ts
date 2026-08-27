import { auth } from "@/auth";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FORWARDED_REQUEST_HEADERS = ["content-type", "accept", "accept-language"];

function getBackendBaseUrl() {
  const base = process.env.BACKEND_API_URL ?? process.env.BACKEND_URL;
  if (!base) return null;
  return base.replace(/\/$/, "");
}

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const backendBaseUrl = getBackendBaseUrl();

  if (!backendBaseUrl) {
    return Response.json(
      { success: false, message: "Backend API configuration is missing.", data: null },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  const normalized = (path ?? []).map(encodeURIComponent).join("/");
  const backendPath = `/api/${normalized}`;
  const target = new URL(`${backendBaseUrl}${backendPath}`);

  request.nextUrl.searchParams.forEach((value, key) => {
    target.searchParams.append(key, value);
  });

  const headers = new Headers();
  FORWARDED_REQUEST_HEADERS.forEach((name) => {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  });

  const session = await auth();
  if (session?.accessToken && session.error !== "RefreshAccessTokenError") {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }

  let body: ArrayBuffer | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    const bytes = await request.arrayBuffer();
    body = bytes.byteLength > 0 ? bytes : undefined;
  }

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "follow",
    });

    if (upstream.status === 204 || upstream.status === 304) {
      return new Response(null, { status: upstream.status });
    }

    const responseHeaders = new Headers();
    const contentType = upstream.headers.get("content-type");
    if (contentType) responseHeaders.set("content-type", contentType);

    const location = upstream.headers.get("location");
    if (location) responseHeaders.set("location", location);

    return new Response(await upstream.arrayBuffer(), {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Backend proxy request failed:", error);
    return Response.json(
      { success: false, message: "Unable to reach backend API.", data: null },
      { status: 502 },
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;

import { auth } from "@/auth";

const ALLOWED_METHODS = new Set(["GET", "POST", "PUT", "PATCH", "DELETE"]);

async function proxyTutorialRequest(
  request: Request,
  context: { params: Promise<{ path?: string[] }> },
) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return Response.json({ success: false, message: "The tutorial service is not configured." }, { status: 503 });
  }
  if (!ALLOWED_METHODS.has(request.method)) {
    return Response.json({ success: false, message: "Method not allowed." }, { status: 405 });
  }

  const { path = [] } = await context.params;
  const incomingUrl = new URL(request.url);
  const suffix = path.map(encodeURIComponent).join("/");
  const upstreamUrl = new URL(
    `/api/v1/tutorials${suffix ? `/${suffix}` : ""}`,
    backendUrl.endsWith("/") ? backendUrl : `${backendUrl}/`,
  );
  upstreamUrl.search = incomingUrl.search;

  const session = await auth();
  const headers = new Headers({ Accept: "application/json" });
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);
  if (session?.accessToken) headers.set("Authorization", `Bearer ${session.accessToken}`);

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body: request.method === "GET" ? undefined : await request.arrayBuffer(),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const responseHeaders = new Headers();
    const upstreamContentType = upstreamResponse.headers.get("content-type");
    if (upstreamContentType) responseHeaders.set("Content-Type", upstreamContentType);
    return new Response(upstreamResponse.body, { status: upstreamResponse.status, headers: responseHeaders });
  } catch {
    return Response.json({ success: false, message: "The tutorial service is unavailable." }, { status: 502 });
  }
}

export const GET = proxyTutorialRequest;
export const POST = proxyTutorialRequest;
export const PUT = proxyTutorialRequest;
export const PATCH = proxyTutorialRequest;
export const DELETE = proxyTutorialRequest;

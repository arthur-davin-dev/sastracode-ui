import { auth } from "@/auth";

async function proxyBookmark(
  request: Request,
  context: { params: Promise<{ path?: string[] }> },
) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) return Response.json({ success: false, message: "Bookmark service is not configured." }, { status: 503 });

  const session = await auth();
  if (!session?.accessToken) return Response.json({ success: false, message: "Please sign in to use bookmarks." }, { status: 401 });

  const { path = [] } = await context.params;
  if (path.length > 1) return Response.json({ success: false, message: "Bookmark endpoint not found." }, { status: 404 });
  const suffix = path.length ? `/${encodeURIComponent(path[0])}` : "";
  const upstreamUrl = new URL(`/api/v1/bookmarks${suffix}`, backendUrl.endsWith("/") ? backendUrl : `${backendUrl}/`);

  try {
    const response = await fetch(upstreamUrl, {
      method: request.method,
      headers: { Accept: "application/json", Authorization: `Bearer ${session.accessToken}`, ...(request.method === "POST" ? { "Content-Type": "application/json" } : {}) },
      body: request.method === "POST" ? await request.text() : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    return new Response(response.body, { status: response.status, headers: { "Content-Type": response.headers.get("content-type") ?? "application/json" } });
  } catch {
    return Response.json({ success: false, message: "Bookmark service is unavailable." }, { status: 502 });
  }
}

export const POST = proxyBookmark;
export const DELETE = proxyBookmark;

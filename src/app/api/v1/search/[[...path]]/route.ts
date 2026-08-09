import { auth } from "@/auth";

export async function GET(
  request: Request,
  context: { params: Promise<{ path?: string[] }> },
) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return Response.json({ success: false, message: "Search is not configured." }, { status: 503 });
  }

  const { path = [] } = await context.params;
  if (path.some((segment) => segment !== "suggest")) {
    return Response.json({ success: false, message: "Search endpoint not found." }, { status: 404 });
  }

  const incomingUrl = new URL(request.url);
  const suffix = path.length ? `/${path.map(encodeURIComponent).join("/")}` : "";
  const upstreamUrl = new URL(
    `/api/v1/search${suffix}`,
    backendUrl.endsWith("/") ? backendUrl : `${backendUrl}/`,
  );
  upstreamUrl.search = incomingUrl.search;

  const session = await auth();
  const headers = new Headers({ Accept: "application/json" });
  if (session?.accessToken) headers.set("Authorization", `Bearer ${session.accessToken}`);

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const contentType = upstreamResponse.headers.get("content-type");
    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: contentType ? { "Content-Type": contentType } : undefined,
    });
  } catch {
    return Response.json({ success: false, message: "Search is unavailable." }, { status: 502 });
  }
}

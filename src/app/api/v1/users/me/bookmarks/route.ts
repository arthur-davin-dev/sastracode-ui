import { auth } from "@/auth";

export async function GET(request: Request) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) return Response.json({ success: false, message: "Bookmark service is not configured." }, { status: 503 });
  const session = await auth();
  if (!session?.accessToken) return Response.json({ success: false, message: "Please sign in to view bookmarks." }, { status: 401 });

  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL("/api/v1/users/me/bookmarks", backendUrl.endsWith("/") ? backendUrl : `${backendUrl}/`);
  upstreamUrl.search = incomingUrl.search;

  try {
    const response = await fetch(upstreamUrl, {
      headers: { Accept: "application/json", Authorization: `Bearer ${session.accessToken}` },
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    return new Response(response.body, { status: response.status, headers: { "Content-Type": response.headers.get("content-type") ?? "application/json" } });
  } catch {
    return Response.json({ success: false, message: "Bookmark service is unavailable." }, { status: 502 });
  }
}

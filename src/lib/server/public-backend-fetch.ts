/**
 * Fetches a public (anonymous, non-personalized) JSON endpoint directly from
 * the backend, server-side. Unlike the `/api/backend` proxy (which always
 * forwards the caller's session token and disables caching), this lets
 * cacheable, public listings (course/tutorial teasers, etc.) be fetched
 * during SSR/RSC render with Next's fetch cache instead of the browser
 * doing a client-side round trip after hydration.
 */
export async function fetchPublicBackendJson<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
  revalidateSeconds = 60,
): Promise<T | null> {
  const backendApiUrl = process.env.BACKEND_API_URL;
  if (!backendApiUrl) return null;

  const baseUrl = backendApiUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${baseUrl}${normalizedPath}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error(`Public backend fetch failed for ${normalizedPath}:`, error);
    return null;
  }
}

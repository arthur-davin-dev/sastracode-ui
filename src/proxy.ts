import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Centralized route protection.
 *
 * Next.js 16 renamed the `middleware` file convention to `proxy` (see
 * node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
 * Proxy runs on the Node.js runtime by default, so decrypting the Auth.js
 * session JWE with `getToken` works here without an edge-compat shim.
 *
 * This is the enforcement layer for authorization rules 4 and 8 (unverified
 * users are kept out of protected features). Server pages / route handlers
 * still validate `auth()` and the backend still validates the bearer token —
 * this only saves a round trip and keeps the redirect logic in one place.
 */

/**
 * Path prefixes that require an authenticated, email-verified user. Matched as
 * an exact path or a `/prefix/...` sub-path. Keep this in sync with `config.matcher`
 * below (the matcher is a coarse pre-filter; this list is the real check).
 */
const PROTECTED_PREFIXES = [
  "/profile",
  "/achivement",
  "/certificate",
  "/notifications",
  "/instructor-application",
  "/courses/bookmark",
  "/courses/my-courses",
  "/courses/private-courses",
  "/documentation/bookmark",
  "/players",
] as const;

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  let token: Awaited<ReturnType<typeof getToken>> = null;

  try {
    token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie: request.nextUrl.protocol === "https:",
    });
  } catch (error) {
    // A decode failure means we cannot trust the session — treat as signed out
    // rather than failing open.
    console.error("proxy: failed to read session token:", error);
  }

  // Not signed in (or the refresh chain is broken): send to Keycloak and come
  // back to where they were trying to go.
  if (!token || token.error === "RefreshAccessTokenError") {
    const loginUrl = new URL("/api/auth/login/keycloak", request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  // Signed in but the email is explicitly unverified: hand back to Keycloak,
  // which owns the "verify your email" screen (realm VERIFY_EMAIL action).
  // With that realm action on, such a session should not normally exist — this
  // is defence in depth. `undefined` (unknown) is allowed through so a
  // pre-existing session is never locked out by a claim that was not recorded.
  if (token.emailVerified === false) {
    return NextResponse.redirect(
      new URL("/api/auth/login/keycloak", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/achivement/:path*",
    "/certificate/:path*",
    "/notifications/:path*",
    "/instructor-application/:path*",
    "/courses/bookmark/:path*",
    "/courses/my-courses/:path*",
    "/courses/private-courses/:path*",
    "/documentation/bookmark/:path*",
    "/players/:path*",
  ],
};

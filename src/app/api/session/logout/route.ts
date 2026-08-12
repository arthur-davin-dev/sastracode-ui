import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getBackendBaseUrl() {
  return (process.env.BACKEND_API_URL ?? process.env.BACKEND_URL)?.replace(/\/$/, "");
}

function getKeycloakLogoutUrl(request: NextRequest, idToken?: string) {
  const issuer = process.env.AUTH_KEYCLOAK_ISSUER?.replace(/\/$/, "");
  if (!issuer) return null;

  const logoutUrl = new URL(`${issuer}/protocol/openid-connect/logout`);
  const clientId = process.env.AUTH_KEYCLOAK_ID;

  if (idToken) logoutUrl.searchParams.set("id_token_hint", idToken);
  if (clientId) logoutUrl.searchParams.set("client_id", clientId);
  logoutUrl.searchParams.set(
    "post_logout_redirect_uri",
    new URL("/", request.nextUrl.origin).toString(),
  );

  return logoutUrl.toString();
}

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token) {
      return Response.json({
        success: true,
        message: "Already logged out.",
        keycloakLogoutUrl: getKeycloakLogoutUrl(request),
      });
    }

    const refreshToken =
      typeof token.refreshToken === "string" ? token.refreshToken : undefined;
    const idToken =
      typeof token.idToken === "string" ? token.idToken : undefined;
    const keycloakLogoutUrl = getKeycloakLogoutUrl(request, idToken);
    const backendBaseUrl = getBackendBaseUrl();

    // The supplied API schema requires exactly a refreshToken for logout.
    // Remote revocation failure must not prevent local session cleanup.
    if (refreshToken && backendBaseUrl) {
      const backendResponse = await fetch(`${backendBaseUrl}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });

      if (!backendResponse.ok) {
        console.error(
          "Backend logout failed:",
          backendResponse.status,
          await backendResponse.text(),
        );
      }
    }

    return Response.json({
      success: true,
      message: "Logout initiated.",
      keycloakLogoutUrl,
    });
  } catch (error) {
    console.error("Session logout route failed:", error);
    return Response.json(
      { success: false, message: "Remote logout failed." },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

const KEYCLOAK_ISSUER = process.env.AUTH_KEYCLOAK_ISSUER;

const KEYCLOAK_CLIENT_ID = process.env.AUTH_KEYCLOAK_ID;

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json({
        success: true,
        keycloakLogoutUrl: null,
      });
    }

    const refreshToken =
      typeof token.refreshToken === "string" ? token.refreshToken : undefined;

    const idToken =
      typeof token.idToken === "string" ? token.idToken : undefined;

    // Logout from Spring Boot
    if (refreshToken && BACKEND_API_URL) {
      try {
        await fetch(`${BACKEND_API_URL}/api/v1/auth/logout`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            refreshToken,
          }),

          cache: "no-store",
        });
      } catch (error) {
        console.error("Backend logout failed:", error);
      }
    }

    // Keycloak logout
    let keycloakLogoutUrl: string | null = null;

    if (KEYCLOAK_ISSUER && KEYCLOAK_CLIENT_ID && idToken) {
      const logoutUrl = new URL(
        `${KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
      );

      logoutUrl.searchParams.set("client_id", KEYCLOAK_CLIENT_ID);

      logoutUrl.searchParams.set("id_token_hint", idToken);

      logoutUrl.searchParams.set(
        "post_logout_redirect_uri",
        `${request.nextUrl.origin}/`,
      );

      keycloakLogoutUrl = logoutUrl.toString();
    }

    return NextResponse.json({
      success: true,
      keycloakLogoutUrl,
    });
  } catch (error) {
    console.error("Logout route failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
      },
      {
        status: 500,
      },
    );
  }
}

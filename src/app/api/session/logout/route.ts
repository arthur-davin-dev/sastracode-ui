// import { getToken } from "next-auth/jwt";
// import { NextRequest } from "next/server";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// export async function POST(request: NextRequest) {
//   const backendBaseUrl = (process.env.BACKEND_API_URL ?? process.env.BACKEND_URL)?.replace(
//     /\/$/,
//     "",
//   );

//   if (!backendBaseUrl) {
//     return Response.json(
//       { success: false, message: "Backend API configuration is missing." },
//       { status: 500 },
//     );
//   }

//   try {
//     const token = await getToken({
//       req: request,
//       secret: process.env.AUTH_SECRET,
//     });

//     const refreshToken =
//       typeof token?.refreshToken === "string" ? token.refreshToken : undefined;

//     // Local Auth.js sign-out still happens in the browser even when no refresh
//     // token exists. This endpoint is for invalidating the backend/Keycloak
//     // refresh token when it is available.
//     if (!refreshToken) {
//       return Response.json({ success: true, message: "No refresh token to revoke." });
//     }

//     const response = await fetch(`${backendBaseUrl}/api/v1/auth/logout`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({ refreshToken }),
//       cache: "no-store",
//     });

//     const text = await response.text();
//     if (!response.ok) {
//       return Response.json(
//         {
//           success: false,
//           message: text || "Backend logout failed.",
//         },
//         { status: response.status },
//       );
//     }

//     return new Response(text || JSON.stringify({ success: true }), {
//       status: response.status,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Logout API error:", error);
//     return Response.json(
//       { success: false, message: "Logout request failed." },
//       { status: 500 },
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://32.236.78.160:9999";

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No authenticated session",
        },
        {
          status: 401,
        },
      );
    }

    const refreshToken =
      typeof token.refreshToken === "string" ? token.refreshToken : undefined;

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Refresh token not found",
        },
        {
          status: 400,
        },
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
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

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Backend logout failed:", response.status, data);

      return NextResponse.json(
        {
          success: false,
          message: data?.message ?? "Backend logout failed",
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Session logout route failed:", error);

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

// import { getToken } from "next-auth/jwt";
// import { NextRequest } from "next/server";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// function getBackendBaseUrl() {
//   const base = process.env.BACKEND_API_URL ?? process.env.BACKEND_URL;

//   return base?.replace(/\/$/, "") ?? null;
// }

// function getKeycloakIssuer() {
//   const issuer =
//     process.env.AUTH_KEYCLOAK_ISSUER ??
//     process.env.KEYCLOAK_ISSUER ??
//     process.env.ISSUER_URI;

//   return issuer?.replace(/\/$/, "") ?? null;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const backendBaseUrl = getBackendBaseUrl();

//     if (!backendBaseUrl) {
//       return Response.json(
//         {
//           success: false,
//           message: "Backend API configuration is missing.",
//         },
//         {
//           status: 500,
//         },
//       );
//     }

//     const token = await getToken({
//       req: request,
//       secret: process.env.AUTH_SECRET,
//     });

//     if (!token) {
//       return Response.json(
//         {
//           success: true,
//           message: "Already logged out.",
//         },
//         {
//           status: 200,
//         },
//       );
//     }

//     const accessToken =
//       typeof token.accessToken === "string" ? token.accessToken : undefined;

//     const refreshToken =
//       typeof token.refreshToken === "string" ? token.refreshToken : undefined;

//     const idToken =
//       typeof token.idToken === "string" ? token.idToken : undefined;

//     console.log("[Logout Debug]", {
//       hasAccessToken: Boolean(accessToken),
//       hasRefreshToken: Boolean(refreshToken),
//       hasIdToken: Boolean(idToken),
//     });

//     if (!refreshToken) {
//       return Response.json(
//         {
//           success: false,
//           message: "Refresh token is missing.",
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     // ==============================
//     // 1. Logout from backend
//     // ==============================
//     const backendResponse = await fetch(
//       `${backendBaseUrl}/api/v1/auth/logout`,
//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",

//           Accept: "application/json",

//           ...(accessToken
//             ? {
//                 Authorization: `Bearer ${accessToken}`,
//               }
//             : {}),
//         },

//         body: JSON.stringify({
//           refreshToken,
//         }),

//         cache: "no-store",
//       },
//     );

//     const responseText = await backendResponse.text();

//     let backendBody: any = null;

//     if (responseText) {
//       try {
//         backendBody = JSON.parse(responseText);
//       } catch {
//         backendBody = {
//           message: responseText,
//         };
//       }
//     }

//     console.log("[Logout Backend Response]", {
//       status: backendResponse.status,
//       body: backendBody,
//     });

//     if (!backendResponse.ok) {
//       return Response.json(
//         {
//           success: false,

//           message:
//             backendBody?.message ??
//             `Backend logout failed with status ${backendResponse.status}`,
//         },
//         {
//           status: backendResponse.status,
//         },
//       );
//     }

//     // ==============================
//     // 2. Build Keycloak logout URL
//     // ==============================
//     const issuer = getKeycloakIssuer();

//     const clientId =
//       process.env.AUTH_KEYCLOAK_ID ?? process.env.KEYCLOAK_CLIENT_ID;

//     let keycloakLogoutUrl: string | null = null;

//     if (issuer) {
//       const logoutUrl = new URL(`${issuer}/protocol/openid-connect/logout`);

//       if (idToken) {
//         logoutUrl.searchParams.set("id_token_hint", idToken);
//       }

//       if (clientId) {
//         logoutUrl.searchParams.set("client_id", clientId);
//       }

//       const postLogoutRedirectUri = new URL(
//         "/",
//         request.nextUrl.origin,
//       ).toString();

//       logoutUrl.searchParams.set(
//         "post_logout_redirect_uri",
//         postLogoutRedirectUri,
//       );

//       keycloakLogoutUrl = logoutUrl.toString();
//     }

//     return Response.json(
//       {
//         success: true,
//         message: "Logout successful.",
//         keycloakLogoutUrl,
//       },
//       {
//         status: 200,
//       },
//     );
//   } catch (error) {
//     console.error("[Logout] Unexpected error:", error);

//     return Response.json(
//       {
//         success: false,
//         message:
//           error instanceof Error ? error.message : "Logout request failed.",
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }

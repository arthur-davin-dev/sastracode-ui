// import NextAuth from "next-auth";
// import Keycloak from "next-auth/providers/keycloak";

// import type { JWT } from "next-auth/jwt";

// interface RefreshTokenResponse {
//   access_token: string;
//   expires_in: number;

//   refresh_token?: string;
//   refresh_expires_in?: number;

//   token_type?: string;
//   id_token?: string;
//   scope?: string;
// }

// async function refreshAccessToken(token: JWT): Promise<JWT> {
//   try {
//     const issuer = process.env.AUTH_KEYCLOAK_ISSUER;

//     const clientId = process.env.AUTH_KEYCLOAK_ID;

//     const clientSecret = process.env.AUTH_KEYCLOAK_SECRET;

//     if (!issuer || !clientId || !clientSecret || !token.refreshToken) {
//       return {
//         ...token,
//         error: "RefreshAccessTokenError",
//       };
//     }

//     const response = await fetch(`${issuer}/protocol/openid-connect/token`, {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },

//       body: new URLSearchParams({
//         grant_type: "refresh_token",

//         client_id: clientId,

//         client_secret: clientSecret,

//         refresh_token: token.refreshToken,
//       }),
//     });

//     const refreshedTokens = (await response.json()) as RefreshTokenResponse;

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,

//       accessToken: refreshedTokens.access_token,

//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,

//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,

//       idToken: refreshedTokens.id_token ?? token.idToken,

//       error: undefined,
//     };
//   } catch (error) {
//     console.error("Failed to refresh Keycloak token:", error);

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     Keycloak({
//       clientId: process.env.AUTH_KEYCLOAK_ID!,

//       clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,

//       issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
//     }),
//   ],

//   secret: process.env.AUTH_SECRET,

//   trustHost: true,

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, account, profile }) {
//       // First login
//       if (account) {
//         token.accessToken = account.access_token;

//         token.refreshToken = account.refresh_token;

//         token.idToken = account.id_token;

//         token.accessTokenExpires = account.expires_at
//           ? account.expires_at * 1000
//           : Date.now() + 5 * 60 * 1000;
//       }

//       // Keycloak user data
//       if (profile) {
//         const keycloakProfile = profile as {
//           name?: string;
//           preferred_username?: string;
//           email?: string;
//         };

//         token.name =
//           keycloakProfile.name ??
//           keycloakProfile.preferred_username ??
//           token.name;

//         token.email = keycloakProfile.email ?? token.email;
//       }

//       // Newly logged in
//       if (account) {
//         return token;
//       }

//       // Access token still valid
//       if (
//         token.accessTokenExpires &&
//         Date.now() < token.accessTokenExpires - 30_000
//       ) {
//         return token;
//       }

//       // Refresh token
//       return refreshAccessToken(token);
//     },

//     async session({ session, token }) {
//       session.accessToken =
//         typeof token.accessToken === "string" ? token.accessToken : undefined;

//       session.error = token.error;

//       if (session.user) {
//         session.user.name =
//           typeof token.name === "string" ? token.name : "User";

//         session.user.email = typeof token.email === "string" ? token.email : "";
//       }

//       return session;
//     },
//   },
// });

import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

import type { JWT } from "next-auth/jwt";

interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  refresh_expires_in?: number;
  token_type?: string;
  id_token?: string;
  scope?: string;
}

const keycloakIssuer = process.env.AUTH_KEYCLOAK_ISSUER!;

// The `jwt` callback below runs independently on every request that touches
// the session (proxy reads are cheap and don't trigger it, but each
// `auth()`/`/api/auth/session` call does). When the access token is near
// expiry, several requests can land at once — e.g. multiple components
// calling `useSession()`, `refetchOnWindowFocus` firing while a background
// request is still in flight, or several open tabs for the same user — and
// each would otherwise fire its own refresh_token grant concurrently.
// Keycloak rotates (and by default single-uses) refresh tokens, so the
// losing request(s) get back `invalid_grant`, which this file turns into
// `RefreshAccessTokenError` — that error forces a full sign-out in
// `AuthProvider` and a bounce through Keycloak in `proxy.ts`, which is what
// shows up as random logouts / redirect loops. Dedupe by refresh token so
// concurrent callers share a single in-flight request instead of racing.
const inFlightRefreshes = new Map<string, Promise<JWT>>();

async function refreshAccessToken(token: JWT): Promise<JWT> {
  const refreshToken =
    typeof token.refreshToken === "string" ? token.refreshToken : undefined;

  if (!refreshToken) {
    return performTokenRefresh(token);
  }

  const existing = inFlightRefreshes.get(refreshToken);
  if (existing) {
    return existing;
  }

  const promise = performTokenRefresh(token).finally(() => {
    inFlightRefreshes.delete(refreshToken);
  });

  inFlightRefreshes.set(refreshToken, promise);
  return promise;
}

async function performTokenRefresh(token: JWT): Promise<JWT> {
  try {
    const issuer = process.env.AUTH_KEYCLOAK_ISSUER;

    const clientId = process.env.AUTH_KEYCLOAK_ID;

    const clientSecret = process.env.AUTH_KEYCLOAK_SECRET;

    if (!issuer || !clientId || !clientSecret || !token.refreshToken) {
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }

    const response = await fetch(`${issuer}/protocol/openid-connect/token`, {
      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: token.refreshToken,
      }),

      cache: "no-store",
    });

    const refreshedTokens = (await response.json()) as RefreshTokenResponse;

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,

      accessToken: refreshedTokens.access_token,

      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,

      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,

      idToken: refreshedTokens.id_token ?? token.idToken,

      error: undefined,
    };
  } catch (error) {
    console.error("Failed to refresh Keycloak token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID!,

      clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,

      issuer: keycloakIssuer,

      authorization: {
        url: `${keycloakIssuer}/protocol/openid-connect/auth`,
        params: { scope: "openid profile email" },
      },

      token: `${keycloakIssuer}/protocol/openid-connect/token`,

      userinfo: `${keycloakIssuer}/protocol/openid-connect/userinfo`,
    }),
  ],

  secret: process.env.AUTH_SECRET,

  trustHost: true,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;

        token.refreshToken = account.refresh_token;

        token.idToken = account.id_token;

        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 5 * 60 * 1000;
      }

      if (profile) {
        const keycloakProfile = profile as {
          name?: string;
          preferred_username?: string;
          email?: string;
          email_verified?: boolean;
        };

        token.name =
          keycloakProfile.name ??
          keycloakProfile.preferred_username ??
          token.name;

        token.email = keycloakProfile.email ?? token.email;

        // Standard OIDC claim (returned with the `email` scope). Keycloak only
        // completes the login once its "Verify Email" required action is done,
        // so this is normally `true` here — the flag is defense in depth for
        // the route guard when that realm setting is off.
        if (typeof keycloakProfile.email_verified === "boolean") {
          token.emailVerified = keycloakProfile.email_verified;
        }
      }

      if (account) {
        return token;
      }

      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires - 30_000
      ) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined;

      session.error = token.error;

      session.emailVerified =
        typeof token.emailVerified === "boolean"
          ? token.emailVerified
          : undefined;

      if (session.user) {
        session.user.name =
          typeof token.name === "string" ? token.name : "User";

        session.user.email = typeof token.email === "string" ? token.email : "";
      }

      return session;
    },
  },
});

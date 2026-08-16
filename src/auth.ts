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

async function refreshAccessToken(token: JWT): Promise<JWT> {
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
        };

        token.name =
          keycloakProfile.name ??
          keycloakProfile.preferred_username ??
          token.name;

        token.email = keycloakProfile.email ?? token.email;
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

      if (session.user) {
        session.user.name =
          typeof token.name === "string" ? token.name : "User";

        session.user.email = typeof token.email === "string" ? token.email : "";
      }

      return session;
    },
  },
});

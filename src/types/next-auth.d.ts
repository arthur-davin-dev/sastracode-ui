// import "next-auth";
// import "next-auth/jwt";

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//     error?: "RefreshAccessTokenError";
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//     refreshToken?: string;
//     idToken?: string;
//     accessTokenExpires?: number;
//     error?: "RefreshAccessTokenError";
//   }
// }

// export {};

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;

    error?: "RefreshAccessTokenError";

    /**
     * OIDC `email_verified` claim from Keycloak, carried through the JWT.
     * `undefined` when unknown (e.g. a session issued before this field
     * existed). Only an explicit `false` should gate access.
     *
     * Lives on the session root rather than `session.user` because the
     * built-in `User.emailVerified` is typed `Date | null` and would clash.
     */
    emailVerified?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;

    refreshToken?: string;

    idToken?: string;

    accessTokenExpires?: number;

    emailVerified?: boolean;

    error?: "RefreshAccessTokenError";
  }
}

export {};

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
<<<<<<< HEAD
=======
    idToken?: string;
>>>>>>> origin/kongkea-new
    accessTokenExpires?: number;
    error?: "RefreshAccessTokenError";
  }
}
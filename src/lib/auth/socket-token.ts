import { getSession } from "next-auth/react";

/**
 * Returns a currently-valid Keycloak access token for authenticating a STOMP
 * CONNECT frame, or `null` when the user is not authenticated or the refresh
 * failed.
 *
 * `getSession()` calls the NextAuth session endpoint, which runs the `jwt`
 * callback in `auth.ts`. That callback silently refreshes the access token via
 * the Keycloak `refresh_token` grant when it is within 30s of expiry — it never
 * forces an interactive login. On a hard refresh failure the session carries
 * `error: "RefreshAccessTokenError"` and `<AuthProvider>` signs the user out.
 *
 * Call this from a STOMP client's `beforeConnect` hook so every connection
 * attempt — including automatic reconnects — uses the latest token instead of
 * the one captured when the client was created.
 */
export async function getSocketAccessToken(): Promise<string | null> {
  try {
    const session = await getSession();
    if (!session || session.error === "RefreshAccessTokenError") return null;
    return session.accessToken ?? null;
  } catch {
    return null;
  }
}

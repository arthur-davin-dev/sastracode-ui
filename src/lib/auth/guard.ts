import { redirect } from "next/navigation";

import { auth } from "@/auth";
import type { Session } from "next-auth";

/**
 * Server-side gate for a protected page or layout. Mirrors `src/proxy.ts` so the
 * two never disagree, and gives Server Components a typed, non-null `Session`.
 *
 * Usage in a Server Component:
 *
 *   const session = await requireVerifiedUser(`/achivement/${badgeId}`);
 *   // session.user is guaranteed here
 *
 * `callbackPath` must be an app-relative path (starts with `/`). The user lands
 * back on it after completing Keycloak login.
 */
export async function requireVerifiedUser(
  callbackPath: string,
): Promise<Session> {
  const session = await auth();

  if (!session?.user || session.error === "RefreshAccessTokenError") {
    const safe =
      callbackPath.startsWith("/") && !callbackPath.startsWith("//")
        ? callbackPath
        : "/";
    redirect(
      `/api/auth/login/keycloak?callbackUrl=${encodeURIComponent(safe)}`,
    );
  }

  if (session.emailVerified === false) {
    // Keycloak owns the "verify your email" screen; send the user back there.
    redirect("/api/auth/login/keycloak");
  }

  return session;
}

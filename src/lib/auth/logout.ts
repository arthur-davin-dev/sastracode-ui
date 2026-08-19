// "use client";

// import { signOut } from "next-auth/react";

// export async function logoutUser(redirectTo = "/") {
//   try {
//     await fetch("/api/session/logout", {
//       method: "POST",
//       headers: { Accept: "application/json" },
//     });
//   } catch (error) {
//     // Backend token revocation should not trap the user in the UI.
//     console.error("Backend logout failed:", error);
//   } finally {
//     await signOut({ redirectTo });
//   }
// }

"use client";

import { signOut } from "next-auth/react";

interface LogoutResponse {
  success: boolean;
  keycloakLogoutUrl?: string | null;
}

export async function logoutUser(redirectTo = "/") {
  let keycloakLogoutUrl: string | null = null;

  try {
    const response = await fetch("/api/session/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      const data = (await response.json()) as LogoutResponse;

      keycloakLogoutUrl = data.keycloakLogoutUrl ?? null;
    }
  } catch (error) {
    console.error("Logout request failed:", error);
  }

  await signOut({
    redirect: false,
  });

  if (keycloakLogoutUrl) {
    window.location.href = keycloakLogoutUrl;

    return;
  }

  window.location.href = redirectTo;
}

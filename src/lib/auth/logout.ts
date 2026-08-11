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

export async function logoutUser(redirectTo = "/") {
  try {
    const response = await fetch("/api/session/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      console.error("Backend logout failed:", errorData);
    }
  } catch (error) {
    console.error("Backend logout request failed:", error);
  } finally {
    await signOut({
      redirectTo,
    });
  }
}

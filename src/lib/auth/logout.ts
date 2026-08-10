"use client";

import { signOut } from "next-auth/react";

export async function logoutUser(redirectTo = "/") {
  try {
    await fetch("/api/session/logout", {
      method: "POST",
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    // Backend token revocation should not trap the user in the UI.
    console.error("Backend logout failed:", error);
  } finally {
    await signOut({ redirectTo });
  }
}


// "use client";

// import { signOut } from "next-auth/react";

// export async function logoutUser(
//   redirectTo = "/",
// ) {
//   try {
//     const response = await fetch(
//       "/api/session/logout",
//       {
//         method: "POST",

//         headers: {
//           Accept:
//             "application/json",
//         },

//         cache: "no-store",
//       },
//     );

//     const data =
//       await response
//         .json()
//         .catch(() => null);

//     if (!response.ok) {
//       console.error(
//         "Backend logout failed:",
//         data,
//       );

//       throw new Error(
//         data?.message ??
//           "Logout failed.",
//       );
//     }

 
//     await signOut({
//       redirect: false,
//     });

  
//     if (
//       data?.keycloakLogoutUrl
//     ) {
//       window.location.href =
//         data.keycloakLogoutUrl;

//       return;
//     }

//     window.location.href =
//       redirectTo;
//   } catch (error) {
//     console.error(
//       "Logout failed:",
//       error,
//     );
//   }
// }
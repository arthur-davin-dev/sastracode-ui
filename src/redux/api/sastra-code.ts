// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface KeycloakLoginResponse {
//   loginUrl: string;
// }

// export const sastraApi = createApi({
//   reducerPath: "sastraApi",

//   baseQuery: fetchBaseQuery({
//     baseUrl: "/api",

//     credentials: "same-origin",

//     prepareHeaders: (headers) => {
//       headers.set("Accept", "application/json");

//       return headers;
//     },
//   }),

//   tagTypes: [
//     "Auth",
//     "User",
//     "Profile",
//     "Dashboard",
//     "Course",
//     "Documentation",
//     "Lesson",
//     "Video",
//     "Quiz",
//     "CodingTask",
//     "Playground",
//     "Bookmark",
//     "Achievement",
//     "Certificate",
//     "Leaderboard",
//     "Notification",
//     "Tutorial",
//   ],

//   endpoints: (builder) => ({
//     initiateKeycloakLogin: builder.mutation<KeycloakLoginResponse, void>({
//       queryFn: async () => {
//         const issuer =
//           process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER ||
//           "http://32.236.78.160:8084/realms/sastra-code-app";
//         const clientId =
//           process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "sastra-code-client";
//         const redirectUri =
//           typeof window !== "undefined"
//             ? window.location.origin
//             : "http://localhost:3000";

//         const params = new URLSearchParams({
//           client_id: clientId,
//           response_type: "code",
//           redirect_uri: redirectUri,
//           scope: "openid profile email",
//         });

//         const loginUrl = `${issuer}/protocol/openid-connect/auth?${params.toString()}`;

//         return { data: { loginUrl } };
//       },
//     }),
//   }),
// });

// export const { useInitiateKeycloakLoginMutation } = sastraApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Browser requests go to a same-origin Next.js Route Handler.
 * The route handler forwards requests to Spring Boot and attaches the
 * Auth.js/Keycloak access token server-side when a user is signed in.
 */
export const sastraApi = createApi({
  reducerPath: "sastraApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/backend",
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "User",
    "Profile",
    "Dashboard",
    "Course",
    "Documentation",
    "Lesson",
    "Video",
    "Question",
    "Answer",
    "Quiz",
    "CodingTask",
    "Playground",
    "Bookmark",
    "Achievement",
    "Certificate",
    "Leaderboard",
    "Notification",
    "Tutorial",
  ],
  endpoints: () => ({}),
});

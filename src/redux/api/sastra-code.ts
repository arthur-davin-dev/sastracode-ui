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

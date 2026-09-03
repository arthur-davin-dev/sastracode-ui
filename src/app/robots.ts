import type { MetadataRoute } from "next";

const siteUrl = "https://www.sastracode.tech";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/profile",
        "/notifications",
        "/leaderboard",
        "/achivement",
        "/achivement/",
        "/certificate",
        "/certificate/",
        "/courses/bookmark",
        "/courses/my-courses",
        "/courses/private-courses",
        "/documentation/bookmark",
        "/playground/console",
        "/playground/editor",
        "/register",
        // Individual verification results carry a student's name. The
        // landing page at /student/certificate/verify stays crawlable;
        // only the dynamic result pages below it are blocked.
        "/student/certificate/verify/",
        "/test",
        "/users",
        "/function",
        "/*/enroll",
        "/*/learn",
        "/quiz/*/results",
        "/quiz/*/review",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

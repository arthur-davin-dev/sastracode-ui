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
        "/verify-email",
        "/users",
        "/features",
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

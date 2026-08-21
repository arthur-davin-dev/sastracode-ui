import type { MetadataRoute } from "next";

const siteUrl = "https://www.sastracode.tech";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/courses", changeFrequency: "weekly", priority: 0.9 },
  { path: "/documentation", changeFrequency: "weekly", priority: 0.8 },
  {
    path: "/documentation/lessons",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  { path: "/playground", changeFrequency: "monthly", priority: 0.6 },
  { path: "/playlists", changeFrequency: "weekly", priority: 0.6 },
  { path: "/quiz", changeFrequency: "weekly", priority: 0.6 },
  { path: "/private-course", changeFrequency: "monthly", priority: 0.5 },
  { path: "/request-access", changeFrequency: "monthly", priority: 0.5 },
  { path: "/register", changeFrequency: "yearly", priority: 0.5 },
  { path: "/legal", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

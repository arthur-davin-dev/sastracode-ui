import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SastraCode — Programming Learning Platform",
    short_name: "SastraCode",
    description:
      "SastraCode (Sastra Code) is a programming learning platform offering interactive courses, coding playgrounds, quizzes, and certifications to help you learn to code.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#002455",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

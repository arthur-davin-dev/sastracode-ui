import type { TutorialSummary } from "@/redux/api/tutorial-api";
import type { Course, TechTag } from "@/types/course";

export function getTechTag(tutorial: TutorialSummary): TechTag {
  const value = `${tutorial.title} ${tutorial.slug}`.toLowerCase();

  if (value.includes("python")) return "Python";
  if (value.includes("javascript") || value.includes("js")) return "JavaScript";
  if (value.includes("java")) return "Java";
  if (value.includes("css")) return "CSS";
  return "HTML";
}

export function toCourse(tutorial: TutorialSummary, ctaLabel = "រៀនឥឡូវ"): Course {
  return {
    id: tutorial.id,
    title: tutorial.title,
    titleKm: tutorial.title,
    description: tutorial.summary || "Open this tutorial to start learning.",
    tag: getTechTag(tutorial),
    href: `/documentation/lessons/${tutorial.id}`,
    coverImage: tutorial.coverFileId
      ? `/api/v1/files/${encodeURIComponent(tutorial.coverFileId)}`
      : "/images/doc-hero.png",
    viewCount: tutorial.viewCount ?? 0,
    ctaLabel,
  };
}

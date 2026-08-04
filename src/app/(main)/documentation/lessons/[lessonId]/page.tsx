// app/documentation/[lessonId]/page.tsx
import { notFound } from "next/navigation";
import { getLessonById } from "@/lib/data/lessions";
import LessonPageClient from "@/components/documentation/LessonPageClient";


export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  // Trigger 404 page if lesson doesn't exist
  if (!lesson) {
    notFound();
  }

  // Pass lesson prop to the client layout component
  return <LessonPageClient lesson={lesson} />;
}
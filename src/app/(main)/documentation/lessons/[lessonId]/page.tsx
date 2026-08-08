import DocumentPageClient from "@/components/documentation/DocumentPageClient";


export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  return <DocumentPageClient tutorialId={lessonId} />;
}

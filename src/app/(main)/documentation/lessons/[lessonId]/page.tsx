import TutorialDetail from "@/components/documentation/TutorialDetail";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  return <TutorialDetail tutorialId={lessonId} />;
}

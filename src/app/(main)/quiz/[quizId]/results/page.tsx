import QuizResults from "@/components/quiz/QuizResults";

export default async function QuizResultsPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  return <QuizResults quizId={quizId} />;
}
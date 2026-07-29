import QuizReview from "@/components/quiz/QuizReview";

export default async function QuizReviewPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  return <QuizReview quizId={quizId} />;
}
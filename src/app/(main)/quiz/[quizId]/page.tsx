import QuizAttempt from "@/components/quiz/QuizAttempt";

export default async function QuizAttemptPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  return <QuizAttempt quizId={quizId} />;
}
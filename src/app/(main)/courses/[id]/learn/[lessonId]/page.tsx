import LessonCourseLoader from "@/components/video/LessonCourseLoader";

interface PageProps {
  params: Promise<{
    // The dynamic segment carries the course SLUG (backend GET /v1/courses/{slug}).
    id: string;
    lessonId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id, lessonId } = await params;

  return <LessonCourseLoader slug={id} lessonId={lessonId} />;
}

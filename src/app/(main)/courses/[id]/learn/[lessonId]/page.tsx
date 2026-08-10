import LessonCourseLoader from "@/components/video/LessonCourseLoader";

interface PageProps {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id, lessonId } = await params;

  return (
    <LessonCourseLoader
      courseId={id}
      lessonId={lessonId}
    />
  );
}
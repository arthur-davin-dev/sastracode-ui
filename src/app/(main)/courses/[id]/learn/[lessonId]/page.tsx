import { notFound } from "next/navigation";
import LessonPlayerPage from "@/components/video/LessonPlayerPage";
import { getCourseById } from "@/lib/course/courses";

interface PageProps {
  params: Promise<{ id: string; lessonId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id, lessonId } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return <LessonPlayerPage course={course} lessonId={lessonId} />;
}
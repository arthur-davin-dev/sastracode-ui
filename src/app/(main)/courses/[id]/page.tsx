import { notFound } from "next/navigation";
import CourseDetailPage from "@/components/courses-detail/CourseDetailPage";
import { getCourseById } from "@/lib/course/courses";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return <CourseDetailPage course={course} />;
}
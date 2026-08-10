import CourseDetailClient from "@/components/courses-detail/CourseDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <CourseDetailClient courseId={id} />;
}

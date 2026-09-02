import CourseDetailPage from "@/components/courses-detail/CourseDetail";

interface PageProps {
  // The dynamic segment carries the course SLUG (backend GET /v1/courses/{slug}).
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <CourseDetailPage slug={id} />;
}

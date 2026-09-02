import EnrollmentCourseLoader from "@/components/enrollment/EnrollmentCourseLoader";

interface PageProps {
  // The dynamic segment carries the course SLUG (backend GET /v1/courses/{slug}).
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <EnrollmentCourseLoader slug={id} />;
}

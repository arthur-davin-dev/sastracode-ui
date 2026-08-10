import EnrollmentCourseLoader from "@/components/enrollment/EnrollmentCourseLoader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <EnrollmentCourseLoader courseId={id} />;
}

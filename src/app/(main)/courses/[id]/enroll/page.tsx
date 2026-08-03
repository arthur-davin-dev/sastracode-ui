import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/course/courses";
import { enrollhistory } from "@/lib/course/enrollhistory";
import EnrollmentPage from "@/components/enrollment/EnrollmentPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return <EnrollmentPage course={course} enrollmentHistory={enrollhistory} />;
}

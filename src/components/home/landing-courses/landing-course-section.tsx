import type { Course } from "@/lib/course/courses";

interface LandingCourseSectionProps {
  title: string;
  description?: string;
  courses: Course[];
}

export default function LandingCourseSection({
  title,
  description,
  courses,
}: LandingCourseSectionProps) {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold md:text-3xl">
            {title}
          </h2>

          {description && (
            <p className="mt-2 text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.slice(0, 8).map((course) => (
            <div
              key={course.id}
              className="rounded-xl border p-4"
            >
              <img
                src={course.image}
                alt={course.title}
                className="aspect-video w-full rounded-lg object-cover"
              />

              <h3 className="mt-3 font-semibold">
                {course.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {course.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
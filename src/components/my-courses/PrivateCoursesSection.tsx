"use client";

import { LockKeyhole } from "lucide-react";
import { useSession } from "next-auth/react";

import { CourseGrid } from "@/components/courses/CourseGrid";
import { mapApiCourseToCourse } from "@/lib/course/course-adapter";
import { useGetMyPrivateCoursesQuery } from "@/redux/api/course-api";

interface PrivateCoursesSectionProps {
  pageMode?: boolean;
}

export default function PrivateCoursesSection({ pageMode = false }: PrivateCoursesSectionProps) {
  const { status } = useSession();
  const { data, isLoading, isFetching, error, refetch } = useGetMyPrivateCoursesQuery(undefined, {
    skip: status !== "authenticated",
  });

  const courses = (data ?? []).map((course) =>
    mapApiCourseToCourse({
      ...course,
      hasFullAccess: course.hasFullAccess ?? true,
    }),
  );

  if (status === "loading" || isLoading) {
    return (
      <section className={pageMode ? "p-6" : "mt-10"}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-72 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />)}
        </div>
      </section>
    );
  }

  if (status !== "authenticated") {
    return (
      <section className={pageMode ? "p-6" : "mt-10"}>
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          <LockKeyhole className="mx-auto h-8 w-8 text-[#002455] dark:text-blue-300" />
          <p className="mt-3 font-semibold text-slate-800 dark:text-slate-200">សូមចូលគណនីដើម្បីមើលវគ្គសិក្សាឯកជនរបស់អ្នក</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={pageMode ? "p-6" : "mt-10"}>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/20">
          <p className="text-sm text-red-700 dark:text-red-300">មិនអាចទាញយកវគ្គសិក្សាឯកជនបាន។</p>
          <button onClick={() => refetch()} className="mt-3 rounded-lg bg-[#002455] px-4 py-2 text-sm font-semibold text-white">ព្យាយាមម្ដងទៀត</button>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${pageMode ? "space-y-6 p-6" : "space-y-5"} ${isFetching ? "opacity-70" : ""}`}
      aria-busy={isFetching}
    >
      <div>
        <div className="flex items-center gap-2">
          <LockKeyhole className="h-6 w-6 text-[#002455] dark:text-blue-300" />
          <h2 className={pageMode ? "text-3xl font-bold text-[#002455] dark:text-white" : "text-2xl font-bold text-[#002455] dark:text-white"}>
            វគ្គសិក្សាឯកជនរបស់ខ្ញុំ
          </h2>
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">បង្ហាញតែវគ្គ PRIVATE ដែល backend បានផ្តល់សិទ្ធិឱ្យគណនីរបស់អ្នក។</p>
      </div>
      <CourseGrid courses={courses} />
    </section>
  );
}

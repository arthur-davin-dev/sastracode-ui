"use client";

import PrivateCoursesSection from "./PrivateCoursesSection";

export default function MyCourses() {
  return (
    <div className="space-y-8 p-4 sm:p-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h1 className="mt-1 text-2xl font-bold text-primary-color dark:text-slate-100 sm:text-4xl">
          វគ្គសិក្សារបស់ខ្ញុំ
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          វគ្គសិក្សា PRIVATE ដែលគណនីរបស់អ្នកមានសិទ្ធិចូលរៀន។
        </p>
      </div>

      <PrivateCoursesSection />
    </div>
  );
}

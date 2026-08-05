"use client";

import { AccessRestrictedCard } from "@/components/private-course/AccessRestrictedCard";

export default function PrivateCoursePage() {
  const handleRequestAccess = () => {
    alert("Request access clicked");
  };

  return (
    <main className="min-h-screen w-full bg-[#f8f6f2] dark:bg-slate-950 flex items-center justify-center p-4 md:p-8 mt-10">
      {/* Laptop / Responsive Container Card */}
      <div className="w-full max-w-3xl dark:bg-slate-900/70 backdrop-blur-md rounded-3xl dark:border-slate-800 shadow-sm overflow-hidden">
        <AccessRestrictedCard onRequestAccess={handleRequestAccess} />
      </div>
    </main>
  );
}
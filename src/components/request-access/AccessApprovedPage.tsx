"use client";
import AccessApprovedCard from "@/components/request-access/AccessApprovedCard";

export default function AccessApprovedPage() {
  const handleStartLearning = () => {
    alert("Starting learning session...");
  };

  return (
    <main className="min-h-screen w-full bg-[#f8f6f2] dark:bg-slate-950 flex items-center justify-center p-4 md:p-8 mt-10">
      {/* Laptop / Responsive Container Box */}
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
        <AccessApprovedCard
          studentEmail="student@istad.edu.kh"
          onStartLearning={handleStartLearning}
        />
      </div>
    </main>
  );
}

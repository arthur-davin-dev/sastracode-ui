import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CourseBanner() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800 bg-indigo-50/70 dark:bg-slate-900/80 py-12 sm:py-16 transition-colors duration-300">
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-14px) rotate(var(--rot, 0deg)); }
        }
        .float-badge {
          animation: floatY 3.2s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 items-center md:grid-cols-[1.15fr_0.85fr]">
          {/* Left Text Column */}
          <div className="space-y-6 md:space-y-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl transition-colors duration-300 leading-tight">
              ចាប់ផ្តើមដំណើរសិក្សាកម្មវិធីរបស់អ្នក
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg transition-colors duration-300">
              អភិវឌ្ឍជំនាញសរសេរកូដរបស់អ្នកជាមួយមេរៀនវីដេអូ ឯកសារសិក្សា
              លំហាត់អនុវត្ត និងប្រព័ន្ធឡូម ដែលរៀបចំឡើងសម្រាប់អ្នកចាប់ផ្តើម
              និងអ្នកចង់ក្លាយជាអ្នកអភិវឌ្ឍន៍កម្មវិធីអាជីព។
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full bg-indigo-800 dark:bg-indigo-600 hover:bg-indigo-900 dark:hover:bg-indigo-500 text-white px-6 transition-all duration-300"
              >
                ចាប់ផ្តើមសិក្សា
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 px-6 transition-colors duration-300"
              >
                ស្វែងរកផែនការសិក្សា
              </Button>
            </div>
          </div>

          {/* Right Illustration with Floating Badges */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl bg-slate-950">
            <Image
              src="/assets/images/bannercourse.png"
              alt="Student learning to code"
              width={900}
              height={600}
              className="relative h-full w-full object-cover opacity-95 dark:opacity-85"
            />

            {/* Floating Badges */}
            <div
              className="float-badge absolute top-[14%] right-[28%] z-10 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg"
              style={{ animationDelay: "0s", ["--rot" as any]: "-4deg" }}
            >
              JS
            </div>

            <div
              className="float-badge absolute top-[30%] right-[10%] z-10 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg"
              style={{ animationDelay: "0.6s", ["--rot" as any]: "3deg" }}
            >
              HTML
            </div>

            <div
              className="float-badge absolute top-[52%] right-[8%] z-10 rounded-xl bg-pink-500 px-4 py-2 text-sm font-bold text-white shadow-lg"
              style={{ animationDelay: "1.2s", ["--rot" as any]: "-2deg" }}
            >
              CSS
            </div>

            <div
              className="float-badge absolute bottom-[18%] left-[10%] z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-lg font-bold text-slate-900 shadow-lg"
              style={{ animationDelay: "0.3s", ["--rot" as any]: "5deg" }}
            >
              {"</>"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
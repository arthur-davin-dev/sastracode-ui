import type { Metadata } from "next";

import { InstructorApplicationView } from "@/components/instructor-application/InstructorApplicationView";
import InteractiveBackground from "@/components/InteractiveBackground";

export const metadata: Metadata = {
  title: "ដាក់ពាក្យធ្វើជាគ្រូបង្រៀន | SastraCode",
};

export default function InstructorApplicationPage() {
  return (
    <main className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <InteractiveBackground speed={1} density={100} enableMouseGlow />
      <div className="relative z-10 mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
        <header>
          <h1 className="text-2xl font-bold text-primary-color dark:text-white">
            ក្លាយជាគ្រូបង្រៀន
          </h1>

          <p className="mt-1 text-lg text-primary-color/2">
            ចែករំលែកចំណេះដឹងរបស់អ្នកជាមួយសហគមន៍ SastraCode ។
          </p>
        </header>

        <InstructorApplicationView />
      </div>
    </main>
  );
}

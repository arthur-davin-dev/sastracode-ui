"use client";

import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

const content = {
  km: {
    title: "សាកល្បងសរសេរកូដ",
    description:
      "ជ្រើសរើសភាសាសរសេរកម្មវិធី ហើយសរសេរកូដដោយផ្ទាល់នៅលើកម្មវិធីរុករក។ សាកល្បង សាកល្បង និងរៀនក្នុងបរិយាកាសដែលផ្តោតលើភាសាខ្មែរ។",
    openPlayground: "បើក Playground ថ្មី",
    learnMore: "ស្វែងយល់បន្ថែម",
  },
  en: {
    title: "Try Coding Playground",
    description:
      "Choose a programming language and code directly in the browser. Build, test, and learn in a high-performance Khmer-focused environment.",
    openPlayground: "Open New Playground",
    learnMore: "Learn More",
  },
};

export default function Hero() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="max-w-5xl mx-auto px-6 pt-24 pb-10">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 p-6 md:p-10 shadow-sm transition-colors duration-300">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300">
                {t.title}
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed transition-colors duration-300">
                {t.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/playground/editor" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="gap-2 w-full sm:w-auto py-6 text-base bg-indigo-800 dark:bg-indigo-600 cursor-pointer hover:bg-indigo-900 dark:hover:bg-indigo-500 text-white transition-all duration-300"
                  >
                    <Rocket className="h-4 w-4" />
                    {t.openPlayground}
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto py-6 text-base border-slate-300 dark:border-slate-700 cursor-pointer text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
                >
                  {t.learnMore}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="bg-slate-950 dark:bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-xl">
            <div className="flex gap-1.5 mb-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <pre className="text-sm font-mono leading-relaxed overflow-x-auto text-slate-200">
              <code>
                <span className="text-purple-400">function</span>{" "}
                <span className="text-blue-400">helloWorld</span>() {"{"}
                {"\n"}  <span className="text-blue-400">console.log</span>(
                <span className="text-emerald-400">"សួស្តីពិភពលោក!"</span>);
                {"\n"}
                {"}"}
                {"\n\n"}
                <span className="text-blue-400">helloWorld</span>();
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
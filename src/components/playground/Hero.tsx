"use client";

import { Button } from "@/components/ui/button";
import { Rocket, Sparkles, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

const content = {
  km: {
    badge: "វេទិកាសិក្សាសរសេរកូដ",
    title: "សាកល្បងសរសេរកូដ",
    description:
      "ជ្រើសរើសភាសាសរសេរកម្មវិធី ហើយសរសេរកូដដោយផ្ទាល់នៅលើកម្មវិធីរុករក។ សាកល្បង និងរៀនក្នុងបរិយាកាសដែលផ្តោតលើភាសាខ្មែរ។",
    openPlayground: "បើក Playground ថ្មី",
  },
  en: {
    badge: "Interactive Coding Platform",
    title: "Try Coding Playground",
    description:
      "Choose a programming language and code directly in your browser. Build, test, and learn in a high-performance Khmer-focused environment.",
    openPlayground: "Open New Playground",
  },
};

export default function Hero() {
  const { lang } = useLanguage();
  const t = content[lang] || content.en;
  const [visibleTitle, setVisibleTitle] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const titleTimer = window.setTimeout(() => setVisibleTitle(t.title), 0);
      return () => window.clearTimeout(titleTimer);
    }

    const characters = Array.from(t.title);
    let index = 0;
    let deleting = false;
    let timer: number | undefined;

    const type = () => {
      index += deleting ? -1 : 1;
      setVisibleTitle(characters.slice(0, index).join(""));

      if (!deleting && index === characters.length) {
        deleting = true;
        timer = window.setTimeout(type, 2800);
        return;
      }

      if (deleting && index === 0) {
        deleting = false;
        timer = window.setTimeout(type, 650);
        return;
      }

      timer = window.setTimeout(type, deleting ? 30 : 60);
    };

    timer = window.setTimeout(type, 300);
    return () => window.clearTimeout(timer);
  }, [t.title]);

  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-12 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Container */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-10 md:p-12 shadow-xl shadow-slate-900/5 transition-colors duration-300">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

        <div className="relative grid md:grid-cols-12 gap-8 md:gap-10 items-center">
          
          {/* Left Side: Content */}
          <div className="md:col-span-7 flex flex-col justify-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/80 dark:bg-indigo-950/50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 backdrop-blur-md mb-5 shadow-sm transition-colors">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
              <span>{t.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 dark:from-white dark:via-slate-100 dark:to-indigo-300 bg-clip-text text-transparent">
                {visibleTitle}
                <span aria-hidden="true" className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-current align-[-0.06em]" />
              </span>
            </h1>

            {/* Description set to 18px */}
            <p className="text-[18px] text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-normal transition-colors">
              {t.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/playground/editor" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group relative w-full sm:w-auto h-12 px-7 rounded-xl text-base font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Rocket className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span>{t.openPlayground}</span>
                  <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Adaptive Code Block */}
          <div className="md:col-span-5 w-full">
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-950/95 shadow-xl transition-colors duration-300 overflow-hidden backdrop-blur-md">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-100/80 dark:bg-slate-900/90 px-4 py-3 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/90 inline-block shadow-sm" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/90 inline-block shadow-sm" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/90 inline-block shadow-sm" />
                </div>
                
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <Terminal className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>main.js</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 font-semibold transition-colors">
                    JavaScript
                  </span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="hover:bg-slate-200/40 dark:hover:bg-slate-900/50 rounded transition-colors">
                      <td className="select-none pr-4 text-right text-slate-400 dark:text-slate-600 text-xs w-6">1</td>
                      <td>
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">function</span>{" "}
                        <span className="text-blue-600 dark:text-blue-400">helloWorld</span>() {"{"}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-200/40 dark:hover:bg-slate-900/50 rounded transition-colors">
                      <td className="select-none pr-4 text-right text-slate-400 dark:text-slate-600 text-xs w-6">2</td>
                      <td className="pl-4">
                        <span className="text-amber-700 dark:text-amber-300">console</span>.
                        <span className="text-blue-600 dark:text-blue-400">log</span>(
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <span className="text-emerald-700 dark:text-emerald-400">"សួស្តីពិភពលោក!"</span>);
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-200/40 dark:hover:bg-slate-900/50 rounded transition-colors">
                      <td className="select-none pr-4 text-right text-slate-400 dark:text-slate-600 text-xs w-6">3</td>
                      <td className="text-slate-800 dark:text-slate-200">{"}"}</td>
                    </tr>
                    <tr className="hover:bg-slate-200/40 dark:hover:bg-slate-900/50 rounded transition-colors">
                      <td className="select-none pr-4 text-right text-slate-400 dark:text-slate-600 text-xs w-6">4</td>
                      <td></td>
                    </tr>
                    <tr className="hover:bg-slate-200/40 dark:hover:bg-slate-900/50 rounded transition-colors">
                      <td className="select-none pr-4 text-right text-slate-400 dark:text-slate-600 text-xs w-6">5</td>
                      <td>
                        <span className="text-blue-600 dark:text-blue-400">helloWorld</span>();
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer Bar */}
              <div className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-mono transition-colors">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Ready to run
                </span>
                <span>UTF-8</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

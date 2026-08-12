"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code2,
  Compass,
  Home,
  BookOpen,
  Briefcase,
  Users2,
  Plus,
  Circle,
  Sparkle,
  Sun,
  Moon,
} from "lucide-react";

export default function NotFound() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    queueMicrotask(() => setIsDark(prefersDark));
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-b from-[#f4f6fb] to-[#e8ecf5] dark:from-[#02081a] dark:to-[color:var(--primary-color)] flex items-center justify-center px-4 py-4 transition-colors">
      <div className="w-full max-w-6xl h-full max-h-[900px] bg-white/70 dark:bg-white/5 rounded-3xl border border-white dark:border-white/10 shadow-sm px-6 py-6 sm:px-10 sm:py-8 relative overflow-hidden flex flex-col backdrop-blur">
        {/* theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center text-[color:var(--primary-color)] dark:text-white hover:opacity-80 transition"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* decorative dots */}
        <Circle className="hidden lg:block absolute top-10 left-1/2 w-3 h-3 text-[color:var(--secondary-color)]/40" strokeWidth={3} />
        <Plus className="hidden lg:block absolute top-14 right-24 w-5 h-5 text-[color:var(--primary-color)]/40 dark:text-white/30" strokeWidth={3} />
        <Circle className="hidden lg:block absolute bottom-16 right-10 w-4 h-4 text-[color:var(--primary-color)]/30 dark:text-white/20" strokeWidth={3} />
        <Sparkle className="hidden lg:block absolute bottom-24 left-16 w-5 h-5 text-[color:var(--secondary-color)]/40" />

        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
          {/* Left: text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-[color:var(--primary-color)] to-[color:var(--secondary-color)] bg-clip-text text-transparent leading-none">
              404
            </h1>
            <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-bold text-[color:var(--primary-color)] dark:text-white">
              រកមិនឃើញទំព័រនេះទេ
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
              សូមអភ័យទោស! ទំព័រដែលអ្នកកំពុងស្វែងរក មិនមានទៅទីនេះទេ
              អាចបណ្តាលមកពីតំណភ្ជាប់ខុស ឬ ទំព័រត្រូវបានលុប។
            </p>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[color:var(--primary-color)] text-white text-sm font-medium shadow-md hover:opacity-90 transition"
              >
                <Home className="w-4 h-4" />
                ត្រឡប់ទៅទំព័រដើម
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-white/10 text-[color:var(--secondary-color)] dark:text-white text-sm font-medium border border-[color:var(--secondary-color)]/30 dark:border-white/20 shadow-sm hover:bg-red-50 dark:hover:bg-white/20 transition"
              >
                <Compass className="w-4 h-4" />
                មើលមេរៀន
              </Link>
            </div>
          </div>

          {/* Right: mascot illustration */}
          <div className="relative flex justify-center h-full items-center min-h-0">
            {/* speech bubble */}
            <div className="absolute top-1 right-2 sm:right-6 bg-[color:var(--primary-color)] text-white text-[10px] sm:text-xs rounded-xl px-3 py-1.5 shadow-lg z-10">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="w-1 h-1 rounded-full bg-[color:var(--secondary-color)]" />
                <span className="w-1 h-1 rounded-full bg-yellow-400" />
                <span className="w-1 h-1 rounded-full bg-green-400" />
              </div>
              រកមិនឃើញទំព័រ :(
            </div>

            {/* floating icon chips */}
            <div className="hidden sm:flex absolute left-0 top-1/3 w-10 h-10 rounded-xl bg-white dark:bg-white/10 shadow-lg border border-slate-100 dark:border-white/10 items-center justify-center z-10">
              <Code2 className="w-4 h-4 text-[color:var(--primary-color)] dark:text-white" />
            </div>
            <div className="hidden sm:block absolute right-2 bottom-4 w-20 h-14 rounded-lg bg-white dark:bg-white/10 shadow-lg border border-slate-100 dark:border-white/10 p-2 z-10">
              <div className="flex gap-1 mb-1">
                <span className="w-1 h-1 rounded-full bg-[color:var(--secondary-color)]" />
                <span className="w-1 h-1 rounded-full bg-[color:var(--secondary-color)]/60" />
                <span className="w-1 h-1 rounded-full bg-[color:var(--secondary-color)]/30" />
              </div>
              <div className="space-y-1">
                <div className="h-1 bg-slate-200 dark:bg-white/20 rounded-full w-full" />
                <div className="h-1 bg-slate-200 dark:bg-white/20 rounded-full w-3/4" />
              </div>
            </div>

            <div className="relative w-full h-full max-h-[280px] sm:max-h-[320px]">
              <Image
                src="/ai-not-found.png"
                alt="Robot looking confused because the page was not found"
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Feature strip */}
        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10 shrink-0">
          <p className="hidden sm:block text-center lg:text-left text-xs font-semibold text-[color:var(--primary-color)] dark:text-white mb-3">
            អ្វីដែលអ្នកអាចធ្វើបាន
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <FeatureItem
              icon={<BookOpen className="w-4 h-4" />}
              title="រកមេរៀនថ្មីៗ"
              subtitle="សិក្សាមេរៀនថ្មីៗ"
            />
            <FeatureItem
              icon={<Code2 className="w-4 h-4" />}
              title="អត្ថបទថ្មីៗ"
              subtitle="បច្ចេកទេសថ្មី"
            />
            <FeatureItem
              icon={<Briefcase className="w-4 h-4" />}
              title="គម្រោងកូដ"
              subtitle="រៀនតាមគម្រោង"
            />
            <FeatureItem
              icon={<Users2 className="w-4 h-4" />}
              title="សហគមន៍"
              subtitle="ចែករំលែក"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full flex items-center justify-center text-white bg-[color:var(--primary-color)]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm font-semibold text-[color:var(--primary-color)] dark:text-white truncate">
          {title}
        </p>
        <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 truncate">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

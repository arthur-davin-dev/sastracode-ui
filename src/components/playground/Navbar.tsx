"use client";

import { SunMedium, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [lang, setLang] = useState<"km" | "en">("km");
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    km: {
      navItems: ["មេរៀន", "វគ្គសិក្សា", "បញ្ជីវីដេអូ", "អំពីសាស្ត្រាកូដ"],
      register: "ចុះឈ្មោះ",
      langName: "ខ្មែរ",
      flagSrc: "https://flagcdn.com/w40/kh.png",
    },
    en: {
      navItems: ["Lessons", "Courses", "Playlists", "About Sastra Code"],
      register: "Register",
      langName: "English",
      flagSrc: "https://flagcdn.com/w40/gb.png",
    },
  };

  const currentT = t[lang];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "km" ? "en" : "km"));
  };

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextDark = !darkMode;

    if (!document.startViewTransition) {
      setDarkMode(nextDark);
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      setDarkMode(nextDark);
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        { clipPath },
        {
          duration: 1000,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <header className="relative w-full border-b border-gray-200/30 bg-white/60 dark:border-slate-800/50 dark:bg-slate-950/60 backdrop-blur-xl shadow-xs transition-colors duration-200 font-khmer">
      <nav className="mx-auto flex h-16 items-center justify-center gap-8 px-4 sm:px-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={lang}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center gap-8 w-full"
          >
            {/* Center: Pill Navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-8 rounded-full border border-[#002455]/20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md px-4 lg:px-8 py-2 lg:py-2.5 text-[#002455] dark:text-[#FFFFFF] shadow-xs dark:border-slate-700/50">
              {currentT.navItems.map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  className="text-[14px] lg:text-[18px] font-semibold whitespace-nowrap transition-colors hover:text-red-500"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-5 shrink-0">
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="rounded-full p-1.5 shrink-0 text-gray-700 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-slate-800/50 transition-colors hover:text-[#DC0000]"
              >
                {darkMode ? (
                  <SunMedium className="cursor-pointer hover:text-[#DC0000]" />
                ) : (
                  <Moon className="cursor-pointer" />
                )}
              </button>

              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1.5 sm:space-x-2 rounded-xl border border-[#002455] px-2.5 sm:px-3 py-1.5 sm:py-2 text-[14px] lg:text-[16px] font-medium text-[#002455] hover:text-[#DC0000] dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800/50 transition-colors cursor-pointer shrink-0 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xs"
              >
                <img
                  src={currentT.flagSrc}
                  alt="Flag"
                  className="h-3.5 w-5 sm:h-4 sm:w-6 rounded-xs object-cover shrink-0"
                />
                <span className="whitespace-nowrap">{currentT.langName}</span>
              </button>

              <Link
                href="#"
                className="hidden md:inline-block text-[14px] lg:text-[18px] font-semibold text-[#DC0000] whitespace-nowrap transition-colors hover:text-red-600 shrink-0"
              >
                {currentT.register}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Navigation Menu"
                className="md:hidden rounded-lg p-2 shrink-0 text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200/30 bg-white/70 dark:border-slate-800/50 dark:bg-slate-950/70 backdrop-blur-xl px-6 py-4 transition-all">
          <div className="flex flex-col space-y-3">
            {currentT.navItems.map((item, index) => (
              <Link
                key={index}
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-[18px] font-semibold text-[#002455] dark:text-[#FFFFFF] transition-colors hover:text-red-500 py-1"
              >
                {item}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100/50 dark:border-slate-800/50">
              <Link
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-[18px] font-semibold text-[#DC0000] whitespace-nowrap transition-colors hover:text-red-600"
              >
                {currentT.register}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

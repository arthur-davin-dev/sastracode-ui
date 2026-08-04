"use client";

import {
  Moon,
  Menu,
  SunMedium,
  X,
} from "lucide-react";
import {
  useEffect,
  useState,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();

  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    km: {
      navItems: [
        { label: "មេរៀន", href: "/documentation" },
        { label: "វគ្គសិក្សា", href: "/courses" },
        { label: "កន្លែងសាកល្បងកូដ", href: "/playground" },
        { label: "សំណួរតេស្ត", href: "/quiz" },
        { label: "មុខងារ", href: "/function" },
        { label: "អំពីសាស្ត្រាកូដ", href: "/about-us" },
      ],
      register: "ចុះឈ្មោះ",
      langName: "ខ្មែរ",
      flagSrc: "https://flagcdn.com/w40/kh.png",
    },

    en: {
      navItems: [
        { label: "Lessons", href: "/documentation" },
        { label: "Courses", href: "/courses" },
        { label: "Playground", href: "/playground" },
        { label: "Quiz", href: "/quiz" },
        {label: "Function", href: "/function" },
        { label: "About Sastra Code", href: "/about-us" },

        // Quiz
      ],
      register: "Register",
      langName: "English",
      flagSrc: "https://flagcdn.com/w40/gb.png",
    },
  };

  const currentT = t[lang];

  const isPathActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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
    setLang((previousLanguage) =>
      previousLanguage === "km" ? "en" : "km",
    );
  };

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const nextDarkMode = !darkMode;

    const applyTheme = () => {
      setDarkMode(nextDarkMode);

      if (nextDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    if (!document.startViewTransition) {
      applyTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(applyTheme);

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1000,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/30 bg-white/60 font-khmer shadow-xs backdrop-blur-xl transition-colors duration-200 dark:border-slate-800/50 dark:bg-slate-950/60">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <Link href="/">
            <img
              src="/images/sastra_code_logo.png"
              alt="Sastra Code logo"
              className="h-auto w-16 shrink-0 sm:w-20"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden min-w-0 flex-1 justify-center overflow-x-auto md:flex no-scrollbar">
          <div className="flex w-full items-center justify-center gap-2 rounded-full border border-[#002455]/20 bg-white/40 px-5 py-2 text-[#002455] shadow-xs backdrop-blur-md md:w-140 lg:w-180 lg:gap-5 lg:px-10 lg:py-2.5 dark:border-slate-700/50 dark:bg-slate-900/40 dark:text-white">
            {currentT.navItems.map((item) => {
              const isActive = isPathActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap text-[14px] transition-colors lg:text-[18px] ${
                    isActive
                      ? "font-extrabold text-[#DC0000] dark:text-[#DC0000]"
                      : "font-semibold text-[#002455] hover:text-[#DC0000] dark:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex shrink-0 items-center space-x-2 md:space-x-3 lg:space-x-5">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="shrink-0 rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100/50 hover:text-[#DC0000] dark:text-gray-300 dark:hover:bg-slate-800/50"
          >
            {darkMode ? (
              <SunMedium className="cursor-pointer hover:text-[#DC0000]" />
            ) : (
              <Moon className="cursor-pointer" />
            )}
          </button>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex shrink-0 cursor-pointer items-center space-x-1.5 rounded-full border border-[#002455] bg-white/30 px-2.5 py-1.5 text-[14px] font-medium text-[#002455] backdrop-blur-xs transition-colors hover:text-[#DC0000] sm:space-x-2 sm:px-3 sm:py-2 lg:text-[16px] dark:border-slate-700 dark:bg-slate-900/30 dark:text-gray-200 dark:hover:bg-slate-800/50"
          >
            <img
              src={currentT.flagSrc}
              alt={`${currentT.langName} flag`}
              className="h-3.5 w-5 shrink-0 rounded-xs object-cover sm:h-4 sm:w-6"
            />

            <span className="whitespace-nowrap">
              {currentT.langName}
            </span>
          </button>

          {/* Register Link */}
          <Link
            href="/register"
            className={`hidden shrink-0 whitespace-nowrap text-[14px] transition-colors md:inline-block lg:text-[18px] ${
              pathname === "/register"
                ? "font-extrabold text-[#DC0000]"
                : "font-semibold text-[#DC0000] hover:text-red-600"
            }`}
          >
            {currentT.register}
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="shrink-0 rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100/50 focus:outline-none md:hidden dark:text-gray-200 dark:hover:bg-slate-800/50"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-200/30 bg-white/70 px-6 py-4 backdrop-blur-xl transition-all md:hidden dark:border-slate-800/50 dark:bg-slate-950/70">
          <div className="flex flex-col space-y-3">
            {currentT.navItems.map((item) => {
              const isActive = isPathActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-1 text-[18px] transition-colors ${
                    isActive
                      ? "font-extrabold text-[#DC0000] dark:text-[#DC0000]"
                      : "font-semibold text-[#002455] hover:text-[#DC0000] dark:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Register Link */}
            <div className="border-t border-gray-100/50 pt-2 dark:border-slate-800/50">
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className={`whitespace-nowrap text-[18px] transition-colors ${
                  pathname === "/register"
                    ? "font-extrabold text-[#DC0000]"
                    : "font-semibold text-[#DC0000] hover:text-red-600"
                }`}
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

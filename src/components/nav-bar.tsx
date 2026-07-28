"use client";

import { SunMedium, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [lang, setLang] = useState<"km" | "en">("km");
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    km: {
      navItems: [
        { label: "មេរៀន", href: "/documentation" },
        { label: "វគ្គសិក្សា", href: "/courses" },
        { label: "បញ្ជីវីដេអូ", href: "/playlists" },

        // Playground
        { label: "កន្លែងសាកល្បងកូដ", href: "/playground" },

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
        { label: "Playlists", href: "/playlists" },

        // Playground
        { label: "Playground", href: "/playground" },

        { label: "About Sastra Code", href: "/about-us" },
      ],
      register: "Register",
      langName: "English",
      flagSrc: "https://flagcdn.com/w40/gb.png",
    },
  };

  const currentT = t[lang];

  // Load saved theme preference on mount
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

  // Circular clip-path transition handler
  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextDark = !darkMode;

    // Fallback for browsers without View Transitions API support
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

    // Get click position (center of the transition circle)
    const x = event.clientX;
    const y = event.clientY;

    // Calculate maximum radius (distance to the furthest corner of the screen)
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Trigger state change inside the view transition callback
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

    // Animate clip-path with smooth timing and slower speed
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 1000,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200/30 bg-white/60 dark:border-slate-800/50 dark:bg-slate-950/60 backdrop-blur-xl shadow-xs transition-colors duration-200 font-khmer">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/">
            <img
              src="/images/sastra_code_logo.png"
              alt="satra-code-logo"
              className="w-16 sm:w-20 h-auto shrink-0"
            />
          </Link>
        </div>

        {/* Desktop Center: Pill Navigation with Glass Effect */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-3 lg:gap-8 rounded-full border border-[#002455]/20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md px-4 lg:px-8 py-2 lg:py-2.5 text-[#002455] dark:text-[#FFFFFF] shadow-xs dark:border-slate-700/50 max-w-[55%] lg:max-w-none">
          {currentT.navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-[14px] lg:text-[18px] font-semibold whitespace-nowrap transition-colors hover:text-red-500"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-5 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="rounded-full p-1.5 shrink-0 text-gray-700 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-slate-800/50 transition-colors hover:text-[#DC0000]"
          >
            {darkMode ? (
              <SunMedium className="cursor-pointer text:dark-[#002455] hover:text-[#DC0000]" />
            ) : (
              <Moon className="cursor-pointer" />
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1.5 sm:space-x-2 rounded-full border border-[#002455] px-2.5 sm:px-3 py-1.5 sm:py-2 text-[14px] lg:text-[16px] font-medium text-[#002455] hover:text-[#DC0000] dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800/50 transition-colors cursor-pointer shrink-0 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xs"
          >
            <img
              src={currentT.flagSrc}
              alt="Flag"
              className="h-3.5 w-5 sm:h-4 sm:w-6 rounded-xs object-cover shrink-0"
            />
            <span className="whitespace-nowrap">{currentT.langName}</span>
          </button>

          {/* Register Link */}
          <Link
            href="/register"
            className="hidden md:inline-block text-[14px] lg:text-[18px] font-semibold text-[#DC0000] whitespace-nowrap transition-colors hover:text-red-600 shrink-0"
          >
            {currentT.register}
          </Link>

          {/* Hamburger Button (Mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden rounded-lg p-2 shrink-0 text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu with Glassmorphism */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200/30 bg-white/70 dark:border-slate-800/50 dark:bg-slate-950/70 backdrop-blur-xl px-6 py-4 transition-all">
          <div className="flex flex-col space-y-3">
            {currentT.navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-[18px] font-semibold text-[#002455] dark:text-[#FFFFFF] transition-colors hover:text-red-500 py-1"
              >
                {item.label}
              </Link>
            ))}

            {/* Register Link inside mobile drawer */}
            <div className="pt-2 border-t border-gray-100/50 dark:border-slate-800/50">
              <Link
                href="/register"
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
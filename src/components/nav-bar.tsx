"use client";

import { SunMedium, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const translations = {
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
} as const;

type Language = keyof typeof translations;

export default function Navbar() {
  const [lang, setLang] = useState<Language>("km");
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const currentT = translations[lang];

  const toggleLanguage = () => {
    setLang((prev) => (prev === "km" ? "en" : "km"));
  };

  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="w-full border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 transition-colors duration-200 font-khmer">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/">
            <img
              src="/images/sastra_code_logo.png"
              alt="Sastra Code Logo"
              className="w-16 sm:w-20 h-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-3 lg:gap-8 rounded-full border border-[#002455] bg-slate-50/80 px-4 lg:px-8 py-2 lg:py-3 text-[#002455] dark:text-white shadow-sm dark:border-gray-700 dark:bg-gray-800/60 max-w-[55%] lg:max-w-none">
          {currentT.navItems.map((item) => (
            <Link
              key={item}
              href="#"
              className="text-sm lg:text-lg font-semibold whitespace-nowrap hover:text-[#DC0000] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-5 shrink-0">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? (
              <SunMedium className="text-[#002455] dark:text-white hover:text-[#DC0000]" />
            ) : (
              <Moon className="text-[#002455] dark:text-white hover:text-[#DC0000]" />
            )}
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-full border border-[#002455] px-3 py-2 text-sm lg:text-lg font-medium text-[#002455] dark:text-white hover:text-[#DC0000] transition"
          >
            <img
              src={currentT.flagSrc}
              alt="Language"
              className="h-4 w-6 rounded object-cover"
            />
            <span>{currentT.langName}</span>
          </button>

          <Link
            href="#"
            className="hidden md:block text-sm lg:text-lg font-semibold text-[#DC0000] hover:text-red-600"
          >
            {currentT.register}
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4">
          <div className="flex flex-col gap-3">
            {currentT.navItems.map((item) => (
              <Link
                key={item}
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-[#002455] dark:text-white hover:text-[#DC0000]"
              >
                {item}
              </Link>
            ))}

            <div className="border-t pt-3 dark:border-gray-700">
              <Link
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-[#DC0000]"
              >
                {currentT.register}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
"use client";

import { SunMedium, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [lang, setLang] = useState("km"); // 'km' | 'en'
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Exact Khmer translations from your UI
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

        {/* Desktop & Tablet Center: Rounded Pill Navbar (Fluid padding/fonts stop overlap on tablets/iPads) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-3 lg:gap-8 rounded-full border border-[#002455] bg-slate-50/80 px-4 lg:px-8 py-2 lg:py-3 text-[#002455] dark:text-[#FFFFFF] shadow-xs dark:border-gray-700 dark:bg-gray-800/60 max-w-[55%] lg:max-w-none">
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

        {/* Right Controls (Protected against shrinking/crushing icons) */}
        <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-5 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="rounded-full p-1.5 shrink-0 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors hover:text-[#DC0000]"
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
            className="flex items-center space-x-1.5 sm:space-x-2 rounded-full border border-[#002455] px-2.5 sm:px-3 py-2 sm:py-3 text-[14px] lg:text-[18px] font-medium text-[#002455] hover:text-[#DC0000] dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer shrink-0"
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
            href="#"
            className="hidden md:inline-block text-[14px] lg:text-[18px] font-semibold text-[#DC0000] whitespace-nowrap transition-colors hover:text-red-600 shrink-0"
          >
            {currentT.register}
          </Link>

          {/* Hamburger Button (Mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden rounded-lg p-2 shrink-0 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900 transition-all">
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

            {/* Register Link inside mobile drawer */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
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
    </nav>
  );
}
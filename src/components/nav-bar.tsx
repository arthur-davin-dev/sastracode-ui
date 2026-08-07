"use client";

import {
  SunMedium,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { useLanguage } from "@/lib/language-context";
import Login from "@/components/auth/Login";

export default function Navbar() {
  const { lang, setLang } = useLanguage();

  // Auth.js session
  const { data: session, status } = useSession();

  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // -----------------------------------
  // Safe user values
  // -----------------------------------

  const userName = session?.user?.name ?? "User";
  const userEmail = session?.user?.email ?? "";
  const userImage = session?.user?.image ?? "";

  const userInitial =
    userName.length > 0 ? userName.charAt(0).toUpperCase() : "U";

  // -----------------------------------
  // Translation
  // -----------------------------------

  const t = {
    km: {
      navItems: [
        { label: "មេរៀន", href: "/documentation" },
        { label: "វគ្គសិក្សា", href: "/courses" },
        { label: "កន្លែងសាកល្បងកូដ", href: "/playground" },
        { label: "មុខងារ", href: "/function" },
        { label: "អំពីសាស្ត្រាកូដ", href: "/about-us" },
      ],

      langName: "ខ្មែរ",

      // IMPORTANT:
      // Do not put markdown [url](url) here.
      flagSrc: "https://flagcdn.com/w40/kh.png",
    },

    en: {
      navItems: [
        { label: "Lessons", href: "/documentation" },
        { label: "Courses", href: "/courses" },
        { label: "Playground", href: "/playground" },
        { label: "Function", href: "/function" },
        { label: "About Sastra Code", href: "/about-us" },
      ],

      langName: "English",
      flagSrc: "https://flagcdn.com/w40/gb.png",
    },
  };

  const currentT = t[lang];

  // -----------------------------------
  // Theme
  // -----------------------------------

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

  const toggleTheme = (event: React.MouseEvent) => {
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
        {
          clipPath,
        },
        {
          duration: 1000,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  // -----------------------------------
  // Logout
  // -----------------------------------

  const handleLogout = async () => {
    setProfileOpen(false);

    await signOut({
      redirectTo: "/",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/30 bg-white/70 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/70">
      <nav className="mx-auto flex w-full items-center justify-between gap-3 px-4 py-3 md:px-6 lg:px-8">
        {/* -------------------------------- */}
        {/* Left: Logo */}
        {/* -------------------------------- */}

        <div className="flex items-center shrink-0">
          <Link href="/">
            <img
              src="/images/sastra_code_logo.png"
              alt="satra-code-logo"
              className="w-16 sm:w-20 h-auto shrink-0"
            />
          </Link>
        </div>

        {/* -------------------------------- */}
        {/* Desktop Navigation */}
        {/* -------------------------------- */}

        <div className="hidden min-w-0 flex-1 justify-center overflow-x-auto md:flex">
          <div className="flex w-full items-center justify-center gap-2 rounded-full border border-[#002455]/20 bg-white/40 px-5 py-2 text-[#002455] shadow-xs backdrop-blur-md md:w-140 lg:w-180 lg:gap-5 lg:px-10 lg:py-2.5 dark:border-slate-700/50 dark:bg-slate-900/40 dark:text-white">
            {currentT.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[14px] font-semibold transition-colors hover:text-red-500 lg:text-[18px]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* -------------------------------- */}
        {/* Right Controls */}
        {/* -------------------------------- */}

        <div className="flex shrink-0 items-center space-x-2 md:space-x-3 lg:space-x-5">
          {/* Theme */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="shrink-0 rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100/50 hover:text-[#DC0000] dark:text-gray-300 dark:hover:bg-slate-800/50"
          >
            {darkMode ? (
              <SunMedium className="cursor-pointer" />
            ) : (
              <Moon className="cursor-pointer" />
            )}
          </button>

          {/* Language */}

          <button
            type="button"
            onClick={toggleLanguage}
            className="flex shrink-0 cursor-pointer items-center space-x-1.5 rounded-full border border-[#002455] bg-white/30 px-2.5 py-1.5 text-[14px] font-medium text-[#002455] backdrop-blur-xs transition-colors hover:text-[#DC0000] sm:space-x-2 sm:px-3 sm:py-2 lg:text-[16px] dark:border-slate-700 dark:bg-slate-900/30 dark:text-gray-200 dark:hover:bg-slate-800/50"
          >
            <img
              src={currentT.flagSrc}
              alt={currentT.langName}
              className="h-3.5 w-5 shrink-0 rounded-xs object-cover sm:h-4 sm:w-6"
            />

            <span className="whitespace-nowrap">{currentT.langName}</span>
          </button>

          {/* -------------------------------- */}
          {/* Authentication */}
          {/* -------------------------------- */}

          {status === "loading" ? (
            // Session loading
            <div className="hidden items-center gap-2 md:flex">
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700" />
            </div>
          ) : status === "authenticated" && session?.user ? (
            // Logged in
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-[#002455]/20 bg-white/40 p-1.5 pr-3 transition-colors hover:bg-white/70 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
              >
                {/* Avatar */}

                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#002455] text-sm font-bold text-white">
                    {userInitial}
                  </div>
                )}

                {/* Name */}

                <div className="hidden min-w-0 text-left lg:block">
                  <p className="max-w-32 truncate text-sm font-semibold text-[#002455] dark:text-white">
                    {userName}
                  </p>

                  {userEmail && (
                    <p className="max-w-32 truncate text-xs text-gray-500 dark:text-gray-400">
                      {userEmail}
                    </p>
                  )}
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* -------------------------------- */}
              {/* Profile Dropdown */}
              {/* -------------------------------- */}

              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  {/* User information */}

                  <div className="border-b border-gray-100 p-4 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      {userImage ? (
                        <img
                          src={userImage}
                          alt={userName}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#002455] text-lg font-bold text-white">
                          {userInitial}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#002455] dark:text-white">
                          {userName}
                        </p>

                        {userEmail && (
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {userEmail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Profile link */}

                  <div className="p-2">
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
                    >
                      <User className="h-5 w-5" />

                      <span>Profile</span>
                    </Link>

                    {/* Logout */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <LogOut className="h-5 w-5" />

                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Not logged in
            <Login />
          )}

          {/* Mobile hamburger */}

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="shrink-0 rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100/50 focus:outline-none md:hidden dark:text-gray-200 dark:hover:bg-slate-800/50"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* -------------------------------- */}
      {/* Mobile Menu */}
      {/* -------------------------------- */}

      {isOpen && (
        <div className="border-t border-gray-200/30 bg-white/70 px-6 py-4 backdrop-blur-xl md:hidden dark:border-slate-800/50 dark:bg-slate-950/70">
          <div className="flex flex-col space-y-3">
            {currentT.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-1 text-[18px] font-semibold text-[#002455] transition-colors hover:text-red-500 dark:text-white"
              >
                {item.label}
              </Link>
            ))}

            {/* -------------------------------- */}
            {/* Mobile authenticated profile */}
            {/* -------------------------------- */}

            {status === "authenticated" && session?.user && (
              <div className="mt-2 border-t border-gray-200 pt-4 dark:border-slate-800">
                <div className="mb-3 flex items-center gap-3">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={userName}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#002455] font-bold text-white">
                      {userInitial}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#002455] dark:text-white">
                      {userName}
                    </p>

                    {userEmail && (
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {userEmail}
                      </p>
                    )}
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800"
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            )}

            {/* Mobile login */}

            {status === "unauthenticated" && (
              <div className="border-t border-gray-200 pt-4 dark:border-slate-800">
                <Login />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

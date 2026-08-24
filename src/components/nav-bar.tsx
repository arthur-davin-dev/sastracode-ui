"use client";

import {
  SunMedium,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { useLanguage } from "@/lib/language-context";
import Login from "@/components/auth/Login";
import { useGetMyProfileQuery } from "@/redux/service/profile-api";
import { logoutUser } from "@/lib/auth/logout";
import NotificationBell from "@/components/notification/NotificationBell";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();

  // Auth.js session
  const { data: session, status } = useSession();
  const { data: profile } = useGetMyProfileQuery(undefined, {
    skip: status !== "authenticated",
  });

  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // -----------------------------------
  // Safe user values
  // -----------------------------------

  const profileName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ");
  const userName =
    profileName || profile?.username || session?.user?.name || "User";
  const userEmail = profile?.email || session?.user?.email || "";
  const userImage = profile?.avatarUrl || session?.user?.image || "";

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
        { label: "មុខងារ", href: "/features" },
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
        { label: "Features", href: "/features" },
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
    const nextDark = savedTheme === "dark";
    document.documentElement.classList.toggle("dark", nextDark);
    const timeoutId = window.setTimeout(() => setDarkMode(nextDark), 0);

    return () => window.clearTimeout(timeoutId);
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
    setIsOpen(false);

    await logoutUser("/");
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
            {currentT.navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap text-[14px] font-semibold transition-colors lg:text-[18px] ${
                    isActive ? "text-[#DC0000]" : "hover:text-[#DC0000]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* -------------------------------- */}
        {/* Right Controls */}
        {/* -------------------------------- */}

        <div className="flex shrink-0 items-center space-x-2 md:space-x-3 lg:space-x-5">
          {/* Theme — desktop/tablet only, lives in mobile menu below */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="hidden shrink-0 rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100/50 hover:text-[#DC0000] sm:flex dark:text-gray-300 dark:hover:bg-slate-800/50"
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
            className="flex shrink-0 cursor-pointer items-center space-x-1.5 rounded-full border border-[#002455] bg-white/30 px-2.5 py-1.5 text-[14px] font-medium text-[#002455] backdrop-blur-xs transition-colors hover:text-[#DC0000] sm:space-x-2 sm:px-3 sm:py-2 lg:text-[16px] dark:border-slate-700 dark:bg-slate-900/30 dark:text-gray-200 dark:hover:bg-slate-800/50 dark:hover:text-white"
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

          {status === "authenticated" && session?.user && <NotificationBell />}

          {status === "loading" ? (
            // Session loading
            <div className="hidden items-center gap-2 md:flex">
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700" />
            </div>
          ) : status === "authenticated" && session?.user ? (
            // Logged in
            <div className="relative hidden md:block">
              {/* Profile Trigger */}
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                className={`
    group flex items-center rounded-full
    p-1.5 transition-all duration-200
    ${
      profileOpen
        ? "bg-[#002455]/5 ring-2 ring-[#002455]/10"
        : "hover:bg-[#002455]/5"
    }
    dark:hover:bg-slate-800
  `}
              >
                <div className="relative">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={userName}
                      className="
        h-11 w-11
        rounded-full
        border-2 border-yellow-400
        object-cover
        shadow-sm
      "
                    />
                  ) : (
                    <div
                      className="
        flex h-11 w-11
        items-center justify-center
        rounded-full
        border-2 border-yellow-400
        bg-[#002455]
        text-sm font-semibold text-white
        shadow-sm
      "
                    >
                      {userInitial}
                    </div>
                  )}

                  <span
                    className="
      absolute bottom-0 right-0
      h-3 w-3
      rounded-full
      border-2 border-white
      bg-emerald-500
      dark:border-slate-900
    "
                  />
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div
                  role="menu"
                  className="
        absolute right-0 top-full z-50 mt-3 w-72
        origin-top-right overflow-hidden
        rounded-2xl border border-gray-200/80
        bg-white
        shadow-[0_20px_60px_-15px_rgba(0,36,85,0.25)]
        dark:border-slate-700
        dark:bg-slate-900
      "
                >
                  {/* User Header */}
                  <div className="bg-linear-to-br from-[#002455]/5 to-transparent p-4 dark:from-white/5">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        {userImage ? (
                          <img
                            src={userImage}
                            alt={userName}
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm dark:ring-slate-800"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#002455] text-lg font-semibold text-white shadow-sm">
                            {userInitial}
                          </div>
                        )}

                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
                      </div>

                      {/* User info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#002455] dark:text-white">
                          {userName}
                        </p>

                        {userEmail && (
                          <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                            {userEmail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-slate-800" />

                  {/* Menu */}
                  <div className="p-2">
                    {/* Dashboard */}
                    <Link
                      href="/achivement"
                      onClick={() => setProfileOpen(false)}
                      role="menuitem"
                      className="
            group flex items-center gap-3 rounded-xl
            px-3 py-2.5
            text-sm font-medium text-gray-700
            transition-all duration-150
            hover:bg-[#002455]/5 hover:text-[#002455]
            dark:text-gray-200
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
                    >
                      <div
                        className="
              flex h-8 w-8 items-center justify-center
              rounded-lg bg-gray-100
              transition-colors
              group-hover:bg-[#002455]/10
              dark:bg-slate-800
            "
                      >
                        <LayoutDashboard className="h-4 w-4" />
                      </div>

                      <span>Dashboard</span>
                    </Link>

                    {/* Profile */}
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      role="menuitem"
                      className="
            group mt-1 flex items-center gap-3 rounded-xl
            px-3 py-2.5
            text-sm font-medium text-gray-700
            transition-all duration-150
            hover:bg-[#002455]/5 hover:text-[#002455]
            dark:text-gray-200
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
                    >
                      <div
                        className="
              flex h-8 w-8 items-center justify-center
              rounded-lg bg-gray-100
              transition-colors
              group-hover:bg-[#002455]/10
              dark:bg-slate-800
            "
                      >
                        <User className="h-4 w-4" />
                      </div>

                      <span>Profile</span>
                    </Link>

                    {/* Divider */}
                    <div className="my-2 h-px bg-gray-100 dark:bg-slate-800" />

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      role="menuitem"
                      className="
            group flex w-full items-center gap-3
            rounded-xl px-3 py-2.5
            text-sm font-medium text-red-500
            transition-all duration-150
            hover:bg-red-50
            dark:hover:bg-red-500/10
          "
                    >
                      <div
                        className="
              flex h-8 w-8 items-center justify-center
              rounded-lg bg-red-50
              transition-colors
              group-hover:bg-red-100
              dark:bg-red-500/10
            "
                      >
                        <LogOut className="h-4 w-4" />
                      </div>

                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Not logged in (Desktop)
            <div className="hidden md:flex shrink-0 items-center justify-center rounded-full border border-[#002455] bg-white/30 text-[#002455] backdrop-blur-sm transition-colors hover:text-[#DC0000] dark:border-slate-700 dark:bg-slate-900/30 dark:text-gray-200 dark:hover:bg-slate-800/50 dark:hover:text-white [&_button]:cursor-pointer [&_button]:bg-transparent [&_button]:border-none [&_button]:px-3 [&_button]:py-1.5 sm:[&_button]:px-4 sm:[&_button]:py-2 [&_button]:text-[14px] lg:[&_button]:text-[16px] [&_button]:font-medium [&_button]:text-inherit [&_button]:shadow-none">
              <Login />
            </div>
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
        <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-gray-200/30 bg-white/70 px-6 py-4 backdrop-blur-xl md:hidden dark:border-slate-800/50 dark:bg-slate-950/70">
          <div className="flex flex-col space-y-3">
            {currentT.navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-1 text-[18px] font-semibold transition-colors ${
                    isActive
                      ? "text-[#DC0000]"
                      : "text-[#002455] hover:text-[#DC0000] dark:text-white dark:hover:text-[#DC0000]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* -------------------------------- */}
            {/* Dark Mode Toggle */}
            {/* -------------------------------- */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="mt-2 flex w-full items-center justify-between rounded-xl border border-[#002455]/20 bg-white/40 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900/40"
            >
              <span className="font-medium text-[#002455] dark:text-white">
                Dark Mode
              </span>

              <span
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  darkMode ? "bg-yellow-400" : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${
                    darkMode ? "translate-x-5" : "translate-x-0.5"
                  }`}
                >
                  {darkMode ? (
                    <SunMedium className="h-3.5 w-3.5 text-yellow-500" />
                  ) : (
                    <Moon className="h-3.5 w-3.5 text-slate-500" />
                  )}
                </span>
              </span>
            </button>

            {/* -------------------------------- */}
            {/* Language */}
            {/* -------------------------------- */}

            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-2 self-start rounded-full border border-[#002455] bg-white/30 px-3 py-2 text-sm font-medium text-[#002455] dark:border-slate-700 dark:bg-slate-900/30 dark:text-gray-200"
            >
              <img
                src={currentT.flagSrc}
                alt={currentT.langName}
                className="h-4 w-6 rounded-xs object-cover"
              />
              {currentT.langName}
            </button>

            {/* -------------------------------- */}
            {/* Mobile authenticated profile */}
            {/* -------------------------------- */}

            {/* -------------------------------- */}
            {/* Mobile authenticated profile */}
            {/* -------------------------------- */}

            {status === "authenticated" && session?.user && (
              <div className="mt-2 border-t border-gray-200 pt-4 dark:border-slate-800">
                {/* User */}
                <div className="mb-4 flex items-center gap-3 px-2">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={userName}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#002455] font-bold text-white">
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

                {/* Dashboard */}
                <Link
                  href="/achivement"
                  onClick={() => setIsOpen(false)}
                  className="
        group flex items-center gap-3
        rounded-xl px-3 py-2.5
        font-medium text-gray-700
        transition-colors
        hover:bg-[#002455]/5
        hover:text-[#002455]
        dark:text-gray-200
        dark:hover:bg-slate-800
        dark:hover:text-white
      "
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-[#002455]/10 dark:bg-slate-800">
                    <LayoutDashboard className="h-4 w-4" />
                  </div>

                  <span>Dashboard</span>
                </Link>

                {/* Profile */}
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="
        group mt-1 flex items-center gap-3
        rounded-xl px-3 py-2.5
        font-medium text-gray-700
        transition-colors
        hover:bg-[#002455]/5
        hover:text-[#002455]
        dark:text-gray-200
        dark:hover:bg-slate-800
        dark:hover:text-white
      "
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-[#002455]/10 dark:bg-slate-800">
                    <User className="h-4 w-4" />
                  </div>

                  <span>Profile</span>
                </Link>

                {/* Divider */}
                <div className="my-2 h-px bg-gray-100 dark:bg-slate-800" />

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
        group flex w-full items-center gap-3
        rounded-xl px-3 py-2.5
        font-medium text-red-500
        transition-colors
        hover:bg-red-50
        dark:hover:bg-red-500/10
      "
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 group-hover:bg-red-100 dark:bg-red-500/10">
                    <LogOut className="h-4 w-4" />
                  </div>

                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Mobile login */}

            {status === "unauthenticated" && (
              <div className="border-t border-gray-200 pt-4 dark:border-slate-800 flex justify-start">
                <div className="flex shrink-0 items-center justify-center rounded-full border border-[#002455] bg-white/30 text-[#002455] backdrop-blur-sm transition-colors hover:text-[#DC0000] dark:border-slate-700 dark:bg-slate-900/30 dark:text-gray-200 dark:hover:bg-slate-800/50 dark:hover:text-white [&_button]:cursor-pointer [&_button]:bg-transparent [&_button]:border-none [&_button]:px-4 [&_button]:py-2 [&_button]:text-[16px] [&_button]:font-medium [&_button]:text-inherit [&_button]:shadow-none">
                  <Login />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  Search,
  SunMedium,
  Moon,
  Menu,
  X,
  PanelLeft,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";

import { pageConfig } from "@/components/layout/navbar-config";
import SearchModal from "@/components/search/SearchModal";
import { useGetMyProfileQuery } from "@/redux/service/profile-api";
import { logoutUser } from "@/lib/auth/logout";
import NotificationBell from "@/components/notification/NotificationBell";

interface NavbarProps {
  onOpenSidebar?: () => void;
}

export default function SubNavbar({ onOpenSidebar }: NavbarProps) {
  const pathname = usePathname();

  // Auth.js session
  const { data: session, status } = useSession();
  const { data: profile } = useGetMyProfileQuery(undefined, {
    skip: status !== "authenticated",
  });

  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ========================================
  // Safe session user values
  // ========================================

  const profileName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ");
  const userName =
    profileName || profile?.username || session?.user?.name || "User";
  const userEmail = profile?.email || session?.user?.email || "";
  const userAvatarUrl = profile?.avatarUrl || session?.user?.image || "";

  const userInitial = userName.trim().charAt(0).toUpperCase() || "U";

  // ========================================
  // Page title
  // ========================================

  const matchedPath = Object.keys(pageConfig)
    .filter((path) => pathname.startsWith(path))
    .sort((a, b) => b.length - a.length)[0];

  const current = matchedPath
    ? pageConfig[matchedPath]
    : {
        title: "SastraCode",
        icon: null,
      };

  const Icon = current.icon;

  // ========================================
  // Theme
  // ========================================

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const timeoutId = window.setTimeout(() => {
      setDarkMode(savedTheme === "dark");
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", openSearch);
    return () => window.removeEventListener("keydown", openSearch);
  }, []);

  const toggleTheme = (event: React.MouseEvent) => {
    const nextDark = !darkMode;

    if (!document.startViewTransition) {
      setDarkMode(nextDark);

      document.documentElement.classList.toggle("dark", nextDark);

      localStorage.setItem("theme", nextDark ? "dark" : "light");

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

      document.documentElement.classList.toggle("dark", nextDark);

      localStorage.setItem("theme", nextDark ? "dark" : "light");
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

  // ========================================
  // Logout
  // ========================================

  const handleLogout = async () => {
    setProfileOpen(false);
    setIsOpen(false);

    await logoutUser("/");
  };

  return (
    <>
      <header className="w-full bg-white dark:bg-slate-900">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
          {/* ===================================== */}
          {/* Sidebar Toggle + Page Title */}
          {/* ===================================== */}

          <div className="flex min-w-0 shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={onOpenSidebar}
              aria-label="Open Sidebar"
              className="shrink-0 rounded-2xl border border-slate-200 p-2.5 text-primary-color transition-colors hover:bg-yellow-400/20 lg:hidden dark:border-slate-800"
            >
              <PanelLeft className="h-6 w-6 text-primary-color" />
            </button>

            <div className="flex min-w-0 items-center gap-3">
              {Icon && (
                <div className="shrink-0 rounded-2xl bg-yellow-400/20 p-2 text-yellow-600">
                  <Icon className="h-7 w-7 text-primary-color" />
                </div>
              )}

              <h1 className="max-w-[160px] truncate text-2xl font-black tracking-tight text-primary-color sm:max-w-none">
                {current.title}
              </h1>
            </div>
          </div>

          {/* ===================================== */}
          {/* Search */}
          {/* ===================================== */}

          <div className="relative mx-4 hidden w-full max-w-md md:block">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-color opacity-50" />

            <Input
              placeholder="ស្វែងរកអ្វីមួយ..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => setSearchOpen(true)}
              className="rounded-2xl border-2 border-slate-200/60 bg-slate-100 py-6 pl-12 pr-4 text-lg font-bold text-primary-color placeholder:text-primary-color/50 transition-all focus-visible:ring-yellow-400 dark:border-slate-700/60 dark:bg-slate-800"
            />
          </div>

          {/* ===================================== */}
          {/* Desktop Right Controls */}
          {/* ===================================== */}

          <div className="hidden shrink-0 items-center gap-4 md:flex">
            {/* Theme */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="rounded-full p-1.5 text-primary-color transition-colors hover:bg-yellow-400/20 dark:hover:bg-slate-800/50"
            >
              {darkMode ? (
                <SunMedium className="h-6 w-6 text-yellow-400" />
              ) : (
                <Moon className="h-6 w-6 text-primary-color" />
              )}
            </button>

            {/* Notifications */}

            <NotificationBell />

            {/* ================================= */}
            {/* Session loading */}
            {/* ================================= */}

            {status === "loading" ? (
              <div className="flex items-center gap-3 border-l-2 border-slate-200 pl-4 dark:border-slate-800">
                <div className="h-11 w-11 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />

                <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ) : status === "authenticated" && session?.user ? (
              /* ================================= */
              /* Logged-in profile */
              /* ================================= */

              <div className="relative border-l-2 border-slate-200 pl-4 dark:border-slate-800">
  {/* Profile Trigger */}
  <button
    type="button"
    onClick={() => setProfileOpen((prev) => !prev)}
    aria-expanded={profileOpen}
    aria-haspopup="menu"
    className={`
      rounded-full p-1
      transition-all duration-200
      hover:bg-slate-100
      dark:hover:bg-slate-800
      ${
        profileOpen
          ? "bg-slate-100 ring-2 ring-primary-color/10 dark:bg-slate-800"
          : ""
      }
    `}
  >
    <Avatar className="h-11 w-11 border-2 border-yellow-400 shadow-sm">
      {userAvatarUrl && (
        <AvatarImage
          src={userAvatarUrl}
          alt={userName}
          className="object-cover"
        />
      )}

      <AvatarFallback className="bg-yellow-400 text-lg font-extrabold text-red-600">
        {userInitial}
      </AvatarFallback>
    </Avatar>
  </button>

  {/* Profile Dropdown */}
  {profileOpen && (
    <div
      role="menu"
      className="
        absolute right-0 top-full z-50 mt-3
        w-72 overflow-hidden
        rounded-2xl
        border border-slate-200
        bg-white
        shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)]
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* User Information */}
      <div className="border-b border-slate-100 p-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 shrink-0 border-2 border-yellow-400">
            {userAvatarUrl && (
              <AvatarImage
                src={userAvatarUrl}
                alt={userName}
                className="object-cover"
              />
            )}

            <AvatarFallback className="bg-yellow-400 font-bold text-red-600">
              {userInitial}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate font-bold text-primary-color dark:text-white">
              {userName}
            </p>

            {userEmail && (
              <p className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">
                {userEmail}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-2">
        {/* Dashboard */}
        <Link
          href="/achivement"
          onClick={() => setProfileOpen(false)}
          role="menuitem"
          className="
            group flex items-center gap-3
            rounded-xl px-3 py-2.5
            font-medium text-slate-700
            transition-colors duration-150
            hover:bg-primary-color/5
            hover:text-primary-color
            dark:text-slate-200
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <div
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg bg-slate-100
              transition-colors
              group-hover:bg-primary-color/10
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
            group mt-1 flex items-center gap-3
            rounded-xl px-3 py-2.5
            font-medium text-slate-700
            transition-colors duration-150
            hover:bg-primary-color/5
            hover:text-primary-color
            dark:text-slate-200
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <div
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg bg-slate-100
              transition-colors
              group-hover:bg-primary-color/10
              dark:bg-slate-800
            "
          >
            <User className="h-4 w-4" />
          </div>

          <span>Profile</span>
        </Link>

        {/* Divider */}
        <div className="my-2 h-px bg-slate-100 dark:bg-slate-800" />

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          role="menuitem"
          className="
            group flex w-full items-center gap-3
            rounded-xl px-3 py-2.5
            font-medium text-red-500
            transition-colors duration-150
            hover:bg-red-50
            dark:hover:bg-red-500/10
          "
        >
          <div
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg bg-red-50
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
            ) : null}
          </div>

          {/* ===================================== */}
          {/* Mobile Controls */}
          {/* ===================================== */}

          <div className="flex shrink-0 items-center gap-2 md:hidden">
            {/* Notifications — visible outside the hamburger menu */}

            {status === "authenticated" && session?.user && (
              <NotificationBell />
            )}

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              className="rounded-2xl p-2.5 shadow-md transition-all"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* ===================================== */}
        {/* Mobile Dropdown */}
        {/* ===================================== */}

        {isOpen && (
          <div className="animate-in slide-in-from-top space-y-5 border-t-2 border-slate-100 bg-white px-6 py-5 duration-300 md:hidden dark:border-slate-800 dark:bg-slate-900">
            {/* ================================= */}
            {/* Dark Mode Toggle */}
            {/* ================================= */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-100 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800"
            >
              <span className="font-medium text-primary-color">Dark Mode</span>

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

            {/* Search */}

            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-color opacity-50" />

              <Input
                placeholder="ស្វែងរកអ្វីមួយ..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="rounded-2xl border-2 border-slate-200 bg-slate-100 py-5 pl-12 pr-4 text-lg font-bold text-primary-color placeholder:text-primary-color/50 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            {/* ================================= */}
            {/* Mobile Profile */}
            {/* ================================= */}

            {status === "authenticated" && session?.user && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="h-12 w-12 shrink-0">
                    {userAvatarUrl && (
                      <AvatarImage src={userAvatarUrl} alt={userName} />
                    )}

                    <AvatarFallback className="bg-init-color text-lg font-extrabold text-secondary-color">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-lg font-extrabold text-primary-color">
                      {userName}
                    </p>

                    {userEmail && (
                      <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                        {userEmail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Profile */}

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>

                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      {searchOpen && (
        <SearchModal
          open
          initialQuery={searchQuery}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </>
  );
}

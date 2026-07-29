"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Bell, SunMedium, Moon, Menu, X, PanelLeft } from "lucide-react";
import { pageConfig } from "@/components/layout/navbar-config";

interface NavbarProps {
  userName?: string;
  userAvatarUrl?: string;
  hasUnreadNotifications?: boolean;
  onOpenSidebar?: () => void;
}

export default function SubNavbar({
  userName = "Chhay Davin",
  userAvatarUrl = "/images/chhay_davin.png",
  hasUnreadNotifications = true,
  onOpenSidebar,
}: NavbarProps) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const matchedPath = Object.keys(pageConfig)
    .filter((path) => pathname.startsWith(path))
    .sort((a, b) => b.length - a.length)[0];

  const current = matchedPath
    ? pageConfig[matchedPath]
    : { title: "SastraCode", icon: null };
  const Icon = current.icon;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setDarkMode(savedTheme === "dark");
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
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
      Math.max(y, window.innerHeight - y)
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
        { clipPath },
        {
          duration: 1000,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b-2 border-slate-100 dark:border-slate-800 transition-all duration-300 shadow-sm">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-8 py-4">
        
        {/* Sidebar Toggle (Mobile) + Title (Text-2xl) */}
        <div className="flex items-center gap-3 shrink-0 min-w-0">
          <button
            onClick={onOpenSidebar}
            aria-label="Open Sidebar"
            className="lg:hidden rounded-2xl p-2.5 text-primary-color hover:bg-yellow-400/20 transition-colors shrink-0 border border-slate-200 dark:border-slate-800"
          >
            <PanelLeft className="h-6 w-6 text-primary-color" />
          </button>

          <div className="flex items-center gap-3 min-w-0">
            {Icon && (
              <div className="p-2 bg-yellow-400/20 text-yellow-600 rounded-2xl shrink-0">
                <Icon className="h-7 w-7 text-primary-color" />
              </div>
            )}
            <h1 className="text-2xl font-black text-primary-color tracking-tight truncate max-w-[160px] sm:max-w-none">
              {current.title}
            </h1>
          </div>
        </div>

        {/* Search Bar: Desktop Only */}
        <div className="relative w-full max-w-md mx-4 hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-color opacity-50" />
          <Input
            placeholder="ស្វែងរកអ្វីមួយ..."
            className="pl-12 pr-4 py-6 text-lg rounded-2xl bg-slate-100 dark:bg-slate-800 text-primary-color placeholder:text-primary-color/50 border-2 border-slate-200/60 dark:border-slate-700/60 focus-visible:ring-yellow-400 font-bold transition-all"
          />
        </div>

        {/* Desktop Controls & User Profile */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="rounded-2xl p-3 text-primary-color bg-slate-100 dark:bg-slate-800 hover:bg-yellow-400/20 transition-all border border-slate-200 dark:border-slate-700"
          >
            {darkMode ? <SunMedium className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-primary-color" />}
          </button>

          {/* Notifications Indicator */}
          <button
            aria-label="Notifications"
            className="relative rounded-2xl p-3 text-primary-color bg-slate-100 dark:bg-slate-800 hover:bg-yellow-400/20 transition-all border border-slate-200 dark:border-slate-700"
          >
            <Bell className="h-6 w-6 text-primary-color" />
            {hasUnreadNotifications && (
              <span className="absolute top-2 right-2 h-3 w-3 rounded-full bg-red-600 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            )}
          </button>

          {/* User Profile Info */}
          <div className="flex items-center gap-3 pl-2 border-l-2 border-slate-200 dark:border-slate-800">
            <Avatar className="h-11 w-11 border-2 border-yellow-400 shadow-sm">
              <AvatarImage src={userAvatarUrl} alt={userName} />
              <AvatarFallback className="bg-yellow-400 text-red-600 font-extrabold text-lg">
                {userName[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-extrabold text-primary-color truncate max-w-[140px]">
              {userName}
            </span>
          </div>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="rounded-2xl p-2.5 text-primary-color bg-slate-100 dark:bg-slate-800 hover:bg-yellow-400/20 transition-all border border-slate-200 dark:border-slate-700"
          >
            {darkMode ? <SunMedium className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-primary-color" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="rounded-2xl p-2.5  transition-all shadow-md"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-slate-100 dark:border-slate-800 px-6 py-5 space-y-5 bg-white dark:bg-slate-900 animate-in slide-in-from-top duration-300">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-color opacity-50" />
            <Input
              placeholder="ស្វែងរកអ្វីមួយ..."
              className="pl-12 pr-4 py-5 text-lg rounded-2xl bg-slate-100 dark:bg-slate-800 text-primary-color placeholder:text-primary-color/50 border-2 border-slate-200 dark:border-slate-700 font-bold"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ">
                <AvatarImage src={userAvatarUrl} alt={userName} />
                <AvatarFallback className="bg-init-color text-secondary-color font-extrabold text-lg">
                  {userName[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-lg font-extrabold text-primary-color">
                {userName}
              </span>
            </div>

            <button
              aria-label="Notifications"
              className="relative p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <Bell className="h-6 w-6 text-primary-color" />
              {hasUnreadNotifications && (
                <span className="absolute top-2 right-2 h-3 w-3 rounded-full bg-red-600 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
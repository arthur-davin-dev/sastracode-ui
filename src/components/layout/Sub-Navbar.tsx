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

  const current = matchedPath ? pageConfig[matchedPath] : { title: "SastraCode", icon: null };
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
    <div className="sticky top-0 z-50 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-3 sm:py-4">
        {/* Sidebar toggle (mobile) + Title */}
        <div className="flex items-center gap-2 shrink-0 min-w-0">
          <button
            onClick={onOpenSidebar}
            aria-label="Open Sidebar"
            className="lg:hidden rounded-lg p-1.5 -ml-1.5 text-indigo-900 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transition-colors shrink-0"
          >
            <PanelLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 text-sm sm:text-sub-title font-bold text-indigo-950 dark:text-white min-w-0">
            {Icon && <Icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />}
            <span className="truncate max-w-[100px] sm:max-w-none">{current.title}</span>
          </div>
        </div>

        {/* Search: desktop only */}
        <div className="relative w-full max-w-sm mx-2 sm:mx-6 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
          <Input
            placeholder="ស្វែងរកអ្វីមួយ..."
            className="pl-9 bg-muted/30 dark:bg-slate-900/40 dark:text-white dark:placeholder:text-gray-400 dark:border-slate-700"
          />
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="rounded-full p-1.5 text-indigo-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-slate-800/50 transition-colors"
          >
            {darkMode ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="relative">
            <Bell className="h-5 w-5 text-indigo-900 dark:text-gray-300" />
            {hasUnreadNotifications && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-content font-medium text-indigo-950 dark:text-white">
              {userName}
            </span>
            <Avatar className="h-9 w-9">
              <AvatarImage src={userAvatarUrl} />
              <AvatarFallback>{userName[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile right side: theme toggle + dropdown hamburger */}
        <div className="flex md:hidden items-center gap-1.5 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="rounded-full p-1.5 text-indigo-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-slate-800/50 transition-colors"
          >
            {darkMode ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="rounded-lg p-2 text-indigo-900 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown: search, notifications, user */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200/30 dark:border-slate-800/50 px-4 py-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
            <Input
              placeholder="ស្វែងរកអ្វីមួយ..."
              className="pl-9 bg-muted/30 dark:bg-slate-900/40 dark:text-white dark:placeholder:text-gray-400 dark:border-slate-700"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={userAvatarUrl} />
                <AvatarFallback>{userName[0]}</AvatarFallback>
              </Avatar>
              <span className="text-content font-medium text-indigo-950 dark:text-white">
                {userName}
              </span>
            </div>

            <div className="relative">
              <Bell className="h-5 w-5 text-indigo-900 dark:text-gray-300" />
              {hasUnreadNotifications && (
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
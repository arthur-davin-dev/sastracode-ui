"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutGrid,
  GraduationCap,
  Trophy,
  Award,
  Bell,
  Users,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Bookmark,
  FileText,
  X,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  closeMobile: () => void;
}

const navItems = [
  { label: "ផ្ទាំងគ្រប់គ្រង", href: "/achivement", icon: LayoutGrid },
  {
    label: "ការសិក្សា",
    href: "/courses",
    icon: GraduationCap,
    subItems: [
      {
        label: "វគ្គសិក្សារបស់ខ្ញុំ",
        href: "/courses/my-courses",
        icon: BookOpen,
      },
      { label: "ចំណាំ", href: "/courses/bookmark", icon: Bookmark },
      {
        label: "ឯកសារមេរៀន",
        href: "/courses/materials",
        icon: FileText,
      },
    ],
  },
  { label: "សមិទ្ធិផល", href: "/leaderboard", icon: Trophy },
  { label: "វិញ្ញាបនបត្រ", href: "/certificate", icon: Award },
  { label: "ការរំលឹក", href: "/notifications", icon: Bell },
  { label: "ប្រវត្តិរូប", href: "/profile", icon: Users },
];

export default function AppSidebar({
  isCollapsed,
  setIsCollapsed,
  closeMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>("ការសិក្សា");

  const goToLink = () => {
    if (window.innerWidth < 1024) closeMobile();
  };

  return (
    <aside
      className={`
        relative h-full bg-white dark:bg-slate-900 border-r-2 border-slate-100 dark:border-slate-800
        flex flex-col py-6 transition-all duration-300 shadow-xl z-40 select-none
        ${isCollapsed ? "w-24" : "w-80"}
      `}
    >
      {/* Top Gradient Ribbon Header */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600" />

      {/* Collapse Toggle Button (Desktop) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-4 top-10 w-9 h-9 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-red-600 hover:bg-yellow-400 hover:text-slate-950 rounded-2xl items-center justify-center shadow-md z-50 transition-all duration-300 hover:scale-110 active:scale-95"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Mobile Close Button */}
      <button
        onClick={closeMobile}
        className="lg:hidden absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
      >
        <X size={24} />
      </button>

      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center mb-6 px-4">
        <Link href="/" className="group flex flex-col items-center gap-2">
          <div className="relative p-1 rounded-2xl transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/sastra_code_logo.png"
              alt="SastraCode Logo"
              className={`cursor-pointer transition-all duration-300 object-contain ${
                isCollapsed ? "h-12 w-12" : "h-20 w-auto"
              }`}
            />
          </div>

          {!isCollapsed && (
            <div className="text-center mt-1">
              <h1 className="text-2xl font-extrabold text-primary-color tracking-wide flex items-center justify-center gap-1.5">
                <span>SastraCode</span>
                <Sparkles className="h-5 w-5 text-yellow-400 fill-yellow-400 inline-block" />
              </h1>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 flex-1 px-4 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const hasSubItems = "subItems" in item && item.subItems;
          const isOpen = openMenu === item.label;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          if (hasSubItems) {
            return (
              <div key={item.label} className="relative group">
                <button
                  onClick={() => setOpenMenu(isOpen ? null : item.label)}
                  className={`
                    flex items-center justify-between w-full gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 font-bold text-lg
                    ${
                      isActive || isOpen
                        ? "bg-yellow-400/20 text-red-600 dark:text-yellow-400 border border-yellow-400/40 shadow-sm"
                        : "text-primary-color hover:bg-slate-100 dark:hover:bg-slate-800/80"
                    }
                  `}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <item.icon
                      size={24}
                      className={`shrink-0 transition-colors ${
                        isActive || isOpen ? "text-red-600 dark:text-yellow-400" : "text-red-500/80"
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="text-lg font-bold truncate text-primary-color">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && (
                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform duration-300 text-primary-color opacity-70 ${
                        isOpen ? "rotate-180 text-red-600" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Collapsed Hover Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-20 top-3 bg-slate-900 text-white text-base font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-lg border border-slate-700">
                    {item.label}
                  </div>
                )}

                {/* Sub Menu Links */}
                {isOpen && !isCollapsed && (
                  <div className="ml-5 mt-2 pl-3 border-l-2 border-yellow-400/50 flex flex-col gap-1.5">
                    {item.subItems!.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={goToLink}
                          className={`
                            flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-lg font-semibold transition-all duration-200
                            ${
                              isSubActive
                                ? "bg-red-600 text-white shadow-md"
                                : "text-primary-color hover:bg-yellow-400/15 hover:text-red-600"
                            }
                          `}
                        >
                          <sub.icon
                            size={18}
                            className={`shrink-0 ${
                              isSubActive ? "text-white" : "text-red-500"
                            }`}
                          />
                          <span className="truncate">{sub.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={goToLink}
              className={`
                relative group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 font-bold text-lg
                ${
                  isActive
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "text-primary-color hover:bg-slate-100 dark:hover:bg-slate-800/80"
                }
              `}
            >
              <item.icon
                size={24}
                className={`shrink-0 ${
                  isActive ? "text-white" : "text-red-500"
                }`}
              />
              {!isCollapsed && (
                <span className="text-lg font-bold truncate">
                  {item.label}
                </span>
              )}

              {/* Collapsed Hover Tooltip */}
              {isCollapsed && (
                <div className="absolute left-20 bg-slate-900 text-white text-base font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-lg border border-slate-700">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="px-4 mt-4 border-t-2 border-slate-100 dark:border-slate-800 pt-4 space-y-2">
        <button
          onClick={goToLink}
          className="flex items-center gap-3.5 px-4 py-3 text-lg font-bold text-primary-color hover:bg-yellow-400/20 hover:text-red-600 rounded-2xl w-full transition-all duration-200"
        >
          <HelpCircle size={24} className="shrink-0 text-yellow-500" />
          {!isCollapsed && <span>ជំនួយ</span>}
        </button>

        <button
          onClick={goToLink}
          className="flex items-center gap-3.5 px-4 py-3 text-lg font-bold text-red-600 hover:bg-primary-color hover:text-white rounded-2xl w-full transition-all duration-200 shadow-sm"
        >
          <LogOut size={24} className="shrink-0" />
          {!isCollapsed && <span>ចាកចេញ</span>}
        </button>
      </div>
    </aside>
  );
}
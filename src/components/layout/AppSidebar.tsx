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
  X,
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const goToLink = () => {
    if (window.innerWidth < 1024) closeMobile();
  };

  return (
    <aside
      className={`
    h-full bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800
    flex flex-col py-6 transition-all duration-300 relative
    ${isCollapsed ? "w-20" : "w-72"}
  `}
    >
      {/* Collapse Toggle (desktop) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-10 w-6 h-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-full items-center justify-center shadow-sm z-50 text-gray-500 hover:text-indigo-600"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Mobile Close */}
      <button
        onClick={closeMobile}
        className="lg:hidden absolute right-4 top-4 text-gray-400 dark:text-gray-500"
      >
        <X size={20} />
      </button>

      {/* Logo */}
      <div className="flex items-center justify-center mb-6 px-4">
        <img
          src="/images/sastra_code_logo.png"
          alt="Logo"
          className={`transition-all duration-300 ${isCollapsed ? "h-10" : "h-20"}`}
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1 px-3 overflow-y-auto">
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
                    flex items-center justify-between w-full gap-3 px-3 py-2.5 rounded-xl transition-all
                    ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="shrink-0" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium truncate">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-16 top-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}

                {/* Sub items */}
                {isOpen && !isCollapsed && (
                  <div className="ml-8 mt-1 flex flex-col gap-1">
                    {item.subItems!.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={goToLink}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
                          ${
                            pathname === sub.href
                              ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                              : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                          }
                        `}
                      >
                        <sub.icon size={16} className="shrink-0" />
                        <span className="truncate">{sub.label}</span>
                      </Link>
                    ))}
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
                relative group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                }
              `}
            >
              <item.icon size={20} className="shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              )}

              {isCollapsed && (
                <div className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 mt-4 border-t border-gray-100 dark:border-slate-800 pt-4 space-y-1">
        <button className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl w-full transition-colors">
          <HelpCircle size={20} className="shrink-0" />
          {!isCollapsed && <span>ជំនួយ</span>}
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl w-full transition-colors">
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span>ចាកចេញ</span>}
        </button>
      </div>
    </aside>
  );
}

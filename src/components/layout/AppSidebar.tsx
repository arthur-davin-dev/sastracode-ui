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
      { label: "វគ្គសិក្សារបស់ខ្ញុំ", href: "/courses/my-courses", icon: BookOpen },
      { label: "ចំណាំ", href: "/courses/bookmark", icon: Bookmark },
      { label: "ឯកសារមេរៀន", href: "/courses/materials", icon: FileText },
    ],
  },
  { label: "សមិទ្ធិផល", href: "/leaderboard", icon: Trophy },
  { label: "វិញ្ញាបនបត្រ", href: "/certificate", icon: Award },
  { label: "ការរំលឹក", href: "/notifications", icon: Bell },
  { label: "ប្រវត្តិរូប", href: "/profile", icon: Users },
];

export default function AppSidebar({ isCollapsed, setIsCollapsed, closeMobile }: SidebarProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>("ការសិក្សា");

  const goToLink = () => {
    if (window.innerWidth < 1024) closeMobile();
  };

  return (
    <aside className={`relative h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col py-6 transition-all duration-300 shadow-lg ${isCollapsed ? "w-24" : "w-80"}`}>
      
      {/* Toggle Desktop */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-4 top-10 w-8 h-8 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-primary-color hover:bg-slate-100 rounded-full items-center justify-center shadow-md z-50"
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Mobile Close */}
      <button onClick={closeMobile} className="lg:hidden absolute right-4 top-4 p-2 text-primary-color hover:bg-slate-100 rounded-xl">
        <X size={24} />
      </button>

      {/* Logo */}
      <div className="flex flex-col items-center justify-center mb-6 px-4">
        <Link href="/" className="flex flex-col items-center gap-2">
          <img
            src="/images/sastra_code_logo.png"
            alt="SastraCode Logo"
            className={`transition-all duration-300 object-contain ${isCollapsed ? "h-12 w-12" : "h-20 w-auto"}`}
          />
          {!isCollapsed && <h1 className="text-2xl font-extrabold text-primary-color">SastraCode</h1>}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2 flex-1 px-4 overflow-y-auto">
        {navItems.map((item) => {
          const hasSubItems = "subItems" in item && item.subItems;
          const isOpen = openMenu === item.label;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          if (hasSubItems) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => setOpenMenu(isOpen ? null : item.label)}
                  className={`flex items-center justify-between w-full gap-3 px-4 py-3 rounded-2xl font-bold text-lg text-primary-color transition-colors ${
                    isActive ? "bg-init-color/20" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <item.icon size={24} className="shrink-0 text-primary-color" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  )}
                </button>
                

                {/* Submenu */}
                {isOpen && !isCollapsed && (
                  <div className="ml-6 mt-1 pl-3 border-l-2 border-slate-200 dark:border-slate-700 flex flex-col gap-1">
                    {item.subItems!.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={goToLink}
                          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-lg font-semibold text-primary-color transition-colors ${
                            isSubActive ? "bg-init-color/20" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          <sub.icon size={18} className="shrink-0 text-primary-color" />
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
              className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-lg text-primary-color transition-colors ${
                isActive ? "bg-init-color/20" : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <item.icon size={24} className="shrink-0 text-primary-color" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 mt-4 border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
        <button onClick={goToLink} className="flex items-center gap-3.5 px-4 py-3 text-lg font-bold text-primary-color hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl w-full">
          <HelpCircle size={24} className="shrink-0 text-primary-color" />
          {!isCollapsed && <span>ជំនួយ</span>}
        </button>

        <button onClick={goToLink} className="flex items-center gap-3.5 px-4 py-3 text-lg font-bold text-secondary-color hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl w-full">
          <LogOut size={24} className="shrink-0 text-secondary-color" />
          {!isCollapsed && <span>ចាកចេញ</span>}
        </button>
      </div>
    </aside>
  );
}


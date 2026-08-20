// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import {
//   LayoutGrid,
//   GraduationCap,
//   Trophy,
//   Award,
//   Bell,
//   Users,
//   LogOut,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   BookOpen,
//   Bookmark,
//   X,
// } from "lucide-react";
// import { logoutUser } from "@/lib/auth/logout";
// import SidebarNotifications from "@/components/notification/SidebarNotifications";

// interface SidebarProps {
//   isCollapsed: boolean;
//   setIsCollapsed: (val: boolean) => void;
//   closeMobile: () => void;
// }

// const navItems = [
//   { label: "ផ្ទាំងគ្រប់គ្រង", href: "/achivement", icon: LayoutGrid },
//   {
//     label: "ការសិក្សា",
//     href: "/courses",
//     icon: GraduationCap,
//     subItems: [
//       {
//         label: "វគ្គសិក្សារបស់ខ្ញុំ",
//         href: "/courses/my-courses",
//         icon: BookOpen,
//       },
//       { label: "រក្សាទុក", href: "/courses/bookmark", icon: Bookmark },
//     ],
//   },
//   { label: "សមិទ្ធិផល", href: "/leaderboard", icon: Trophy },
//   { label: "វិញ្ញាបនបត្រ", href: "/certificate", icon: Award },
//   { label: "ការរំលឹក", href: "/notifications", icon: Bell },
//   { label: "ប្រវត្តិរូប", href: "/profile", icon: Users },
// ];

// export default function AppSidebar({
//   isCollapsed,
//   setIsCollapsed,
//   closeMobile,
// }: SidebarProps) {
//   const pathname = usePathname();
//   const [openMenu, setOpenMenu] = useState<string | null>("ការសិក្សា");

//   const goToLink = () => {
//     if (window.innerWidth < 1024) closeMobile();
//   };

//   const handleLogout = async () => {
//     goToLink();
//     await logoutUser("/");
//   };

//   return (
//     <aside
//       className={`relative h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col py-6 transition-all duration-300 shadow-lg ${isCollapsed ? "w-20" : "w-70"}`}
//     >
//       {/* Toggle Desktop */}
//       <button
//         onClick={() => setIsCollapsed(!isCollapsed)}
//         className="hidden lg:flex absolute -right-4 top-5 w-5 h-5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-primary-color hover:bg-slate-100 rounded-full items-center justify-center shadow-md z-50 transform-none select-none"
//       >
//         {isCollapsed ? (
//           <ChevronRight size={18} className="shrink-0" />
//         ) : (
//           <ChevronLeft size={18} className="shrink-0" />
//         )}
//       </button>

//       {/* Mobile Close */}
//       <button
//         onClick={closeMobile}
//         className="lg:hidden absolute right-4 top-4 p-2 text-primary-color hover:bg-slate-100 rounded-xl transform-none"
//       >
//         <X size={24} className="shrink-0" />
//       </button>

//       {/* Logo */}
//       <div className="flex flex-col items-center justify-center mb-6 px-4">
//         <Link
//           href="/"
//           className="flex flex-col items-center gap-2 transform-none"
//         >
//           <Image
//             src="/images/sastra_code_logo.png"
//             alt="SastraCode Logo"
//             width={240}
//             height={160}
//             quality={1000}
//             priority
//             className={`transition-all duration-300 object-contain ${
//               isCollapsed ? "h-10 w-10 sm:h-12 sm:w-12" : "w-16 h-auto sm:w-20"
//             }`}
//           />
//           {/* {!isCollapsed && (
//             <h1 className="text-2xl font-extrabold text-primary-color select-none">
//               SastraCode
//             </h1>
//           )} */}
//         </Link>
//       </div>

//       {/* Nav */}
//       <nav className="flex flex-col gap-2 flex-1 px-4 overflow-y-auto">
//         {navItems.map((item) => {
//           const hasSubItems = "subItems" in item && item.subItems;
//           const isOpen = openMenu === item.label;
//           const isActive =
//             pathname === item.href || pathname.startsWith(item.href + "/");

//           if (hasSubItems) {
//             return (
//               <div key={item.label}>
//                 <button
//                   onClick={() => setOpenMenu(isOpen ? null : item.label)}
//                   className={`flex items-center justify-between w-full gap-3 px-4 py-3 rounded-2xl font-bold text-lg text-primary-color transition-colors duration-150 transform-none select-none ${
//                     isActive
//                       ? "bg-init-color/20"
//                       : "hover:bg-slate-100 dark:hover:bg-slate-800"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3.5 min-w-0">
//                     <item.icon
//                       size={24}
//                       className="shrink-0 text-primary-color"
//                     />
//                     {!isCollapsed && (
//                       <span className="truncate">{item.label}</span>
//                     )}
//                   </div>
//                   {!isCollapsed && (
//                     <ChevronDown
//                       size={20}
//                       className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
//                     />
//                   )}
//                 </button>

//                 {/* Submenu */}
//                 {isOpen && !isCollapsed && (
//                   <div className="ml-6 mt-1 pl-3 border-l-2 border-slate-200 dark:border-slate-700 flex flex-col gap-1">
//                     {item.subItems!.map((sub) => {
//                       const isSubActive = pathname === sub.href;
//                       return (
//                         <Link
//                           key={sub.href}
//                           href={sub.href}
//                           onClick={goToLink}
//                           className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-lg font-semibold text-primary-color transition-colors duration-150 transform-none select-none ${
//                             isSubActive
//                               ? "bg-init-color/20"
//                               : "hover:bg-slate-100 dark:hover:bg-slate-800"
//                           }`}
//                         >
//                           <sub.icon
//                             size={18}
//                             className="shrink-0 text-primary-color"
//                           />
//                           <span className="truncate">{sub.label}</span>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           }

//           if (item.href === "/notifications") {
//             return (
//               <SidebarNotifications
//                 key={item.href}
//                 collapsed={isCollapsed}
//                 active={isActive}
//                 onNavigate={goToLink}
//               />
//             );
//           }

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               onClick={goToLink}
//               className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-lg text-primary-color transition-colors duration-150 transform-none select-none ${
//                 isActive
//                   ? "bg-init-color/20"
//                   : "hover:bg-slate-100 dark:hover:bg-slate-800"
//               }`}
//             >
//               <item.icon size={24} className="shrink-0 text-primary-color" />
//               {!isCollapsed && <span className="truncate">{item.label}</span>}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="px-4 mt-4 border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3.5 px-4 py-3 text-lg font-bold text-secondary-color hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl w-full transform-none select-none"
//         >
//           <LogOut size={24} className="shrink-0 text-secondary-color" />
//           {!isCollapsed && <span className="truncate">ចាកចេញ</span>}
//         </button>
//       </div>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { logoutUser } from "@/lib/auth/logout";

import SidebarNotifications from "@/components/notification/SidebarNotifications";

import {
  userNavItems,
  type UserSidebarItem,
} from "@/components/layout/user-sidebar-nav";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  closeMobile: () => void;
}

export default function AppSidebar({
  isCollapsed,
  setIsCollapsed,
  closeMobile,
}: SidebarProps) {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>("ការសិក្ស");

  /*
  |--------------------------------------------------------------------------
  | Close sidebar after navigation on mobile
  |--------------------------------------------------------------------------
  */

  const goToLink = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      closeMobile();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  const handleLogout = async () => {
    goToLink();

    await logoutUser("/");
  };

  /*
  |--------------------------------------------------------------------------
  | Check active route
  |--------------------------------------------------------------------------
  */

  const checkIsActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /*
  |--------------------------------------------------------------------------
  | Check parent with sub items
  |--------------------------------------------------------------------------
  */

  const checkParentActive = (item: UserSidebarItem) => {
    if (checkIsActive(item.href)) {
      return true;
    }

    return (
      item.subItems?.some((subItem) => checkIsActive(subItem.href)) ?? false
    );
  };

  return (
    <aside
      className={`
        relative flex h-full flex-col
        border-r border-slate-200
        bg-white py-6
        shadow-lg
        transition-all duration-300
        dark:border-slate-800
        dark:bg-slate-900

        ${isCollapsed ? "w-20" : "w-70"}
      `}
    >
      {/* ================================= */}
      {/* Desktop Toggle */}
      {/* ================================= */}

      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="
          absolute -right-4 top-5 z-50
          hidden h-5 w-5
          items-center justify-center
          rounded-full
          border border-slate-300
          bg-white
          text-primary-color
          shadow-md
          transition-colors
          hover:bg-slate-100
          dark:border-slate-700
          dark:bg-slate-800
          lg:flex
        "
      >
        {isCollapsed ? (
          <ChevronRight size={18} className="shrink-0" />
        ) : (
          <ChevronLeft size={18} className="shrink-0" />
        )}
      </button>

      {/* ================================= */}
      {/* Mobile Close */}
      {/* ================================= */}

      <button
        type="button"
        onClick={closeMobile}
        aria-label="Close sidebar"
        className="
          absolute right-4 top-4
          rounded-xl p-2
          text-primary-color
          transition-colors
          hover:bg-slate-100
          dark:hover:bg-slate-800
          lg:hidden
        "
      >
        <X size={24} className="shrink-0" />
      </button>

      {/* ================================= */}
      {/* Logo */}
      {/* ================================= */}

      <div className="mb-6 flex flex-col items-center justify-center px-4">
        <Link
          href="/"
          onClick={goToLink}
          className="flex flex-col items-center gap-2"
        >
          <Image
            src="/images/sastra_code_logo.png"
            alt="SastraCode Logo"
            width={240}
            height={160}
            quality={100}
            priority
            className={`
              object-contain
              transition-all duration-300

              ${
                isCollapsed
                  ? "h-10 w-10 sm:h-12 sm:w-12"
                  : "h-auto w-16 sm:w-20"
              }
            `}
          />
        </Link>
      </div>

      {/* ================================= */}
      {/* Navigation */}
      {/* ================================= */}

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4">
        {userNavItems.map((item) => {
          const hasSubItems = !!item.subItems?.length;

          const isOpen = openMenu === item.label;

          const isActive = checkParentActive(item);

          /*
          |--------------------------------------------------------------------------
          | Menu with submenu
          |--------------------------------------------------------------------------
          */

          if (hasSubItems) {
            return (
              <div key={item.href}>
                <button
                  type="button"
                  onClick={() => setOpenMenu(isOpen ? null : item.label)}
                  aria-expanded={isOpen}
                  className={`
                    flex w-full
                    items-center
                    justify-between
                    gap-3
                    rounded-2xl
                    px-4 py-3
                    text-lg
                    font-bold
                    text-primary-color
                    transition-colors
                    duration-150

                    ${
                      isActive
                        ? "bg-init-color/20"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <item.icon
                      size={24}
                      className="shrink-0 text-primary-color"
                    />

                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>

                  {!isCollapsed && (
                    <ChevronDown
                      size={20}
                      className={`
                        shrink-0
                        transition-transform
                        duration-200

                        ${isOpen ? "rotate-180" : ""}
                      `}
                    />
                  )}
                </button>

                {/* Submenu */}

                {isOpen && !isCollapsed && item.subItems && (
                  <div
                    className="
                        ml-6 mt-1
                        flex flex-col
                        gap-1
                        border-l-2
                        border-slate-200
                        pl-3
                        dark:border-slate-700
                      "
                  >
                    {item.subItems.map((subItem) => {
                      const isSubActive = checkIsActive(subItem.href);

                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={goToLink}
                          className={`
                                flex items-center
                                gap-3
                                rounded-xl
                                px-3.5 py-2.5
                                text-lg
                                font-semibold
                                text-primary-color
                                transition-colors
                                duration-150

                                ${
                                  isSubActive
                                    ? "bg-init-color/20"
                                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                                }
                              `}
                        >
                          <subItem.icon
                            size={18}
                            className="shrink-0 text-primary-color"
                          />

                          <span className="truncate">{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          /*
          |--------------------------------------------------------------------------
          | Notification custom component
          |--------------------------------------------------------------------------
          */

          if (item.href === "/notifications") {
            return (
              <SidebarNotifications
                key={item.href}
                collapsed={isCollapsed}
                active={isActive}
                onNavigate={goToLink}
              />
            );
          }

          /*
          |--------------------------------------------------------------------------
          | Normal link
          |--------------------------------------------------------------------------
          */

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={goToLink}
              className={`
                flex items-center
                gap-3.5
                rounded-2xl
                px-4 py-3
                text-lg
                font-bold
                text-primary-color
                transition-colors
                duration-150

                ${
                  isActive
                    ? "bg-init-color/20"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }
              `}
            >
              <item.icon size={24} className="shrink-0 text-primary-color" />

              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* ================================= */}
      {/* Footer */}
      {/* ================================= */}

      <div
        className="
          mt-4 space-y-2
          border-t border-slate-200
          px-4 pt-4
          dark:border-slate-800
        "
      >
        <button
          type="button"
          onClick={handleLogout}
          className="
            flex w-full
            items-center
            gap-3.5
            rounded-2xl
            px-4 py-3
            text-lg
            font-bold
            text-secondary-color
            transition-colors
            hover:bg-slate-100
            dark:hover:bg-slate-800
          "
        >
          <LogOut size={24} className="shrink-0 text-secondary-color" />

          {!isCollapsed && <span className="truncate">ចាកចេញ</span>}
        </button>
      </div>
    </aside>
  );
}

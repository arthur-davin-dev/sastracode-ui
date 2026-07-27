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
  BookOpen,
  Bookmark,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

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

// Added `gap-3`, increased `h-12` height for buttons, and increased padding for better spacing
const itemClass =
  "flex items-center gap-3 h-10 px-4 text-primary-color font-semibold text-base hover:text-primary-color hover:bg-muted/30 [&_svg]:stroke-primary-color [&_svg]:h-6 [&_svg]:w-6";

export function AppSidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <Sidebar collapsible="icon" className="bg-white mt-16 border-r border-gray-200">
      <SidebarHeader className="flex items-center justify-center py-6 bg-white">
        <img src="/images/sastra_code_logo.png" alt="Logo" className="h-28" />
      </SidebarHeader>

      <SidebarContent className="bg-white px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Added `space-y-3` to increase gap between item rows */}
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => {
                const hasSubItems = "subItems" in item && item.subItems;
                const isOpen = openMenu === item.label;
                

                if (hasSubItems) {
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        onClick={() => setOpenMenu(isOpen ? null : item.label)}
                        className={itemClass}
                        render={
                          <button className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-3.5">
                              <item.icon />
                              <span>{item.label}</span>
                            </div>
                            <ChevronDown
                              className={`ml-auto h-5 w-5 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        }
                      />
                      {isOpen && (
                        <SidebarMenuSub className="space-y-2 mt-2 ml-4">
                          {item.subItems!.map((sub) => (
                            <SidebarMenuSubItem key={sub.href}>
                              <SidebarMenuSubButton
                                isActive={pathname === sub.href}
                                className={itemClass}
                                render={
                                  <Link href={sub.href} className="flex items-center gap-3.5">
                                    <sub.icon />
                                    <span>{sub.label}</span>
                                  </Link>
                                }
                              />
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                }
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      className={itemClass}
                      render={
                        <Link href={item.href} className="flex items-center gap-3.5">
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-white px-2 pb-6">
        {/* Added `space-y-3` for footer spacing */}
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              className={itemClass}
              render={
                <button className="flex items-center gap-3.5 w-full">
                  <HelpCircle />
                  <span>ជំនួយ</span>
                </button>
              }
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="flex items-center gap-3.5 h-12 px-4 text-red-500 font-semibold text-base [&_svg]:stroke-red-500 [&_svg]:h-6 [&_svg]:w-6"
              render={
                <button className="flex items-center gap-3.5 w-full">
                  <LogOut />
                  <span>ចាកចេញ</span>
                </button>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}


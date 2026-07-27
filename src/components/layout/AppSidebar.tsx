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
  SidebarMenuButton,
  SidebarMenuItem,
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

const itemClass = "text-blue-900 font-semibold";

export function AppSidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <Sidebar collapsible="icon" className="bg-white border-none">
      <SidebarHeader className="flex items-center justify-center py-4 bg-white">
        <img src="/images/sastra_code_logo.png" alt="Logo" className="h-24" />
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
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
                          <button className="w-full">
                            <item.icon />
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`ml-auto h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                        }
                      />
                      {isOpen && (
                        <SidebarMenuSub>
                          {item.subItems!.map((sub) => (
                            <SidebarMenuSubItem key={sub.href}>
                              <SidebarMenuSubButton
                                isActive={pathname === sub.href}
                                className={itemClass}
                                render={
                                  <Link href={sub.href}>
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
                        <Link href={item.href}>
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

      <SidebarFooter className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={itemClass}
              render={
                <button>
                  <HelpCircle />
                  <span>ជំនួយ</span>
                </button>
              }
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-red-500 font-semibold [&_svg]:stroke-red-500"
              render={
                <button>
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

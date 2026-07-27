"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Home,
  Code2,
  Terminal,
  Eye,
  FileText,
  HelpCircle,
  Plus,
} from "lucide-react";

const menuItems = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Editor", icon: Code2, href: "/playground/editor" },
  { title: "Console", icon: Terminal, href: "/playground/console" },
  { title: "Preview", icon: Eye, href: "/preview" },
];

const footerItems = [
  { title: "Docs", icon: FileText, href: "/docs" },
  { title: "Help", icon: HelpCircle, href: "/help" },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex justify-center mb-3">
          <Image
            src="/playground/SastraCodeLogo.png"
            alt="Khmer Coder Logo"
            width={120}
            height={120}
          />
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-12 w-12 rounded-full bg-primary-color flex items-center justify-center text-white">
            <Image
              src="/playground/icons/Icon-terminal.svg"
              alt="Terminal icon"
              width={24}
              height={24}
            />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Workspace</p>
            <p className="text-xs text-primary">Khmer Coder</p>
          </div>
        </div>

        <Button
          className="w-full gap-2 py-5 text-base bg-primary-color hover:bg-primary-color text-white hover:text-white"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu className="space-y-1">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-color text-white hover:bg-primary-color hover:text-white"
                        : "text-slate-600 dark:text-gray-300 hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu className="space-y-1">
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-gray-300 hover:bg-muted transition-colors"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
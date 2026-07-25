"use client";

import Image from "next/image";
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
  { title: "Home", icon: Home },
  { title: "Editor", icon: Code2 },
  { title: "Console", icon: Terminal },
  { title: "Preview", icon: Eye },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        {/* Logo on top */}
        <div className="flex justify-center mb-3">
          <Image
            src="/playground/SastraCodeLogo.png"
            alt="Khmer Coder Logo"
            width={120}
            height={120}
          />
        </div>

        {/* Existing KC box + workspace text, unchanged */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white text-xs font-bold">
            KC
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Workspace</p>
            <p className="text-xs text-primary">Khmer Coder</p>
          </div>
        </div>

        <Button
          className="w-full gap-2 py-5 text-base"
          size="sm"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <FileText className="h-4 w-4" />
              <span>Docs</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

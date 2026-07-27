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

        {/* Icon circle + workspace text */}
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
          className="w-full gap-2 py-5 text-base bg-primary-color hover:bg-primary-color"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {menuItems.map((item, index) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className={
                  index === 0
                    ? "bg-primary-color text-white hover:bg-primary-color hover:text-white rounded-md py-5"
                    : "text-primary-color rounded-xl py-5"
                }
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.title}</span>
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

"use client";

import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Bell } from "lucide-react";
import { pageConfig } from "@/components/layout/navbar-config";

interface NavbarProps {
  userName?: string;
  userAvatarUrl?: string;
  hasUnreadNotifications?: boolean;
}

export default function SubNavbar({
  userName = "Chhay Davin",
  userAvatarUrl = "/images/mysql.jpg",
  hasUnreadNotifications = true,
}: NavbarProps) {
  const pathname = usePathname();

  const matchedPath = Object.keys(pageConfig)
    .filter((path) => pathname.startsWith(path))
    .sort((a, b) => b.length - a.length)[0];

  const current = matchedPath ? pageConfig[matchedPath] : { title: "SastraCode", icon: null };
  const Icon = current.icon;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-none bg-white ">
      <div className="flex items-center gap-2 text-sub-title font-bold text-indigo-950">
        {Icon && <Icon className="h-5 w-5" />}
        {current.title}
      </div>

      <div className="relative w-full max-w-sm mx-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="ស្វែងរកអ្វីមួយ..." className="pl-9 bg-muted/30" />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="h-5 w-5 text-indigo-900" />
          {hasUnreadNotifications && (
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-content font-medium text-indigo-950">{userName}</span>
          <Avatar className="h-9 w-9">
            <AvatarImage src={userAvatarUrl} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
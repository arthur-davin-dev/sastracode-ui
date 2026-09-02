// src/components/layout/user-sidebar-nav.ts

import type { LucideIcon } from "lucide-react";

import {
  LayoutGrid,
  GraduationCap,
  Trophy,
  Award,
  Bell,
  Users,
  BookOpen,
  Bookmark,
  UserPlus,
} from "lucide-react";

export interface UserSidebarSubItem {
  label: string;
  href: string;
  icon: LucideIcon;
  keywords?: string[];
}

export interface UserSidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  keywords?: string[];
  subItems?: UserSidebarSubItem[];
}

export const userNavItems: UserSidebarItem[] = [
  {
    label: "ផ្ទាំងគ្រប់គ្រង",
    href: "/achivement",
    icon: LayoutGrid,
    keywords: [
      "dashboard",
      "home",
      "achievement",
      "achivement",
      "ផ្ទាំងគ្រប់គ្រង",
    ],
  },

  {
    label: "ការសិក្សា",
    href: "/courses",
    icon: GraduationCap,
    keywords: [
      "course",
      "courses",
      "study",
      "learning",
      "learn",
      "ការសិក្សា",
      "វគ្គសិក្សា",
    ],

    subItems: [
      {
        label: "វគ្គសិក្សារបស់ខ្ញុំ",
        href: "/courses/my-courses",
        icon: BookOpen,
        keywords: [
          "my course",
          "my courses",
          "course",
          "courses",
          "learning",
          "វគ្គសិក្សារបស់ខ្ញុំ",
        ],
      },

      {
        label: "រក្សាទុក",
        href: "/courses/bookmark",
        icon: Bookmark,
        keywords: [
          "bookmark",
          "bookmarks",
          "saved",
          "saved course",
          "save",
          "រក្សាទុក",
        ],
      },
    ],
  },

  {
    label: "សមិទ្ធិផល",
    href: "/leaderboard",
    icon: Trophy,
    keywords: [
      "achievement",
      "achievements",
      "leaderboard",
      "ranking",
      "rank",
      "score",
      "សមិទ្ធិផល",
    ],
  },

  {
    label: "វិញ្ញាបនបត្រ",
    href: "/certificate",
    icon: Award,
    keywords: [
      "certificate",
      "certificates",
      "certification",
      "award",
      "វិញ្ញាបនបត្រ",
    ],
  },

  {
    label: "ការរំលឹក",
    href: "/notifications",
    icon: Bell,
    keywords: [
      "notification",
      "notifications",
      "alert",
      "alerts",
      "ការរំលឹក",
    ],
  },

  {
    label: "ប្រវត្តិរូប",
    href: "/profile",
    icon: Users,
    keywords: [
      "profile",
      "account",
      "user",
      "my profile",
      "ប្រវត្តិរូប",
    ],
  },

  {
    label: "ក្លាយជាគ្រូបង្រៀន",
    href: "/instructor-application",
    icon: UserPlus,
    keywords: [
      "instructor",
      "become instructor",
      "teach",
      "teacher",
      "application",
      "apply",
      "ក្លាយជាគ្រូបង្រៀន",
      "គ្រូបង្រៀន",
    ],
  },
];

export interface UserSidebarSearchItem {
  label: string;
  href: string;
  icon: LucideIcon;
  keywords: string[];
  parentLabel?: string;
  slug: string;
}

export function getUserSidebarSearchItems(): UserSidebarSearchItem[] {
  return userNavItems.flatMap((item) => {
    const parent: UserSidebarSearchItem = {
      label: item.label,
      href: item.href,
      icon: item.icon,
      keywords: item.keywords ?? [],
      slug: item.href
        .split("/")
        .filter(Boolean)
        .join(" "),
    };

    const children: UserSidebarSearchItem[] =
      item.subItems?.map((subItem) => ({
        label: subItem.label,
        href: subItem.href,
        icon: subItem.icon,
        keywords: subItem.keywords ?? [],
        parentLabel: item.label,

        slug: subItem.href
          .split("/")
          .filter(Boolean)
          .join(" "),
      })) ?? [];

    return [parent, ...children];
  });
}
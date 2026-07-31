"use client";

import { motion } from "framer-motion";
import { UserFilters } from "@/components/user/UserFilters";
import { AuthProviderCard } from "@/components/user/AuthProviderCard";
import { UserTable } from "@/components/user/UserTable";
import { User } from "@/types/users";

const mockUsers: User[] = [
  {
    id: "1",
    name: "ចាន់ ធារី",
    email: "theary.chan@lms.edu.kh",
    avatarUrl: "/avatars/1.png",
    status: "active",
    role: "STUDENT",
    lastLoginAt: "២ ម៉ោងមុន",
    memberSince: "១២ តុលា ២០២៥",
  },
  {
    id: "2",
    name: "វណ្ណៈ សិលា",
    email: "sila.vanna@lms.edu.kh",
    avatarUrl: "/avatars/2.png",
    status: "disciplinary",
    role: "INSTRUCTOR",
    lastLoginAt: "១៥ ថ្ងៃមុន",
    memberSince: "០៥ ឧសភា ២០២៣",
  },
  {
    id: "3",
    name: "ប៊ុន ហុង",
    email: "hong.bun@lms.edu.kh",
    avatarUrl: "/avatars/3.png",
    status: "suspended",
    role: "MODERATOR",
    lastLoginAt: "៣ ខែមុន",
    memberSince: "២០ មករា ២០២៤",
  },
  {
    id: "4",
    name: "សុភ័ក្រ ស្រីមុំ",
    email: "sreymom.s@lms.edu.kh",
    avatarUrl: "/avatars/4.png",
    status: "warning",
    role: "STUDENT",
    lastLoginAt: "មិនដែល",
    memberSince: "២៥ មេសា ២០២៤",
  },
  {
    id: "5",
    name: "វ៉ន សក្កដា",
    email: "sakda.s@lms.edu.kh",
    avatarUrl: "/avatars/4.png",
    status: "warning",
    role: "ADMIN",
    lastLoginAt: "១​ ថ្ងៃមុន",
    memberSince: "២៥ មករា ២០២៤",
  },
];

export default function UserPage() {
  return (
    <div className="space-y-8 p-6 md:p-10 max-w-7xl mx-auto">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-black text-primary-color tracking-tight">
          ការគ្រប់គ្រងអ្នកប្រើប្រាស់
        </h1>
        <p className="text-lg font-bold text-primary-color opacity-70 mt-1">
          គ្រប់គ្រងគណនី សិទ្ធិ និងសកម្មភាពសិក្សារបស់សមាជិកទាំងអស់។
        </p>
      </div>

      {/* Auth Provider Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AuthProviderCard />
      </motion.div>

      {/* Search & Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <UserFilters />
      </motion.div>

      {/* User Table with Built-in Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <UserTable users={mockUsers} totalCount={270} currentPage={1} totalPages={3} />
      </motion.div>
    </div>
  );
}
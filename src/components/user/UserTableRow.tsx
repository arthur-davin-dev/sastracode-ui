"use client";

import { motion } from "framer-motion";
import { User } from "@/types/users";
import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserRowActions } from "./UserRowActions";

// Enhances shadcn's TableRow with motion props without nesting extra DOM elements
const MotionTableRow = motion.create(TableRow);

interface UserTableRowProps {
  user: User;
  index?: number;
}

export function UserTableRow({ user, index = 0 }: UserTableRowProps) {
  return (
    <MotionTableRow
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors duration-200 border-b-0"
    >
      {/* Avatar Cell */}
      <TableCell className="py-4 px-6 w-16">
        <Avatar className="h-12 w-12 border-1 border-primary-color/20 shadow-sm">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-init-color/20 text-secondary-color text-lg font-black">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </TableCell>

      {/* Name Cell */}
      <TableCell className="py-4 px-6 text-lg font-bold text-primary-color whitespace-nowrap">
        {user.name}
      </TableCell>

      {/* Email Cell */}
      <TableCell className="py-4 px-6 text-lg font-medium text-primary-color opacity-70 whitespace-nowrap">
        {user.email}
      </TableCell>

      {/* Status Cell */}
      <TableCell className="py-4 px-6 whitespace-nowrap">
        <UserStatusBadge status={user.status} />
      </TableCell>

      {/* Role Cell */}
      <TableCell className="py-4 px-6 whitespace-nowrap">
        <UserRoleBadge role={user.role} />
      </TableCell>

      {/* Member Since (កាលបរិច្ឆេទបង្កើត) */}
      <TableCell className="py-4 px-6 text-lg font-medium text-primary-color opacity-80 whitespace-nowrap">
        {user.memberSince}
      </TableCell>

      {/* Last Login (សកម្មភាពចុងក្រោយ) */}
      <TableCell className="py-4 px-6 text-lg font-medium text-primary-color opacity-80 whitespace-nowrap">
        {user.lastLoginAt}
      </TableCell>

      {/* Actions Cell */}
      <TableCell className="py-4 px-6 text-center whitespace-nowrap">
        <UserRowActions user={user} />
      </TableCell>
    </MotionTableRow>
  );
}
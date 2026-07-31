"use client";

import { useState } from "react"; // 1. Added useState
import { User } from "@/types/users";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDetailDialog } from "./UserDetailDialog"; // 2. Imported UserDetailDialog

interface UserRowActionsProps {
  user: User;
  onEdit?: (user: User) => void;
  onSuspend?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export function UserRowActions({ user, onEdit, onSuspend, onDelete }: UserRowActionsProps) {
  // 3. State to control dialog visibility
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 rounded-2xl text-primary-color bg-transparent hover:bg-yellow-400/20 hover:text-red-600 transition-all duration-200 outline-none">
          <MoreVertical size={22} />
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          align="end" 
          className="z-50 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-xl p-2 min-w-[200px]"
        >
          {/* 4. Click opens the detail modal */}
          <DropdownMenuItem 
            onClick={() => setShowDetailDialog(true)}
            className="text-lg font-bold text-primary-color rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 py-2.5"
          >
            មើលព័ត៌មានលម្អិត
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => onEdit?.(user)}
            className="text-lg font-bold text-primary-color rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 py-2.5"
          >
            កែសម្រួល
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />
          
          <DropdownMenuItem 
            onClick={() => onSuspend?.(user)}
            className="text-lg font-bold text-init-color rounded-xl cursor-pointer hover:bg-yellow-50 dark:hover:bg-yellow-950/40 py-2.5 focus:text-yellow-700"
          >
            ផ្អាកគណនី
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => onDelete?.(user)}
            className="text-lg font-bold text-secondary-color rounded-xl cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/40 py-2.5 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-900/40"
          >
            លុប
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 5. Render the UserDetailDialog component here */}
      <UserDetailDialog
        user={user}
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
      />
    </>
  );
}
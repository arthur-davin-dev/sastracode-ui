"use client";

import { useState } from "react";
import { User } from "@/types/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User as UserIcon,
  BookOpen,
  UserCheck,
  CheckCircle2,
  PauseCircle,
  Ban,
  RotateCcw,
} from "lucide-react";

interface UserDetailDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailDialog({
  user,
  open,
  onOpenChange,
}: UserDetailDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header Title */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-primary-color text-left tracking-tight">
            ព័ត៌មានលម្អិតអ្នកប្រើប្រាស់
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* User Profile Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-primary-color shadow-md">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-init-color/20 text-secondary-color text-2xl font-black">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </div>
            <h2 className="text-2xl font-black text-primary-color mt-3">
              {user.name}
            </h2>
            <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>

          {/* Gamification Stats (XP / Level / Certificates) */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
              <p className="text-lg font-bold text-slate-400 mb-1">ពិន្ទុ XP</p>
              <p className="text-lg font-black text-primary-color">២,៤០០</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
              <p className="text-lg font-bold text-slate-400 mb-1">លំដាប់</p>
              <p className="text-lg font-black text-primary-color">១២</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
              <p className="text-lg font-bold text-slate-400 mb-1">វិញ្ញាបនបត្រ</p>
              <p className="text-lg font-black text-primary-color">០៨</p>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <UserIcon className="h-5 w-5 text-primary-color" />
              <h3 className="text-bold text-lg text-primary-color">
                ព័ត៌មានផ្ទាល់ខ្លួន
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-lg font-bold text-slate-400">ថ្ងៃខែឆ្នាំកំណើត</p>
                <p className="font-bold text-lg text-primary-color mt-0.5">
                  ១៥ វិច្ឆិកា ២០០១
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-400">ភាសា (LOCALE)</p>
                <p className="font-bold text-lg text-primary-color mt-0.5">Khmer (KH)</p>
              </div>
            </div>

            <div>
              <p className="text-lg font-bold text-slate-400">
                ប្រភេទការងារ / ការសិក្សា
              </p>
              <p className="font-bold  text-lg text-primary-color mt-0.5">
                និស្សិតព័ត៌មានវិទ្យា (Year 4)
              </p>
            </div>
          </div>

          {/* Learning History Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <BookOpen className="h-5 w-5 text-primary-color" />
              <h3 className=" text-lg font-black text-primary-color">
                ប្រវត្តិសិក្សា
              </h3>
            </div>

            <div className="p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-lg text-primary-color">
                  វគ្គសិក្សាដែលបានចុះឈ្មោះ
                </p>
                <p className="text-lg font-bold text-slate-400">TOTAL ENROLLED</p>
              </div>
              <span className="text-2xl font-black text-primary-color">០៨</span>
            </div>

            <div className="p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-primary-color text-lg">
                  វគ្គសិក្សាដែលបានបញ្ចប់
                </p>
                <p className="text-lg font-bold text-slate-400">COMPLETED</p>
              </div>
              <span className="text-2xl font-black text-emerald-600">០៥</span>
            </div>
          </div>

          {/* Assign Role Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <UserCheck className="h-5 w-5 text-primary-color" />
              <h3 className="text-lg font-black text-primary-color">
                កំណត់តួនាទី (ASSIGN ROLE)
              </h3>
            </div>

            <Select defaultValue={user.role}>
              <SelectTrigger className="h-12 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold text-primary-color focus:ring-yellow-400">
                <SelectValue placeholder="ជ្រើសរើសតួនាទី" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2 border-slate-100 dark:border-slate-800">
                <SelectItem value="STUDENT" className="font-bold py-2.5">
                  Student (សិស្ស)
                </SelectItem>
                <SelectItem value="INSTRUCTOR" className="font-bold py-2.5">
                  Instructor (គ្រូបង្រៀន)
                </SelectItem>
                <SelectItem value="MODERATOR" className="font-bold py-2.5">
                  Moderator (អ្នកសម្របសម្រួល)
                </SelectItem>
                <SelectItem value="ADMIN" className="font-bold py-2.5 text-red-600">
                  Admin (អ្នកគ្រប់គ្រង)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button className="h-12 rounded-2xl text-lg  bg-emerald-600 hover:bg-emerald-700/50 text-white font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>ធ្វើឱ្យសកម្ម</span>
            </Button>

            <Button className="h-12 rounded-2xl text-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 text-primary-color font-bold flex items-center gap-2">
              <PauseCircle className="h-5 w-5" />
              <span>បញ្ចប់សកម្មភាព</span>
            </Button>

            <Button className="h-12 rounded-2xl text-lg bg-secondary-color hover:bg-secondary-color/50 text-white font-bold flex items-center gap-2">
              <Ban className="h-5 w-5" />
              <span>រាំងខ្ទប់</span>
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-2xl  text-lg border-2 border-slate-200 dark:border-slate-800 text-primary-color font-bold flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RotateCcw className="h-5 w-5" />
              <span>កំណត់ពាក្យសម្ងាត់</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
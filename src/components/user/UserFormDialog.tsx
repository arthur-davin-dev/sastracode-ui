"use client";

import { useState } from "react";
import { User } from "@/types/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface UserFormDialogProps {
  user?: User; // if passed, dialog behaves as "edit"
  trigger: React.ReactNode;
  onSubmit?: (data: Partial<User>) => void;
}

export function UserFormDialog({
  user,
  trigger,
  onSubmit,
}: UserFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState(user?.role ?? "STUDENT");

  const handleSubmit = () => {
    onSubmit?.({ name, email, role });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-black text-primary-color tracking-tight">
            {user ? "កែសម្រួលអ្នកប្រើប្រាស់" : "បន្ថែមអ្នកប្រើប្រាស់"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-bold text-primary-color">
              ឈ្មោះ
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 text-lg font-medium rounded-2xl border-2 border-slate-200 dark:border-slate-800 focus-visible:ring-init-color/60"
              placeholder="បញ្ចូលឈ្មោះពេញ..."
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-bold text-primary-color">
              អ៊ីមែល
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-lg font-medium rounded-2xl border-2 border-slate-200 dark:border-slate-800 focus-visible:ring-init-color/60"
              placeholder="example@lms.edu.kh"
            />
          </div>

          {/* Role Field */}
          <div className="space-y-2">
            <Label className="text-lg font-bold text-primary-color">តួនាទី</Label>
            <Select
              value={role}
              onValueChange={(v) => setRole(v as User["role"])}
            >
              <SelectTrigger className="h-12 text-lg font-bold rounded-2xl border-2 border-slate-200 dark:border-slate-800 focus:ring-init-color/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl text-primary-color border-2 border-slate-100 dark:border-slate-800">
                <SelectItem value="STUDENT" className="text-lg font-bold py-3 rounded-xl cursor-pointer">
                  STUDENT
                </SelectItem>
                <SelectItem value="INSTRUCTOR" className="text-lg font-bold py-3 rounded-xl cursor-pointer">
                  INSTRUCTOR
                </SelectItem>
                <SelectItem value="MODERATOR" className="text-lg font-bold py-3 rounded-xl cursor-pointer">
                  MODERATOR
                </SelectItem>
                <SelectItem value="ADMIN" className="text-lg font-bold py-3 rounded-xl cursor-pointer text-red-600">
                  ADMIN
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-12 px-6 rounded-2xl text-lg font-bold border-2 border-slate-200 dark:border-slate-800 text-primary-color hover:bg-primary-color/15 transition-all"
          >
            បោះបង់
          </Button>
          <Button
            onClick={handleSubmit}
            className="h-12 px-6 rounded-2xl text-lg font-black bg-init-color text-primary-color hover:bg-init-color/20 shadow-md transition-all"
          >
            រក្សាទុក
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
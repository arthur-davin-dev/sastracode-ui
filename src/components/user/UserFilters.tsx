"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, UserPlus } from "lucide-react";
import { UserFormDialog } from "./UserFormDialog";

export function UserFilters() {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-color opacity-50" />
        <Input
          placeholder="ស្វែងរកអ្នកប្រើប្រាស់..."
          className="pl-12 h-12 text-lg font-medium rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus-visible:ring-init-color/50 shadow-sm"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          className="h-12 px-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-lg font-bold text-primary-color hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
        >
          <Filter className="mr-2 h-5 w-5 text-primary-color" />
          <span>តម្រង</span>
        </Button>

        <Button
          variant="outline"
          className="h-12 px-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-lg font-bold text-primary-color hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
        >
          <Download className="mr-2 h-5 w-5 text-primary-color" />
          <span>នាំចេញ</span>
        </Button>

        <UserFormDialog
          trigger={
            <Button className="h-12 px-6 rounded-2xl bg-init-color/50 text-primary-color text-lg font-black hover:bg-init-color shadow-md transition-all flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-secondary-color" />
              <span>បង្កើតអ្នកប្រើប្រាស់</span>
            </Button>
          }
        />
      </div>
    </div>
  );
}
"use client";

import { User } from "@/types/users";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { UserTableRow } from "./UserTableRow";
import { UserPagination } from "./UserPagination";

interface UserTableProps {
  users: User[];
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function UserTable({
  users,
  totalCount = 270,
  currentPage = 1,
  totalPages = 3,
  onPageChange = () => {},
}: UserTableProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
      
      {/* Scrollable Table Container */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          {/* Table Header */}
          <TableHeader>
            <TableRow className="bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200/60 dark:border-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-800/60">
              <TableHead className="py-4 px-6 text-lg font-bold text-primary-color opacity-80">
                រូបតំណាង
              </TableHead>
              <TableHead className="py-4 px-6 text-lg font-bold text-primary-color opacity-80">
                ឈ្មោះ
              </TableHead>
              <TableHead className="py-4 px-6 text-lg font-bold text-primary-color opacity-80">
                អ៊ីមែល
              </TableHead>
              <TableHead className="py-4 px-6 text-lg font-bold text-primary-color opacity-80">
                ស្ថានភាព
              </TableHead>
              <TableHead className="py-4 px-6 text-lg font-bold text-primary-color opacity-80">
                តួនាទី
              </TableHead>
              <TableHead className="py-4 px-6 text-lg font-bold text-primary-color opacity-80">
                កាលបរិច្ឆេទបង្កើត
              </TableHead>
              <TableHead className="py-4 px-6 text-lg font-bold text-primary-color opacity-80">
                សកម្មភាពចុងក្រោយ
              </TableHead>
              <TableHead className="py-4 px-6 text-center text-lg font-bold text-primary-color opacity-80">
                សកម្មភាព
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body using Modular Rows */}
          <TableBody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {users.map((user, index) => (
              <UserTableRow key={user.id} user={user} index={index} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
        <p className="text-lg font-bold text-primary-color opacity-70">
          បង្ហាញ ១ ដល់ {users.length} ក្នុងចំណោម {totalCount} នាក់
        </p>

        <UserPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
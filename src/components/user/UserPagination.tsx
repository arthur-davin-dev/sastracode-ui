"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Convert numbers to Khmer Numerals
const toKhmerNumeral = (num: number): string => {
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return num
    .toString()
    .split("")
    .map((digit) => khmerDigits[parseInt(digit, 10)] || digit)
    .join("");
};

export function UserPagination({
  currentPage,
  totalPages,
  onPageChange,
}: UserPaginationProps) {
  return (
    <Pagination className="mx-0 w-auto">
      <PaginationContent className="gap-2">
        {/* Previous Page Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={`rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-primary-color hover:bg-yellow-400/20 transition-all cursor-pointer ${
              currentPage === 1 ? "pointer-events-none opacity-40" : ""
            }`}
          />
        </PaginationItem>

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isActive = page === currentPage;
          return (
            <PaginationItem key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`h-11 w-11 rounded-2xl text-lg font-black transition-all cursor-pointer ${
                  isActive
                    ? "bg-init-color/20 text-primary-color border-2 border-primary-color/20 scale-105"
                    : "border-2 border-slate-200 dark:border-slate-800 text-primary-color hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {toKhmerNumeral(page)}
              </button>
            </PaginationItem>
          );
        })}

        {/* Next Page Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className={`rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-primary-color hover:bg-yellow-400/20 transition-all cursor-pointer ${
              currentPage === totalPages ? "pointer-events-none opacity-40" : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
"use client";

import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showEdges?: boolean;
  className?: string;
}

function generatePageRange(
  current: number,
  total: number,
  siblingCount: number,
  showEdges: boolean
): (number | "ellipsis")[] {
  if (total <= 1) return [1];

  const range: (number | "ellipsis")[] = [];
  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);

  const showLeftEllipsis = showEdges && leftSibling > 2;
  const showRightEllipsis = showEdges && rightSibling < total - 1;

  if (showEdges && leftSibling > 1) {
    range.push(1);
  }

  if (showLeftEllipsis) {
    range.push("ellipsis");
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    range.push(i);
  }

  if (showRightEllipsis) {
    range.push("ellipsis");
  }

  if (showEdges && rightSibling < total) {
    range.push(total);
  }

  return range;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showEdges = true,
  className = "",
}) => {
  const pages = useMemo(
    () => generatePageRange(currentPage, totalPages, siblingCount, showEdges),
    [currentPage, totalPages, siblingCount, showEdges]
  );

  if (totalPages <= 1) return null;

  const buttonBase =
    "inline-flex items-center justify-center h-9 min-w-[2.25rem] rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A90D9]/50 focus-visible:ring-offset-1";

  return (
    <nav aria-label="Pagination" className={`flex items-center gap-1 ${className}`}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${buttonBase} px-2 text-[#1B3A5C] hover:bg-[#F0F4F8] disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, idx) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="inline-flex items-center justify-center h-9 min-w-[2.25rem] text-gray-400 text-sm select-none"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={[
              buttonBase,
              isActive
                ? "bg-[#1B3A5C] text-white shadow-sm"
                : "text-[#1B3A5C] hover:bg-[#F0F4F8]",
            ].join(" ")}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${buttonBase} px-2 text-[#1B3A5C] hover:bg-[#F0F4F8] disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

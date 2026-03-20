"use client";

import React, { useState, useCallback } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  emptyMessage?: string;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  className?: string;
  containerClassName?: string;
}

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  striped = false,
  hoverable = true,
  compact = false,
  emptyMessage = "No data available",
  onSort,
  className = "",
  containerClassName = "",
}: TableProps<T>) {
  const [sortState, setSortState] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = useCallback(
    (key: string) => {
      let direction: "asc" | "desc" = "asc";
      if (sortState?.key === key && sortState.direction === "asc") {
        direction = "desc";
      }
      setSortState({ key, direction });
      onSort?.(key, direction);
    },
    [sortState, onSort]
  );

  const alignClass = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const cellPadding = compact ? "px-4 py-2" : "px-4 py-3";

  return (
    <div
      className={`overflow-x-auto rounded-lg border border-gray-200 ${containerClassName}`}
    >
      <table className={`w-full text-sm ${className}`}>
        <thead>
          <tr className="bg-[#F0F4F8] border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={[
                  cellPadding,
                  "font-semibold text-[#1B3A5C] whitespace-nowrap",
                  alignClass(col.align),
                  col.sortable ? "cursor-pointer select-none hover:bg-[#e4e9ef]" : "",
                  col.className || "",
                ].join(" ")}
                style={col.width ? { width: col.width } : undefined}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                aria-sort={
                  sortState?.key === col.key
                    ? sortState.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
              >
                <div className={`flex items-center gap-1 ${col.align === "right" ? "justify-end" : col.align === "center" ? "justify-center" : ""}`}>
                  {col.header}
                  {col.sortable && (
                    <span className="inline-flex flex-col ml-1">
                      {sortState?.key === col.key ? (
                        sortState.direction === "asc" ? (
                          <ChevronUp className="h-4 w-4 text-[#1B3A5C]" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-[#1B3A5C]" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={keyExtractor(row, index)}
                className={[
                  "border-b border-gray-100 last:border-b-0 transition-colors",
                  striped && index % 2 === 1 ? "bg-gray-50/50" : "bg-white",
                  hoverable ? "hover:bg-[#F0F4F8]/50" : "",
                ].join(" ")}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[
                      cellPadding,
                      alignClass(col.align),
                      col.className || "",
                    ].join(" ")}
                  >
                    {col.render
                      ? col.render(row, index)
                      : (getNestedValue(row, col.key) as React.ReactNode) ?? ""}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

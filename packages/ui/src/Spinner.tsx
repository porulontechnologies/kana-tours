"use client";

import React from "react";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "accent" | "sky" | "white" | "current";
  className?: string;
}

const sizeClasses: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
  xl: "h-12 w-12 border-4",
};

const colorClasses: Record<NonNullable<SpinnerProps["color"]>, string> = {
  primary: "border-[#1B3A5C]/20 border-t-[#1B3A5C]",
  accent: "border-[#E8A317]/20 border-t-[#E8A317]",
  sky: "border-[#4A90D9]/20 border-t-[#4A90D9]",
  white: "border-white/20 border-t-white",
  current: "border-current/20 border-t-current",
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "primary",
  className = "",
}) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

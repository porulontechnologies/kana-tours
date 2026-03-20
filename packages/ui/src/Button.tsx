"use client";

import React from "react";
import { Spinner } from "./Spinner";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[#1B3A5C] text-white hover:bg-[#152e49] active:bg-[#0f2237] focus-visible:ring-[#1B3A5C]/50",
  secondary:
    "bg-[#4A90D9] text-white hover:bg-[#3a7bc8] active:bg-[#2e6ab5] focus-visible:ring-[#4A90D9]/50",
  accent:
    "bg-[#E8A317] text-white hover:bg-[#d49415] active:bg-[#bf8512] focus-visible:ring-[#E8A317]/50",
  outline:
    "border-2 border-[#1B3A5C] text-[#1B3A5C] bg-transparent hover:bg-[#1B3A5C]/5 active:bg-[#1B3A5C]/10 focus-visible:ring-[#1B3A5C]/50",
  ghost:
    "text-[#1B3A5C] bg-transparent hover:bg-[#1B3A5C]/5 active:bg-[#1B3A5C]/10 focus-visible:ring-[#1B3A5C]/50",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500/50",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading ? (
          <Spinner
            size="sm"
            color={
              variant === "outline" || variant === "ghost" ? "primary" : "white"
            }
          />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !loading && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

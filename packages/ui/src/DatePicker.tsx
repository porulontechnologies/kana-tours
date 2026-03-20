"use client";

import React from "react";
import { Calendar } from "lucide-react";

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  minDate?: string;
  maxDate?: string;
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  containerClassName?: string;
}

const sizeClasses: Record<NonNullable<DatePickerProps["inputSize"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
};

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      error,
      helperText,
      minDate,
      maxDate,
      inputSize = "md",
      fullWidth = true,
      containerClassName = "",
      className = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `date-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#1B3A5C] mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Calendar className="h-4 w-4" />
          </div>
          <input
            ref={ref}
            type="date"
            id={inputId}
            disabled={disabled}
            min={minDate}
            max={maxDate}
            className={[
              "block pl-10 rounded-lg bg-white border border-gray-300",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:border-[#4A90D9] focus:ring-[#4A90D9]/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              sizeClasses[inputSize],
              fullWidth ? "w-full" : "",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

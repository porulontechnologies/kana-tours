"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  selectSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  containerClassName?: string;
}

const sizeClasses: Record<NonNullable<SelectProps["selectSize"]>, string> = {
  sm: "px-3 py-1.5 text-sm pr-9",
  md: "px-3 py-2 text-sm pr-10",
  lg: "px-4 py-3 text-base pr-11",
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      selectSize = "md",
      fullWidth = true,
      containerClassName = "",
      className = "",
      id,
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-[#1B3A5C] mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            value={value}
            className={[
              "block appearance-none rounded-lg bg-white border border-gray-300",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:border-[#4A90D9] focus:ring-[#4A90D9]/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              sizeClasses[selectSize],
              fullWidth ? "w-full" : "",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "",
              !value && placeholder ? "text-gray-400" : "text-gray-900",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                  ? `${selectId}-helper`
                  : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-gray-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && (
          <p id={`${selectId}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

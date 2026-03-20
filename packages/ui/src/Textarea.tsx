"use client";

import React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  fullWidth?: boolean;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCharCount = false,
      maxLength,
      fullWidth = true,
      containerClassName = "",
      className = "",
      id,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const [internalValue, setInternalValue] = React.useState(
      (defaultValue as string) || ""
    );

    const currentValue = value !== undefined ? String(value) : internalValue;
    const charCount = currentValue.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[#1B3A5C] mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={value !== undefined ? undefined : defaultValue}
          onChange={handleChange}
          className={[
            "block rounded-lg bg-white border border-gray-300",
            "transition-colors duration-150 resize-y min-h-[5rem]",
            "px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:border-[#4A90D9] focus:ring-[#4A90D9]/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "placeholder:text-gray-400",
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
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          {...props}
        />
        <div className="flex items-center justify-between mt-1">
          <div>
            {error && (
              <p
                id={`${textareaId}-error`}
                className="text-sm text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}
            {helperText && !error && (
              <p id={`${textareaId}-helper`} className="text-sm text-gray-500">
                {helperText}
              </p>
            )}
          </div>
          {showCharCount && (
            <span
              className={`text-xs tabular-nums ml-auto ${
                maxLength && charCount >= maxLength
                  ? "text-red-500 font-medium"
                  : "text-gray-400"
              }`}
            >
              {charCount}
              {maxLength ? `/${maxLength}` : ""}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

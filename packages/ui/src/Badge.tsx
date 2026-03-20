import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "success"
    | "warning"
    | "error"
    | "info"
    | "default"
    | "primary"
    | "accent";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  success: "bg-green-100 text-green-800",
  warning: "bg-orange-100 text-orange-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  default: "bg-gray-100 text-gray-800",
  primary: "bg-[#1B3A5C]/10 text-[#1B3A5C]",
  accent: "bg-[#E8A317]/10 text-[#E8A317]",
};

const dotColorClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  success: "bg-green-500",
  warning: "bg-orange-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  default: "bg-gray-500",
  primary: "bg-[#1B3A5C]",
  accent: "bg-[#E8A317]",
};

const sizeClasses: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-sm",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      dot = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={[
          "inline-flex items-center font-medium rounded-full gap-1.5",
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(" ")}
        {...props}
      >
        {dot && (
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${dotColorClasses[variant]}`}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

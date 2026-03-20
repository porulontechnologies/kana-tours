"use client";

import React from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
}

export interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
  className?: string;
}

const variantConfig: Record<
  ToastVariant,
  { icon: React.FC<{ className?: string }>; bg: string; border: string; iconColor: string }
> = {
  success: {
    icon: CheckCircle,
    bg: "bg-green-50",
    border: "border-green-200",
    iconColor: "text-green-500",
  },
  error: {
    icon: XCircle,
    bg: "bg-red-50",
    border: "border-red-200",
    iconColor: "text-red-500",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-orange-50",
    border: "border-orange-200",
    iconColor: "text-orange-500",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-500",
  },
};

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss, className = "" }) => {
  const config = variantConfig[toast.variant];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={[
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-sm w-full",
        "animate-[slideIn_200ms_ease-out]",
        config.bg,
        config.border,
        className,
      ].join(" ")}
    >
      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
        )}
        <p className="text-sm text-gray-700">{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 p-1 rounded text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A90D9]/50"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  className?: string;
}

const positionClasses: Record<
  NonNullable<ToastContainerProps["position"]>,
  string
> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  position = "top-right",
  className = "",
}) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed z-[100] flex flex-col gap-2 ${positionClasses[position]} ${className}`}
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

// Helper to create toast messages
let toastCounter = 0;
export function createToast(
  variant: ToastVariant,
  message: string,
  options?: { title?: string; duration?: number }
): ToastMessage {
  return {
    id: `toast-${++toastCounter}-${Date.now()}`,
    variant,
    message,
    title: options?.title,
    duration: options?.duration ?? 5000,
  };
}

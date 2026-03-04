"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500",
  danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
};

export function Button({
  children,
  variant = "primary",
  isLoading,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`
        px-4 py-2 rounded-lg font-medium text-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

"use client";

import { TextareaHTMLAttributes, ReactNode } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: ReactNode;
}

export function Textarea({
  label,
  error,
  helperText,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="mb-4 flex flex-col">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          px-3 py-2 border rounded-lg
          text-sm font-medium
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          placeholder:text-gray-400
          resize-vertical text-black
          ${error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}
          ${className}
        `}
        {...props}
      />
      {(error || helperText) && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}

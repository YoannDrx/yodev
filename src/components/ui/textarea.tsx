"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-medium text-text"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            // Base styles
            "flex min-h-[120px] w-full rounded-[var(--radius-md)]",
            "bg-surface border border-border",
            "px-4 py-3 text-sm text-text",
            "placeholder:text-muted/60",
            // Focus styles
            "transition-all duration-200",
            "focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
            // Hover
            "hover:border-border/80",
            // Disabled
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-2",
            // Resize
            "resize-y",
            // Error state
            error && "border-rose/50 focus:border-rose focus:ring-rose/20",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-xs text-rose"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="mt-1.5 text-xs text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

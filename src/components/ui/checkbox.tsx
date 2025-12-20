"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const checkboxId = id || React.useId();

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            id={checkboxId}
            type="checkbox"
            ref={ref}
            className={cn(
              "peer h-5 w-5 shrink-0 appearance-none",
              "rounded-[var(--radius-sm)] border border-border bg-surface",
              "transition-all duration-200",
              "checked:border-primary checked:bg-primary",
              "hover:border-primary/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-rose/50",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${checkboxId}-error` : undefined}
            {...props}
          />
          <Check
            className={cn(
              "pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-white",
              "opacity-0 transition-opacity peer-checked:opacity-100"
            )}
            strokeWidth={3}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-text cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted">{description}</p>
          )}
          {error && (
            <p
              id={`${checkboxId}-error`}
              className="text-xs text-rose"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

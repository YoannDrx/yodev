import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-primary text-white",
    "shadow-md hover:shadow-glow",
    "hover:bg-primary-light active:bg-primary-dark",
    "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
  ),
  secondary: cn(
    "bg-surface text-text border border-border",
    "shadow-sm hover:shadow-md",
    "hover:border-primary/30 hover:bg-surface-2",
    "focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
  ),
  outline: cn(
    "bg-transparent text-primary border border-primary/30",
    "hover:bg-primary/5 hover:border-primary/50",
    "focus-visible:ring-2 focus-visible:ring-primary/30"
  ),
  ghost: cn(
    "bg-transparent text-muted",
    "hover:bg-surface-2 hover:text-text",
    "focus-visible:ring-2 focus-visible:ring-primary/30"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  icon: "h-10 w-10 p-0",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    // Base styles
    "inline-flex items-center justify-center",
    "rounded-[var(--radius-md)] font-medium",
    // Transitions
    "transition-all duration-200 ease-out",
    // States
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    // Active state
    "active:scale-[0.98]",
    // Variant and size
    variantStyles[variant],
    sizeStyles[size],
    className
  );
}

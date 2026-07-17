import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "outline"
  | "glass";
export type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

const variantStyles: Record<ButtonVariant, string> = {
  // Primary - Teal button with dark text (main CTA)
  primary: cn(
    "bg-primary text-dark font-bold",
    "shadow-lg shadow-primary/20",
    "hover:bg-white hover:scale-105",
    "active:scale-[0.98]",
    "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
  ),
  // Secondary - Orange accent button
  accent: cn(
    "bg-secondary text-white font-bold",
    "shadow-lg shadow-secondary/30",
    "hover:bg-secondary-light hover:scale-105",
    "active:scale-[0.98]",
    "focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
  ),
  // Secondary - Surface button with border
  secondary: cn(
    "bg-surface text-text border border-border-strong",
    "shadow-sm hover:shadow-md",
    "hover:border-primary/30 hover:bg-surface-2",
    "focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
  ),
  // Outline - Transparent with primary border
  outline: cn(
    "bg-transparent text-primary border border-primary/30",
    "hover:bg-primary/10 hover:border-primary/50",
    "focus-visible:ring-2 focus-visible:ring-primary/30"
  ),
  // Ghost - Minimal button
  ghost: cn(
    "bg-transparent text-muted",
    "hover:bg-white/5 hover:text-text",
    "focus-visible:ring-2 focus-visible:ring-primary/30"
  ),
  // Glass - Glass morphism button
  glass: cn(
    "glass-panel text-text font-bold",
    "hover:bg-white/10",
    "focus-visible:ring-2 focus-visible:ring-primary/30"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs gap-1.5 rounded-lg",
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
  xl: "h-14 px-8 text-base gap-3 rounded-2xl",
  icon: "h-10 w-10 p-0 rounded-xl",
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
    "font-medium whitespace-nowrap",
    // Transitions
    "transition-all duration-300 ease-out",
    // States
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    // Variant and size
    variantStyles[variant],
    sizeStyles[size],
    className
  );
}

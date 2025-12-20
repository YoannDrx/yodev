import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "primary" | "secondary" | "success" | "warning" | "error";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "border-border bg-surface/80 text-muted",
  outline: "border-border bg-transparent text-muted",
  primary: "border-primary/30 bg-primary/10 text-primary",
  secondary: "border-border bg-bg-2 text-text",
  success: "border-green-500/30 bg-green-500/10 text-green-600",
  warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600",
  error: "border-rose/30 bg-rose/10 text-rose",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

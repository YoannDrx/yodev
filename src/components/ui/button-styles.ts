import { cn } from "@/lib/utils";
export type ButtonVariant = "primary" | "outline";
export type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";
const variants: Record<ButtonVariant, string> = {
 primary: "bg-[var(--y-accent-fill)] text-[var(--y-on-accent-fill)] border-[var(--y-accent-fill)] font-semibold hover:brightness-105",
 outline: "bg-transparent text-text border-border hover:border-primary",
};
const sizes: Record<ButtonSize, string> = { sm: "min-h-10 px-4 text-xs", md: "min-h-11 px-5 text-sm", lg: "min-h-12 px-6 text-sm", xl: "min-h-14 px-8 text-base", icon: "size-11" };
export function buttonClassName({variant = "primary",size = "md",className}: {variant?: ButtonVariant;size?: ButtonSize;className?: string}) { return cn("inline-flex items-center justify-center gap-2 border rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",variants[variant],sizes[size],className); }

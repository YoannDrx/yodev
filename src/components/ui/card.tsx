import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-border bg-surface/80 shadow-soft backdrop-blur-sm transition hover:border-accent/30",
        className,
      )}
      {...props}
    />
  );
}

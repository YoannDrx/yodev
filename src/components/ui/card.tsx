"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "outlined" | "ghost";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: CardVariant;
  hover?: boolean;
  as?: "div" | "article" | "section";
}

const variantStyles: Record<CardVariant, string> = {
  default: cn(
    "bg-surface/80 backdrop-blur-sm",
    "border border-border",
    "shadow-sm"
  ),
  elevated: cn(
    "bg-surface",
    "border border-border/50",
    "shadow-md"
  ),
  outlined: cn(
    "bg-transparent",
    "border-2 border-border"
  ),
  ghost: cn(
    "bg-surface-2/50",
    "border border-transparent"
  ),
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hover = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)]",
          "transition-all duration-300",
          variantStyles[variant],
          hover && [
            "hover:border-primary/20",
            "hover:shadow-lg",
            "hover:-translate-y-1",
          ],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// Card Header
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

// Card Title
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
}

export function CardTitle({
  className,
  as: Component = "h3",
  ...props
}: CardTitleProps) {
  return (
    <Component
      className={cn(
        "text-xl font-semibold leading-tight tracking-tight text-text",
        className
      )}
      {...props}
    />
  );
}

// Card Description
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-muted", className)}
      {...props}
    />
  );
}

// Card Content
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

// Card Footer
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

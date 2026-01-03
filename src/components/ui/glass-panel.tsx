"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassPanelVariant = "default" | "strong" | "subtle" | "bordered";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  variant?: GlassPanelVariant;
  hover?: boolean;
  as?: "div" | "article" | "section" | "aside";
  borderColor?: "primary" | "secondary" | "none";
  borderPosition?: "left" | "right" | "top" | "bottom" | "none";
}

const variantStyles: Record<GlassPanelVariant, string> = {
  default: "glass-panel",
  strong: "glass-panel-strong",
  subtle: cn(
    "bg-white/[0.02]",
    "backdrop-blur-sm",
    "border border-white/[0.05]"
  ),
  bordered: cn(
    "glass-panel",
    "border-2"
  ),
};

const borderColorStyles: Record<string, string> = {
  primary: "border-l-primary",
  secondary: "border-l-secondary",
  none: "",
};

const borderPositionStyles: Record<string, Record<string, string>> = {
  left: {
    primary: "border-l-4 border-l-primary",
    secondary: "border-l-4 border-l-secondary",
  },
  right: {
    primary: "border-r-4 border-r-primary",
    secondary: "border-r-4 border-r-secondary",
  },
  top: {
    primary: "border-t-4 border-t-primary",
    secondary: "border-t-4 border-t-secondary",
  },
  bottom: {
    primary: "border-b-4 border-b-primary",
    secondary: "border-b-4 border-b-secondary",
  },
  none: {
    primary: "",
    secondary: "",
    none: "",
  },
};

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      className,
      variant = "default",
      hover = false,
      borderColor = "none",
      borderPosition = "none",
      children,
      ...props
    },
    ref
  ) => {
    const borderStyle = borderPosition !== "none" && borderColor !== "none"
      ? borderPositionStyles[borderPosition]?.[borderColor] || ""
      : "";

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl",
          "transition-all duration-300",
          variantStyles[variant],
          borderStyle,
          hover && [
            "hover:bg-white/[0.05]",
            "hover:border-white/[0.12]",
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

GlassPanel.displayName = "GlassPanel";

// GlassCard - Preset for card-like usage with padding
interface GlassCardProps extends GlassPanelProps {
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

const paddingStyles: Record<string, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10 md:p-12",
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, padding = "md", ...props }, ref) => {
    return (
      <GlassPanel
        ref={ref}
        className={cn(paddingStyles[padding], className)}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";

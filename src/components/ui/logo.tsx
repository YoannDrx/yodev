"use client";

import { cn } from "@/lib/utils";

interface LogoDotsProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: { dot: "h-2 w-2", gap: "gap-0.5" },
  md: { dot: "h-3 w-3", gap: "gap-1" },
  lg: { dot: "h-4 w-4", gap: "gap-1.5" },
  xl: { dot: "h-5 w-5", gap: "gap-2" },
};

export function LogoDots({ size = "md", className }: LogoDotsProps) {
  const { dot, gap } = sizeMap[size];

  return (
    <div className={cn("relative flex flex-col", gap, className)}>
      <div className={cn("flex", gap)}>
        <div className={cn(dot, "rounded-sm bg-primary")} />
        <div className={cn(dot, "rounded-sm bg-primary/60")} />
      </div>
      <div className={cn("flex", gap)}>
        <div className={cn(dot, "rounded-sm bg-primary/40")} />
        <div className={cn(dot, "rounded-sm bg-secondary")} />
      </div>
    </div>
  );
}

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const logoSizeMap = {
  sm: { dots: "sm" as const, text: "text-lg", gap: "gap-2" },
  md: { dots: "md" as const, text: "text-2xl", gap: "gap-3" },
  lg: { dots: "lg" as const, text: "text-3xl", gap: "gap-4" },
};

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const { dots, text, gap } = logoSizeMap[size];

  return (
    <div className={cn("flex items-center", gap, className)}>
      <LogoDots size={dots} />
      {showText && (
        <span className={cn("font-display font-black tracking-tighter", text)}>
          yodev
        </span>
      )}
    </div>
  );
}

// SVG version for favicon and exports
export function LogoDotsSVG({ size = 32 }: { size?: number }) {
  const dotSize = size / 3;
  const gap = size / 12;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top left - primary */}
      <rect
        x={0}
        y={0}
        width={dotSize - gap / 2}
        height={dotSize - gap / 2}
        rx={size / 16}
        fill="#1BA896"
      />
      {/* Top right - primary 60% */}
      <rect
        x={dotSize + gap / 2}
        y={0}
        width={dotSize - gap / 2}
        height={dotSize - gap / 2}
        rx={size / 16}
        fill="#1BA896"
        fillOpacity={0.6}
      />
      {/* Bottom left - primary 40% */}
      <rect
        x={0}
        y={dotSize + gap / 2}
        width={dotSize - gap / 2}
        height={dotSize - gap / 2}
        rx={size / 16}
        fill="#1BA896"
        fillOpacity={0.4}
      />
      {/* Bottom right - secondary */}
      <rect
        x={dotSize + gap / 2}
        y={dotSize + gap / 2}
        width={dotSize - gap / 2}
        height={dotSize - gap / 2}
        rx={size / 16}
        fill="#FF6B35"
      />
    </svg>
  );
}

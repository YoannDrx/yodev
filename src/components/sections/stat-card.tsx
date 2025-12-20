"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  className?: string;
}

export function StatCard({
  value,
  suffix = "",
  prefix = "",
  label,
  description,
  className,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className={cn("p-6 text-center md:p-8", className)}>
        <div className="text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
          <span>{prefix}</span>
          <AnimatedCounter value={value} />
          <span>{suffix}</span>
        </div>
        <p className="mt-2 text-sm font-semibold text-text">{label}</p>
        {description && (
          <p className="mt-1 text-xs text-muted">{description}</p>
        )}
      </Card>
    </motion.div>
  );
}

interface StatSimpleProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

export function StatSimple({
  value,
  suffix = "",
  prefix = "",
  label,
  className,
}: StatSimpleProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-2xl font-bold text-text md:text-3xl lg:text-4xl">
        <span>{prefix}</span>
        <AnimatedCounter value={value} />
        <span>{suffix}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

interface StatGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatGrid({ children, columns = 4, className }: StatGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {children}
    </div>
  );
}

interface StatsBarProps {
  stats: Array<{
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
  }>;
  className?: string;
}

export function StatsBar({ stats, className }: StatsBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-border bg-surface/50 p-6 md:gap-12 md:p-8",
        className
      )}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="text-2xl font-bold text-primary md:text-3xl">
            <span>{stat.prefix}</span>
            <AnimatedCounter value={stat.value} />
            <span>{stat.suffix}</span>
          </div>
          <p className="mt-1 text-xs text-muted md:text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

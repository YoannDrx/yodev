"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  isLast?: boolean;
  className?: string;
}

export function ProcessStep({
  number,
  title,
  description,
  icon,
  isLast = false,
  className,
}: ProcessStepProps) {
  return (
    <motion.div
      className={cn("relative flex gap-4 md:gap-6", className)}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
    >
      {/* Step number and line */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-surface text-sm font-bold text-primary md:h-12 md:w-12"
          whileHover={{ scale: 1.1, backgroundColor: "rgb(var(--primary))", color: "#fff" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {icon || String(number).padStart(2, "0")}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="w-0.5 flex-1 bg-gradient-to-b from-primary/50 to-border"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: number * 0.1 + 0.2 }}
            style={{ originY: 0 }}
          />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-8", isLast && "pb-0")}>
        <h3 className="text-lg font-semibold text-text md:text-xl">{title}</h3>
        <p className="mt-2 text-sm text-muted md:text-base">{description}</p>
      </div>
    </motion.div>
  );
}

interface ProcessTimelineProps {
  steps: Array<{ title: string; description: string; icon?: React.ReactNode }>;
  className?: string;
}

export function ProcessTimeline({ steps, className }: ProcessTimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, index) => (
        <ProcessStep
          key={index}
          number={index + 1}
          title={step.title}
          description={step.description}
          icon={step.icon}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
}

interface ProcessGridProps {
  steps: Array<{ title: string; description: string; icon?: React.ReactNode }>;
  className?: string;
}

export function ProcessGrid({ steps, className }: ProcessGridProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <motion.div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold text-primary"
            whileHover={{ scale: 1.1, borderColor: "rgb(var(--primary))" }}
          >
            {step.icon || String(index + 1).padStart(2, "0")}
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-text">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

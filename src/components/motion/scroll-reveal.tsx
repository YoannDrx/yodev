"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type OffsetValue = "start" | "end" | "center" | `${number}` | `${number} ${number}`;

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  offset?: [OffsetValue, OffsetValue];
}

export function ScrollReveal({
  children,
  className,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps extends HTMLMotionProps<"div"> {
  speed?: number;
}

export function Parallax({
  children,
  className,
  speed = 0.5,
  ...props
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

  return (
    <motion.div ref={ref} className={cn(className)} {...props}>
      <motion.div style={{ y }}>{children}</motion.div>
    </motion.div>
  );
}

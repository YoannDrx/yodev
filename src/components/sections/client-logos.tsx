"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ClientLogo {
  name: string;
  src?: string;
}

interface ClientLogosProps {
  logos?: ClientLogo[];
  speed?: number;
  className?: string;
}

// Default placeholder logos for demo
const defaultLogos: ClientLogo[] = [
  { name: "Company 1" },
  { name: "Company 2" },
  { name: "Company 3" },
  { name: "Company 4" },
  { name: "Company 5" },
  { name: "Company 6" },
];

export function ClientLogos({
  logos = defaultLogos,
  speed = 20,
  className,
}: ClientLogosProps) {
  const baseVelocity = -speed;
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const moveBy = baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);

    // Reset position for infinite loop effect
    if (containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth / 2;
      if (baseX.get() < -containerWidth) {
        baseX.set(0);
      }
    }
  });

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Gradient fades on edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-bg to-transparent" />

      <motion.div
        ref={containerRef}
        className="flex gap-12 py-8"
        style={{ x: baseX }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex h-12 flex-shrink-0 items-center justify-center px-4"
          >
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <div className="flex h-10 items-center rounded-lg bg-surface/50 px-6 text-sm font-medium text-muted opacity-60 transition-opacity hover:opacity-100">
                {logo.name}
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface ClientLogosGridProps {
  logos?: ClientLogo[];
  className?: string;
}

export function ClientLogosGrid({
  logos = defaultLogos,
  className,
}: ClientLogosGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6",
        className
      )}
    >
      {logos.map((logo, index) => (
        <motion.div
          key={logo.name}
          className="flex h-20 items-center justify-center rounded-xl border border-border bg-surface/50 p-4 transition-all hover:border-primary/20 hover:shadow-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -2 }}
        >
          {logo.src ? (
            <Image
              src={logo.src}
              alt={logo.name}
              width={100}
              height={40}
              className="h-8 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          ) : (
            <span className="text-sm font-medium text-muted">{logo.name}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

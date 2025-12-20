"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  bullets: string[];
  featured?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function PricingCard({
  name,
  description,
  price,
  bullets,
  featured = false,
  ctaLabel = "Commencer",
  ctaHref = "/contact",
  className,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        variant={featured ? "elevated" : "default"}
        className={cn(
          "relative flex h-full flex-col p-6 md:p-8",
          featured && "border-primary/30 shadow-glow",
          className
        )}
      >
        {/* Featured badge */}
        {featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-primary text-white shadow-md">
              Populaire
            </Badge>
          </div>
        )}

        {/* Header */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-text">{name}</h3>
          <p className="text-sm text-muted">{description}</p>
        </div>

        {/* Price */}
        <div className="mt-6 border-y border-border py-6">
          <p className="text-2xl font-bold text-text md:text-3xl">{price}</p>
        </div>

        {/* Features */}
        <ul className="mt-6 flex-1 space-y-3">
          {bullets.map((bullet, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3 text-sm text-muted"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <span>{bullet}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-8">
          <ButtonLink
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={ctaHref as any}
            variant={featured ? "primary" : "secondary"}
            size="lg"
            className="w-full justify-center"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            {ctaLabel}
          </ButtonLink>
        </div>
      </Card>
    </motion.div>
  );
}

interface PricingGridProps {
  children: React.ReactNode;
  className?: string;
}

export function PricingGrid({ children, className }: PricingGridProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  );
}

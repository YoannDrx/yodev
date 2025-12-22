"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Clock, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

interface PricingExample {
  type: string;
  price: string;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  bullets: string[];
  featured?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  // New props
  duration?: string;
  idealFor?: string;
  badge?: string;
  examples?: PricingExample[];
  useCases?: string[];
  comparison?: {
    vsFreelance?: string[];
    vsRecrutement?: string[];
  };
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
  duration,
  idealFor,
  badge,
  examples,
  useCases,
  comparison,
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

        {/* Custom badge (like "Nouveau") */}
        {badge && !featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge variant="secondary" className="shadow-md">
              {badge}
            </Badge>
          </div>
        )}

        {/* Header */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-text">{name}</h3>
          <p className="text-sm text-muted">{description}</p>
        </div>

        {/* Price & Duration */}
        <div className="mt-6 border-y border-border py-6">
          <p className="text-2xl font-bold text-text md:text-3xl">{price}</p>
          {duration && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          )}
        </div>

        {/* Ideal For */}
        {idealFor && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-muted">Idéal pour : </span>
            <span className="font-medium text-text">{idealFor}</span>
          </div>
        )}

        {/* Features */}
        <ul className="mt-6 flex-1 space-y-3">
          {bullets.map((bullet, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3 text-sm text-muted"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <span>{bullet}</span>
            </motion.li>
          ))}
        </ul>

        {/* Examples Section */}
        {examples && examples.length > 0 && (
          <div className="mt-6 rounded-lg bg-bg-2 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Exemples de projets
            </p>
            <div className="mt-3 space-y-2">
              {examples.map((example, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted">{example.type}</span>
                  <span className="font-medium text-text">{example.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Use Cases */}
        {useCases && useCases.length > 0 && (
          <div className="mt-6 rounded-lg bg-bg-2 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Cas d&apos;usage
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {useCases.map((useCase, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Comparison */}
        {comparison && (
          <div className="mt-6 space-y-4">
            {comparison.vsFreelance && comparison.vsFreelance.length > 0 && (
              <div className="rounded-lg bg-bg-2 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  vs Freelance
                </p>
                <ul className="mt-2 space-y-1">
                  {comparison.vsFreelance.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-xs text-muted"
                    >
                      <Check className="h-3 w-3 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {comparison.vsRecrutement && comparison.vsRecrutement.length > 0 && (
              <div className="rounded-lg bg-bg-2 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  vs Recrutement
                </p>
                <ul className="mt-2 space-y-1">
                  {comparison.vsRecrutement.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-xs text-muted"
                    >
                      <Check className="h-3 w-3 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

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
  columns?: 2 | 3 | 4;
}

export function PricingGrid({
  children,
  className,
  columns = 3,
}: PricingGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {children}
    </div>
  );
}

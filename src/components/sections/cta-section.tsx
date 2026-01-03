"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion";
import { cn } from "@/lib/utils";

interface CtaSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "default" | "card" | "gradient";
  className?: string;
}

export function CtaSection({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref = "/contact",
  secondaryLabel,
  secondaryHref,
  variant = "default",
  className,
}: CtaSectionProps) {
  if (variant === "card") {
    return (
      <section className={cn("py-16 md:py-20", className)}>
        <Container>
          <FadeIn>
            <Card variant="elevated" className="overflow-hidden glass-panel rounded-[3rem]">
              <div className="relative flex flex-col items-center gap-8 p-12 text-center md:p-20">
                {/* Background gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid-dots" />

                <div className="max-w-2xl relative z-10">
                  {eyebrow && (
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
                      {eyebrow}
                    </p>
                  )}
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-text mb-8">
                    {title}
                  </h2>
                  {subtitle && (
                    <p className="text-xl text-muted mb-12">{subtitle}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                  <ButtonLink
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={ctaHref as any}
                    size="lg"
                    className="px-12 py-5 rounded-full shadow-[0_0_30px_rgba(27,168,150,0.3)]"
                  >
                    {ctaLabel}
                  </ButtonLink>
                  {secondaryLabel && secondaryHref && (
                    <ButtonLink
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      href={secondaryHref as any}
                      variant="glass"
                      size="lg"
                      className="px-12 py-5 rounded-full"
                    >
                      {secondaryLabel}
                    </ButtonLink>
                  )}
                </div>
              </div>
            </Card>
          </FadeIn>
        </Container>
      </section>
    );
  }

  if (variant === "gradient") {
    return (
      <section className={cn("relative overflow-hidden py-20 md:py-28", className)}>
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-bg to-bg" />
        <div className="absolute inset-0 -z-10 noise opacity-30" />

        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              {eyebrow && (
                <motion.p
                  className="mb-4 text-sm font-medium uppercase tracking-wider text-primary"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {eyebrow}
                </motion.p>
              )}
              <h2 className="text-3xl font-bold text-text md:text-4xl lg:text-5xl">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-4 text-lg text-muted">{subtitle}</p>
              )}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <ButtonLink
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={ctaHref as any}
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {ctaLabel}
                </ButtonLink>
              </motion.div>
            </div>
          </FadeIn>
        </Container>
      </section>
    );
  }

  // Default variant
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <Container>
        <FadeIn>
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="max-w-xl">
              {eyebrow && (
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
                  {eyebrow}
                </p>
              )}
              <h2 className="text-2xl font-bold text-text md:text-3xl">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-muted">{subtitle}</p>
              )}
            </div>

            <ButtonLink
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={ctaHref as any}
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {ctaLabel}
            </ButtonLink>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { FadeIn, SlideIn, StaggerChildren, StaggerItem } from "@/components/motion";

export function HeroHome() {
  const t = useTranslations("Home");
  const common = useTranslations("Common");
  const heroChips = t.raw("hero.chips") as string[];

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="absolute inset-0 -z-10 noise opacity-20" />

      {/* Animated gradient orbs */}
      <motion.div
        className="orb float-slow"
        style={{ width: 400, height: 400, top: -150, left: -100 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div
        className="orb secondary float-slower"
        style={{ width: 500, height: 500, bottom: -200, right: -150 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />

      <Container className="relative flex min-h-[90vh] items-center py-20 md:py-28">
        <div className="grid w-full gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Left side - Main content */}
          <div className="flex flex-col justify-center space-y-8">
            <FadeIn direction="up" delay={0}>
              <Badge className="inline-flex items-center gap-2 w-fit">
                <Sparkles className="h-3.5 w-3.5" />
                {t("hero.eyebrow")}
              </Badge>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-text md:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
                {t("hero.subtitle")}
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="/contact" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  {t("hero.primary")}
                </ButtonLink>
                <ButtonLink href="/work" variant="secondary" size="lg">
                  {t("hero.secondary")}
                </ButtonLink>
              </div>
            </FadeIn>

            <StaggerChildren staggerDelay={0.08} childDelay={0.4}>
              <div className="flex flex-wrap gap-2">
                {heroChips.map((chip) => (
                  <StaggerItem key={chip}>
                    <Badge variant="outline" className="text-xs">
                      {chip}
                    </Badge>
                  </StaggerItem>
                ))}
              </div>
            </StaggerChildren>
          </div>

          {/* Right side - Signal cards */}
          <div className="flex flex-col justify-center space-y-4">
            <SlideIn direction="right" delay={0.2}>
              <Card variant="elevated" className="p-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  {t("hero.signals.studioEyebrow")}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-text md:text-2xl">
                  {t("hero.signals.studioBody")}
                </h3>
              </Card>
            </SlideIn>

            <div className="grid gap-4 sm:grid-cols-2">
              <SlideIn direction="right" delay={0.3}>
                <Card className="h-full p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                    {t("hero.signals.outputEyebrow")}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    {t("hero.signals.outputBody")}
                  </p>
                </Card>
              </SlideIn>

              <SlideIn direction="right" delay={0.4}>
                <Card className="h-full p-5">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="h-3 w-3 rounded-full bg-green-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                      {common("available")}
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-muted">
                    {common("readyToStart")}
                  </p>
                </Card>
              </SlideIn>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { FadeIn, SlideIn } from "@/components/motion";

const deliverySteps = ["diagnostic", "design", "delivery"] as const;

export function HeroHome() {
  const t = useTranslations("Home");
  const common = useTranslations("Common");

  return (
    <section className="relative flex min-h-[760px] items-center overflow-hidden pb-20 pt-32 lg:min-h-[820px]">
      {/* Background glows */}
      <div className="hero-glow -top-20 -left-20" />
      <div
        className="hero-glow-secondary bottom-0 right-0"
        style={{ background: "radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)" }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Eyebrow Badge */}
            <FadeIn direction="up" delay={0} initiallyVisible>
              <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full hero-eyebrow-badge">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{t("hero.eyebrow")}</span>
              </div>
            </FadeIn>

            {/* Main Title */}
            <FadeIn direction="up" delay={0.1} initiallyVisible>
              <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-[1.1]">
                <span className="text-gradient">{t("hero.titleLine1")}</span>
                <br />
                <span className="text-primary italic">{t("hero.titleLine2")}</span>
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn direction="up" delay={0.2} initiallyVisible>
              <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">{t("hero.subtitle")}</p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3} initiallyVisible>
              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                  className="group px-8 py-4 rounded-full shadow-[0_0_20px_rgba(27,168,150,0.3)]"
                >
                  {common("cta")}
                </ButtonLink>

                <ButtonLink href="/work" size="lg" variant="outline">
                  {t("hero.secondary")}
                </ButtonLink>
              </div>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                {t("hero.ctaNote")}
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.4} initiallyVisible>
              <div className="flex flex-wrap gap-3 pt-4">
                {[0, 1, 2, 3].map((index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-muted"
                  >
                    <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                    {t(`hero.chips.${index}`)}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          <SlideIn direction="right" delay={0.2} initiallyVisible className="hidden lg:block relative">
            <GlassPanel className="p-8 rounded-3xl relative overflow-hidden group hero-code-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs font-mono text-muted">{t("hero.process.label")}</div>
              </div>

              <div className="space-y-4">
                {deliverySteps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="font-mono text-sm text-primary">0{index + 1}</span>
                    <div>
                      <p className="font-bold">{t(`hero.process.${step}.title`)}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {t(`hero.process.${step}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </GlassPanel>

            {/* Decorative elements */}
            <div className="absolute inset-0 bg-dark rounded-3xl -z-[5] hero-code-bg" />
            <div className="absolute -top-6 -right-6 w-full h-full border border-primary/20 rounded-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
          </SlideIn>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { FadeIn, SlideIn } from "@/components/motion";
import { cn } from "@/lib/utils";

// Fake expert avatars
const experts = [
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
];

// Code lines for the preview
const codeLines = [
  { line: "01", code: "import { Modernizer } from '@yodev/core';", color: "text-primary" },
  { line: "02", code: "const legacySystem = await fetchInventory('on-prem');", color: "text-white/80" },
  { line: "03", code: "const aiAgent = new Modernizer({", color: "text-white/80" },
  { line: "04", code: '  model: "GPT-4o-secure",', color: "text-secondary", indent: true },
  { line: "05", code: '  optimization: "cost-and-security"', color: "text-white/80", indent: true },
  { line: "06", code: "});", color: "text-white/80" },
];

export function HeroHome() {
  const t = useTranslations("Home");
  const common = useTranslations("Common");

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
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
            <FadeIn direction="up" delay={0}>
              <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full hero-eyebrow-badge">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{t("hero.eyebrow")}</span>
              </div>
            </FadeIn>

            {/* Main Title */}
            <FadeIn direction="up" delay={0.1}>
              <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-[1.1]">
                <span className="text-gradient">{t("hero.titleLine1")}</span>
                <br />
                <span className="text-primary italic">{t("hero.titleLine2")}</span>
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn direction="up" delay={0.2}>
              <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">{t("hero.subtitle")}</p>
            </FadeIn>

            {/* CTA + Experts */}
            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                  className="group px-8 py-4 rounded-full shadow-[0_0_20px_rgba(27,168,150,0.3)]"
                >
                  {common("cta")}
                </ButtonLink>

                {/* Experts Avatars */}
                <div className="flex items-center -space-x-3">
                  {experts.map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt={`Expert ${i + 1}`}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-dark object-cover"
                    />
                  ))}
                  <div className="pl-6">
                    <p className="text-sm font-bold">{t("hero.experts.count")}</p>
                    <p className="text-xs text-muted">{t("hero.experts.label")}</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Trust Badges */}
            <FadeIn direction="up" delay={0.4}>
              <div className="pt-8 flex items-center gap-8 opacity-60">
                <div className="h-12 text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-2">
                  <span className="text-primary">SOC2</span> Compliance
                </div>
                <div className="h-8 text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-2">GDPR</div>
                <div className="h-10 w-px bg-white/10" />
                <div className="flex items-center gap-1">
                  <svg className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold">4.9/5</span>
                  <span className="text-xs text-muted">Clutch</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Visual - Code Preview */}
          <SlideIn direction="right" delay={0.2} className="hidden lg:block relative">
            <GlassPanel className="p-8 rounded-3xl relative overflow-hidden group hero-code-card">
              {/* Code Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs font-mono text-muted">pipeline-ia.config.ts</div>
              </div>

              {/* Code Lines */}
              <div className="space-y-4 font-mono text-sm">
                {codeLines.map((line) => (
                  <div key={line.line} className={cn("flex items-center gap-2", line.color)}>
                    <span className="text-muted">{line.line}</span>
                    <span className={line.indent ? "ml-4" : ""}>{line.code}</span>
                  </div>
                ))}
              </div>

              {/* Floating Status */}
              <div className="absolute bottom-6 right-6 bg-dark/90 backdrop-blur-sm border border-white/10 p-4 rounded-2xl shadow-2xl hero-status-tag">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">{t("hero.status.label")}</p>
                    <p className="text-sm font-bold">{t("hero.status.value")}</p>
                  </div>
                </div>
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

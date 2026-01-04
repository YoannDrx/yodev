"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Clock, ShieldCheck, Sparkles, Layers } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { CtaSection } from "@/components/sections";
import { FadeIn, SlideIn, Parallax } from "@/components/motion";
import { cn } from "@/lib/utils";

const impactMetrics = [
  {
    label: "OpEx",
    value: "-40%",
    note: "ROI 12 mois",
    icon: Sparkles,
    tone: "text-primary",
  },
  {
    label: "Commande",
    value: "2.4 s",
    note: "Avant 15 min",
    icon: Clock,
    tone: "text-secondary",
  },
  {
    label: "Erreurs",
    value: "0.02%",
    note: "Saisie IA",
    icon: ShieldCheck,
    tone: "text-emerald-400",
  },
  {
    label: "Capacite",
    value: "x10",
    note: "Charge supportee",
    icon: Layers,
    tone: "text-blue-400",
  },
];

const pipelineSteps = [
  { label: "Data", detail: "Sources legacy", icon: Layers },
  { label: "AI", detail: "Validation & RAG", icon: Cpu },
  { label: "Events", detail: "Bus temps reel", icon: Sparkles },
  { label: "Ops", detail: "Monitoring 24/7", icon: ShieldCheck },
];

export function AiModernizationCaseStudy() {
  const t = useTranslations("CaseStudies");

  const caseData = {
    title: t("ai-modernization.title"),
    type: t("ai-modernization.type"),
    summary: t("ai-modernization.summary"),
    context: t("ai-modernization.context"),
    challenge: t("ai-modernization.challenge"),
    solution: t("ai-modernization.solution"),
    results: t.raw("ai-modernization.results") as string[],
    testimonial: {
      quote: t("ai-modernization.testimonial.quote"),
      author: t("ai-modernization.testimonial.author"),
      role: t("ai-modernization.testimonial.role"),
    },
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />
        <Parallax className="pointer-events-none absolute inset-0">
          <div className="orb -top-10 -left-20 w-72 h-72" />
          <div className="orb orb-secondary bottom-0 right-0 w-80 h-80" />
        </Parallax>

        <Container>
          <FadeIn>
            <ButtonLink
              href="/work"
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              className="mb-8"
            >
              {t("backButton")}
            </ButtonLink>
          </FadeIn>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <FadeIn>
                <Badge variant="primary" className="mb-4">
                  {caseData.type}
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-6">
                  <span className="text-gradient">{caseData.title}</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-muted mb-8">
                  {caseData.summary}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-3">
                  {caseData.results.slice(0, 3).map((result) => (
                    <div
                      key={result}
                      className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary"
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <SlideIn direction="right">
              <GlassPanel className="p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <p className="text-xs uppercase tracking-widest text-muted mb-6">
                  Impact business
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {impactMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="glass-panel p-4 rounded-2xl"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] uppercase tracking-widest text-muted">
                            {metric.label}
                          </span>
                          <Icon className={cn("h-4 w-4", metric.tone)} />
                        </div>
                        <p className={cn("text-2xl font-display font-black", metric.tone)}>
                          {metric.value}
                        </p>
                        <p className="text-xs text-muted mt-1">{metric.note}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Pipeline */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <FadeIn>
              <div>
                <Badge variant="outline" className="mb-4">
                  Pipeline modernise
                </Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  De la dette technique a la performance temps reel.
                </h2>
                <p className="text-muted text-lg leading-relaxed">
                  Nous avons reconcu le flux de donnees pour supprimer les batchs
                  lents, introduire une validation IA continue et une
                  observabilite enterprise.
                </p>
              </div>
            </FadeIn>

            <SlideIn direction="right">
              <GlassPanel className="p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <div className="relative grid md:grid-cols-4 gap-6">
                  {pipelineSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.label}
                        className="glass-panel p-4 rounded-2xl text-center"
                      >
                        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-bold">{step.label}</p>
                        <p className="text-xs text-muted mt-1">{step.detail}</p>
                        {index < pipelineSteps.length - 1 && (
                          <div className="hidden md:block mt-6 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                  viewBox="0 0 600 200"
                >
                  <path
                    d="M40 100 C160 20, 280 180, 400 100 S560 180, 560 100"
                    stroke="url(#pipelineGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="line-draw"
                  />
                  <defs>
                    <linearGradient id="pipelineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgb(27 168 150)" />
                      <stop offset="100%" stopColor="rgb(255 107 53)" />
                    </linearGradient>
                  </defs>
                </svg>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Context / Challenge / Solution */}
      <section className="py-24 bg-dark/50">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { label: t("contextTitle"), body: caseData.context },
              { label: t("challengeTitle"), body: caseData.challenge },
              { label: t("solutionTitle"), body: caseData.solution },
            ].map((item) => (
              <FadeIn key={item.label}>
                <GlassPanel className="p-8 rounded-3xl h-full">
                  <p className="text-xs uppercase tracking-widest text-muted mb-4">
                    {item.label}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">{item.body}</p>
                </GlassPanel>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <Container>
          <GlassPanel className="p-10 md:p-14 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
            <div className="max-w-3xl">
              <p className="text-xl md:text-2xl font-display font-semibold leading-relaxed mb-8">
                "{caseData.testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold">{caseData.testimonial.author}</p>
                  <p className="text-sm text-muted">{caseData.testimonial.role}</p>
                </div>
              </div>
            </div>
          </GlassPanel>
        </Container>
      </section>

      <CtaSection
        eyebrow={caseData.type}
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        ctaLabel={t("ctaButton")}
        ctaHref="/contact"
        secondaryLabel="Voir les autres projets"
        secondaryHref="/work"
        variant="card"
      />
    </>
  );
}

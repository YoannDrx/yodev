"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Cpu,
  Shield,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { CtaSection } from "@/components/sections";
import { FadeIn, SlideIn, Parallax } from "@/components/motion";
import { cn } from "@/lib/utils";

const focusItems = [
  {
    id: "refactor",
    title: "Refactoring contextuel",
    description:
      "Extraction automatique de la logique metier et re-ecriture vers des stacks modernes.",
    icon: Cpu,
    accent: "primary",
  },
  {
    id: "doc",
    title: "Documentation vivante",
    description:
      "Generation de documentation technique et fonctionnelle a partir du code existant.",
    icon: FileText,
    accent: "secondary",
  },
  {
    id: "security",
    title: "Securite post-migration",
    description:
      "Detection des vulnerabilites critiques avec des agents IA alignes OWASP.",
    icon: Shield,
    accent: "default",
  },
];

const methodology = [
  {
    title: "Cartographie IA",
    detail: "Audit des flux, dependances et zones de risques.",
  },
  {
    title: "Refactor assiste",
    detail: "Decoupage progressif sans interruption de service.",
  },
  {
    title: "Data + RAG",
    detail: "Nettoyage et indexation des donnees critiques.",
  },
  {
    title: "Cloud & MLOps",
    detail: "Observabilite, securite et scalabilite continue.",
  },
];

export function AiLegacyServiceContent() {
  const t = useTranslations("Services");
  const [activeFocus, setActiveFocus] = useState("refactor");

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10 mesh-gradient" />
        <Parallax className="pointer-events-none absolute inset-0">
          <div className="hero-glow -top-20 -left-20" />
          <div
            className="hero-glow bottom-0 right-0"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)",
            }}
          />
        </Parallax>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <FadeIn>
                <Badge variant="primary" className="mb-2">
                  Service exclusif PME/ETI
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-[1.1]">
                  <span className="text-gradient">Modernisez votre</span>
                  <br />
                  <span className="text-primary italic">Legacy par l'IA</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
                  Ne laissez plus votre dette technique freiner votre croissance.
                  Nous utilisons les LLM pour refactorer, documenter et migrer
                  vos systemes critiques sans risque operationnel.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <ButtonLink
                    href="/bookings/legacy-roi-analysis"
                    size="lg"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                    className="px-8 py-4 rounded-full shadow-[0_0_20px_rgba(27,168,150,0.3)]"
                  >
                    Lancer un audit technique
                  </ButtonLink>
                  <span className="text-sm font-mono text-muted">
                    <span className="text-secondary font-bold">&gt; 40%</span> de
                    reduction des couts de maintenance
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                  {[
                    { value: "0%", label: "Interruption service" },
                    { value: "10x", label: "Vitesse documentation" },
                    { value: "12 sem.", label: "Time-to-modernity" },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <p className="text-3xl font-display font-bold text-text">
                        {metric.value}
                      </p>
                      <p className="text-xs text-muted uppercase tracking-wider">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <SlideIn direction="right">
              <GlassPanel className="rounded-3xl overflow-hidden relative">
                <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded-full uppercase">
                      AI refactoring
                    </span>
                    <span className="text-xs font-mono text-muted">legacy_v4.php</span>
                  </div>
                </div>
                <div className="relative p-8 font-mono text-xs leading-relaxed">
                  <div className="absolute left-0 w-full h-8 bg-primary/5 border-y border-primary/20 scan-line pointer-events-none" />
                  <div className="space-y-4">
                    <div className="code-comparison-legacy p-4 rounded-lg opacity-50">
                      <p className="text-red-400 mb-2">// Legacy code (2012)</p>
                      <p className="text-muted">function process_order_old($d) {"{"}</p>
                      <p className="text-muted ml-4">
                        if ($d['status'] == 1) {"{ ... }"}
                      </p>
                      <p className="text-muted">{"}"}</p>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                    <div className="code-comparison-modern p-4 rounded-lg border border-primary/30">
                      <p className="text-primary mb-2">// AI optimized (2026)</p>
                      <p className="text-text">
                        export const processOrder = async (order) =&gt; {"{"}
                      </p>
                      <p className="text-text ml-4">
                        await prisma.order.update({"{ ... }"})
                      </p>
                      <p className="text-text">{"}"}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 glass-panel px-4 py-3 rounded-xl animate-float">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                      Analysis: 98% security match
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Focus & ROI */}
      <section className="py-24 bg-dark relative border-y border-white/5 overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                L'IA n'est plus une option,
                <br />
                <span className="text-primary">c'est votre bouclier.</span>
              </h2>
              <div className="space-y-6">
                {focusItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeFocus === item.id;
                  const accentClass =
                    item.accent === "secondary"
                      ? "border-secondary/40"
                      : item.accent === "primary"
                        ? "border-primary/40"
                        : "border-white/20";

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveFocus(item.id)}
                      className={cn(
                        "w-full text-left p-6 border rounded-3xl transition-all duration-300",
                        isActive
                          ? "bg-white/5 shadow-lg"
                          : "border-transparent opacity-70 hover:opacity-100",
                        accentClass
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "p-3 rounded-2xl",
                            item.accent === "secondary"
                              ? "bg-secondary/20 text-secondary"
                              : item.accent === "primary"
                                ? "bg-primary/20 text-primary"
                                : "bg-white/10 text-text"
                          )}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <GlassPanel className="p-10 rounded-[3rem] relative">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-dark rounded-lg flex items-center justify-center text-xs font-bold">
                  ROI
                </span>
                Impact PME mesurable
              </h4>
              <div className="space-y-8">
                {[
                  { label: "Dette technique resorbee", value: "85%", color: "bg-primary" },
                  { label: "Agilite de deploiement", value: "x4", color: "bg-secondary" },
                  { label: "Satisfaction equipe tech", value: "92%", color: "bg-white" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-2 text-sm text-muted">
                      <span>{item.label}</span>
                      <span className="font-bold text-text">{item.value}</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", item.color)} style={{ width: item.value === "x4" ? "65%" : item.value }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 bg-primary/5 border border-primary/20 rounded-2xl text-sm text-muted">
                "En 3 mois, Yodev a transforme notre ERP monolithique en une
                architecture micro-services pilotable par IA."
                <div className="mt-4 flex items-center gap-3 text-xs text-text">
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                  <div>
                    <p className="font-bold">Marc D.</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted">
                      CTO @ Industrie-Tech ETI
                    </p>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </Container>
      </section>

      {/* Methodology */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Notre methodologie "Zero-Risk"
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Une approche structuree pour garantir la continuite pendant la
              mutation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((step) => (
              <GlassPanel key={step.title} className="p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.detail}</p>
              </GlassPanel>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        eyebrow={t("ai.title")}
        title="Pret a moderniser votre legacy ?"
        subtitle="Audit technique et roadmap IA sous 48h, sans interruption de service."
        ctaLabel="Demander un audit legacy"
        ctaHref="/bookings/legacy-roi-analysis"
        secondaryLabel="Voir nos cas clients"
        secondaryHref="/work"
        variant="card"
      />
    </>
  );
}

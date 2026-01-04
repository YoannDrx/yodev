"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Shield,
  Lock,
  AlertTriangle,
  Radar,
  FileCheck,
  ArrowRight,
  Server,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { CtaSection } from "@/components/sections";
import { FadeIn, SlideIn, Parallax } from "@/components/motion";
import { cn } from "@/lib/utils";

const tabs = {
  compliance: {
    title: "Compliance & Audit",
    items: [
      "RGPD & SOC2: politiques, preuves et procedures audit-ready.",
      "Mapping des donnees sensibles et plan de retention.",
      "Patching et hardening des environnements critiques.",
    ],
  },
  defense: {
    title: "Defense active",
    items: [
      "Pentests OWASP et scan continu des vulnerabilites.",
      "Detection d'anomalies et surveillance 24/7.",
      "Plans de reponse aux incidents et exercices de crise.",
    ],
  },
};

const securityLayers = [
  {
    title: "Zero Trust",
    description: "Segmentation reseau et acces par moindre privilege.",
    icon: Shield,
  },
  {
    title: "Data Vault",
    description: "Chiffrement en transit et au repos, rotation de cles.",
    icon: Lock,
  },
  {
    title: "Threat Intel",
    description: "Veille active et detection precoce des signaux faibles.",
    icon: Radar,
  },
  {
    title: "Audit Trails",
    description: "Logs immuables et preuves conformes aux standards.",
    icon: FileCheck,
  },
];

export function CybersecurityComplianceServiceContent() {
  const t = useTranslations("Services");
  const [activeTab, setActiveTab] = useState<keyof typeof tabs>("compliance");

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden security-grid">
        <div className="absolute inset-0 -z-10 mesh-gradient" />
        <Parallax className="pointer-events-none absolute inset-0">
          <div className="hero-glow -top-20 -left-20" />
          <div className="hero-glow bottom-0 right-0 opacity-30" />
        </Parallax>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <FadeIn>
                <Badge variant="primary" className="mb-2">
                  Cyber-resilience & Zero Trust
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] text-gradient">
                  Securite de grade
                  <br />
                  <span className="text-primary italic">bancaire</span> pour PME
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
                  Migration zero-downtime, conformite RGPD/SOC2 et protection
                  active 24/7. Nous transformons vos vulnerabilites en
                  forteresses numeriques.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <ButtonLink
                    href="/bookings/security-risk-audit"
                    size="lg"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                    className="px-8 py-4 rounded-full shadow-[0_0_20px_rgba(27,168,150,0.3)]"
                  >
                    Demander un audit
                  </ButtonLink>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <span className="text-primary font-bold">Reponse &lt; 2h</span>
                    <span className="h-4 w-px bg-white/10" />
                    <span>Disponibilite 24/7</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <SlideIn direction="right">
              <GlassPanel className="p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <div className="space-y-6">
                  {[
                    { label: "SOC2 / RGPD", value: "Audit-ready", icon: FileCheck },
                    { label: "Temps de reaction", value: "< 2 heures", icon: AlertTriangle },
                    { label: "Monitoring", value: "24/7", icon: Radar },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 px-5 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-widest text-muted">
                              {item.label}
                            </p>
                            <p className="font-semibold">{item.value}</p>
                          </div>
                        </div>
                        <Server className="h-5 w-5 text-secondary/80" />
                      </div>
                    );
                  })}
                </div>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Compliance vs Defense */}
      <section className="py-24 bg-dark/50 border-y border-white/5">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Gouvernance & securite
              </Badge>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Protection continue et conformite mesurable.
              </h2>
              <div className="flex items-center gap-3 mb-8">
                {Object.keys(tabs).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as keyof typeof tabs)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                      activeTab === key
                        ? "bg-primary text-dark"
                        : "bg-white/5 text-muted hover:text-text"
                    )}
                  >
                    {key === "compliance" ? "Compliance" : "Defense"}
                  </button>
                ))}
              </div>
              <GlassPanel className="p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">{tabs[activeTab].title}</h3>
                <ul className="space-y-3 text-sm text-muted">
                  {tabs[activeTab].items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {securityLayers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <GlassPanel key={layer.title} className="p-6 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">{layer.title}</h4>
                    <p className="text-sm text-muted">{layer.description}</p>
                  </GlassPanel>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        eyebrow={t("cybersecurity.title")}
        title="Blindez vos actifs numeriques."
        subtitle="Audit de securite, roadmap de correction et accompagnement continu."
        ctaLabel="Reserver un audit"
        ctaHref="/bookings/security-risk-audit"
        secondaryLabel="Voir nos offres"
        secondaryHref="/services"
        variant="card"
      />
    </>
  );
}

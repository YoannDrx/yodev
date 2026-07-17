"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import {
  ArrowRight,
  TrendingUp,
  Sparkles,
  ClipboardCheck,
  Workflow,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CaseStudy = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  results: string[];
  color: string;
  icon: typeof TrendingUp;
};

const workContent: Record<
  "fr" | "en",
  {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    contactCta: string;
    caseEyebrow: string;
    caseTitle: string;
    caseStatus: string;
    caseStudies: CaseStudy[];
    stats: { value: string; label: string }[];
    sectorsEyebrow: string;
    sectorsTitle: string;
    sectorsSubtitle: string;
    sectors: { name: string; signal: string }[];
    ctaEyebrow: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaLabel: string;
    ctaSecondary: string;
  }
> = {
  fr: {
    eyebrow: "Réalisations sélectionnées",
    titleLead: "Des décisions",
    titleAccent: "rendues visibles.",
    subtitle:
      "Des produits personnels utilisés comme preuves de cadrage, d’UX, d’architecture et de fiabilité — sans résultat client inventé.",
    contactCta: "Discuter de votre projet",
    caseEyebrow: "Études de travail",
    caseTitle: "Trois angles complémentaires",
    caseStatus: "Documentation détaillée en préparation",
    caseStudies: [
      {
        slug: "moodday",
        title: "Moodday",
        type: "Produit sensible / Santé mentale",
        summary:
          "Refonte d’un compagnon de suivi personnel avec confidentialité, parcours aidant et synchronisation hors ligne explicite.",
        results: ["Confidentialité", "Offline-first"],
        color: "from-blue-500/20 to-primary/10",
        icon: ClipboardCheck,
      },
      {
        slug: "jobio",
        title: "Jobio",
        type: "Produit / Workflow commercial",
        summary:
          "Réduction d’un produit trop large vers cinq parcours cœur et trois priorités commerciales maximum par jour.",
        results: ["Périmètre V1", "Workflow actionnable"],
        color: "from-orange-500/20 to-pink-500/10",
        icon: Workflow,
      },
      {
        slug: "mycryptopilot",
        title: "MyCryptoPilot",
        type: "Architecture / Sécurité",
        summary:
          "Démonstrateur testnet orienté risque, connexions read-only et suppression des performances fictives.",
        results: ["Testnet", "Risk-first"],
        color: "from-green-500/20 to-primary/10",
        icon: Cpu,
      },
    ],
    stats: [
      { value: "Produit", label: "Cadrage" },
      { value: "UX", label: "Parcours" },
      { value: "Code", label: "Fiabilité" },
      { value: "Livraison", label: "Transfert" },
    ],
    sectorsEyebrow: "Types de problèmes",
    sectorsTitle: "Des contraintes différentes, une méthode traçable",
    sectorsSubtitle:
      "Le domaine change ; les hypothèses, décisions et critères de validation restent explicites.",
    sectors: [
      { name: "Produits SaaS", signal: "Web" },
      { name: "Applications métier", signal: "UX" },
      { name: "Produits sensibles", signal: "Privacy" },
      { name: "Outils data", signal: "Fiabilité" },
    ],
    ctaEyebrow: "Votre projet",
    ctaTitle: "Un cas concret à cadrer ?",
    ctaSubtitle:
      "Décrivez le problème et les contraintes pour identifier la première décision utile.",
    ctaLabel: "Qualifier le projet",
    ctaSecondary: "Voir les services",
  },
  en: {
    eyebrow: "Selected work",
    titleLead: "Decisions",
    titleAccent: "made visible.",
    subtitle:
      "Personal products used as evidence of product framing, UX, architecture and reliability — without invented client outcomes.",
    contactCta: "Discuss your project",
    caseEyebrow: "Work studies",
    caseTitle: "Three complementary angles",
    caseStatus: "Detailed documentation in progress",
    caseStudies: [
      {
        slug: "moodday",
        title: "Moodday",
        type: "Sensitive product / Mental health",
        summary:
          "Redesign of a personal tracking companion with privacy, caregiver journeys and explicit offline synchronization.",
        results: ["Privacy", "Offline-first"],
        color: "from-blue-500/20 to-primary/10",
        icon: ClipboardCheck,
      },
      {
        slug: "jobio",
        title: "Jobio",
        type: "Product / Sales workflow",
        summary:
          "Reduction of an oversized product into five core journeys and no more than three commercial priorities per day.",
        results: ["V1 scope", "Actionable workflow"],
        color: "from-orange-500/20 to-pink-500/10",
        icon: Workflow,
      },
      {
        slug: "mycryptopilot",
        title: "MyCryptoPilot",
        type: "Architecture / Security",
        summary:
          "Risk-first testnet demonstrator with read-only connections and no fictional performance metrics.",
        results: ["Testnet", "Risk-first"],
        color: "from-green-500/20 to-primary/10",
        icon: Cpu,
      },
    ],
    stats: [
      { value: "Product", label: "Framing" },
      { value: "UX", label: "Journeys" },
      { value: "Code", label: "Reliability" },
      { value: "Delivery", label: "Handover" },
    ],
    sectorsEyebrow: "Problem types",
    sectorsTitle: "Different constraints, a traceable method",
    sectorsSubtitle:
      "The domain changes; assumptions, decisions and validation criteria remain explicit.",
    sectors: [
      { name: "SaaS products", signal: "Web" },
      { name: "Business applications", signal: "UX" },
      { name: "Sensitive products", signal: "Privacy" },
      { name: "Data tools", signal: "Reliability" },
    ],
    ctaEyebrow: "Your project",
    ctaTitle: "A concrete case to frame?",
    ctaSubtitle:
      "Describe the problem and constraints to identify the first useful decision.",
    ctaLabel: "Qualify the project",
    ctaSecondary: "See services",
  },
};

export default function WorkPage() {
  const locale = useLocale() === "en" ? "en" : "fr";
  const copy = workContent[locale];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-orange-500/10" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <Badge variant="primary" className="mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                {copy.eyebrow}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-6">
                <span className="text-gradient">{copy.titleLead}</span>
                <br />
                <span className="text-primary">{copy.titleAccent}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
                {copy.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <ButtonLink
                href="/contact"
                size="lg"
                className="px-8 shadow-[0_0_30px_rgba(27,168,150,0.3)]"
              >
                {copy.contactCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-white/5">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {copy.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-display font-black text-text">
                  {stat.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-muted mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                {copy.caseEyebrow}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                {copy.caseTitle}
              </h2>
            </FadeIn>
          </div>

          <div className="space-y-8">
            {copy.caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div className="group">
                    <GlassPanel
                      className={cn(
                        "p-8 md:p-12 rounded-3xl relative overflow-hidden",
                        "hover:border-primary/40 transition-all duration-500",
                        "hover:-translate-y-1"
                      )}
                    >
                      {/* Background gradient */}
                      <div
                        className={cn(
                          "absolute inset-0 -z-10 bg-gradient-to-br opacity-50",
                          study.color
                        )}
                      />

                      <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-dark transition-all">
                              <Icon className="w-5 h-5" />
                            </div>
                            <Badge variant="outline" size="sm">
                              {study.type}
                            </Badge>
                          </div>

                          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                            {study.title}
                          </h3>

                          <p className="text-muted mb-6 max-w-2xl">
                            {study.summary}
                          </p>

                          {/* Results */}
                          <div className="flex flex-wrap gap-3 mb-6">
                            {study.results.map((result) => (
                              <div
                                key={result}
                                className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                              >
                                <span className="text-sm font-bold text-primary">
                                  {result}
                                </span>
                              </div>
                            ))}
                          </div>

                          <span className="inline-flex items-center text-muted font-medium">
                            {copy.caseStatus}
                          </span>
                        </div>

                        {/* Decorative element */}
                        <div className="hidden lg:flex items-center justify-center">
                          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                            <Icon className="w-16 h-16 text-primary/40" />
                          </div>
                        </div>
                      </div>
                    </GlassPanel>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-dark/50">
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                {copy.sectorsEyebrow}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                {copy.sectorsTitle}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted max-w-xl mx-auto">
                {copy.sectorsSubtitle}
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {copy.sectors.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassPanel className="p-6 rounded-2xl text-center">
                  <p className="text-2xl font-display font-black text-primary mb-1">
                    {industry.signal}
                  </p>
                  <p className="text-sm font-medium">{industry.name}</p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection
        eyebrow={copy.ctaEyebrow}
        title={copy.ctaTitle}
        subtitle={copy.ctaSubtitle}
        ctaLabel={copy.ctaLabel}
        ctaHref="/contact"
        secondaryLabel={copy.ctaSecondary}
        secondaryHref="/services"
        variant="card"
      />
    </>
  );
}

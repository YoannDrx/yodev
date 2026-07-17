"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { FadeIn, SlideIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import {
  Code,
  Eye,
  Heart,
  Sparkles,
  Rocket,
  Target,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ValueItem = {
  title: string;
  description: string;
};

const valueIcons = [Code, Eye, Shield];

const aboutContent = {
  fr: {
    stats: [
      { value: "Direct", label: "Échanges" },
      { value: "Produit", label: "Cadrage" },
      { value: "Code", label: "Livraison" },
      { value: "Clair", label: "Transfert" },
    ],
    storyEyebrow: "Notre approche",
    highlights: [
      {
        title: "Contraintes d’abord",
        description:
          "Le périmètre, les inconnues et les risques sont nommés avant de proposer une solution.",
      },
      {
        title: "Responsable identifié",
        description:
          "Vous savez qui décide, qui réalise et qui répond pour chaque livrable.",
      },
      {
        title: "Transfert prévu",
        description:
          "Code, documentation et décisions restent exploitables après la mission.",
      },
    ],
    approachEyebrow: "Organisation",
    approachTitle: "Un studio compact, sans équipe fictive",
    approachBody:
      "Le noyau de la mission reste volontairement resserré. Si une compétence complémentaire est nécessaire, son rôle, son périmètre et son mode d’intervention sont annoncés avant le démarrage.",
    approachItems: [
      "Un interlocuteur responsable du résultat",
      "Des rôles et limites écrits dans le cadrage",
      "Aucune capacité ou certification présentée sans preuve",
      "Une documentation conçue pour la reprise",
    ],
  },
  en: {
    stats: [
      { value: "Direct", label: "Communication" },
      { value: "Product", label: "Framing" },
      { value: "Code", label: "Delivery" },
      { value: "Clear", label: "Handover" },
    ],
    storyEyebrow: "Our approach",
    highlights: [
      {
        title: "Constraints first",
        description:
          "Scope, unknowns and risks are named before a solution is proposed.",
      },
      {
        title: "Named ownership",
        description:
          "You know who decides, who builds and who is accountable for each deliverable.",
      },
      {
        title: "Handover by design",
        description:
          "Code, documentation and decisions remain usable after the engagement.",
      },
    ],
    approachEyebrow: "Organization",
    approachTitle: "A compact studio, without an invented team",
    approachBody:
      "The engagement stays deliberately focused. When a complementary skill is needed, its role, scope and working model are agreed before work begins.",
    approachItems: [
      "One owner accountable for the outcome",
      "Roles and limits written into the scope",
      "No capability or certification shown without evidence",
      "Documentation designed for handover",
    ],
  },
} as const;

const highlightIcons = [Target, Shield, Rocket];
const highlightColors = [
  "text-primary bg-primary/10",
  "text-blue-400 bg-blue-400/10",
  "text-orange-400 bg-orange-400/10",
];

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  const locale = useLocale() === "en" ? "en" : "fr";
  const copy = aboutContent[locale];
  const values = t.raw("values") as ValueItem[];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <Badge variant="primary" className="mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                {t("eyebrow")}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-6">
                <span className="text-gradient">{t("title")}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
                {t("subtitle")}
              </p>
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
                <p className="text-3xl md:text-4xl font-display font-black text-primary">
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

      {/* Story Section */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                {copy.storyEyebrow}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                {t("storyTitle")}
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                {t("storyBody")
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            </FadeIn>

            <SlideIn direction="right">
              <div className="space-y-4">
                {copy.highlights.map((item, index) => {
                  const Icon = highlightIcons[index] ?? Target;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <GlassPanel className="p-5 rounded-xl">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                              highlightColors[index] ?? highlightColors[0]
                            )}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold mb-1">{item.title}</h3>
                            <p className="text-sm text-muted">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </GlassPanel>
                    </motion.div>
                  );
                })}
              </div>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-dark/50">
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                {t("valuesEyebrow")}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                {t("valuesTitle")}
              </h2>
            </FadeIn>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = valueIcons[index] || Heart;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassPanel className="p-8 rounded-2xl h-full hover:border-primary/30 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-dark transition-all">
                      <Icon className="w-7 h-7 text-primary group-hover:text-dark transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Operating model */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                {copy.approachEyebrow}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                {copy.approachTitle}
              </h2>
              <p className="text-muted mb-8">
                {copy.approachBody}
              </p>
            </FadeIn>

            <SlideIn direction="right">
              <GlassPanel className="p-8 rounded-3xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  {copy.approachItems.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <span className="font-mono text-xs font-bold text-primary">
                        0{index + 1}
                      </span>
                      <p className="mt-3 text-sm font-medium leading-relaxed">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection
        eyebrow={t("ctaEyebrow")}
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        ctaLabel={t("ctaButton")}
        ctaHref="/contact"
        variant="card"
      />
    </>
  );
}

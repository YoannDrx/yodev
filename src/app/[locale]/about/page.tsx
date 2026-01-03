"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { FadeIn, SlideIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import {
  Users,
  Code,
  Eye,
  Heart,
  ArrowRight,
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

const valueIcons = [Code, Eye, Users];

const stats = [
  { value: "2018", label: "Création" },
  { value: "4", label: "Experts seniors" },
  { value: "200+", label: "Projets livrés" },
  { value: "98%", label: "Clients satisfaits" },
];

const highlights = [
  {
    icon: Target,
    title: "Focus résultats",
    description: "On ne facture pas des heures. On livre de la valeur mesurable.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Shield,
    title: "Zéro intermédiaire",
    description: "Vous parlez directement aux experts qui codent votre projet.",
    color: "text-blue-400 bg-blue-400/10",
  },
  {
    icon: Rocket,
    title: "Rapidité d'exécution",
    description: "Petite équipe = décisions rapides = livraison en temps record.",
    color: "text-orange-400 bg-orange-400/10",
  },
];

export default function AboutPage() {
  const t = useTranslations("AboutPage");
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
            {stats.map((stat, index) => (
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
                Notre histoire
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
                {highlights.map((item, index) => {
                  const Icon = item.icon;
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
                              item.color
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

      {/* Team Preview */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                L'équipe
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                4 experts complémentaires
              </h2>
              <p className="text-muted mb-8">
                Pas de commercial, pas de chef de projet, pas de junior caché.
                L'expert qui fait est celui qui vous répond. C'est notre
                garantie de qualité.
              </p>
              <a
                href="/team"
                className="inline-flex items-center gap-2 text-primary font-bold hover:translate-x-1 transition-transform"
              >
                Découvrir l'équipe
                <ArrowRight className="w-4 h-4" />
              </a>
            </FadeIn>

            <SlideIn direction="right">
              <GlassPanel className="p-8 rounded-3xl">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { role: "Lead Dev & IA", expertise: "Architecture, LLMs" },
                    { role: "Full-Stack", expertise: "React, Node, Cloud" },
                    { role: "UX/UI Designer", expertise: "Design Systems" },
                    { role: "DevOps & Sécu", expertise: "AWS, Pentests" },
                  ].map((member, index) => (
                    <motion.div
                      key={member.role}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mx-auto mb-3">
                        <Users className="w-8 h-8 text-primary/60" />
                      </div>
                      <p className="font-bold text-sm">{member.role}</p>
                      <p className="text-xs text-muted">{member.expertise}</p>
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

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  TrendingUp,
  Sparkles,
  ShoppingCart,
  Smartphone,
  Cpu,
  Cloud,
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

const caseStudies: CaseStudy[] = [
  {
    slug: "saas-b2b",
    title: "Plateforme SaaS B2B",
    type: "SaaS / Web App",
    summary:
      "Développement d'une plateforme de gestion pour les équipes commerciales avec dashboard analytics et automatisation.",
    results: ["+40% productivité", "ROI en 3 mois"],
    color: "from-blue-500/20 to-primary/10",
    icon: TrendingUp,
  },
  {
    slug: "ecommerce-refonte",
    title: "Refonte E-commerce Premium",
    type: "E-commerce",
    summary:
      "Refonte complète d'une boutique en ligne haut de gamme avec optimisation performance et nouveau tunnel d'achat.",
    results: ["+120% conversion", "Lighthouse 95+"],
    color: "from-orange-500/20 to-pink-500/10",
    icon: ShoppingCart,
  },
  {
    slug: "app-coaching",
    title: "App de Coaching Sportif",
    type: "Mobile App",
    summary:
      "Application mobile de coaching personnalisé avec suivi en temps réel, programmes adaptatifs et gamification.",
    results: ["MVP en 8 sem.", "4.8★ App Store"],
    color: "from-green-500/20 to-primary/10",
    icon: Smartphone,
  },
  {
    slug: "ai-modernization",
    title: "Modernisation IA & Data",
    type: "IA / Data",
    summary:
      "Refonte d'un pipeline data industriel avec agents IA et architecture event-driven.",
    results: ["-40% coûts", "2,4 s/commande"],
    color: "from-primary/20 to-secondary/10",
    icon: Cpu,
  },
  {
    slug: "legacy-to-cloud",
    title: "Legacy-to-Cloud ETI 500+",
    type: "Modernisation IT",
    summary:
      "Migration cloud-native d'un monolithe critique avec zéro downtime et infra optimisée.",
    results: ["-42% infra", "99.99% uptime"],
    color: "from-blue-500/20 to-primary/10",
    icon: Cloud,
  },
];

const stats = [
  { value: "200+", label: "Projets livrés" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "50+", label: "Projets IA" },
  { value: "15+", label: "Experts seniors" },
];

export default function WorkPage() {
  const t = useTranslations("WorkPage");

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
                {t("eyebrow") || "Nos Réalisations"}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-6">
                <span className="text-gradient">Projets qui</span>
                <br />
                <span className="text-primary">Performent.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
                {t("subtitle") ||
                  "Des solutions digitales qui génèrent des résultats mesurables. Découvrez comment nous avons transformé les défis de nos clients en succès."}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <ButtonLink
                href="/contact"
                size="lg"
                className="px-8 shadow-[0_0_30px_rgba(27,168,150,0.3)]"
              >
                Discuter de votre projet
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
            {stats.map((stat, index) => (
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
                Case Studies
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                Projets Phares
              </h2>
            </FadeIn>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={`/work/${study.slug}` as any}
                    className="block group"
                  >
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

                          <span className="inline-flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                            Voir le case study
                            <ArrowRight className="ml-2 w-4 h-4" />
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
                  </Link>
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
                Industries
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                Secteurs d'Expertise
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted max-w-xl mx-auto">
                Notre expérience couvre de nombreux secteurs, avec une expertise
                particulière en SaaS, e-commerce et applications mobiles.
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "SaaS & Startups", count: "50+" },
              { name: "E-commerce", count: "40+" },
              { name: "Fintech", count: "20+" },
              { name: "Santé & Biotech", count: "15+" },
            ].map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassPanel className="p-6 rounded-2xl text-center">
                  <p className="text-2xl font-display font-black text-primary mb-1">
                    {industry.count}
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
        eyebrow="Votre projet"
        title="Prêt à créer quelque chose d'exceptionnel ?"
        subtitle="Discutons de vos objectifs et voyons comment transformer votre vision en réalité."
        ctaLabel="Démarrer un projet"
        ctaHref="/contact"
        secondaryLabel="Voir nos services"
        secondaryHref="/services"
        variant="card"
      />
    </>
  );
}

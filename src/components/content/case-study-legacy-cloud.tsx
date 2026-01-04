"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, Cloud, Shield, Layers, Server, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { CtaSection } from "@/components/sections";
import { FadeIn, SlideIn, Parallax } from "@/components/motion";

const migrationSteps = [
  {
    title: "Audit Legacy",
    description: "Cartographie des dependances, flux critiques et goulots.",
    icon: Server,
  },
  {
    title: "Strangler Pattern",
    description: "Decouplage progressif par domaines metier.",
    icon: Layers,
  },
  {
    title: "Cloud Foundation",
    description: "IaC, reseau securise, observabilite native.",
    icon: Cloud,
  },
  {
    title: "DevSecOps",
    description: "CI/CD securise, tests automatiques et monitoring.",
    icon: Shield,
  },
];

const outcomeMetrics = [
  { label: "Infra", value: "-42%" },
  { label: "Uptime", value: "99.99%" },
  { label: "Deploys", value: "x5" },
  { label: "Time-to-market", value: "-60%" },
];

export function LegacyCloudCaseStudy() {
  const t = useTranslations("CaseStudies");

  const caseData = {
    title: t("legacy-to-cloud.title"),
    type: t("legacy-to-cloud.type"),
    summary: t("legacy-to-cloud.summary"),
    context: t("legacy-to-cloud.context"),
    challenge: t("legacy-to-cloud.challenge"),
    solution: t("legacy-to-cloud.solution"),
    results: t.raw("legacy-to-cloud.results") as string[],
    testimonial: {
      quote: t("legacy-to-cloud.testimonial.quote"),
      author: t("legacy-to-cloud.testimonial.author"),
      role: t("legacy-to-cloud.testimonial.role"),
    },
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-primary/10" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />
        <Parallax className="pointer-events-none absolute inset-0">
          <div className="orb -top-10 right-0 w-72 h-72" />
          <div className="orb orb-secondary bottom-0 left-0 w-80 h-80" />
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
                <Badge variant="outline" className="mb-4">
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
              <GlassPanel className="p-8 rounded-3xl">
                <p className="text-xs uppercase tracking-widest text-muted mb-6">
                  Profil client
                </p>
                <div className="space-y-4 text-sm text-muted">
                  <div className="flex items-center justify-between">
                    <span>Collaborateurs</span>
                    <span className="text-text font-semibold">500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Stack initiale</span>
                    <span className="text-text font-semibold">Monolithe 12 ans</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Contraintes</span>
                    <span className="text-text font-semibold">Zero downtime</span>
                  </div>
                </div>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Legacy vs Cloud */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8">
            <FadeIn>
              <GlassPanel className="p-8 rounded-3xl code-block">
                <p className="text-xs uppercase tracking-widest text-muted mb-4">
                  Legacy monolithe
                </p>
                <pre className="text-xs text-muted leading-relaxed overflow-x-auto">
{`class OrderService {
  process(order) {
    legacyDb.connect();
    validate(order);
    batchPricing(order);
    syncWarehouse(order);
    return legacyReport();
  }
}`}
                </pre>
              </GlassPanel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <GlassPanel className="p-8 rounded-3xl code-block">
                <p className="text-xs uppercase tracking-widest text-muted mb-4">
                  Cloud-native
                </p>
                <pre className="text-xs text-primary leading-relaxed overflow-x-auto">
{`const events = await bus.publish("order.received", order);
await Promise.all([
  pricingService.validate(order),
  aiAgent.enrich(order),
  warehouseService.reserve(order)
]);`}
                </pre>
              </GlassPanel>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Migration Timeline */}
      <section className="py-24 bg-dark/50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Blueprint
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Roadmap de migration zero risque.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {migrationSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassPanel className="p-6 rounded-2xl h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted">{step.description}</p>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Outcomes */}
      <section className="py-24">
        <Container>
          <GlassPanel className="p-10 rounded-[2.5rem]">
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
              <div>
                <Badge variant="primary" className="mb-4">
                  Resultats
                </Badge>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  Un SI plus agile, plus fiable, plus rentable.
                </h3>
                <p className="text-muted">{caseData.solution}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {outcomeMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="glass-panel p-4 rounded-2xl text-center"
                  >
                    <p className="text-xs uppercase tracking-widest text-muted">
                      {metric.label}
                    </p>
                    <p className="text-2xl font-display font-black text-primary mt-2">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </Container>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <Container>
          <GlassPanel className="p-10 md:p-14 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
              <p className="text-xl md:text-2xl font-display font-semibold leading-relaxed mb-8">
                "{caseData.testimonial.quote}"
              </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">{caseData.testimonial.author}</p>
                <p className="text-sm text-muted">{caseData.testimonial.role}</p>
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

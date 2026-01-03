"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { FadeIn, SlideIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import {
  Lightbulb,
  Palette,
  Code,
  Rocket,
  Clock,
  FileCheck,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MethodStep = {
  number: string;
  title: string;
  duration: string;
  description: string;
  deliverable: string;
};

type Commitments = {
  title: string;
  items: string[];
};

const stepIcons = [Lightbulb, Palette, Code, Rocket];
const stepColors = [
  "from-blue-500/20 to-primary/10",
  "from-purple-500/20 to-pink-500/10",
  "from-primary/20 to-blue-500/10",
  "from-orange-500/20 to-red-500/10",
];

export default function MethodPage() {
  const t = useTranslations("MethodPage");
  const steps = t.raw("steps") as MethodStep[];
  const commitments = t.raw("commitments") as Commitments;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-primary/10" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

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

      {/* Timeline Section */}
      <section className="py-24">
        <Container>
          <div className="relative">
            {/* Vertical line (desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

            <div className="space-y-12 lg:space-y-24">
              {steps.map((step, index) => {
                const Icon = stepIcons[index] || Lightbulb;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={cn(
                      "relative grid lg:grid-cols-2 gap-8 items-center",
                      isEven ? "lg:pr-[52%]" : "lg:pl-[52%]"
                    )}
                  >
                    {/* Timeline dot (desktop) */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-dark border-4 border-primary items-center justify-center z-10">
                      <span className="text-sm font-bold text-primary">
                        {step.number}
                      </span>
                    </div>

                    {/* Card */}
                    <GlassPanel
                      className={cn(
                        "p-8 rounded-3xl relative overflow-hidden",
                        isEven ? "lg:order-1" : "lg:order-1"
                      )}
                    >
                      {/* Background gradient */}
                      <div
                        className={cn(
                          "absolute inset-0 -z-10 bg-gradient-to-br opacity-50",
                          stepColors[index] || stepColors[0]
                        )}
                      />

                      {/* Mobile number */}
                      <div className="lg:hidden flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">
                            {step.number}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5">
                          <Clock className="w-4 h-4 text-muted" />
                          <span className="text-sm text-muted">
                            {step.duration}
                          </span>
                        </div>
                      </div>

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="hidden lg:flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5">
                              <Clock className="w-4 h-4 text-muted" />
                              <span className="text-sm text-muted">
                                {step.duration}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-xl md:text-2xl font-display font-bold">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Deliverable */}
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10">
                        <FileCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">
                            Livrable
                          </p>
                          <p className="text-sm font-medium">
                            {step.deliverable}
                          </p>
                        </div>
                      </div>
                    </GlassPanel>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Commitments Section */}
      <section className="py-24 bg-dark/50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                Nos garanties
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                {commitments.title}
              </h2>
              <p className="text-muted mb-8">
                Ce ne sont pas des slogans marketing. Ce sont des engagements
                contractuels qu'on respecte sur chaque projet.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-primary font-bold hover:translate-x-1 transition-transform"
              >
                Discuter de votre projet
                <ArrowRight className="w-4 h-4" />
              </a>
            </FadeIn>

            <SlideIn direction="right">
              <GlassPanel className="p-8 rounded-3xl">
                <div className="space-y-6">
                  {commitments.items.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm leading-relaxed pt-1">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Process Summary */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                En résumé
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                De l'idée au lancement en 6-10 semaines
              </h2>
            </FadeIn>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              { week: "Semaine 1", label: "Cadrage & brief", color: "blue" },
              { week: "Semaines 2-3", label: "Design & UX", color: "purple" },
              {
                week: "Semaines 4-8",
                label: "Développement",
                color: "primary",
              },
              { week: "Semaine 9-10", label: "Lancement", color: "orange" },
            ].map((phase, index) => (
              <motion.div
                key={phase.week}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassPanel className="p-6 rounded-2xl text-center h-full">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    {phase.week}
                  </p>
                  <p className="font-bold text-lg">{phase.label}</p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <p className="text-center text-sm text-muted mt-8 max-w-2xl mx-auto">
              Ces durées sont indicatives et varient selon la complexité du
              projet. On s'engage sur un planning précis dès le début.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection
        title="Prêt à démarrer votre projet ?"
        subtitle="On vous fait un planning détaillé sous 48h après notre premier échange."
        ctaLabel="Planifier un appel"
        ctaHref="/contact"
        secondaryLabel="Voir nos offres"
        secondaryHref="/offers"
        variant="card"
      />
    </>
  );
}

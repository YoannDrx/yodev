"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, SlideIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Target,
  Lightbulb,
  TrendingUp,
  Quote,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CaseStudySlug = string;

const slugToGradient: Record<string, string> = {
  "saas-b2b": "from-blue-500/20 to-primary/10",
  "ecommerce-refonte": "from-orange-500/20 to-pink-500/10",
  "app-coaching": "from-green-500/20 to-primary/10",
};

export function CaseStudyContent({ slug }: { slug: CaseStudySlug }) {
  const t = useTranslations("CaseStudies");

  const caseData = {
    title: t(`${slug}.title`),
    type: t(`${slug}.type`),
    summary: t(`${slug}.summary`),
    context: t(`${slug}.context`),
    challenge: t(`${slug}.challenge`),
    solution: t(`${slug}.solution`),
    results: t.raw(`${slug}.results`) as string[],
    testimonial: {
      quote: t(`${slug}.testimonial.quote`),
      author: t(`${slug}.testimonial.author`),
      role: t(`${slug}.testimonial.role`),
    },
  };

  const gradient = slugToGradient[slug] || "from-primary/20 to-blue-500/10";

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 -z-10 bg-gradient-to-br",
            gradient
          )}
        />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

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

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn delay={0.1}>
                <Badge variant="primary" className="mb-4">
                  {caseData.type}
                </Badge>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-[1.1] mb-6">
                  <span className="text-gradient">{caseData.title}</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-lg md:text-xl text-muted mb-8">
                  {caseData.summary}
                </p>
              </FadeIn>

              {/* Key Results Preview */}
              <FadeIn delay={0.4}>
                <div className="flex flex-wrap gap-3">
                  {caseData.results.slice(0, 2).map((result) => (
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
              </FadeIn>
            </div>

            {/* Stats Card */}
            <SlideIn direction="right">
              <GlassPanel className="p-8 rounded-3xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-6">
                  Résultats clés
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {caseData.results.map((result, index) => (
                    <motion.div
                      key={result}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{result}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Context Section */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-[300px_1fr] gap-12">
            <FadeIn>
              <div className="sticky top-32">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-blue-400" />
                </div>
                <Badge variant="outline" className="mb-2">
                  {t("contextEyebrow")}
                </Badge>
                <h2 className="text-2xl font-display font-bold">
                  {t("contextTitle")}
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <GlassPanel className="p-8 md:p-12 rounded-2xl">
                <p className="text-lg text-muted leading-relaxed">
                  {caseData.context}
                </p>
              </GlassPanel>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Challenge Section */}
      <section className="py-24 bg-dark/50">
        <Container>
          <div className="grid lg:grid-cols-[300px_1fr] gap-12">
            <FadeIn>
              <div className="sticky top-32">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <Lightbulb className="w-7 h-7 text-orange-400" />
                </div>
                <Badge variant="outline" className="mb-2">
                  {t("challengeEyebrow")}
                </Badge>
                <h2 className="text-2xl font-display font-bold">
                  {t("challengeTitle")}
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <GlassPanel className="p-8 md:p-12 rounded-2xl">
                <p className="text-lg text-muted leading-relaxed">
                  {caseData.challenge}
                </p>
              </GlassPanel>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-[300px_1fr] gap-12">
            <FadeIn>
              <div className="sticky top-32">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Layers className="w-7 h-7 text-primary" />
                </div>
                <Badge variant="outline" className="mb-2">
                  {t("solutionEyebrow")}
                </Badge>
                <h2 className="text-2xl font-display font-bold">
                  {t("solutionTitle")}
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <GlassPanel className="p-8 md:p-12 rounded-2xl">
                <p className="text-lg text-muted leading-relaxed">
                  {caseData.solution}
                </p>
              </GlassPanel>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-dark/50">
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                {t("resultsEyebrow")}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                {t("resultsTitle")}
              </h2>
            </FadeIn>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {caseData.results.map((result, index) => (
              <motion.div
                key={result}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassPanel className="p-6 rounded-2xl text-center h-full flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg font-bold text-primary">{result}</p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonial Section */}
      <section className="py-24">
        <Container className="max-w-4xl">
          <FadeIn>
            <GlassPanel className="p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

              <div className="relative text-center">
                <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />

                <blockquote className="text-xl md:text-2xl lg:text-3xl font-display font-medium leading-relaxed mb-8">
                  &ldquo;{caseData.testimonial.quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {caseData.testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold">{caseData.testimonial.author}</p>
                    <p className="text-sm text-muted">
                      {caseData.testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </FadeIn>
        </Container>
      </section>

      {/* Next Project */}
      <section className="py-16 border-t border-white/5">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-muted uppercase tracking-wider mb-2">
                Projet suivant
              </p>
              <p className="text-xl font-bold">Découvrir d'autres réalisations</p>
            </div>
            <ButtonLink href="/work" variant="glass" size="lg">
              Voir tous les projets
              <ArrowRight className="ml-2 w-4 h-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        ctaLabel={t("ctaButton")}
        ctaHref="/contact"
        variant="card"
      />
    </>
  );
}

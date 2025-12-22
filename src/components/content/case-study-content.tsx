"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

type CaseStudySlug = string;

export function CaseStudyContent({ slug }: { slug: CaseStudySlug }) {
  const t = useTranslations("CaseStudies");
  const nav = useTranslations("Nav");

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

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <Container>
          <FadeIn>
            <ButtonLink
              href="/work"
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              className="mb-8"
            >
              {nav("work")}
            </ButtonLink>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn delay={0.1}>
              <Badge variant="outline" className="mb-4">
                {caseData.type}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl font-bold text-text md:text-5xl">
                {caseData.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-6 text-lg text-muted">{caseData.summary}</p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Context Section */}
      <Section eyebrow={t("contextEyebrow")} title={t("contextTitle")}>
        <Card className="p-8">
          <p className="text-muted leading-relaxed">{caseData.context}</p>
        </Card>
      </Section>

      {/* Challenge Section */}
      <Section
        eyebrow={t("challengeEyebrow")}
        title={t("challengeTitle")}
        className="bg-surface/50"
      >
        <Card className="p-8">
          <p className="text-muted leading-relaxed">{caseData.challenge}</p>
        </Card>
      </Section>

      {/* Solution Section */}
      <Section eyebrow={t("solutionEyebrow")} title={t("solutionTitle")}>
        <Card className="p-8">
          <p className="text-muted leading-relaxed">{caseData.solution}</p>
        </Card>
      </Section>

      {/* Results Section */}
      <Section
        eyebrow={t("resultsEyebrow")}
        title={t("resultsTitle")}
        className="bg-surface/50"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {caseData.results.map((result, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="p-6">
                <p className="text-text">{result}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Testimonial Section */}
      <Section>
        <Card variant="elevated" className="p-8 md:p-12">
          <blockquote className="text-center">
            <p className="text-xl text-text md:text-2xl">
              &ldquo;{caseData.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-6">
              <p className="font-semibold text-text">
                {caseData.testimonial.author}
              </p>
              <p className="text-sm text-muted">{caseData.testimonial.role}</p>
            </footer>
          </blockquote>
        </Card>
      </Section>

      {/* CTA Section */}
      <Section className="py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text md:text-3xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-4 text-muted">{t("ctaSubtitle")}</p>
          <div className="mt-8">
            <ButtonLink
              href="/contact"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {t("ctaButton")}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

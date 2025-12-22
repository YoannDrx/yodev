"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { ArrowRight, Check } from "lucide-react";

type ServiceSlug = string;

export function ServiceContent({ service }: { service: ServiceSlug }) {
  const t = useTranslations("Services");
  const nav = useTranslations("Nav");

  const serviceData = {
    title: t(`${service}.title`),
    description: t(`${service}.description`),
    features: t.raw(`${service}.features`) as string[],
    benefits: t.raw(`${service}.benefits`) as string[],
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div className="absolute inset-0 -z-10 noise opacity-20" />

        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <Badge variant="primary" className="mb-4">
                {nav("services")}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-bold text-text md:text-5xl lg:text-6xl">
                {serviceData.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-muted">
                {serviceData.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {t("cta")}
                </ButtonLink>
                <ButtonLink href="/work" variant="secondary" size="lg">
                  {t("viewWork")}
                </ButtonLink>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <Section
        eyebrow={t("featuresEyebrow")}
        title={t("featuresTitle")}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceData.features.map((feature, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-text">{feature}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section
        eyebrow={t("benefitsEyebrow")}
        title={t("benefitsTitle")}
        className="bg-surface/50"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {serviceData.benefits.map((benefit, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 text-sm font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-muted">{benefit}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-16">
        <Card variant="elevated" className="overflow-hidden">
          <div className="relative flex flex-col items-center gap-6 p-8 text-center md:p-12">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
            <h2 className="text-2xl font-bold text-text md:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="max-w-xl text-muted">{t("ctaSubtitle")}</p>
            <ButtonLink
              href="/contact"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {t("ctaButton")}
            </ButtonLink>
          </div>
        </Card>
      </Section>
    </>
  );
}

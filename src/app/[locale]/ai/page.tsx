"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import { ArrowRight } from "lucide-react";

type ServiceItem = {
  title: string;
  description: string;
};

type ExpertiseItem = {
  title: string;
  description: string;
  result?: string;
};

type CaseItem = {
  name: string;
  description: string;
  result?: string;
};

type StatItem = {
  value: string;
  label: string;
};

export default function AiPage() {
  const t = useTranslations("AiPage");
  const services = t.raw("services") as ServiceItem[];
  const expertise = t.raw("expertise.items") as ExpertiseItem[];
  const cases = t.raw("cases") as CaseItem[];
  const reasons = t.raw("reasons") as string[];
  const teamStats = t.raw("teamStats") as StatItem[] | undefined;

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
                {t("eyebrow")}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-bold text-text md:text-5xl lg:text-6xl">
                {t("title")}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-muted">{t("subtitle")}</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex justify-center">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {t("cta")}
                </ButtonLink>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <Section eyebrow={t("servicesEyebrow")} title={t("servicesTitle")}>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.1}>
              <Card className="h-full p-6">
                <h3 className="text-lg font-semibold text-text">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{service.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Team Section with Stats */}
      <Section eyebrow={t("teamEyebrow")} title={t("teamTitle")}>
        <div className="space-y-8">
          <p className="max-w-3xl text-base text-muted md:text-lg">
            {t("teamBody")}
          </p>
          {teamStats && teamStats.length > 0 && (
            <div className="grid gap-6 md:grid-cols-3">
              {teamStats.map((stat) => (
                <Card key={stat.label} className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted">{stat.label}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Expertise Section */}
      <Section eyebrow={t("expertiseEyebrow")} title={t("expertiseTitle")}>
        <div className="grid gap-6 md:grid-cols-2">
          {expertise.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.1}>
              <Card className="h-full p-6">
                <h3 className="text-lg font-semibold text-text">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
                {item.result && (
                  <p className="mt-4 text-sm font-medium text-primary">
                    {item.result}
                  </p>
                )}
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Case Studies Section */}
      <Section eyebrow={t("casesEyebrow")} title={t("casesTitle")}>
        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((item, index) => (
            <FadeIn key={item.name} delay={index * 0.1}>
              <Card className="h-full p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-text">
                    {item.name}
                  </h3>
                  {item.result && (
                    <Badge variant="primary" className="text-xs">
                      {item.result}
                    </Badge>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Reasons Section */}
      <Section eyebrow={t("reasonsEyebrow")} title={t("reasonsTitle")}>
        <div className="grid gap-4 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <FadeIn key={reason} delay={index * 0.1}>
              <Card className="p-5">
                <p className="text-sm text-muted">{reason}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

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

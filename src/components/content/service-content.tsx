"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { ArrowRight, Check, Zap, Shield, Code, Palette, Smartphone, ShoppingCart, Brain } from "lucide-react";

type ServiceSlug = string;

type ServiceItem = {
  title: string;
  description: string;
};

type MethodologyStep = {
  title: string;
  description: string;
};

type ExpertiseItem = {
  title: string;
  description: string;
  result?: string;
};

type ProjectItem = {
  name: string;
  description: string;
  result: string;
};

const serviceIcons: Record<string, React.ReactNode> = {
  ai: <Brain className="h-6 w-6" />,
  web: <Code className="h-6 w-6" />,
  "custom-software": <Zap className="h-6 w-6" />,
  mobile: <Smartphone className="h-6 w-6" />,
  ecommerce: <ShoppingCart className="h-6 w-6" />,
  "ux-design": <Palette className="h-6 w-6" />,
  cybersecurity: <Shield className="h-6 w-6" />,
};

export function ServiceContent({ service }: { service: ServiceSlug }) {
  const t = useTranslations("Services");
  const nav = useTranslations("Nav");

  // Données de base
  const title = t(`${service}.title`);
  const subtitle = t(`${service}.subtitle`);
  const description = t(`${service}.description`);

  // Données optionnelles
  const hasServices = t.has(`${service}.services`);
  const hasMethodology = t.has(`${service}.methodology`);
  const hasExpertise = t.has(`${service}.expertise`);
  const hasProjects = t.has(`${service}.projects`);
  const hasTechnologies = t.has(`${service}.technologies`);
  const hasWhyUs = t.has(`${service}.whyUs`);

  const services = hasServices ? (t.raw(`${service}.services`) as ServiceItem[]) : [];
  const methodology = hasMethodology ? (t.raw(`${service}.methodology`) as MethodologyStep[]) : [];
  const expertise = hasExpertise ? (t.raw(`${service}.expertise`) as ExpertiseItem[]) : [];
  const projects = hasProjects ? (t.raw(`${service}.projects`) as ProjectItem[]) : [];
  const technologies = hasTechnologies ? (t.raw(`${service}.technologies`) as string[]) : [];
  const whyUs = hasWhyUs ? (t.raw(`${service}.whyUs`) as string[]) : [];

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
                {title}
              </h1>
            </FadeIn>

            {subtitle && (
              <FadeIn delay={0.15}>
                <p className="mt-4 text-xl font-medium text-primary">
                  {subtitle}
                </p>
              </FadeIn>
            )}

            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-muted">
                {description}
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

      {/* Services Section */}
      {services.length > 0 && (
        <Section
          eyebrow={t("servicesEyebrow")}
          title={t("servicesTitle")}
        >
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <Card className="flex h-full flex-col p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {serviceIcons[service] || <Zap className="h-6 w-6" />}
                  </div>
                  <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Section>
      )}

      {/* Methodology Section */}
      {methodology.length > 0 && (
        <Section
          eyebrow={t("methodologyEyebrow")}
          title={t("methodologyTitle")}
          className="bg-surface/50"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {methodology.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.1}>
                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      )}

      {/* Expertise Section */}
      {expertise.length > 0 && (
        <Section
          eyebrow={t("expertiseEyebrow")}
          title={t("expertiseTitle")}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {expertise.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <Card className="flex h-full flex-col p-6">
                  <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{item.description}</p>
                  {item.result && (
                    <p className="mt-4 text-sm font-medium text-primary">{item.result}</p>
                  )}
                </Card>
              </FadeIn>
            ))}
          </div>
        </Section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <Section
          eyebrow={t("projectsEyebrow")}
          title={t("projectsTitle")}
          className="bg-surface/50"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, index) => (
              <FadeIn key={project.name} delay={index * 0.1}>
                <Card className="flex h-full flex-col p-6">
                  <h3 className="text-lg font-semibold text-text">{project.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>
                  <p className="mt-4 text-sm font-bold text-primary">{project.result}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Section>
      )}

      {/* Technologies Section */}
      {technologies.length > 0 && (
        <Section
          eyebrow={t("technologiesEyebrow")}
          title={t("technologiesTitle")}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <FadeIn key={tech} delay={index * 0.05}>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  {tech}
                </Badge>
              </FadeIn>
            ))}
          </div>
        </Section>
      )}

      {/* Why Us Section */}
      {whyUs.length > 0 && (
        <Section
          eyebrow={t("whyUsEyebrow")}
          title={t("whyUsTitle")}
          className="bg-surface/50"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item, index) => (
              <FadeIn key={item} delay={index * 0.1}>
                <Card className="flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-text">{item}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Section>
      )}

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

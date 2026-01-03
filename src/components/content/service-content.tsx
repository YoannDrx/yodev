"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, SlideIn } from "@/components/motion";
import { CtaSection, FaqList } from "@/components/sections";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  Zap,
  Shield,
  Code,
  Palette,
  Smartphone,
  ShoppingCart,
  Brain,
  Rocket,
  Target,
  TrendingUp,
  Database,
  Cloud,
  Lock,
  Settings,
  BarChart,
  Globe,
} from "lucide-react";

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

const serviceData: Record<
  string,
  {
    icon: typeof Brain;
    gradient: string;
    badge: string;
    features: { icon: typeof Brain; label: string }[];
  }
> = {
  ai: {
    icon: Brain,
    gradient: "from-primary/20 via-transparent to-blue-500/10",
    badge: "Intelligence Artificielle",
    features: [
      { icon: Database, label: "RAG & LLM" },
      { icon: Settings, label: "Automatisation" },
      { icon: BarChart, label: "Analytics IA" },
      { icon: Cloud, label: "MLOps" },
    ],
  },
  web: {
    icon: Globe,
    gradient: "from-blue-500/20 via-transparent to-primary/10",
    badge: "Développement Web",
    features: [
      { icon: Code, label: "Next.js / React" },
      { icon: Rocket, label: "Performance" },
      { icon: Target, label: "SEO" },
      { icon: Cloud, label: "Scalabilité" },
    ],
  },
  "custom-software": {
    icon: Zap,
    gradient: "from-purple-500/20 via-transparent to-primary/10",
    badge: "Logiciel Métier",
    features: [
      { icon: Settings, label: "Sur-mesure" },
      { icon: Database, label: "Data" },
      { icon: Lock, label: "Sécurité" },
      { icon: TrendingUp, label: "Évolutif" },
    ],
  },
  mobile: {
    icon: Smartphone,
    gradient: "from-pink-500/20 via-transparent to-primary/10",
    badge: "Mobile",
    features: [
      { icon: Smartphone, label: "React Native" },
      { icon: Rocket, label: "Flutter" },
      { icon: Target, label: "iOS & Android" },
      { icon: Zap, label: "PWA" },
    ],
  },
  ecommerce: {
    icon: ShoppingCart,
    gradient: "from-orange-500/20 via-transparent to-primary/10",
    badge: "E-commerce",
    features: [
      { icon: ShoppingCart, label: "Shopify" },
      { icon: Rocket, label: "Performance" },
      { icon: TrendingUp, label: "Conversion" },
      { icon: Settings, label: "Headless" },
    ],
  },
  "ux-design": {
    icon: Palette,
    gradient: "from-pink-500/20 via-transparent to-purple-500/10",
    badge: "UX/UI Design",
    features: [
      { icon: Palette, label: "Design System" },
      { icon: Target, label: "User Research" },
      { icon: Settings, label: "Prototypage" },
      { icon: Rocket, label: "Accessibilité" },
    ],
  },
  cybersecurity: {
    icon: Shield,
    gradient: "from-red-500/20 via-transparent to-primary/10",
    badge: "Cybersécurité",
    features: [
      { icon: Shield, label: "Audit Sécu" },
      { icon: Lock, label: "Pentesting" },
      { icon: Target, label: "RGPD / SOC2" },
      { icon: Settings, label: "Hardening" },
    ],
  },
};

export function ServiceContent({ service }: { service: ServiceSlug }) {
  const t = useTranslations("Services");
  const nav = useTranslations("Nav");

  const data = serviceData[service] || serviceData.web;
  const Icon = data.icon;

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
  const hasFaq = t.has(`${service}.faq`);

  const services = hasServices
    ? (t.raw(`${service}.services`) as ServiceItem[])
    : [];
  const methodology = hasMethodology
    ? (t.raw(`${service}.methodology`) as MethodologyStep[])
    : [];
  const expertise = hasExpertise
    ? (t.raw(`${service}.expertise`) as ExpertiseItem[])
    : [];
  const projects = hasProjects
    ? (t.raw(`${service}.projects`) as ProjectItem[])
    : [];
  const technologies = hasTechnologies
    ? (t.raw(`${service}.technologies`) as string[])
    : [];
  const whyUs = hasWhyUs ? (t.raw(`${service}.whyUs`) as string[]) : [];
  const faq = hasFaq
    ? (t.raw(`${service}.faq`) as { question: string; answer: string }[])
    : [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div
          className={cn(
            "absolute inset-0 -z-10 bg-gradient-to-br",
            data.gradient
          )}
        />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-6">
              <FadeIn>
                <Badge variant="primary" className="mb-4">
                  {data.badge}
                </Badge>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1]">
                  <span className="text-gradient">{title}</span>
                </h1>
              </FadeIn>

              {subtitle && (
                <FadeIn delay={0.15}>
                  <p className="text-xl md:text-2xl font-medium text-primary">
                    {subtitle}
                  </p>
                </FadeIn>
              )}

              <FadeIn delay={0.2}>
                <p className="text-lg text-muted max-w-xl leading-relaxed">
                  {description}
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-4 pt-4">
                  <ButtonLink
                    href="/contact"
                    size="lg"
                    className="px-8 shadow-[0_0_30px_rgba(27,168,150,0.3)]"
                  >
                    {t("cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink href="/work" variant="glass" size="lg">
                    {t("viewWork")}
                  </ButtonLink>
                </div>
              </FadeIn>
            </div>

            {/* Right visual */}
            <SlideIn direction="right" className="hidden lg:block">
              <GlassPanel className="p-8 rounded-3xl relative overflow-hidden">
                {/* Animated icon */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <Icon className="w-10 h-10 text-primary" />
                  </motion.div>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-2 gap-4 mt-16">
                  {data.features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <motion.div
                        key={feature.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-dark/50 p-4 rounded-xl border border-white/5 flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FeatureIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">
                          {feature.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Status indicator */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-muted">
                    Équipe disponible pour nouveaux projets
                  </span>
                </div>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="py-24">
          <Container>
            <div className="text-center mb-16">
              <FadeIn>
                <Badge variant="outline" className="mb-4">
                  {t("servicesEyebrow")}
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-display font-bold">
                  {t("servicesTitle")}
                </h2>
              </FadeIn>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassPanel className="p-6 rounded-2xl h-full hover:border-primary/30 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-dark transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Methodology Section */}
      {methodology.length > 0 && (
        <section className="py-24 bg-dark/50">
          <Container>
            <div className="text-center mb-16">
              <FadeIn>
                <Badge variant="outline" className="mb-4">
                  {t("methodologyEyebrow")}
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-display font-bold">
                  {t("methodologyTitle")}
                </h2>
              </FadeIn>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {methodology.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Connector line */}
                  {index < methodology.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0" />
                  )}

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary text-dark font-bold text-lg flex items-center justify-center mb-4">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Expertise Section */}
      {expertise.length > 0 && (
        <section className="py-24">
          <Container>
            <div className="text-center mb-16">
              <FadeIn>
                <Badge variant="outline" className="mb-4">
                  {t("expertiseEyebrow")}
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-display font-bold">
                  {t("expertiseTitle")}
                </h2>
              </FadeIn>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {expertise.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassPanel className="p-6 rounded-2xl h-full">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted mb-4">{item.description}</p>
                    {item.result && (
                      <div className="flex items-center gap-2 text-primary">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {item.result}
                        </span>
                      </div>
                    )}
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-24 bg-dark/50">
          <Container>
            <div className="text-center mb-16">
              <FadeIn>
                <Badge variant="outline" className="mb-4">
                  {t("projectsEyebrow")}
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-display font-bold">
                  {t("projectsTitle")}
                </h2>
              </FadeIn>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassPanel className="p-6 rounded-2xl h-full flex flex-col">
                    <h3 className="text-lg font-bold mb-2">{project.name}</h3>
                    <p className="text-sm text-muted mb-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-sm font-bold text-primary">
                        {project.result}
                      </p>
                    </div>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Technologies Section */}
      {technologies.length > 0 && (
        <section className="py-24">
          <Container>
            <div className="text-center mb-16">
              <FadeIn>
                <Badge variant="outline" className="mb-4">
                  {t("technologiesEyebrow")}
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-display font-bold">
                  {t("technologiesTitle")}
                </h2>
              </FadeIn>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="outline"
                    size="lg"
                    className="px-4 py-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Why Us Section */}
      {whyUs.length > 0 && (
        <section className="py-24 bg-dark/50">
          <Container>
            <div className="text-center mb-16">
              <FadeIn>
                <Badge variant="outline" className="mb-4">
                  {t("whyUsEyebrow")}
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-display font-bold">
                  {t("whyUsTitle")}
                </h2>
              </FadeIn>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {whyUs.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassPanel className="p-5 rounded-xl flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm">{item}</p>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ Section */}
      {faq.length > 0 && (
        <section className="py-24">
          <Container className="max-w-4xl">
            <div className="text-center mb-16">
              <FadeIn>
                <Badge variant="outline" className="mb-4">
                  FAQ
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-display font-bold">
                  Questions Fréquentes
                </h2>
              </FadeIn>
            </div>

            <FaqList items={faq} columns={1} />
          </Container>
        </section>
      )}

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

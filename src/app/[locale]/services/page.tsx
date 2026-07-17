"use client";

import { useLocale } from "next-intl";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  FileSearch,
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { FadeIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const serviceIcons = [FileSearch, Layers3, Code2, Gauge] as const;

const content = {
  fr: {
    eyebrow: "Studio produit & développement",
    title: "Une intervention claire, du problème au produit fiable.",
    subtitle:
      "Yodev cadre, conçoit et développe des produits web. Le périmètre, les preuves attendues et les limites sont posés avant la production.",
    primaryCta: "Qualifier mon projet",
    secondaryCta: "Voir les réalisations",
    servicesEyebrow: "Services",
    servicesTitle: "Quatre façons concrètes d’avancer",
    servicesSubtitle:
      "Chaque mission produit des livrables utilisables. Les technologies viennent après le problème, jamais avant.",
    services: [
      {
        title: "Cadrage produit & audit UX",
        description:
          "Transformer un besoin diffus en parcours prioritaires, décisions documentées et périmètre livrable.",
        deliverables: [
          "Audit des parcours et irritants",
          "Cartographie du périmètre et des risques",
          "Plan d’action priorisé",
        ],
      },
      {
        title: "Conception d’un MVP",
        description:
          "Passer d’une hypothèse à une expérience testable sans fabriquer un produit trop large dès la première version.",
        deliverables: [
          "Architecture de l’information",
          "Prototype des parcours essentiels",
          "Design system adapté au produit",
        ],
      },
      {
        title: "Développement React / Next.js",
        description:
          "Construire ou reprendre une application web avec des parcours réels, des états complets et une base maintenable.",
        deliverables: [
          "Interface accessible et responsive",
          "Intégrations API, données et paiement",
          "Tests, preview et documentation",
        ],
      },
      {
        title: "Fiabilisation & modernisation",
        description:
          "Réduire la dette qui bloque la livraison : bugs critiques, performance, sécurité applicative et déploiement.",
        deliverables: [
          "Diagnostic reproductible",
          "Corrections par niveau de risque",
          "Plan de migration et de retour arrière",
        ],
      },
    ],
    aiEyebrow: "IA & automatisation",
    aiTitle: "L’IA seulement lorsqu’elle améliore le parcours.",
    aiBody:
      "Une fonctionnalité IA doit avoir une source, un comportement d’échec et un coût observables. Si une règle déterministe suffit, elle reste le meilleur choix.",
    aiItems: [
      "Cas d’usage et données évalués avant intégration",
      "Sorties structurées, traçabilité et contrôle utilisateur",
      "Fallback explicite et aucune réussite simulée",
    ],
    engagementEyebrow: "Cadre de mission",
    engagementTitle: "Ce qui est défini avant de commencer",
    engagementSubtitle:
      "Les délais et niveaux de service dépendent du périmètre accepté. Ils ne sont jamais promis de manière générique.",
    engagement: [
      {
        title: "Périmètre",
        body: "Parcours inclus, fonctionnalités masquées et critères de sortie.",
      },
      {
        title: "Preuves",
        body: "Démonstration, tests, métriques ou documentation attendus à la livraison.",
      },
      {
        title: "Responsabilités",
        body: "Accès, validations, dépendances externes et personne responsable de chaque décision.",
      },
      {
        title: "Transfert",
        body: "Code, environnement, décisions et procédure de reprise après la mission.",
      },
    ],
    fitEyebrow: "Bon point de départ",
    fitTitle: "Vous avez un problème produit concret à résoudre ?",
    fitBody:
      "Partagez le contexte, les utilisateurs concernés, les contraintes et l’échéance. La première réponse sert à déterminer si Yodev est le bon interlocuteur.",
    fitCta: "Décrire le projet",
    fitSecondary: "Voir la méthode",
  },
  en: {
    eyebrow: "Product & development studio",
    title: "A clear engagement, from problem to reliable product.",
    subtitle:
      "Yodev frames, designs and develops web products. Scope, expected evidence and limits are agreed before production starts.",
    primaryCta: "Qualify my project",
    secondaryCta: "See the work",
    servicesEyebrow: "Services",
    servicesTitle: "Four concrete ways to move forward",
    servicesSubtitle:
      "Every engagement produces usable deliverables. Technology follows the problem, never the other way around.",
    services: [
      {
        title: "Product framing & UX audit",
        description:
          "Turn a broad need into priority journeys, documented decisions and a deliverable scope.",
        deliverables: [
          "Journey and friction audit",
          "Scope and risk map",
          "Prioritized action plan",
        ],
      },
      {
        title: "MVP design",
        description:
          "Move from hypothesis to a testable experience without building an oversized first version.",
        deliverables: [
          "Information architecture",
          "Core journey prototype",
          "Product-specific design system",
        ],
      },
      {
        title: "React / Next.js development",
        description:
          "Build or take over a web application with real journeys, complete states and a maintainable foundation.",
        deliverables: [
          "Accessible, responsive interface",
          "API, data and payment integrations",
          "Tests, preview and documentation",
        ],
      },
      {
        title: "Reliability & modernization",
        description:
          "Reduce the debt blocking delivery: critical bugs, performance, application security and deployment.",
        deliverables: [
          "Reproducible diagnosis",
          "Risk-ranked fixes",
          "Migration and rollback plan",
        ],
      },
    ],
    aiEyebrow: "AI & automation",
    aiTitle: "AI only when it improves the journey.",
    aiBody:
      "An AI feature needs observable sources, failure behavior and cost. When a deterministic rule is enough, it remains the better choice.",
    aiItems: [
      "Use case and data assessed before integration",
      "Structured outputs, traceability and user control",
      "Explicit fallback and no simulated success",
    ],
    engagementEyebrow: "Engagement model",
    engagementTitle: "What is agreed before work starts",
    engagementSubtitle:
      "Timelines and service levels depend on accepted scope. They are never promised generically.",
    engagement: [
      {
        title: "Scope",
        body: "Included journeys, hidden features and exit criteria.",
      },
      {
        title: "Evidence",
        body: "Demo, tests, metrics or documentation expected at delivery.",
      },
      {
        title: "Responsibilities",
        body: "Access, approvals, external dependencies and an owner for each decision.",
      },
      {
        title: "Handover",
        body: "Code, environment, decisions and takeover procedure after the engagement.",
      },
    ],
    fitEyebrow: "A good starting point",
    fitTitle: "Do you have a concrete product problem to solve?",
    fitBody:
      "Share the context, affected users, constraints and deadline. The first response determines whether Yodev is the right fit.",
    fitCta: "Describe the project",
    fitSecondary: "See the method",
  },
} as const;

export default function ServicesPage() {
  const locale = useLocale() === "en" ? "en" : "fr";
  const copy = content[locale];

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <Container>
          <div className="max-w-4xl">
            <FadeIn initiallyVisible>
              <Badge variant="primary" className="mb-6">
                <Sparkles className="mr-1 size-3" aria-hidden="true" />
                {copy.eyebrow}
              </Badge>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] text-text md:text-6xl lg:text-7xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                {copy.subtitle}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  rightIcon={<ArrowRight className="size-4" aria-hidden="true" />}
                >
                  {copy.primaryCta}
                </ButtonLink>
                <ButtonLink href="/work" size="lg" variant="outline">
                  {copy.secondaryCta}
                </ButtonLink>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-2/45 py-20 md:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {copy.servicesEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text md:text-5xl">
              {copy.servicesTitle}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {copy.servicesSubtitle}
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {copy.services.map((service, index) => {
              const Icon = serviceIcons[index] ?? FileSearch;

              return (
                <Card key={service.title} className="p-7 md:p-8" hover={false}>
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-text">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{service.description}</p>
                  <ul className="mt-6 space-y-3 border-t border-border pt-5">
                    {service.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-3 text-sm text-text">
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-secondary"
                          aria-hidden="true"
                        />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Card
            className="overflow-hidden border-primary/20 bg-dark p-8 text-white md:p-12 lg:p-16"
            hover={false}
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary-light">
                  <WandSparkles className="size-6" aria-hidden="true" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
                  {copy.aiEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold md:text-5xl">{copy.aiTitle}</h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                  {copy.aiBody}
                </p>
              </div>
              <ul className="space-y-4">
                {copy.aiItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/85"
                  >
                    <ShieldCheck
                      className="mt-0.5 size-5 shrink-0 text-secondary-light"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-2/45 py-20 md:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {copy.engagementEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text md:text-5xl">
              {copy.engagementTitle}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {copy.engagementSubtitle}
            </p>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {copy.engagement.map((item, index) => (
              <li key={item.title} className="bg-surface p-6 md:p-7">
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <h3 className="mt-5 text-xl font-bold text-text">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaSection
        eyebrow={copy.fitEyebrow}
        title={copy.fitTitle}
        subtitle={copy.fitBody}
        ctaLabel={copy.fitCta}
        ctaHref="/contact"
        secondaryLabel={copy.fitSecondary}
        secondaryHref="/method"
        variant="card"
      />
    </>
  );
}

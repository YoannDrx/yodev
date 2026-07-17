"use client";

import { useLocale } from "next-intl";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import { FadeIn } from "@/components/motion";
import { CtaSection, FaqList } from "@/components/sections";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const offerIcons = [ClipboardCheck, Code2, LifeBuoy] as const;

const content = {
  fr: {
    eyebrow: "Formats d’intervention",
    title: "Un périmètre lisible avant de parler de promesse.",
    subtitle:
      "Ces fourchettes donnent un ordre de grandeur. Le prix, le calendrier et les critères d’acceptation deviennent contractuels uniquement dans le devis accepté.",
    cta: "Décrire mon besoin",
    offers: [
      {
        name: "Diagnostic produit",
        description: "Décider quoi construire, corriger ou arrêter avant d’engager un chantier.",
        duration: "1 à 2 semaines",
        price: "À partir de 1 500 € HT",
        prerequisite: "Un produit, prototype ou problème suffisamment concret à examiner.",
        deliverables: [
          "Audit des parcours, du code ou de l’architecture selon le besoin",
          "Risques, hypothèses et dépendances explicités",
          "Plan priorisé avec options et critères de décision",
          "Restitution et support de reprise",
        ],
      },
      {
        name: "MVP produit",
        description: "Concevoir et livrer un premier périmètre testable sur des usages réels.",
        duration: "6 à 12 semaines selon le périmètre",
        price: "Budget défini après diagnostic",
        prerequisite: "Un décideur disponible, des utilisateurs identifiés et un périmètre arbitrable.",
        deliverables: [
          "Parcours prioritaires et design system adapté",
          "Application React / Next.js responsive et accessible",
          "Données, intégrations et états d’erreur réels",
          "Tests essentiels, preview, mise en production et documentation",
        ],
        featured: true,
      },
      {
        name: "Sprint de fiabilisation",
        description: "Traiter les blocages qui rendent un produit difficile à livrer ou à reprendre.",
        duration: "2 à 4 semaines",
        price: "À partir de 4 000 € HT",
        prerequisite: "Accès au dépôt, à un environnement reproductible et aux erreurs observées.",
        deliverables: [
          "Reproduction et classement des risques",
          "Corrections du périmètre convenu",
          "Tests de non-régression et contrôles de déploiement",
          "Dette restante et procédure de rollback documentées",
        ],
      },
    ],
    includedEyebrow: "Dans chaque mission",
    includedTitle: "Des règles simples pour éviter les zones grises",
    included: [
      {
        title: "Propriété et accès",
        body: "Le propriétaire du code, des comptes et des livrables est défini dans le devis.",
      },
      {
        title: "Changements visibles",
        body: "Une demande hors périmètre est chiffrée ou échangée contre un élément prévu.",
      },
      {
        title: "Validation traçable",
        body: "Les critères d’acceptation et les réserves sont écrits, pas supposés.",
      },
      {
        title: "Transfert prévu",
        body: "Les accès, décisions et procédures utiles à la reprise font partie de la sortie.",
      },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        question: "Pourquoi le MVP n’a-t-il pas un prix fixe affiché ?",
        answer:
          "Un produit avec paiement, rôles, données sensibles ou fonctionnement hors ligne n’a pas le même risque qu’une vitrine. Le diagnostic permet de fixer une fourchette utile sans masquer les dépendances.",
      },
      {
        question: "Comment sont gérés les changements de périmètre ?",
        answer:
          "Leur impact est rendu visible. On peut remplacer une fonctionnalité, décaler une étape ou établir un avenant ; aucune modification importante n’est absorbée silencieusement.",
      },
      {
        question: "Yodev assure-t-il la maintenance ?",
        answer:
          "Une période de stabilisation ou un suivi peut être prévu dans le devis. La durée, les délais de réponse et les exclusions sont alors écrits explicitement.",
      },
      {
        question: "Pouvez-vous intervenir avec une équipe existante ?",
        answer:
          "Oui lorsque le rôle, les droits de décision, les rituels utiles et la responsabilité de livraison sont clarifiés avant le démarrage.",
      },
    ],
    finalEyebrow: "Prochaine étape",
    finalTitle: "Commencer par le contexte, pas par une solution préfabriquée.",
    finalSubtitle:
      "Décrivez le problème, le produit existant et l’échéance. Yodev répond avec les questions à lever et un format d’intervention adapté.",
    finalCta: "Qualifier le projet",
    finalSecondary: "Voir la méthode",
    labels: {
      recommended: "Point de départ courant",
      duration: "Durée indicative",
      budget: "Budget indicatif",
      prerequisite: "Prérequis",
      deliverables: "Livrables inclus",
    },
  },
  en: {
    eyebrow: "Engagement formats",
    title: "A readable scope before any promise is made.",
    subtitle:
      "These ranges provide an order of magnitude. Price, schedule and acceptance criteria only become contractual in an accepted quote.",
    cta: "Describe my need",
    offers: [
      {
        name: "Product diagnosis",
        description: "Decide what to build, fix or stop before committing to a delivery project.",
        duration: "1 to 2 weeks",
        price: "From €1,500 excl. tax",
        prerequisite: "A product, prototype or sufficiently concrete problem to examine.",
        deliverables: [
          "Journey, code or architecture audit based on the need",
          "Risks, assumptions and dependencies made explicit",
          "Prioritized plan with options and decision criteria",
          "Readout and handover material",
        ],
      },
      {
        name: "Product MVP",
        description: "Design and deliver a first scope that can be tested with real usage.",
        duration: "6 to 12 weeks depending on scope",
        price: "Budget defined after diagnosis",
        prerequisite: "An available decision-maker, identified users and an adjustable scope.",
        deliverables: [
          "Priority journeys and a product-specific design system",
          "Responsive, accessible React / Next.js application",
          "Real data, integrations and error states",
          "Essential tests, preview, production release and documentation",
        ],
        featured: true,
      },
      {
        name: "Reliability sprint",
        description: "Address the blockers making a product hard to ship or take over.",
        duration: "2 to 4 weeks",
        price: "From €4,000 excl. tax",
        prerequisite: "Access to the repository, a reproducible environment and observed errors.",
        deliverables: [
          "Risk reproduction and classification",
          "Fixes within the agreed scope",
          "Regression tests and deployment checks",
          "Remaining debt and rollback procedure documented",
        ],
      },
    ],
    includedEyebrow: "In every engagement",
    includedTitle: "Simple rules that remove grey areas",
    included: [
      {
        title: "Ownership and access",
        body: "Ownership of code, accounts and deliverables is defined in the quote.",
      },
      {
        title: "Visible changes",
        body: "An out-of-scope request is priced or exchanged for a planned item.",
      },
      {
        title: "Traceable validation",
        body: "Acceptance criteria and reservations are written, not assumed.",
      },
      {
        title: "Planned handover",
        body: "Access, decisions and procedures needed for takeover are part of the exit.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        question: "Why is there no fixed public price for an MVP?",
        answer:
          "A product with payments, roles, sensitive data or offline behavior carries different risk from a brochure site. Diagnosis provides a useful range without hiding dependencies.",
      },
      {
        question: "How are scope changes handled?",
        answer:
          "Their impact is made visible. A feature can be replaced, a step postponed or a change order agreed; material changes are never absorbed silently.",
      },
      {
        question: "Does Yodev provide maintenance?",
        answer:
          "A stabilization period or follow-up can be included in the quote. Its duration, response times and exclusions are then written explicitly.",
      },
      {
        question: "Can you work with an existing team?",
        answer:
          "Yes, when the role, decision rights, useful rituals and delivery responsibility are clarified before work starts.",
      },
    ],
    finalEyebrow: "Next step",
    finalTitle: "Start with context, not a prepackaged solution.",
    finalSubtitle:
      "Describe the problem, existing product and deadline. Yodev replies with the questions to resolve and a suitable engagement format.",
    finalCta: "Qualify the project",
    finalSecondary: "See the method",
    labels: {
      recommended: "Common starting point",
      duration: "Indicative duration",
      budget: "Indicative budget",
      prerequisite: "Prerequisite",
      deliverables: "Included deliverables",
    },
  },
} as const;

export default function OffersPage() {
  const locale = useLocale() === "en" ? "en" : "fr";
  const copy = content[locale];

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-24 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <Container>
          <FadeIn initiallyVisible className="mx-auto max-w-4xl text-center">
            <Badge variant="primary" className="mb-6">
              <Sparkles className="mr-1 size-3" aria-hidden="true" />
              {copy.eyebrow}
            </Badge>
            <h1 className="text-4xl font-extrabold leading-[1.08] text-text md:text-6xl">
              {copy.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              {copy.subtitle}
            </p>
            <ButtonLink
              href="/contact"
              size="lg"
              className="mt-8"
              rightIcon={<ArrowRight className="size-4" aria-hidden="true" />}
            >
              {copy.cta}
            </ButtonLink>
          </FadeIn>
        </Container>
      </section>

      <section className="pb-24 md:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {copy.offers.map((offer, index) => {
              const Icon = offerIcons[index] ?? ClipboardCheck;

              return (
                <Card
                  key={offer.name}
                  className={`relative flex h-full flex-col p-7 md:p-8 ${
                    "featured" in offer && offer.featured ? "border-primary/35" : ""
                  }`}
                  hover={false}
                >
                  {"featured" in offer && offer.featured && (
                    <Badge variant="primary" size="sm" className="absolute right-6 top-6">
                      {copy.labels.recommended}
                    </Badge>
                  )}
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-text">{offer.name}</h2>
                  <p className="mt-3 min-h-20 leading-relaxed text-muted">
                    {offer.description}
                  </p>
                  <dl className="mt-6 grid gap-4 border-y border-border py-5">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                        {copy.labels.duration}
                      </dt>
                      <dd className="mt-1 font-semibold text-text">{offer.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                        {copy.labels.budget}
                      </dt>
                      <dd className="mt-1 font-semibold text-primary">{offer.price}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 rounded-xl bg-surface-2 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {copy.labels.prerequisite}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text">{offer.prerequisite}</p>
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">
                    {copy.labels.deliverables}
                  </p>
                  <ul className="mt-3 flex-1 space-y-3">
                    {offer.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-3 text-sm text-text">
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-secondary"
                          aria-hidden="true"
                        />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="/contact" variant="outline" className="mt-8 w-full">
                    {copy.cta}
                  </ButtonLink>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-2/45 py-20 md:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {copy.includedEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text md:text-5xl">
              {copy.includedTitle}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {copy.included.map((item, index) => (
              <div key={item.title} className="rounded-2xl border border-border bg-surface p-6">
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-bold text-text">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container className="max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-text md:text-4xl">
            {copy.faqTitle}
          </h2>
          <FaqList items={[...copy.faq]} columns={1} />
        </Container>
      </section>

      <CtaSection
        eyebrow={copy.finalEyebrow}
        title={copy.finalTitle}
        subtitle={copy.finalSubtitle}
        ctaLabel={copy.finalCta}
        ctaHref="/contact"
        secondaryLabel={copy.finalSecondary}
        secondaryHref="/method"
        variant="card"
      />
    </>
  );
}

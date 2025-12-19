import { useTranslations } from "next-intl";
import { StyleSwitcher } from "@/components/site/style-switcher";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type ProofItem = {
  title: string;
  description: string;
};

type ServiceItem = {
  title: string;
  description: string;
  bullets: string[];
};

type CaseItem = {
  title: string;
  type: string;
  summary: string;
  result: string;
};

type MethodStep = {
  title: string;
  description: string;
};

type OfferItem = {
  name: string;
  description: string;
  price: string;
  bullets: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

export default function HomePage() {
  const t = useTranslations("Home");
  const nav = useTranslations("Nav");

  const heroChips = t.raw("hero.chips") as string[];
  const proofItems = t.raw("proof.items") as ProofItem[];
  const services = t.raw("services.items") as ServiceItem[];
  const cases = t.raw("cases.items") as CaseItem[];
  const steps = t.raw("method.steps") as MethodStep[];
  const offers = t.raw("offers.items") as OfferItem[];
  const faqs = t.raw("faq.items") as FaqItem[];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-35" />
        <div className="absolute inset-0 -z-10 noise opacity-30" />
        <div
          className="orb float-slow"
          style={{ width: 360, height: 360, top: -120, left: -80 }}
        />
        <div
          className="orb secondary float-slower"
          style={{ width: 420, height: 420, bottom: -160, right: -120 }}
        />
        <Container className="relative py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Badge>{t("hero.eyebrow")}</Badge>
              <h1 className="text-balance text-4xl font-semibold text-text md:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="max-w-xl text-base text-muted md:text-lg">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg">
                  {t("hero.primary")}
                </ButtonLink>
                <ButtonLink href="/work" variant="secondary" size="lg">
                  {t("hero.secondary")}
                </ButtonLink>
              </div>
              <div className="flex flex-wrap gap-2">
                {heroChips.map((chip) => (
                  <Badge key={chip}>{chip}</Badge>
                ))}
              </div>
            </div>

            <div className="relative space-y-4">
              <Card className="p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {t("hero.styleLab.eyebrow")}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-text">
                  {t("hero.styleLab.title")}
                </h3>
                <p className="mt-3 text-sm text-muted">
                  {t("hero.styleLab.subtitle")}
                </p>
                <div className="mt-5">
                  <StyleSwitcher />
                </div>
              </Card>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {t("hero.signals.studioEyebrow")}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    {t("hero.signals.studioBody")}
                  </p>
                </Card>
                <Card className="p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {t("hero.signals.outputEyebrow")}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    {t("hero.signals.outputBody")}
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Yodev"
        title={t("proof.title")}
        subtitle={t("proof.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {proofItems.map((item) => (
            <Card key={item.title} className="p-6">
              <h3 className="text-lg font-semibold text-text">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={nav("services")}
        title={t("services.title")}
        subtitle={t("services.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex h-full flex-col p-6">
              <h3 className="text-xl font-semibold text-text">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{service.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={nav("work")}
        title={t("cases.title")}
        subtitle={t("cases.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((item) => (
            <Card key={item.title} className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
                <span>{item.type}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-text">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{item.summary}</p>
              <div className="mt-5 rounded-[var(--radius-md)] bg-bg-2 px-3 py-2 text-xs text-text">
                {item.result}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={nav("method")}
        title={t("method.title")}
        subtitle={t("method.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={nav("offers")}
        title={t("offers.title")}
        subtitle={t("offers.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <Card key={offer.name} className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text">{offer.name}</h3>
                <Badge className="text-xs">{offer.price}</Badge>
              </div>
              <p className="mt-3 text-sm text-muted">{offer.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                {offer.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow={t("faq.eyebrow")} title={t("faq.title")}>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="rounded-[var(--radius-md)] border border-border bg-surface/80 p-5"
            >
              <summary className="cursor-pointer text-sm font-semibold text-text">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={nav("contact")}
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        className="pt-10"
      >
        <Card className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-text">{t("cta.title")}</h3>
            <p className="mt-2 text-sm text-muted">{t("cta.subtitle")}</p>
          </div>
          <ButtonLink href="/contact" size="lg">
            {t("cta.button")}
          </ButtonLink>
        </Card>
      </Section>
    </>
  );
}

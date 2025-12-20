import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  HeroHome,
  ServiceCard,
  ServiceGrid,
  CaseStudyCard,
  CaseStudyGrid,
  PricingCard,
  PricingGrid,
  FaqList,
  ProcessGrid,
  CtaSection,
} from "@/components/sections";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/motion";
import { Card } from "@/components/ui/card";

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

  const proofItems = t.raw("proof.items") as ProofItem[];
  const services = t.raw("services.items") as ServiceItem[];
  const cases = t.raw("cases.items") as CaseItem[];
  const steps = t.raw("method.steps") as MethodStep[];
  const offers = t.raw("offers.items") as OfferItem[];
  const faqs = t.raw("faq.items") as FaqItem[];

  return (
    <>
      {/* Hero Section */}
      <HeroHome />

      {/* Proof Section */}
      <Section
        eyebrow="Yodev"
        title={t("proof.title")}
        subtitle={t("proof.subtitle")}
      >
        <StaggerChildren staggerDelay={0.1}>
          <div className="grid gap-6 md:grid-cols-3">
            {proofItems.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="h-full p-6">
                  <h3 className="text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted">{item.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
      </Section>

      {/* Services Section */}
      <Section
        eyebrow={nav("services")}
        title={t("services.title")}
        subtitle={t("services.subtitle")}
      >
        <ServiceGrid>
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.1}>
              <ServiceCard
                title={service.title}
                description={service.description}
                bullets={service.bullets}
              />
            </FadeIn>
          ))}
        </ServiceGrid>
      </Section>

      {/* Cases Section */}
      <Section
        eyebrow={nav("work")}
        title={t("cases.title")}
        subtitle={t("cases.subtitle")}
      >
        <CaseStudyGrid>
          {cases.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.1}>
              <CaseStudyCard
                title={item.title}
                type={item.type}
                summary={item.summary}
                result={item.result}
              />
            </FadeIn>
          ))}
        </CaseStudyGrid>
      </Section>

      {/* Method Section */}
      <Section
        eyebrow={nav("method")}
        title={t("method.title")}
        subtitle={t("method.subtitle")}
      >
        <ProcessGrid steps={steps} />
      </Section>

      {/* Offers Section */}
      <Section
        eyebrow={nav("offers")}
        title={t("offers.title")}
        subtitle={t("offers.subtitle")}
      >
        <PricingGrid>
          {offers.map((offer, index) => (
            <FadeIn key={offer.name} delay={index * 0.1}>
              <PricingCard
                name={offer.name}
                description={offer.description}
                price={offer.price}
                bullets={offer.bullets}
                featured={index === 1}
              />
            </FadeIn>
          ))}
        </PricingGrid>
      </Section>

      {/* FAQ Section */}
      <Section eyebrow={t("faq.eyebrow")} title={t("faq.title")}>
        <FaqList items={faqs} columns={2} />
      </Section>

      {/* CTA Section */}
      <CtaSection
        eyebrow={nav("contact")}
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        ctaLabel={t("cta.button")}
        ctaHref="/contact"
        variant="card"
      />
    </>
  );
}

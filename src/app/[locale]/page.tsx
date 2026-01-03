"use client";

import { useTranslations } from "next-intl";
import {
  HeroHome,
  ArchitectureSection,
  UseCasesSection,
  TrustSection,
  CtaSection,
} from "@/components/sections";

export default function HomePage() {
  const t = useTranslations("Home");
  const nav = useTranslations("Nav");

  return (
    <>
      {/* Hero Section - New design */}
      <HeroHome />

      {/* Architecture Section - Technical Schema */}
      <ArchitectureSection />

      {/* Use Cases Section - PME/ETI solutions */}
      <UseCasesSection />

      {/* Trust Section - Client logos */}
      <TrustSection />

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

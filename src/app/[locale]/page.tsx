"use client";

import { useTranslations } from "next-intl";
import {
  HeroHome,
  PathsSection,
  SelectedWorkSection,
  TrustSection,
  FitSection,
  CtaSection,
} from "@/components/sections";

export default function HomePage() {
  const t = useTranslations("Home");
  const nav = useTranslations("Nav");

  return (
    <>
      <HeroHome />
      <PathsSection />
      <SelectedWorkSection />
      <TrustSection />
      <FitSection />
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

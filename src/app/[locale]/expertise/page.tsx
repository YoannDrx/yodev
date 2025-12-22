"use client";

import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/site/page-intro";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { CtaSection } from "@/components/sections";
import { FadeIn } from "@/components/motion";

type ExpertiseCategory = {
  title: string;
  items: string[];
};

export default function ExpertisePage() {
  const t = useTranslations("ExpertisePage");
  const categories = t.raw("categories") as ExpertiseCategory[];

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <Section
        eyebrow={t("eyebrow")}
        title={t("sectionTitle")}
        subtitle={t("sectionSubtitle")}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <FadeIn key={category.title} delay={index * 0.05}>
              <Card className="h-full p-6">
                <h3 className="text-lg font-semibold text-text">
                  {category.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>
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

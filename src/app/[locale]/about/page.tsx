"use client";

import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/site/page-intro";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { CtaSection } from "@/components/sections";

type ValueItem = {
  title: string;
  description: string;
};

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  const values = t.raw("values") as ValueItem[];

  return (
    <>
      <PageIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Story Section */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-text md:text-3xl">
            {t("storyTitle")}
          </h2>
          <div className="mt-6 space-y-4 text-muted">
            {t("storyBody")
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section eyebrow={t("valuesEyebrow")} title={t("valuesTitle")}>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="p-6">
              <h3 className="text-lg font-semibold text-text">{value.title}</h3>
              <p className="mt-3 text-sm text-muted">{value.description}</p>
            </Card>
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

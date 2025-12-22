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

type StatItem = {
  value: string;
  label: string;
};

export default function TeamPage() {
  const t = useTranslations("TeamPage");
  const values = t.raw("values") as ValueItem[];
  const stats = t.raw("stats") as StatItem[] | undefined;

  return (
    <>
      <PageIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Stats Section */}
      {stats && stats.length > 0 && (
        <Section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6 text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Values Section */}
      <Section eyebrow={t("valuesEyebrow")} title={t("valuesTitle")}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="p-6">
              <h3 className="text-lg font-semibold text-text">{value.title}</h3>
              <p className="mt-2 text-sm text-muted">{value.description}</p>
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
        ctaHref="/careers"
        variant="card"
      />
    </>
  );
}

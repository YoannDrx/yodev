"use client";

import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/site/page-intro";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/sections";

type FounderItem = {
  name: string;
  role: string;
  bio: string;
};

type ValueItem = {
  title: string;
  description: string;
};

export default function TeamPage() {
  const t = useTranslations("TeamPage");
  const home = useTranslations("Home");
  const founders = home.raw("founders.items") as FounderItem[];
  const schools = home.raw("team.schools") as string[];
  const values = t.raw("values") as ValueItem[];

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />

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

      <Section eyebrow={t("foundersEyebrow")} title={t("foundersTitle")}>
        <div className="grid gap-6 md:grid-cols-2">
          {founders.map((founder) => (
            <Card key={founder.name} className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {founder.role}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-text">
                {founder.name}
              </h3>
              <p className="mt-3 text-sm text-muted">{founder.bio}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow={t("schoolsEyebrow")} title={t("schoolsTitle")}>
        <div className="flex flex-wrap gap-2">
          {schools.map((school) => (
            <Badge key={school} variant="outline" className="text-xs">
              {school}
            </Badge>
          ))}
        </div>
      </Section>

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

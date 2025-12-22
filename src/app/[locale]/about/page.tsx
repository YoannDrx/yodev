"use client";

import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/site/page-intro";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  const values = t.raw("values") as string[];

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <Section eyebrow={t("title")} title={t("title")}>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value} className="p-6">
              <h3 className="text-lg font-semibold text-text">{value}</h3>
              <p className="mt-3 text-sm text-muted">
                {t("valueBody")}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}

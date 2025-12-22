"use client";

import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/site/page-intro";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

type CaseItem = {
  title: string;
  type: string;
  summary: string;
  result: string;
};

export default function WorkPage() {
  const t = useTranslations("WorkPage");
  const home = useTranslations("Home");
  const cases = home.raw("cases.items") as CaseItem[];

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <Section
        eyebrow={t("title")}
        title={home("cases.title")}
        subtitle={home("cases.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((item) => (
            <Card key={item.title} className="p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-muted">
                {item.type}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-text">
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
    </>
  );
}

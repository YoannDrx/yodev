"use client";

import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/site/page-intro";
import { Section } from "@/components/ui/section";

type MethodStep = {
  title: string;
  description: string;
};

export default function MethodPage() {
  const t = useTranslations("MethodPage");
  const home = useTranslations("Home");
  const steps = home.raw("method.steps") as MethodStep[];

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <Section
        eyebrow={t("title")}
        title={home("method.title")}
        subtitle={home("method.subtitle")}
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
    </>
  );
}

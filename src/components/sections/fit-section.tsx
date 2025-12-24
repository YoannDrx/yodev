"use client";

import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/motion";

type FitContent = {
  title: string;
  items: string[];
};

export function FitSection() {
  const t = useTranslations("Home.fitSection");
  const goodFit = t.raw("goodFit") as FitContent;
  const badFit = t.raw("badFit") as FitContent;

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")}>
      <div className="grid gap-6 md:grid-cols-2">
        <FadeIn>
          <Card className="h-full p-6">
            <h3 className="mb-4 text-lg font-semibold text-primary">
              {goodFit.title}
            </h3>
            <ul className="space-y-3">
              {goodFit.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-text">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Card className="h-full p-6">
            <h3 className="mb-4 text-lg font-semibold text-muted">
              {badFit.title}
            </h3>
            <ul className="space-y-3">
              {badFit.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-muted/10 text-muted">
                    <X className="h-3 w-3" />
                  </span>
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>
      </div>
    </Section>
  );
}

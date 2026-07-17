"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

type WorkItem = {
  title: string;
  type: string;
  summary: string;
  proofs: string[];
};

export function SelectedWorkSection() {
  const t = useTranslations("Home.selectedWork");
  const items = t.raw("items") as WorkItem[];

  return (
    <Section
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      className="border-y border-border bg-surface-2/40"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {items.map((item, index) => (
          <article key={item.title}>
            <Card className="flex h-full flex-col p-6" hover={false}>
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {item.type}
                </p>
                <span className="font-mono text-xs text-muted">0{index + 1}</span>
              </div>
              <h3 className="mt-8 text-2xl font-bold text-text">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {item.summary}
              </p>
              <ul className="mt-6 space-y-3 border-t border-border pt-5">
                {item.proofs.map((proof) => (
                  <li key={proof} className="flex items-center gap-2 text-sm text-text">
                    <CheckCircle2 className="size-4 shrink-0 text-secondary" aria-hidden="true" />
                    {proof}
                  </li>
                ))}
              </ul>
            </Card>
          </article>
        ))}
      </div>
      <Link
        href="/work"
        className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {t("cta")}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </Section>
  );
}

"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export function TrustSection() {
  const t = useTranslations("Home.trust");

  return (
    <section className="overflow-hidden border-t border-white/5 bg-dark py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-3xl font-bold text-text md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted">{t("subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="flex min-h-32 items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <CheckCircle2
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-semibold text-text">
                  {t(`items.${index}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`items.${index}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

const logos = [
  { name: "Amazon", width: "h-8 md:h-10" },
  { name: "Tesla", width: "h-8 md:h-10" },
  { name: "Meta", width: "h-8 md:h-10" },
  { name: "Google", width: "h-8 md:h-10" },
  { name: "IBM", width: "h-8 md:h-10" },
];

export function TrustSection() {
  const t = useTranslations("Home.trust");

  return (
    <section className="py-24 bg-dark border-t border-white/5 overflow-hidden">
      <Container>
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-muted mb-12">
          {t("title")}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 hover:opacity-60 transition-all duration-700">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className={`${logo.width} flex items-center justify-center text-text font-display font-bold text-2xl`}
            >
              {logo.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { Rocket, Wrench, Brain } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/motion";
import { cn } from "@/lib/utils";

const icons = {
  Rocket,
  Wrench,
  Brain,
} as const;

type PathItem = {
  icon: keyof typeof icons;
  title: string;
  description: string;
  cta: string;
  href: string;
};

export function PathsSection() {
  const t = useTranslations("Home.paths");
  const items = t.raw("items") as PathItem[];

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")}>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[item.icon];
          return (
            <FadeIn key={item.title} delay={index * 0.1}>
              <Link href={item.href as "/contact"} className="block h-full">
                <Card
                  className={cn(
                    "group flex h-full flex-col p-6 transition-all",
                    "hover:border-primary/30 hover:shadow-md"
                  )}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-text group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted">
                    {item.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-primary">
                    {item.cta} →
                  </p>
                </Card>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}

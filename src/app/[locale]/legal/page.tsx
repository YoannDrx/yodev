"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion";

export default function LegalPage() {
  const t = useTranslations("LegalPage");
  const sections = t.raw("sections") as Array<{ title: string; content: string }>;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <Badge variant="primary" className="mb-4">
                {t("eyebrow")}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-bold text-text md:text-5xl">
                {t("title")}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-muted">{t("lastUpdated")}</p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <Card className="p-8 md:p-12">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div>
                    <h2 className="text-xl font-semibold text-text">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-muted leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}

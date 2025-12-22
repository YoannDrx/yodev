"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

type BlogSlug = string;

export function BlogArticleContent({ slug }: { slug: BlogSlug }) {
  const t = useTranslations("BlogArticles");
  const nav = useTranslations("Nav");

  const article = {
    title: t(`${slug}.title`),
    excerpt: t(`${slug}.excerpt`),
    category: t(`${slug}.category`),
    date: t(`${slug}.date`),
    readTime: t(`${slug}.readTime`),
    author: t(`${slug}.author`),
    content: t.raw(`${slug}.content`) as string[],
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <ButtonLink
                href="/blog"
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
                className="mb-8"
              >
                {nav("blog")}
              </ButtonLink>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Badge variant="primary" className="mb-4">
                {article.category}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-3xl font-bold text-text md:text-4xl lg:text-5xl">
                {article.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-6 text-lg text-muted">{article.excerpt}</p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {article.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <Card className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {article.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text">{t("ctaTitle")}</h2>
          <p className="mt-4 text-muted">{t("ctaSubtitle")}</p>
          <div className="mt-8">
            <ButtonLink href="/contact" size="lg">
              {t("ctaButton")}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

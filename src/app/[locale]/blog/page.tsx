"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
};

export default function BlogPage() {
  const t = useTranslations("BlogPage");
  const posts = t.raw("posts") as BlogPost[];

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
              <p className="mt-6 text-lg text-muted">{t("subtitle")}</p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <Section>
        <StaggerChildren staggerDelay={0.1}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={`/blog/${post.slug}` as any}
                  className="group block h-full"
                >
                  <Card className="flex h-full flex-col p-6 transition-all group-hover:border-primary/30 group-hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted">{post.date}</span>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-text group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm text-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                      {t("readMore")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
      </Section>
    </>
  );
}

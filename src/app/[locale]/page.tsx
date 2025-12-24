"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import {
  HeroHome,
  ServiceCard,
  ServiceGrid,
  CaseStudyCard,
  CaseStudyGrid,
  CtaSection,
  TestimonialCard,
  PathsSection,
  FitSection,
} from "@/components/sections";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion";

type HighlightItem = {
  title: string;
  description: string;
};

type StoryContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string[];
  highlights: HighlightItem[];
};

type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

type ExpertiseItem = {
  title: string;
  description: string;
};

type CaseItem = {
  title: string;
  type: string;
  summary: string;
  result: string;
};

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

export default function HomePage() {
  const t = useTranslations("Home");
  const nav = useTranslations("Nav");
  const blog = useTranslations("BlogPage");

  const story = t.raw("story") as StoryContent;
  const testimonials = t.raw("testimonials.items") as TestimonialItem[];
  const expertise = t.raw("expertise.items") as ExpertiseItem[];
  const cases = t.raw("cases.items") as CaseItem[];
  const blogPosts = blog.raw("posts") as BlogPost[];

  return (
    <>
      {/* Hero Section */}
      <HeroHome />

      {/* Story Section */}
      <Section eyebrow={story.eyebrow} title={story.title} subtitle={story.subtitle}>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4 text-sm text-muted md:text-base">
            {story.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="grid gap-4">
            {story.highlights.map((item) => (
              <Card key={item.title} className="p-5">
                <h3 className="text-base font-semibold text-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Paths Section - 3 ways to work with us */}
      <PathsSection />

      {/* Fit Section - For you / Not for you */}
      <FitSection />

      {/* Testimonials Section */}
      <Section
        eyebrow={t("testimonials.eyebrow")}
        title={t("testimonials.title")}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
            />
          ))}
        </div>
      </Section>

      {/* Cases Section */}
      <Section
        eyebrow={nav("work")}
        title={t("cases.title")}
        subtitle={t("cases.subtitle")}
      >
        <CaseStudyGrid>
          {cases.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.1}>
              <CaseStudyCard
                title={item.title}
                type={item.type}
                summary={item.summary}
                result={item.result}
              />
            </FadeIn>
          ))}
        </CaseStudyGrid>
      </Section>

      {/* Expertise Section */}
      <Section
        eyebrow={nav("expertise")}
        title={t("expertise.title")}
        subtitle={t("expertise.subtitle")}
      >
        <ServiceGrid>
          {expertise.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.1}>
              <ServiceCard title={item.title} description={item.description} />
            </FadeIn>
          ))}
        </ServiceGrid>
      </Section>

      {/* Blog Section */}
      <Section
        eyebrow={nav("blog")}
        title={t("blog.title")}
        subtitle={t("blog.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={`/blog/${post.slug}` as any}
              key={post.slug}
              className="group"
            >
              <Card className="flex h-full flex-col p-6 transition-all group-hover:border-primary/30 group-hover:shadow-md">
                <div className="flex items-center justify-between text-xs text-muted">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-[0.2em]">
                    {post.category}
                  </Badge>
                  <span>{post.date}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
                <p className="mt-6 text-xs text-muted">{post.readTime}</p>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/blog" variant="secondary">
            {t("blog.cta")}
          </ButtonLink>
        </div>
      </Section>

      {/* CTA Section */}
      <CtaSection
        eyebrow={nav("contact")}
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        ctaLabel={t("cta.button")}
        ctaHref="/contact"
        variant="card"
      />
    </>
  );
}

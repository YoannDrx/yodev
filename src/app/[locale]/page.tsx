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
  ClientLogosGrid,
} from "@/components/sections";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";

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

type FounderItem = {
  name: string;
  role: string;
  bio: string;
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

type TeamContent = {
  title: string;
  subtitle: string;
  photoLabel: string;
  schoolsTitle: string;
  schools: string[];
};

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

type JobPosting = {
  slug: string;
  title: string;
  type: string;
  location: string;
  department: string;
};

type LocationItem = {
  city: string;
  address: string;
  zip: string;
  country: string;
};

export default function HomePage() {
  const t = useTranslations("Home");
  const nav = useTranslations("Nav");
  const blog = useTranslations("BlogPage");
  const careers = useTranslations("CareersPage");

  const story = t.raw("story") as StoryContent;
  const founders = t.raw("founders.items") as FounderItem[];
  const testimonials = t.raw("testimonials.items") as TestimonialItem[];
  const expertise = t.raw("expertise.items") as ExpertiseItem[];
  const cases = t.raw("cases.items") as CaseItem[];
  const team = t.raw("team") as TeamContent;
  const blogPosts = blog.raw("posts") as BlogPost[];
  const jobs = careers.raw("jobs") as JobPosting[];
  const press = t.raw("press.outlets") as string[];
  const locations = t.raw("locations.items") as LocationItem[];

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

      {/* Founders Section */}
      <Section eyebrow={t("founders.eyebrow")} title={t("founders.title")}>
        <div className="grid gap-6 md:grid-cols-2">
          {founders.map((founder) => (
            <Card key={founder.name} className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {founder.role}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-text">
                {founder.name}
              </h3>
              <p className="mt-3 text-sm text-muted">{founder.bio}</p>
            </Card>
          ))}
        </div>
      </Section>

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

      {/* Team Section */}
      <Section
        eyebrow={t("team.eyebrow")}
        title={team.title}
        subtitle={team.subtitle}
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="flex h-full items-center justify-center p-10 text-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {team.photoLabel}
              </p>
              <p className="mt-3 text-sm text-muted">
                {t("team.photoHint")}
              </p>
            </div>
          </Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text">
                {team.schoolsTitle}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {team.schools.map((school) => (
                  <Badge key={school} variant="outline" className="text-xs">
                    {school}
                  </Badge>
                ))}
              </div>
            </div>
            <ButtonLink href="/team" variant="secondary">
              {t("team.cta")}
            </ButtonLink>
          </div>
        </div>
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

      {/* Jobs Section */}
      <Section
        eyebrow={nav("careers")}
        title={t("jobs.title")}
        subtitle={t("jobs.subtitle")}
      >
        <StaggerChildren staggerDelay={0.08}>
          <div className="grid gap-6 md:grid-cols-3">
            {jobs.slice(0, 3).map((job) => (
              <StaggerItem key={job.slug}>
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={`/careers/${job.slug}` as any}
                  className="group block h-full"
                >
                  <Card className="flex h-full flex-col p-6 transition-all group-hover:border-primary/30 group-hover:shadow-md">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      {job.department}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-text group-hover:text-primary">
                      {job.title}
                    </h3>
                    <div className="mt-4 text-sm text-muted">
                      <p>{job.location}</p>
                      <p>{job.type}</p>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/careers">
            {t("jobs.cta")}
          </ButtonLink>
        </div>
      </Section>

      {/* Press Section */}
      <Section eyebrow={t("press.eyebrow")} title={t("press.title")}>
        <ClientLogosGrid
          logos={press.map((name) => ({ name }))}
        />
      </Section>

      {/* Locations Section */}
      <Section eyebrow={t("locations.eyebrow")} title={t("locations.title")}>
        <div className="grid gap-6 md:grid-cols-3">
          {locations.map((location) => (
            <Card key={location.city} className="p-6">
              <h3 className="text-lg font-semibold text-text">{location.city}</h3>
              <p className="mt-2 text-sm text-muted">{location.address}</p>
              <p className="text-sm text-muted">
                {location.zip}, {location.country}
              </p>
            </Card>
          ))}
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

import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { ArrowLeft, ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";

// Postes disponibles
const JOB_SLUGS = ["dev-fullstack", "ux-designer", "chef-projet"] as const;

type JobSlug = (typeof JOB_SLUGS)[number];

export function generateStaticParams() {
  return JOB_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "JobPostings" });

  if (!JOB_SLUGS.includes(slug as JobSlug)) {
    return { title: "Poste non trouvé" };
  }

  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.summary`),
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  if (!JOB_SLUGS.includes(slug as JobSlug)) {
    notFound();
  }

  return <JobContent slug={slug as JobSlug} />;
}

function JobContent({ slug }: { slug: JobSlug }) {
  const t = useTranslations("JobPostings");
  const nav = useTranslations("Nav");

  const job = {
    title: t(`${slug}.title`),
    type: t(`${slug}.type`),
    location: t(`${slug}.location`),
    department: t(`${slug}.department`),
    summary: t(`${slug}.summary`),
    responsibilities: t.raw(`${slug}.responsibilities`) as string[],
    requirements: t.raw(`${slug}.requirements`) as string[],
    benefits: t.raw(`${slug}.benefits`) as string[],
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <Container>
          <FadeIn>
            <ButtonLink
              href="/careers"
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              className="mb-8"
            >
              {nav("careers")}
            </ButtonLink>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn delay={0.1}>
              <h1 className="text-3xl font-bold text-text md:text-4xl lg:text-5xl">
                {job.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-6 flex flex-wrap gap-4">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {job.department}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {job.type}
                </Badge>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-6 text-lg text-muted">{job.summary}</p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {t("applyButton")}
                </ButtonLink>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Responsibilities Section */}
      <Section eyebrow={t("responsibilitiesEyebrow")} title={t("responsibilitiesTitle")}>
        <Card className="p-8">
          <ul className="space-y-3">
            {job.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-muted">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* Requirements Section */}
      <Section
        eyebrow={t("requirementsEyebrow")}
        title={t("requirementsTitle")}
        className="bg-surface/50"
      >
        <Card className="p-8">
          <ul className="space-y-3">
            {job.requirements.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-muted">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* Benefits Section */}
      <Section eyebrow={t("benefitsEyebrow")} title={t("benefitsTitle")}>
        <Card className="p-8">
          <ul className="space-y-3">
            {job.benefits.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-muted">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* Apply CTA */}
      <Section className="py-16">
        <Card variant="elevated" className="overflow-hidden">
          <div className="relative flex flex-col items-center gap-6 p-8 text-center md:p-12">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
            <h2 className="text-2xl font-bold text-text md:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="max-w-xl text-muted">{t("ctaSubtitle")}</p>
            <ButtonLink
              href="/contact"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {t("applyButton")}
            </ButtonLink>
          </div>
        </Card>
      </Section>
    </>
  );
}

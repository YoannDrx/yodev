import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";

type JobPosting = {
  slug: string;
  title: string;
  type: string;
  location: string;
  department: string;
};

export default function CareersPage() {
  const t = useTranslations("CareersPage");
  const jobs = t.raw("jobs") as JobPosting[];
  const values = t.raw("values") as Array<{ title: string; description: string }>;

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

      {/* Values Section */}
      <Section eyebrow={t("valuesEyebrow")} title={t("valuesTitle")}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-text">{value.title}</h3>
                <p className="mt-2 text-sm text-muted">{value.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Open Positions Section */}
      <Section
        eyebrow={t("positionsEyebrow")}
        title={t("positionsTitle")}
        className="bg-surface/50"
      >
        {jobs.length > 0 ? (
          <StaggerChildren staggerDelay={0.1}>
            <div className="space-y-4">
              {jobs.map((job) => (
                <StaggerItem key={job.slug}>
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={`/careers/${job.slug}` as any}
                    className="group block"
                  >
                    <Card className="flex flex-col gap-4 p-6 transition-all group-hover:border-primary/30 group-hover:shadow-md md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-text group-hover:text-primary">
                          {job.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        {t("viewJob")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted">{t("noPositions")}</p>
          </Card>
        )}
      </Section>

      {/* Spontaneous Application CTA */}
      <Section>
        <Card variant="elevated" className="overflow-hidden">
          <div className="relative flex flex-col items-center gap-6 p-8 text-center md:p-12">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
            <h2 className="text-2xl font-bold text-text md:text-3xl">
              {t("spontaneousTitle")}
            </h2>
            <p className="max-w-xl text-muted">{t("spontaneousSubtitle")}</p>
            <ButtonLink
              href="/contact"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {t("spontaneousButton")}
            </ButtonLink>
          </div>
        </Card>
      </Section>
    </>
  );
}

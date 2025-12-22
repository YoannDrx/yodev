import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { JobContent } from "@/components/content/job-content";

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

  return <JobContent slug={slug} />;
}

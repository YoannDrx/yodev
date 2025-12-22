import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CaseStudyContent } from "@/components/content/case-study-content";

// Études de cas disponibles
const CASE_STUDIES = ["saas-b2b", "ecommerce-refonte", "app-coaching"] as const;

type CaseStudySlug = (typeof CASE_STUDIES)[number];

export function generateStaticParams() {
  return CASE_STUDIES.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "CaseStudies" });

  if (!CASE_STUDIES.includes(slug as CaseStudySlug)) {
    return { title: "Projet non trouvé" };
  }

  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.summary`),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  if (!CASE_STUDIES.includes(slug as CaseStudySlug)) {
    notFound();
  }

  return <CaseStudyContent slug={slug} />;
}

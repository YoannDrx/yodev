import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ServiceContent } from "@/components/content/service-content";
import { routing } from "@/i18n/routing";

// Services disponibles (slugs internes)
const SERVICES = [
  "ai",
  "web",
  "custom-software",
  "mobile",
  "ecommerce",
  "ux-design",
  "cybersecurity",
] as const;

type ServiceSlug = (typeof SERVICES)[number];

// Mapping des slugs localisés vers les slugs internes
const LOCALIZED_SLUG_TO_SERVICE: Record<string, ServiceSlug> = {
  // Slugs FR
  "ia": "ai",
  "logiciel-metier": "custom-software",
  "cybersecurite": "cybersecurity",
  // Slugs EN (identiques aux slugs internes)
  "ai": "ai",
  "web": "web",
  "custom-software": "custom-software",
  "mobile": "mobile",
  "ecommerce": "ecommerce",
  "ux-design": "ux-design",
  "cybersecurity": "cybersecurity",
};

// Tous les slugs possibles (pour generateStaticParams)
const ALL_SLUGS = Object.keys(LOCALIZED_SLUG_TO_SERVICE);

function getInternalServiceSlug(localizedSlug: string): ServiceSlug | null {
  return LOCALIZED_SLUG_TO_SERVICE[localizedSlug] || null;
}

export function generateStaticParams() {
  // Générer les params pour toutes les combinaisons locale/slug
  const params: { locale: string; service: string }[] = [];

  for (const locale of routing.locales) {
    for (const slug of ALL_SLUGS) {
      params.push({ locale, service: slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { locale, service: urlSlug } = await params;
  const internalSlug = getInternalServiceSlug(urlSlug);

  if (!internalSlug) {
    return { title: "Service non trouvé" };
  }

  const t = await getTranslations({ locale, namespace: "Services" });

  return {
    title: t(`${internalSlug}.title`),
    description: t(`${internalSlug}.description`),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { service: urlSlug } = await params;
  const internalSlug = getInternalServiceSlug(urlSlug);

  if (!internalSlug) {
    notFound();
  }

  return <ServiceContent service={internalSlug} />;
}

import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ServiceContent } from "@/components/content/service-content";

// Services disponibles
const SERVICES = [
  "web",
  "mobile",
  "saas",
  "ecommerce",
  "ux-design",
  "consulting",
  "seo",
  "support",
] as const;

type ServiceSlug = (typeof SERVICES)[number];

export function generateStaticParams() {
  return SERVICES.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { locale, service } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });

  if (!SERVICES.includes(service as ServiceSlug)) {
    return { title: "Service non trouvé" };
  }

  return {
    title: t(`${service}.title`),
    description: t(`${service}.description`),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { service } = await params;

  if (!SERVICES.includes(service as ServiceSlug)) {
    notFound();
  }

  return <ServiceContent service={service} />;
}

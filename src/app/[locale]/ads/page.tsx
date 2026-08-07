import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProductLanding } from "@/components/products/product-landing";
import { routing } from "@/i18n/routing";
import { adsCopy, productUrls } from "@/lib/products";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const language = hasLocale(routing.locales, locale) ? locale : "fr";
  const copy = adsCopy[language];
  return {
    title: `Ads by Yodev — ${copy.eyebrow}`,
    description: copy.subtitle,
    alternates: { canonical: `/${language}/ads`, languages: { fr: "/fr/ads", en: "/en/ads" } },
    openGraph: { title: `Ads by Yodev — ${copy.eyebrow}`, description: copy.subtitle, url: `/${language}/ads`, type: "website" },
  };
}

export default async function AdsProductPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <ProductLanding copy={adsCopy[locale]} appUrl={productUrls.ads} accent="ads" />;
}

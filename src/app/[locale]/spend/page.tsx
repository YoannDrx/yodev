import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProductLanding } from "@/components/products/product-landing";
import { routing } from "@/i18n/routing";
import { productUrls, spendCopy } from "@/lib/products";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const language = hasLocale(routing.locales, locale) ? locale : "fr";
  const copy = spendCopy[language];
  return {
    title: `Yodev Spend — ${copy.eyebrow}`,
    description: copy.subtitle,
    alternates: { canonical: `/${language}/spend`, languages: { fr: "/fr/spend", en: "/en/spend" } },
    openGraph: { title: `Yodev Spend — ${copy.eyebrow}`, description: copy.subtitle, url: `/${language}/spend`, type: "website" },
  };
}

export default async function SpendProductPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <ProductLanding copy={spendCopy[locale]} appUrl={productUrls.spend[locale]} accent="spend" locale={locale} />;
}

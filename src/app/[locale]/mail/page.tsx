import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProductLanding } from "@/components/products/product-landing";
import { routing } from "@/i18n/routing";
import { mailCopy, productUrls } from "@/lib/products";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const language = hasLocale(routing.locales, locale) ? locale : "fr";
  const copy = mailCopy[language];
  return {
    title: `Mail by Yodev — ${copy.eyebrow}`,
    description: copy.subtitle,
    alternates: { canonical: `/${language}/mail`, languages: { fr: "/fr/mail", en: "/en/mail" } },
    openGraph: { title: `Mail by Yodev — ${copy.eyebrow}`, description: copy.subtitle, url: `/${language}/mail`, type: "website" },
  };
}

export default async function MailProductPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <ProductLanding copy={mailCopy[locale]} appUrl={productUrls.mail} accent="mail" />;
}

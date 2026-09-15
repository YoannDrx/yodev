import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { fontVariables } from "@/app/_fonts";
import "@/app/globals.css";

const metadataByLocale = {
  fr: {
    title: "Yodev — Développeur indépendant web & mobile",
    description:
      "Yoann Andrieux, développeur indépendant. Applications web et mobiles, refonte et automatisation pour les PME et les fondateurs.",
  },
  en: {
    title: "Yodev — Independent web & mobile developer",
    description:
      "Yoann Andrieux, independent developer. Web and mobile apps, redesign and automation for small businesses and founders.",
  },
} as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const supportedLocale = hasLocale(routing.locales, locale) ? locale : "fr";
  const copy = metadataByLocale[supportedLocale];

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://yodev.fr"
    ),
    title: copy.title,
    description: copy.description,
    authors: [{ name: "Yodev" }],
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: "website",
      locale: supportedLocale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={fontVariables}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="min-h-screen bg-bg text-text">
              <SiteHeader />
              <main id="main-content" className="min-h-screen">
                {children}
              </main>
              <SiteFooter />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen bg-bg text-text">
        <SiteHeader />
        <main className="relative">{children}</main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}

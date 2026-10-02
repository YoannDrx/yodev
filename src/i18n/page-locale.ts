import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";
export type LocalizedPageProps = { params: Promise<{ locale: string }> };
export async function getPageLocale(params: LocalizedPageProps["params"]) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}

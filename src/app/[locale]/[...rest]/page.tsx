import { notFound } from "next/navigation";
import { getPageLocale, type LocalizedPageProps } from "@/i18n/page-locale";
export default async function UnknownPage({ params }: LocalizedPageProps) {
  await getPageLocale(params);
  notFound();
}

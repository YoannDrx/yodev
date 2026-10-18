import { getTranslations } from "next-intl/server";
import { getPageLocale, type LocalizedPageProps } from "@/i18n/page-locale";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";

export default async function LegalPage({ params }: LocalizedPageProps) {
  const locale = await getPageLocale(params);
  const t = await getTranslations({ locale, namespace: "LegalPage" });
  const sections = t.raw("sections") as Array<{ title: string; content: string }>;
  return <>
    <PageHero kicker={t("eyebrow")} title={t("title")} lead={t("lastUpdated")} at={.4} />
    <div className="yd-wrap"><article className="yd-section yd-legal">{sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.content}</p></section>)}</article></div>
  </>;
}

export async function generateMetadata({ params }: LocalizedPageProps) { return pageMetadata("legal", await getPageLocale(params)); }

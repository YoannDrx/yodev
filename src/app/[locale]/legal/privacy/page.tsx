import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { getPageLocale, type LocalizedPageProps } from "@/i18n/page-locale";
import { pageMetadata } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/site/page-hero";

export default async function PrivacyPage({ params }: LocalizedPageProps) {
  const locale = await getPageLocale(params);
  const t = await getTranslations({ locale, namespace: "PrivacyPage" });
  const sections = t.raw("sections") as Array<{ title: string; content: string }>;
  return <>
    <PageHero kicker={t("eyebrow")} title={t("title")} lead={t("lastUpdated")} at={.6}>
      <Link href="/legal" className="yd-text-link yd-back-link"><ArrowLeft size={16} aria-hidden="true" />{t("backToLegal")}</Link>
    </PageHero>
    <div className="yd-wrap"><article className="yd-section yd-legal">
      {sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.content}</p></section>)}
      <nav aria-label={locale === "fr" ? "Ressources sur les données personnelles" : "Privacy resources"} className="yd-legal-links">
        <a href="https://www.cnil.fr/fr/plaintes">CNIL</a>
        <a href="https://vercel.com/legal/dpa">Vercel DPA</a>
        <a href="https://resend.com/legal/dpa">Resend DPA</a>
      </nav>
    </article></div>
  </>;
}

export async function generateMetadata({ params }: LocalizedPageProps) { return pageMetadata("privacy", await getPageLocale(params)); }

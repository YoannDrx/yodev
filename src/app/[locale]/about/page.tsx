import { getPageLocale, type LocalizedPageProps } from "@/i18n/page-locale";
import { pageMetadata } from "@/lib/site";
import { commercial } from "@/lib/commercial";
import { ProductIndex, ContactBand } from "@/components/site/editorial";
import { PageHero } from "@/components/site/page-hero";
export default async function AboutPage({ params }: LocalizedPageProps) {
 const locale = await getPageLocale(params); const c = commercial[locale];
 return <>
  <PageHero kicker={c.person} title={c.aboutTitle} at={.55} />
  <div className="yd-wrap"><section className="yd-section yd-prose"><p>{c.aboutText}</p><p>{c.aboutMore}</p></section><ProductIndex locale={locale} /></div>
  <ContactBand locale={locale} />
 </>;
}

export async function generateMetadata({ params }: LocalizedPageProps) { return pageMetadata("about", await getPageLocale(params)); }

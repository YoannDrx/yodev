import { getPageLocale, type LocalizedPageProps } from "@/i18n/page-locale";
import { pageMetadata } from "@/lib/site";
import { commercial } from "@/lib/commercial";
import { ExpertiseSection, MethodSection, ContactBand } from "@/components/site/editorial";
import { PageHero } from "@/components/site/page-hero";
import { SignalDivider } from "@/components/site/signal";
export default async function ServicesPage({ params }: LocalizedPageProps) {
 const locale = await getPageLocale(params); const c = commercial[locale];
 return <>
  <PageHero kicker={c.person} title={c.servicesTitle} lead={c.intro} at={.72} />
  <div className="yd-wrap"><ExpertiseSection locale={locale} detailed /></div>
  <SignalDivider at={.3} />
  <div className="yd-wrap">
   <section className="yd-section" id="formats"><div className="yd-section-head"><h2>{c.formats}</h2><p>{c.quote}</p></div><div className="yd-cards">{c.formatItems.map(([title, body]) => <article className="yd-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
   <MethodSection locale={locale} />
  </div>
  <ContactBand locale={locale} />
 </>;
}

export async function generateMetadata({ params }: LocalizedPageProps) { return pageMetadata("services", await getPageLocale(params)); }

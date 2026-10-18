import { getPageLocale, type LocalizedPageProps } from "@/i18n/page-locale";
import { pageMetadata } from "@/lib/site";
import { commercial } from "@/lib/commercial";
import { WorkSection, ProductIndex, ContactBand } from "@/components/site/editorial";
import { PageHero } from "@/components/site/page-hero";
export default async function WorkPage({ params }: LocalizedPageProps) {
 const locale = await getPageLocale(params); const c = commercial[locale];
 return <>
  <PageHero kicker={c.person} title={c.proofsTitle} at={.3} lead={locale === "fr" ? "Des missions clients et des produits personnels. Pour chaque projet, un besoin concret et un rôle clairement identifié." : "Client engagements and personal products. Each project starts with a specific need and a clearly identified role."} />
  <div className="yd-wrap"><WorkSection locale={locale} detailed /><ProductIndex locale={locale} /></div>
  <ContactBand locale={locale} />
 </>;
}

export async function generateMetadata({ params }: LocalizedPageProps) { return pageMetadata("work", await getPageLocale(params)); }

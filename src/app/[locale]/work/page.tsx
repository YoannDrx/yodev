import { getLocale } from "next-intl/server";
import { commercial } from "@/lib/commercial";
import { WorkSection, ProductIndex, ProjectCta } from "@/components/site/editorial";
export default async function WorkPage() {
 const locale = await getLocale() === "en" ? "en" : "fr"; const c = commercial[locale];
 return <div className="yd-wrap"><header className="yd-intro"><p className="yd-meta">{c.work}</p><h1>{c.proofsTitle}</h1><p className="yd-lead">{locale === "fr" ? "Des missions clients et des produits personnels. Pour chaque projet, un besoin concret et un rôle clairement identifié." : "Client engagements and personal products. Each project starts with a specific need and a clearly identified role."}</p></header><WorkSection locale={locale} detailed /><ProductIndex locale={locale} /><ProjectCta locale={locale} /></div>;
}

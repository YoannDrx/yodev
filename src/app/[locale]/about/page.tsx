import { getLocale } from "next-intl/server";
import { commercial } from "@/lib/commercial";
import { ProductIndex, ProjectCta } from "@/components/site/editorial";
export default async function AboutPage() {
 const locale = await getLocale() === "en" ? "en" : "fr"; const c = commercial[locale];
 return <div className="yd-wrap"><header className="yd-intro"><p className="yd-meta">{c.person}</p><h1>{c.aboutTitle}</h1></header><section className="yd-section yd-prose"><p>{c.aboutText}</p><p className="mt-8">{c.aboutMore}</p></section><ProductIndex locale={locale} /><ProjectCta locale={locale} /></div>;
}

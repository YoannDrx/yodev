import { getLocale } from "next-intl/server";
import { commercial } from "@/lib/commercial";
import { ExpertiseSection, MethodSection, ProjectCta } from "@/components/site/editorial";
export default async function ServicesPage() {
 const locale = await getLocale() === "en" ? "en" : "fr"; const c = commercial[locale];
 return <div className="yd-wrap"><header className="yd-intro"><p className="yd-meta">{c.expertise}</p><h1>{c.servicesTitle}</h1><p className="yd-lead">{c.intro}</p></header><ExpertiseSection locale={locale} detailed /><section className="yd-section" id="formats"><div className="yd-section-head"><span className="yd-meta">{c.quote}</span><h2>{c.formats}</h2></div><div className="yd-process">{c.formatItems.map(([title,body]) => <article key={title}><h3>{title}</h3><p>{body}</p><span className="yd-meta">{c.quote}</span></article>)}</div></section><MethodSection locale={locale} /><ProjectCta locale={locale} /></div>;
}

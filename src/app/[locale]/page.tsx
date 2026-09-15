import { getLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { commercial } from "@/lib/commercial";
import { ProductIndex, ExpertiseSection, WorkSection, MethodSection } from "@/components/site/editorial";
import { ContactSection } from "@/components/site/contact-section";

export default async function HomePage() {
  const locale = await getLocale() === "en" ? "en" : "fr";
  const c = commercial[locale];
  return <><div className="yd-wrap"><section className="yd-hero"><p className="yd-meta yd-kicker">01 — {c.person}</p><div className="yd-hero-grid"><div><h1>{c.title[0]}<br />{c.title[1]}</h1><p className="yd-lead">{c.intro}</p><div className="yd-actions"><Link className="yd-button" href="/contact">{c.cta}<ArrowUpRight size={16} /></Link><a className="yd-button yd-button-secondary" href="#produits">{c.discover}</a></div></div><aside className="yd-hero-aside yd-meta" aria-hidden="true">WEB<br />MOBILE<br />{locale === "fr" ? "OUTILS MÉTIER" : "BUSINESS TOOLS"}<hr />{locale === "fr" ? <>SIMPLE<br />SOIGNÉ<br />SUR LE LONG TERME</> : <>SIMPLE<br />CONSIDERED<br />BUILT TO LAST</>}</aside></div></section><ProductIndex locale={locale} /><ExpertiseSection locale={locale} /><WorkSection locale={locale} /><MethodSection locale={locale} /></div><ContactSection embedded /></>;
}

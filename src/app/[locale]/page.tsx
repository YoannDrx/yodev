import { getPageLocale, type LocalizedPageProps } from "@/i18n/page-locale";
import { pageMetadata } from "@/lib/site";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { commercial } from "@/lib/commercial";
import { ProductShowcase, ExpertiseSection, WorkSection, MethodSection, ContactBand } from "@/components/site/editorial";
import { Accent, HeroSignal, SignalDivider } from "@/components/site/signal";
import { ContactSection } from "@/components/site/contact-section";

export default async function HomePage({ params }: LocalizedPageProps) {
  const locale = await getPageLocale(params);
  const c = commercial[locale];
  return <>
    <section className="yd-hero y-dots" aria-labelledby="hero-title">
      <div className="yd-wrap yd-hero-grid">
        <div className="yd-hero-main">
          <p className="yd-kicker"><span className="yd-node" aria-hidden="true" />{c.person}</p>
          <h1 id="hero-title"><Accent text={c.title[0]} accent={c.titleAccent} className="yd-hl" /><br /><span className="yd-h1-muted">{c.title[1]}</span></h1>
        </div>
        <div className="yd-hero-side">
          <p className="yd-lead">{c.intro}</p>
          <div className="yd-actions"><Link className="yd-button yd-button-lg" href="/contact">{c.cta}<ArrowRight size={16} aria-hidden="true" /></Link><a className="yd-button yd-button-lg yd-button-secondary" href="#produits">{c.discover}<ArrowDown size={16} aria-hidden="true" /></a></div>
        </div>
      </div>
      <HeroSignal label={c.heroLine} linkLabel={c.products} />
    </section>
    <ProductShowcase locale={locale} />
    <SignalDivider at={.5} className="yd-divider-band" />
    <div className="yd-wrap"><ExpertiseSection locale={locale} /><WorkSection locale={locale} /><MethodSection locale={locale} /></div>
    <ContactBand locale={locale} email />
    <ContactSection embedded />
  </>;
}

export async function generateMetadata({ params }: LocalizedPageProps) { return pageMetadata("home", await getPageLocale(params)); }

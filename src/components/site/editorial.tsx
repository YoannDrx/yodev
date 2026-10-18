import { Fragment } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { commercial, type CommercialLocale } from "@/lib/commercial";
import { demoLabel, productTeasers } from "@/lib/product-stories";
import { SignalLine, YodevBrand, type YodevProduct } from "@/brand/brand";
import { AdsCpa, MailStream, SpendSteps } from "@/components/products/product-figures";
import { SignalDivider } from "./signal";

const PRODUCTS = ["mail", "ads", "spend"] as const satisfies readonly YodevProduct[];
const FIGURES = { mail: MailStream, ads: AdsCpa, spend: SpendSteps };
/** Where the transition line peaks before each product, so the spikes never line up. */
const DIVIDER_AT = { mail: 0, ads: .736, spend: .25 };

/** Home: the three products, each read as a line. */
export function ProductShowcase({ locale }: { locale: CommercialLocale }) {
  const c = commercial[locale];
  return <section id="produits" className="yd-band" aria-labelledby="produits-title">
    <div className="yd-wrap yd-band-head"><h2 id="produits-title">{c.productsTitle}</h2><p>{c.productsIntro}</p></div>
    {PRODUCTS.map(product => {
      const t = productTeasers[locale][product];
      const Figure = FIGURES[product];
      return <Fragment key={product}>
        {product !== "mail" && <SignalDivider product={product} at={DIVIDER_AT[product]} />}
        <article className="yd-wrap yd-showcase" data-product={product}>
          <div className="yd-showcase-copy">
            <YodevBrand product={product} className="yd-showcase-brand" />
            <h3>{t.title[0]}<span className="yd-accent">{t.title[1]}</span>{t.title[2]}</h3>
            <ul className="yd-checks">{t.points.map(point => <li key={point}><Check size={18} aria-hidden="true" />{point}</li>)}</ul>
            <div className="yd-actions"><Link className="yd-button" href={`/${product}`}>{t.cta}<ArrowRight size={16} aria-hidden="true" /></Link><span className="yd-status">{t.status}</span></div>
          </div>
          <figure className="yd-figure">
            <figcaption><span>{t.figure.caption}</span><span className="yd-accent">{t.figure.summary}</span></figcaption>
            <Figure locale={locale} />
            <p className="sr-only">{t.figure.label}</p>
            <p className="yd-demo">{demoLabel[locale]}</p>
          </figure>
        </article>
      </Fragment>;
    })}
  </section>;
}

/** Compact product list for secondary pages. */
export function ProductIndex({ locale }: { locale: CommercialLocale }) {
  const labels = locale === "fr" ? ["Emails transactionnels", "Pilotage Google Ads", "Dépenses logicielles"] : ["Transactional emails", "Google Ads operations", "Software expenses"];
  return <section id="produits" className="yd-section"><h2>{commercial[locale].products}</h2><div className="yd-products">{PRODUCTS.map((product, index) => <Link className="yd-product" key={product} href={`/${product}`} data-product={product}><span><YodevBrand product={product} /><span className="yd-product-label">{labels[index]}</span></span><ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div></section>;
}

/** Small line pictograms, one per kind of work: steady screens, a gesture, a rework, a connection. */
const WAVES = [
  "M0 42 H25 V16 H50 V42 H75 V16 H100 V42 H125 V16 H150 V42 H175 V16 H200",
  "M0 30 C12 4, 38 4, 50 30 S88 56, 100 30 S138 4, 150 30 S188 56, 200 30",
  "M0 46 L40 14 L40 46 L80 14 L80 46 L120 14 L120 46 L160 14 L160 46 L200 14",
  "M0 36 H60 L70 26 L78 44 L90 6 L100 52 L108 30 L116 36 H200",
];
export function ExpertiseSection({ locale, detailed = false }: { locale: CommercialLocale; detailed?: boolean }) {
  const c = commercial[locale];
  return <section id="expertises" className="yd-section"><div className="yd-section-head"><h2>{detailed ? c.expertise : c.servicesTitle}</h2><p>{c.servicesNote}</p></div><div className="yd-cards">{c.services.map((s, i) => <article className="yd-card" key={s.title}><svg className="yd-wave" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true"><path d={WAVES[i]} /></svg><h3>{s.title}</h3><p>{s.text}</p>{detailed && <ul>{s.details.map(d => <li key={d}>{d}</li>)}</ul>}</article>)}</div>{!detailed && <Link className="yd-text-link" href="/services">{c.expertise}<ArrowUpRight size={16} aria-hidden="true" /></Link>}</section>;
}

export function WorkSection({ locale, detailed = false }: { locale: CommercialLocale; detailed?: boolean }) {
  const c = commercial[locale];
  return <section id="realisations" className="yd-section"><div className="yd-section-head"><h2>{detailed ? c.work : c.proofsTitle}</h2></div><div className="yd-work">{c.workItems.map(item => <article key={item.name}><div className="yd-work-image"><Image src={item.image} alt={`${item.name} — ${item.label}`} fill sizes="(max-width: 700px) 90vw, 50vw" /></div><div className="yd-work-meta"><h3>{item.name}</h3><span>{item.label}</span></div><p>{item.text}</p>{detailed && <p>{item.result}</p>}<a href={item.url} className="yd-text-link">{locale === "fr" ? `Voir ${item.name}` : `Visit ${item.name}`}<ArrowUpRight size={16} aria-hidden="true" /></a></article>)}</div>{!detailed && <Link className="yd-text-link" href="/work">{c.allWork}<ArrowUpRight size={16} aria-hidden="true" /></Link>}</section>;
}

/** Collaboration as a line that reaches its node at launch: no step numbers. */
export function MethodSection({ locale }: { locale: CommercialLocale }) {
  const c = commercial[locale];
  return <section id="methode" className="yd-section"><div className="yd-section-head"><h2>{c.methodTitle}</h2></div><ol className="yd-steps">{c.steps.map(([title, body], i) => <li key={title} className={i === c.steps.length - 1 ? "is-last" : undefined}><span className="yd-step-line" aria-hidden="true"><span className="yd-step-node" /></span><h3>{title}</h3><p>{body}</p></li>)}</ol></section>;
}

/** The closing band: a Yodev fill with the line running through it. On the home page it sits above the form and offers email instead. */
export function ContactBand({ locale, email = false }: { locale: CommercialLocale; email?: boolean }) {
  const c = commercial[locale];
  const label = <>{email ? c.contactMail : c.cta}<ArrowRight size={16} aria-hidden="true" /></>;
  return <section className="yd-wrap yd-fill-band" data-product="yodev" aria-labelledby="contact-title"><div className="yd-fill-band-body"><div><h2 id="contact-title">{c.contactTitle}</h2><p>{c.contactBody}</p></div>{email ? <a className="yd-button yd-button-lg yd-button-ink" href="mailto:hello@yodev.fr">{label}</a> : <Link className="yd-button yd-button-lg yd-button-ink" href="/contact">{label}</Link>}</div><SignalLine width={1440} height={120} spikes={[.82]} /></section>;
}

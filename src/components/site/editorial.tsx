import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { commercial, type CommercialLocale } from "@/lib/commercial";
import { YodevBrand } from "@/brand/brand";

export function ProductIndex({ locale }: { locale: CommercialLocale }) {
  const labels = locale === "fr" ? ["Emails transactionnels", "Pilotage Google Ads", "Dépenses logicielles"] : ["Transactional emails", "Google Ads operations", "Software expenses"];
  return <div id="produits" className="yd-products"><span className="yd-meta">02 — {commercial[locale].products}</span>{(["mail", "ads", "spend"] as const).map((product, index) => <Link className="yd-product" key={product} href={`/${product}`}><div><YodevBrand product={product} /><p>{labels[index]}</p></div><ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div>;
}
export function ExpertiseSection({ locale, detailed = false }: { locale: CommercialLocale; detailed?: boolean }) {
  const c = commercial[locale];
  return <section id="expertises" className="yd-section"><div className="yd-section-head"><p className="yd-meta">03 — {c.expertise}</p><h2>{c.servicesTitle}</h2></div><div className="yd-services">{c.services.map((s, i) => <article className="yd-service" key={s.title}><span className="yd-meta">0{i + 1}</span><div><h3>{s.title}</h3><p>{s.text}</p>{detailed && <ul>{s.details.map(d => <li key={d}>{d}</li>)}</ul>}</div></article>)}</div>{!detailed && <Link className="yd-text-link" href="/services">{c.expertise} <ArrowUpRight size={16} /></Link>}</section>;
}
export function WorkSection({ locale, detailed = false }: { locale: CommercialLocale; detailed?: boolean }) {
  const c = commercial[locale];
  return <section className="yd-section"><div className="yd-section-head"><p className="yd-meta">04 — {c.work}</p><h2>{c.proofsTitle}</h2></div><div className="yd-work">{c.workItems.map(item => <article key={item.name}><div className="yd-work-image"><Image src={item.image} alt={`${item.name} — ${item.label}`} fill sizes="(max-width: 700px) 90vw, 45vw" /></div><p className="yd-meta">{item.label}</p><h3>{item.name}</h3><p>{item.text}</p>{detailed && <p>{item.result}</p>}</article>)}</div>{!detailed && <Link className="yd-text-link" href="/work">{c.allWork} <ArrowUpRight size={16} /></Link>}</section>;
}
export function MethodSection({ locale }: { locale: CommercialLocale }) {
  const c = commercial[locale];
  return <section id="methode" className="yd-section"><div className="yd-section-head"><p className="yd-meta">05 — {c.method}</p><h2>{c.methodTitle}</h2></div><div className="yd-process">{c.steps.map(([title, body], i) => <article key={title}><span className="yd-meta">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>;
}
export function ProjectCta({ locale }: { locale: CommercialLocale }) { return <div className="yd-section"><Link className="yd-button" href="/contact">{commercial[locale].cta} <ArrowUpRight size={16} /></Link></div>; }

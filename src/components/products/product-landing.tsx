import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Bot, Check, Code, EyeOff, FolderKanban, Globe, LayoutGrid, Plug, Scale, ShieldCheck, Split, Target, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SignalLine, YodevBrand, signalPath, signalPoints, type YodevProduct } from "@/brand/brand";
import type { ProductLandingCopy, ProductLocale } from "@/lib/products";
import { adsStory, demoLabel, mailStory, spendStory } from "@/lib/product-stories";
import { Accent, SignalDivider, SignalRoute } from "@/components/site/signal";
import { AdsDrift, SpendAllocation, SpendStairs } from "./product-figures";

/** Each product page opens on its own story; the anchor bar names it. */
const STORY_ID: Record<YodevProduct, string> = { mail: "api", ads: "decision", spend: "repartition" };
const STORY_LABEL: Record<ProductLocale, Record<YodevProduct, string>> = {
  fr: { mail: "L’API", ads: "La décision", spend: "La répartition" },
  en: { mail: "The API", ads: "The decision", spend: "Allocation" },
};

const ICONS: Record<YodevProduct, LucideIcon[]> = {
  mail: [Code, ShieldCheck, Globe, EyeOff],
  ads: [Bot, Target, ShieldCheck, FolderKanban],
  spend: [Plug, Split, Scale, LayoutGrid],
};

export function ProductLanding({ copy, appUrl, accent, locale = "fr" }: { copy: ProductLandingCopy; appUrl: string; accent: YodevProduct; locale?: ProductLocale }) {
  const fr = locale === "fr";
  const contact = { pathname: "/contact", query: { product: accent } } as const;
  const applyUrl = `https://mail.yodev.fr/${locale}/inscription`;
  const site = fr ? "Explorer le site du produit" : "Explore the product website";
  const talk = fr ? "Parlons-en" : "Let’s talk";
  const anchors = ([
    [STORY_ID[accent], STORY_LABEL[locale][accent]],
    ...(accent === "ads" ? [["parcours", fr ? "Le parcours" : "The journey"]] : []),
    ["fonctions", fr ? "Fonctions" : "Features"],
    ["garanties", fr ? "Garanties" : "Safeguards"],
    ...(copy.pricing ? [["tarif", fr ? "Tarif" : "Pricing"]] : []),
    ["acces", fr ? "Accès" : "Access"],
  ] as [string, string][]);
  return <div data-product={accent}>
    <section className="yd-hero y-dots" aria-labelledby="product-title">
      <div className="yd-wrap yd-hero-grid">
        <div className="yd-hero-main">
          <YodevBrand product={accent} className="yd-product-brand" />
          <p className="yd-kicker yd-accent"><span className="yd-node" aria-hidden="true" />{copy.eyebrow}</p>
          <h1 id="product-title" className="yd-h1-product"><Accent text={copy.title} accent={copy.titleAccent} /></h1>
        </div>
        <div className="yd-hero-side">
          <p className="yd-lead">{copy.subtitle}</p>
          <div className="yd-actions">
            {accent === "mail"
              ? <a href={applyUrl} className="yd-button yd-button-lg">{copy.primaryCta}<ArrowUpRight size={16} aria-hidden="true" /></a>
              : <Link href={contact} className="yd-button yd-button-lg">{fr ? "Parlons de votre besoin" : "Discuss your needs"}<ArrowRight size={16} aria-hidden="true" /></Link>}
            <a href={appUrl} className="yd-button yd-button-lg yd-button-secondary">{site}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <p className="yd-status"><span className="yd-node" aria-hidden="true" />{copy.status}</p>
        </div>
      </div>
      {accent === "mail" && <SignalRoute steps={mailStory[locale].route.steps} label={mailStory[locale].route.label} spikes="all" />}
      {accent === "ads" && <AdsDrift locale={locale} />}
      {accent === "spend" && <SpendStairs locale={locale} />}
    </section>

    <nav className="yd-anchors" aria-label={fr ? "Sur cette page" : "On this page"}><div className="yd-wrap">{anchors.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div></nav>

    <section className="yd-band yd-story" id={STORY_ID[accent]}>
      <div className="yd-wrap">{accent === "mail" ? <MailApi locale={locale} /> : accent === "ads" ? <AdsDecision locale={locale} /> : <SpendSplit locale={locale} />}</div>
    </section>
    <SignalDivider product={accent} at={accent === "spend" ? .62 : .68} className="yd-divider-band" />

    {accent === "ads" && <section className="yd-flow-section" id="parcours" aria-labelledby="flow-title">
      <div className="yd-wrap"><h2 id="flow-title">{adsStory[locale].flowTitle}</h2></div>
      <SignalRoute steps={adsStory[locale].flow.steps} label={adsStory[locale].flow.label} spikes="highlight" highlight={2} />
    </section>}

    <div className="yd-wrap">
      <section className="yd-section yd-section-open" id="fonctions" aria-labelledby="features-title">
        <div className="yd-section-head"><h2 id="features-title">{copy.featuresTitle}</h2></div>
        <div className="yd-cards">{copy.features.map((feature, i) => {
          const Icon = ICONS[accent][i];
          return <article className="yd-card" key={feature.title}><span className="yd-icon-tile" aria-hidden="true"><Icon size={22} /></span><h3>{feature.title}</h3><p>{feature.description}</p></article>;
        })}</div>
      </section>

      <section className="yd-section yd-section-open yd-trust" id="garanties" aria-labelledby="trust-title">
        <div className="yd-trust-copy">
          <h2 id="trust-title">{copy.trustTitle}</h2>
          {accent === "mail" && <MailQuota locale={locale} />}
          <ul className="yd-chips">{copy.trustItems.map(item => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
        </div>
        {copy.pricing && <article className="yd-price" id="tarif" aria-labelledby="price-title">
          <div className="yd-price-line"><SignalLine width={400} height={60} spikes={[.3, .65]} node={false} /></div>
          <div className="yd-price-body">
            <p className="yd-accent yd-price-eyebrow">{copy.pricing.eyebrow}</p>
            <h3 id="price-title">{copy.pricing.title}</h3>
            <p className="yd-price-unit">{copy.pricing.price}</p>
            <p className="yd-price-usage">{copy.pricing.usage}</p>
            <ul className="yd-chips yd-chips-soft">{copy.pricing.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
            <a href={applyUrl} className="yd-button yd-button-lg">{copy.primaryCta}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </article>}
      </section>
    </div>

    <section className="yd-wrap yd-fill-band" id="acces" aria-labelledby="closing-title">
      <div className="yd-fill-band-body">
        <div><h2 id="closing-title">{copy.closingTitle}</h2><p>{copy.closingBody}</p></div>
        <div className="yd-actions">
          {accent === "mail" && <a href={applyUrl} className="yd-button yd-button-lg yd-button-ink">{copy.primaryCta}<ArrowUpRight size={16} aria-hidden="true" /></a>}
          <Link href={contact} className={`yd-button yd-button-lg ${accent === "mail" ? "yd-button-ink-outline" : "yd-button-ink"}`}>{talk}<ArrowRight size={16} aria-hidden="true" /></Link>
          {accent !== "mail" && <a href={appUrl} className="yd-button yd-button-lg yd-button-ink-outline">{site}<ArrowUpRight size={16} aria-hidden="true" /></a>}
        </div>
      </div>
      <SignalLine width={1440} height={120} spikes={[.82]} />
    </section>
  </div>;
}

function StoryHead({ title, children }: { title: string; children?: ReactNode }) {
  return <div className="yd-story-copy"><h2>{title}</h2>{children}</div>;
}

const CODE_LINE = signalPath(signalPoints({ width: 530, baseline: 50, amplitude: 30, spikes: [300], ripple: 1 }));
function MailApi({ locale }: { locale: ProductLocale }) {
  const s = mailStory[locale];
  const fr = locale === "fr";
  return <div className="yd-story-grid">
    <StoryHead title={s.apiTitle}>
      <p>{s.apiBody}</p>
      <ul className="yd-refused" aria-label={s.refusedNote}>{s.refused.map(item => <li key={item}><s>{item}</s></li>)}</ul>
      <p className="yd-note">{s.refusedNote}</p>
    </StoryHead>
    <figure className="yd-code">
      <figcaption className="sr-only">{s.codeLabel}</figcaption>
      <pre><code><span className="yd-code-comment">{s.codeComment}</span>{"\n"}<span className="yd-code-method">POST</span> /v1/messages{"\n"}<span className="yd-code-comment">Idempotency-Key:</span> ord_8f2c41{"\n"}{"{ "}<span className="yd-code-key">&quot;event&quot;</span>: &quot;invoice.paid&quot;,{"\n"}{"  "}<span className="yd-code-key">&quot;to&quot;</span>: &quot;{fr ? "client@pme.fr" : "client@example.com"}&quot;,{"\n"}{"  "}<span className="yd-code-key">&quot;template&quot;</span>: &quot;{fr ? "facture-v2" : "invoice-v2"}&quot; {"}"}</code></pre>
      <svg viewBox="0 0 560 70" aria-hidden="true"><path d={CODE_LINE} /><circle cx={530} cy={50} r={5} /></svg>
      <dl><div><dt>{s.accepted}</dt><dd>09:42:01.120</dd></div><div><dt className="yd-code-method"><span aria-hidden="true">● </span>{s.delivered}</dt><dd>09:42:03.240</dd></div></dl>
    </figure>
  </div>;
}

function MailQuota({ locale }: { locale: ProductLocale }) {
  const s = mailStory[locale];
  return <>
    <p className="yd-story-body">{s.quotaBody}</p>
    <svg className="yd-signal yd-quota" viewBox="0 0 420 90" role="img" aria-label={s.quotaLabel}>
      <path className="y-signal-line" d="M0 78 H120 V58 H260 V24 H420" />
      <text className="yd-chart-mono" x={0} y={68}>50</text><text className="yd-chart-mono" x={124} y={48}>200</text><text className="yd-chart-mono yd-chart-strong" x={264} y={14}>500</text>
    </svg>
  </>;
}

function AdsDecision({ locale }: { locale: ProductLocale }) {
  const s = adsStory[locale];
  const card = s.card;
  return <div className="yd-story-grid">
    <div className="yd-story-copy">
      <h2>{s.decisionTitle}</h2>
      <figure className="yd-decision">
        <div className="yd-decision-card">
          <p className="yd-decision-meta"><span>{card.account}</span><span className="yd-mono">{card.source}</span></p>
          <p className="yd-decision-headline">{card.headline}</p>
          <p className="yd-decision-change"><span><small>{card.today}</small><strong>{card.todayValue}</strong></span><ArrowRight size={20} aria-hidden="true" /><span><small>{card.proposed}</small><strong className="yd-accent">{card.proposedValue}</strong></span></p>
          <p className="yd-decision-note"><Check size={16} aria-hidden="true" />{card.note}</p>
          <ul className="yd-decision-actions">{card.actions.map(action => <li key={action}>{action}</li>)}</ul>
        </div>
        <figcaption className="yd-demo">{demoLabel[locale]}</figcaption>
      </figure>
    </div>
    <div className="yd-journal">
      <h3>{s.journalTitle}</h3>
      <ol>{s.journal.map(entry => <li key={entry.title} className={entry.you ? "is-you" : undefined}><span className="yd-node" aria-hidden="true" /><span className="yd-journal-text"><strong>{entry.title}</strong><span>{entry.who}</span></span><span className="yd-mono">{entry.time}</span></li>)}</ol>
    </div>
  </div>;
}

function SpendSplit({ locale }: { locale: ProductLocale }) {
  const s = spendStory[locale];
  return <div className="yd-story-stack">
    <StoryHead title={s.allocationTitle}><p>{s.allocationBody}</p></StoryHead>
    <SpendAllocation locale={locale} />
    <p className="yd-demo">{demoLabel[locale]}</p>
  </div>;
}

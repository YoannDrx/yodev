import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { SignalLine, signalPath, signalPoints, type SignalPoint, type YodevProduct } from "@/brand/brand";

export const productName = (product: YodevProduct) => product[0].toUpperCase() + product.slice(1);
/** The part of a signal line between two x positions, as an SVG path. */
export const signalSegment = (points: SignalPoint[], from: number, to: number) => signalPath(points.filter(([x]) => x >= from && x <= to));

/** Split `text` around `accent` so the accent can be set in the product colour. */
export function Accent({ text, accent, className = "yd-accent" }: { text: string; accent: string; className?: string }) {
  const at = text.indexOf(accent);
  if (at < 0) return text;
  return <>{text.slice(0, at)}<span className={className}>{accent}</span>{text.slice(at + accent.length)}</>;
}

const HERO_NODES = [["mail", 520], ["ads", 880], ["spend", 1200]] as const;
const HERO_PEAK = 80;
const HERO = signalPoints({ width: 1440, baseline: 210, amplitude: 130, spikes: HERO_NODES.map(([, x]) => x), ripple: 5 });
const HERO_SEGMENTS = [["yodev", 0, 520], ["mail", 520, 880], ["ads", 880, 1200], ["spend", 1200, 1440]] as const;

/** Full-width hero line: it takes the colour of Mail, Ads then Spend as it crosses each product node. */
export function HeroSignal({ label, linkLabel }: { label: string; linkLabel: string }) {
  const start = HERO.find(([x]) => x === 24) ?? HERO[0];
  return <div className="yd-hero-signal">
    <svg className="yd-signal yd-signal-hero" viewBox="0 0 1440 300" role="img" aria-label={label}>
      {HERO_SEGMENTS.map(([product, from, to]) => <path key={product} data-product={product} className="y-signal-line" d={signalSegment(HERO, from, to)} />)}
      <g data-product="yodev"><circle className="y-signal-halo" cx={start[0]} cy={start[1]} r={16} /><circle className="y-signal-node" cx={start[0]} cy={start[1]} r={8} /></g>
      {HERO_NODES.map(([product, x]) => <g key={product} data-product={product}>
        <circle className="y-signal-halo" cx={x} cy={HERO_PEAK} r={16} /><circle className="y-signal-node" cx={x} cy={HERO_PEAK} r={8} />
        <text className="yd-chart-text yd-chart-strong" x={x} y={HERO_PEAK - 30} textAnchor="middle">{productName(product)}</text>
      </g>)}
    </svg>
    <nav className="yd-chart-legend" aria-label={linkLabel}>
      {HERO_NODES.map(([product]) => <Link key={product} href={`/${product}`} data-product={product}><span className="yd-node" aria-hidden="true" />{productName(product)}</Link>)}
    </nav>
  </div>;
}

/** Transition between sections: a calm line with a single spike, in the colour of `product`. */
export function SignalDivider({ product = "yodev", at, className = "" }: { product?: YodevProduct | "yodev"; at: number; className?: string }) {
  return <div className={`yd-divider ${className}`} data-product={product}><SignalLine width={1440} height={120} spikes={[at]} /></div>;
}

/**
 * A journey drawn on the line: one node per step, centred in its column so the HTML labels below line up at every width.
 * `spikes: "all"` raises the line at every step (an email's route), `"highlight"` only at the highlighted step (the human decision).
 */
export function SignalRoute({ steps, label, spikes, highlight = steps.length - 1 }: { steps: readonly { name: string; detail: string }[]; label: string; spikes: "all" | "highlight"; highlight?: number }) {
  const width = 1440, baseline = 190, amplitude = 120, peak = baseline - amplitude;
  const xs = steps.map((_, i) => (i + .5) * width / steps.length);
  const raised = (i: number) => spikes === "all" || i === highlight;
  const points = signalPoints({ width: spikes === "all" ? xs[xs.length - 1] : width, baseline, amplitude, spikes: xs.filter((_, i) => raised(i)), ripple: spikes === "all" ? 4 : 0 });
  return <div className="yd-route">
    <svg className="yd-signal" viewBox={`0 0 ${width} 230`} aria-hidden="true">
      {spikes === "highlight" && <line className="yd-route-rail" x1={0} y1={baseline} x2={width} y2={baseline} />}
      <path className="y-signal-line" d={signalPath(points)} />
      {xs.map((x, i) => i === highlight
        ? <g key={x}><circle className="y-signal-halo" cx={x} cy={peak} r={20} /><circle className="y-signal-node" cx={x} cy={peak} r={9} /></g>
        : <circle key={x} className={spikes === "all" ? "yd-ring" : "yd-ring yd-ring-muted"} cx={x} cy={raised(i) ? peak : baseline} r={7} />)}
    </svg>
    <ol className="yd-route-steps" aria-label={label} style={{ "--steps": steps.length } as CSSProperties}>
      {steps.map((step, i) => <li key={step.name} className={i === highlight ? "is-highlight" : undefined}><span className="yd-node" aria-hidden="true" /><strong>{step.name}</strong><span className="yd-mono">{step.detail}</span></li>)}
    </ol>
  </div>;
}

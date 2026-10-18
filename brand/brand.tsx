import type { CSSProperties } from "react";

export type YodevProduct = "mail" | "ads" | "spend";
export const symbolPath = "M3 4H10L16 12L22 4H30L13 29H5L12 19L3 8Z";
export function BrandSymbol({ className = "y-symbol", style }: { className?: string; style?: CSSProperties }) {
  return <svg className={className} style={style} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d={symbolPath} /></svg>;
}
/** Products sit on a tile of their own colour; Yodev keeps the bare symbol. */
export function ProductSymbol({ product }: { product?: YodevProduct }) {
  if (!product) return <BrandSymbol />;
  return <span className="y-symbol-tile" data-product={product} aria-hidden="true"><BrandSymbol /></span>;
}
export function YodevBrand({ product, className = "" }: { product?: YodevProduct; className?: string }) {
  const name = product ? product[0].toUpperCase() + product.slice(1) : null;
  return <span className={`y-brand ${className}`} data-product={product}><ProductSymbol product={product} /><span>yodev{name && <span className="y-product-name"> {name}</span>}</span></span>;
}
export function ProductLinks({ locale = "fr", current }: { locale?: string; current?: YodevProduct }) {
  return <nav className="y-family" aria-label={locale === "fr" ? "Les produits Yodev" : "Yodev products"}><a href={`https://www.yodev.fr/${locale}`}>Yodev ↗</a>{(["mail", "ads", "spend"] as const).filter(product => product !== current).map(product => <a key={product} href={`https://${product}.yodev.fr/${product === "ads" ? "" : locale}`}>Yodev {product[0].toUpperCase() + product.slice(1)} ↗</a>)}</nav>;
}

/* Signal — a calm baseline broken by heartbeat spikes. Deterministic, so server and client render the same path. */
const SPIKE: [number, number][] = [[-36, 0], [-20, -.09], [-10, .06], [0, -1], [12, .35], [26, -.08], [42, 0]];
export type SignalPoint = [number, number];
/** Points of a signal line across `width`, with a spike at each x in `spikes` (in viewBox units). */
export function signalPoints({ width, baseline, amplitude, spikes = [], ripple = 4, from = 0 }: { width: number; baseline: number; amplitude: number; spikes?: number[]; ripple?: number; from?: number }): SignalPoint[] {
  const points: SignalPoint[] = [];
  for (let x = from; x <= width; x += 24) {
    if (spikes.some(spike => Math.abs(x - spike) < 46)) continue;
    points.push([x, baseline + ripple * Math.sin(x / 41) + ripple * .6 * Math.sin(x / 13)]);
  }
  for (const spike of spikes) for (const [dx, dy] of SPIKE) points.push([spike + dx, baseline + dy * amplitude]);
  return points.sort((a, b) => a[0] - b[0]).filter(([x]) => x >= from && x <= width);
}
export function signalPath(points: SignalPoint[]) {
  return "M" + points.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join(" L");
}
/**
 * The Yodev signal line. Colour follows `--y-signal` (the current product), so wrap it in an element with
 * `data-product` to recolour it. Decorative unless a `label` is given.
 */
export function SignalLine({ width = 1440, height = 120, spikes = [.72], node = true, label, className = "" }: { width?: number; height?: number; spikes?: number[]; node?: boolean; label?: string; className?: string }) {
  const baseline = height * .6;
  const amplitude = height * .44;
  const xs = spikes.map(ratio => ratio * width);
  const last = xs.length ? xs[xs.length - 1] : undefined;
  return <svg className={`y-signal ${className}`} viewBox={`0 0 ${width} ${height}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
    <path className="y-signal-line" d={signalPath(signalPoints({ width, baseline, amplitude, spikes: xs, ripple: 0 }))} />
    {node && last !== undefined && <><circle className="y-signal-halo" cx={last} cy={baseline - amplitude} r={height * .09} /><circle className="y-signal-node" cx={last} cy={baseline - amplitude} r={height * .045} /></>}
  </svg>;
}

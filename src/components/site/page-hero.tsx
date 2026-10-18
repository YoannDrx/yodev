import type { ReactNode } from "react";
import { SignalLine, type YodevProduct } from "@/brand/brand";

/**
 * Header of secondary pages: kicker, title, lead, then the signal line across the page.
 * `state` follows the design system: a flat line for an empty state, an interrupted line for an error.
 */
export function PageHero({ kicker, title, lead, children, at = .72, product, state, role }: { kicker?: ReactNode; title: ReactNode; lead?: ReactNode; children?: ReactNode; at?: number; product?: YodevProduct; state?: "empty" | "error"; role?: "alert" }) {
  return <section className="yd-hero yd-page-hero y-dots" data-product={product} role={role}>
    <div className="yd-wrap yd-page-hero-body">
      {kicker && <p className="yd-kicker"><span className="yd-node" aria-hidden="true" />{kicker}</p>}
      <h1>{title}</h1>
      {lead && <p className="yd-lead">{lead}</p>}
      {children}
    </div>
    {state === "error"
      ? <svg className="y-signal yd-signal-broken" viewBox="0 0 1440 120" aria-hidden="true"><path className="y-signal-line" d="M0 72 H640" /><path className="y-signal-line" d="M800 72 H1440" /><circle className="y-signal-node" cx={640} cy={72} r={5} /><circle className="y-signal-node" cx={800} cy={72} r={5} /></svg>
      : <SignalLine width={1440} height={120} spikes={state === "empty" ? [] : [at]} />}
  </section>;
}

import { signalPath, signalPoints, type SignalPoint } from "@/brand/brand";
import type { ProductLocale } from "@/lib/products";
import { adsStory, chartLabels, spendStory } from "@/lib/product-stories";

/* Line visuals for Mail, Ads and Spend. Demonstration data only, computed once so server output stays deterministic. */
const round = ([x, y]: SignalPoint) => ({ x: Math.round(x), y: Math.round(y) });

/* Mail — a delivery stream: one spike per email, its state on the node. */
const MAIL_X = [50, 150, 250, 350];
const MAIL_STATES = ["delivered", "delivered", "queued", "bounced"] as const;
const MAIL_PATH = signalPath(signalPoints({ width: 400, baseline: 140, amplitude: 70, spikes: MAIL_X, ripple: 2 }));

export function MailStream({ locale }: { locale: ProductLocale }) {
  const l = chartLabels[locale].mail;
  return <svg className="yd-signal yd-figure-chart" viewBox="0 0 400 210" aria-hidden="true">
    <path className="y-signal-line" d={MAIL_PATH} />
    {MAIL_X.map((x, i) => {
      const state = MAIL_STATES[i];
      return <g key={x} className={state === "bounced" ? "yd-chart-danger" : undefined}>
        <circle className={state === "queued" ? "yd-ring" : "y-signal-node"} cx={x} cy={70} r={7} />
        <text className="yd-chart-mono" x={x} y={46} textAnchor="middle">{l.events[i]}</text>
        <text className="yd-chart-text" x={x} y={198} textAnchor="middle">{l.states[state]}</text>
      </g>;
    })}
  </svg>;
}

/* Ads — cost per conversion against its target range; every exit is a drift. */
const CPA_30 = [50, 48, 52, 47, 55, 53, 49, 51, 58, 60, 56, 52, 50, 54, 71, 66, 57, 53, 55, 59, 62, 68, 74, 70, 64, 66, 72, 78, 76, 82];
const CPA_POINTS: SignalPoint[] = CPA_30.map((v, i) => [10 + i * 380 / 29, 215 - v * 2.4]);
const CPA_MARKS = [14, 22, 29].map(i => round(CPA_POINTS[i]));

export function AdsCpa({ locale }: { locale: ProductLocale }) {
  const l = chartLabels[locale].ads;
  const last = CPA_MARKS[CPA_MARKS.length - 1];
  return <svg className="yd-signal yd-figure-chart" viewBox="0 0 400 150" aria-hidden="true">
    <rect className="yd-zone" x={0} y={76} width={400} height={38} />
    <text className="yd-chart-text yd-chart-faint" x={8} y={132}>{l.zone}</text>
    <path className="y-signal-line" d={signalPath(CPA_POINTS)} />
    {CPA_MARKS.slice(0, -1).map(m => <circle key={m.x} className="yd-ring" cx={m.x} cy={m.y} r={6} />)}
    <circle className="y-signal-halo" cx={last.x} cy={last.y} r={13} /><circle className="y-signal-node" cx={last.x} cy={last.y} r={6} />
    <text className="yd-chart-text yd-chart-strong" x={last.x - 18} y={last.y + 5} textAnchor="end">{l.approve}</text>
  </svg>;
}

/* Spend — cumulative spend as a staircase: every bill is a step. */
const CUM = [19, 21, 23, 25, 28, 30, 32, 34, 62, 64, 66, 69, 72, 75, 78, 81, 116, 120.25];
const STEP_DAYS = [1, 9, 17];
function stairs(x: (day: number) => number, y: (value: number) => number): SignalPoint[] {
  const points: SignalPoint[] = [[x(1), y(0)]];
  CUM.forEach((value, i) => { points.push([x(i + 1), points[points.length - 1][1]], [x(i + 1), y(value)]); });
  return points;
}
const SX = (day: number) => 10 + (day - 1) * 380 / 30, SY = (value: number) => 180 - value * 1.2;
const SPEND_POINTS = stairs(SX, SY);
const SPEND_TODAY = round([SX(CUM.length), SY(CUM[CUM.length - 1])]);

export function SpendSteps({ locale }: { locale: ProductLocale }) {
  const l = chartLabels[locale].spend;
  const [resend, vercel, aws] = STEP_DAYS.map(day => round([SX(day), SY(CUM[day - 1])]));
  return <svg className="yd-signal yd-figure-chart" viewBox="0 0 400 210" aria-hidden="true">
    <line className="yd-axis" x1={0} y1={180} x2={400} y2={180} />
    <line className="yd-axis" x1={SPEND_TODAY.x} y1={20} x2={SPEND_TODAY.x} y2={180} />
    <path className="yd-area" d={`${signalPath(SPEND_POINTS)} L${SPEND_TODAY.x} 180 L${Math.round(SX(1))} 180 Z`} />
    <path className="y-signal-line" d={signalPath(SPEND_POINTS)} />
    <text className="yd-chart-mono" x={resend.x + 10} y={resend.y + 17}>{l.steps[0]}</text>
    <text className="yd-chart-mono" x={vercel.x + 10} y={vercel.y + 24}>{l.steps[1]}</text>
    <text className="yd-chart-mono" x={aws.x - 12} y={aws.y + 5} textAnchor="end">{l.steps[2]}</text>
    <circle className="y-signal-halo" cx={SPEND_TODAY.x} cy={SPEND_TODAY.y} r={13} /><circle className="y-signal-node" cx={SPEND_TODAY.x} cy={SPEND_TODAY.y} r={6} />
    <text className="yd-chart-text yd-chart-strong" x={SPEND_TODAY.x + 16} y={SPEND_TODAY.y + 5}>{l.today}</text>
  </svg>;
}

/* Product page heroes: the same lines across the full width. Labels are drawn on wide screens and listed below on phones. */
const DRIFTS = [[10, 24], [22, 19], [36, 30]];
const CPA_40: SignalPoint[] = Array.from({ length: 40 }, (_, i) => [20 + i * 1400 / 39, 330 - 2.6 * (55 + 4 * Math.sin(i / 2.3) + DRIFTS.reduce((sum, [at, size]) => sum + size * Math.exp(-((i - at) ** 2) / 4), 0))]);
const DRIFT_MARKS = DRIFTS.map(([at]) => round(CPA_40[at]));

export function AdsDrift({ locale }: { locale: ProductLocale }) {
  const l = adsStory[locale].drift;
  const last = DRIFT_MARKS[DRIFT_MARKS.length - 1];
  return <div className="yd-hero-chart">
    <svg className="yd-signal yd-chart-lg" viewBox="0 0 1440 300" role="img" aria-label={l.label}>
      <rect className="yd-zone" x={0} y={160} width={1440} height={50} />
      <text className="yd-chart-text yd-chart-faint" x={24} y={234}>{l.zone}</text>
      <path className="y-signal-line" d={signalPath(CPA_40)} />
      {DRIFT_MARKS.slice(0, -1).map((m, i) => <g key={m.x}><circle className="yd-ring" cx={m.x} cy={m.y} r={8} /><text className="yd-chart-text yd-chart-muted" x={m.x} y={m.y - 26} textAnchor="middle">{l.marks[i]}</text></g>)}
      <circle className="y-signal-halo" cx={last.x} cy={last.y} r={22} /><circle className="y-signal-node" cx={last.x} cy={last.y} r={10} />
      <text className="yd-chart-text yd-chart-strong" x={last.x + 12} y={last.y - 30} textAnchor="end">{l.marks[2]}</text>
    </svg>
    <ul className="yd-chart-legend" aria-hidden="true">
      <li><span className="yd-swatch" />{l.zone}</li>
      {l.marks.map((mark, i) => <li key={mark}><span className={i === l.marks.length - 1 ? "yd-node" : "yd-node yd-node-ring"} />{mark}</li>)}
    </ul>
  </div>;
}

const HX = (day: number) => 20 + (day - 1) * 1400 / 30, HY = (value: number) => 270 - value * 1.375;
const HERO_STAIRS = stairs(HX, HY);
const HERO_TODAY = round([HX(CUM.length), HY(CUM[CUM.length - 1])]);

export function SpendStairs({ locale }: { locale: ProductLocale }) {
  const l = spendStory[locale].stairs;
  const marks = STEP_DAYS.map(day => round([HX(day), HY(CUM[day - 1])]));
  return <div className="yd-hero-chart">
    <svg className="yd-signal yd-chart-lg" viewBox="0 0 1440 300" role="img" aria-label={l.label}>
      <line className="yd-axis" x1={0} y1={270} x2={1440} y2={270} />
      <text className="yd-chart-text yd-chart-faint" x={20} y={294}>{l.start}</text>
      <text className="yd-chart-text yd-chart-faint" x={1420} y={294} textAnchor="end">{l.end}</text>
      <path className="yd-area" d={`${signalPath(HERO_STAIRS)} L${HERO_TODAY.x} 270 L${Math.round(HX(1))} 270 Z`} />
      <path className="y-signal-line" d={signalPath(HERO_STAIRS)} />
      {marks.map((m, i) => <g key={m.x}>
        <circle className="yd-ring" cx={m.x} cy={m.y} r={6} />
        <text className="yd-chart-mono yd-chart-muted" x={i === 2 ? m.x - 16 : m.x - 4} y={i === 2 ? m.y + 6 : m.y - 18} textAnchor={i === 2 ? "end" : "start"}>{l.marks[i]}</text>
      </g>)}
      <circle className="y-signal-halo" cx={HERO_TODAY.x} cy={HERO_TODAY.y} r={22} /><circle className="y-signal-node" cx={HERO_TODAY.x} cy={HERO_TODAY.y} r={10} />
      <text className="yd-chart-text yd-chart-strong" x={HERO_TODAY.x + 30} y={HERO_TODAY.y + 8}>{l.today}</text>
    </svg>
    <ul className="yd-chart-legend" aria-hidden="true">
      {l.marks.map(mark => <li key={mark}><span className="yd-node yd-node-ring" />{mark}</li>)}
      <li><span className="yd-node" />{l.today}</li>
    </ul>
  </div>;
}

/** One provider bill split between projects; the remainder stays visible. */
export function SpendAllocation({ locale }: { locale: ProductLocale }) {
  const l = spendStory[locale];
  const widths = [9, 6, 4, 2.5];
  return <figure className="yd-allocation">
    <div className="yd-allocation-flow">
      <p className="yd-allocation-source"><span className="yd-node yd-node-lg" aria-hidden="true" /><strong>{l.source.name}</strong><span className="yd-mono">{l.source.amount}</span></p>
      <div className="yd-allocation-curves" aria-hidden="true"><svg viewBox="0 0 100 400" preserveAspectRatio="none">
        {widths.map((width, i) => <path key={width} className={i === widths.length - 1 ? "yd-flow yd-flow-rest" : "yd-flow"} style={{ strokeWidth: width }} d={`M0 200 C50 200 50 ${50 + i * 100} 100 ${50 + i * 100}`} />)}
      </svg></div>
      <ul className="yd-allocation-targets" aria-label={l.allocationLabel}>
        {l.targets.map((target, i) => <li key={target.name} className={i === l.targets.length - 1 ? "is-rest" : undefined}><span className={i === l.targets.length - 1 ? "yd-node yd-node-ring" : "yd-node"} aria-hidden="true" /><strong>{target.name}</strong><span className="yd-mono">{target.amount}</span><span className="yd-allocation-kind">{target.kind}</span></li>)}
      </ul>
    </div>
    <figcaption><span className="yd-mono">{l.sum}</span><span className="yd-allocation-ok">{l.reconciled}</span></figcaption>
  </figure>;
}

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button-styles";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import type { ProductLandingCopy } from "@/lib/products";

type ProductLandingProps = {
  copy: ProductLandingCopy;
  appUrl: string;
  accent: "mail" | "ads" | "spend";
};

export function ProductLanding({ copy, appUrl, accent }: ProductLandingProps) {
  const usesPrimaryAccent = accent !== "ads";
  const accentClass = usesPrimaryAccent ? "text-primary" : "text-secondary";
  const glowClass = usesPrimaryAccent ? "from-primary/20" : "from-secondary/20";

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
        <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${glowClass} via-transparent to-transparent`} />
        <Container>
          <div className="max-w-4xl">
            <Badge variant={usesPrimaryAccent ? "primary" : "secondary"} className="mb-6">
              {copy.eyebrow}
            </Badge>
            <div className="mb-8 flex items-baseline gap-3" aria-label={`${copy.brand} ${copy.signature}`}>
              <span className={`font-display text-5xl font-extrabold tracking-tight md:text-7xl ${accentClass}`}>{copy.brand}</span>
              <span className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-muted">{copy.signature}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-text md:text-6xl">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{copy.subtitle}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href={appUrl} className={buttonClassName({ variant: "primary", size: "lg" })}>
                {copy.primaryCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <Link href="/contact" className={buttonClassName({ variant: "outline", size: "lg" })}>
                {copy.secondaryCta}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-2/50 py-20">
        <Container>
          <h2 className="max-w-2xl text-3xl font-bold text-text md:text-4xl">{copy.featuresTitle}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {copy.features.map((feature) => (
              <Card key={feature.title} className="p-6" hover={false}>
                <h3 className={`text-xl font-bold ${accentClass}`}>{feature.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{feature.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <h2 className="text-3xl font-bold text-text md:text-4xl">{copy.trustTitle}</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {copy.trustItems.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-border bg-surface p-4 text-text">
                  <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${accentClass}`} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {copy.pricing && (
        <section className="border-y border-border bg-surface-2/50 py-20">
          <Container>
            <div className="grid gap-10 rounded-3xl border border-border bg-surface p-8 md:p-12 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className={`font-mono text-sm font-semibold uppercase tracking-[0.18em] ${accentClass}`}>{copy.pricing.eyebrow}</p>
                <h2 className="mt-4 text-3xl font-bold text-text md:text-4xl">{copy.pricing.title}</h2>
                <p className="mt-3 text-lg font-semibold text-text">{copy.pricing.price}</p>
                <p className="mt-4 leading-relaxed text-muted">{copy.pricing.usage}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {copy.pricing.details.map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-border p-4 text-text">
                    <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${accentClass}`} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      <section className="pb-24">
        <Container>
          <div className="rounded-3xl border border-border bg-surface p-8 md:p-12">
            <h2 className="max-w-3xl text-3xl font-bold text-text md:text-4xl">{copy.closingTitle}</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">{copy.closingBody}</p>
            <a href={appUrl} className={`mt-8 inline-flex min-h-11 items-center gap-2 font-semibold ${accentClass}`}>
              {copy.primaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

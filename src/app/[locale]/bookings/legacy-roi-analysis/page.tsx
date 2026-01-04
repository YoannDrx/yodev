"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { ArrowRight, TrendingUp } from "lucide-react";

export default function LegacyRoiAnalysisPage() {
  const [infraCost, setInfraCost] = useState(50000);
  const [devHours, setDevHours] = useState(40);
  const [systemAge, setSystemAge] = useState(5);

  const maintenanceSavings = useMemo(
    () => Math.round(infraCost * 0.45),
    [infraCost]
  );
  const productivityGain = useMemo(
    () => Math.round(devHours * 52 * 85 * 0.3),
    [devHours]
  );
  const totalRoi = maintenanceSavings + productivityGain;

  return (
    <>
      <section className="relative pt-32 pb-20 mesh-gradient overflow-hidden">
        <div className="hero-glow top-0 left-1/2 -translate-x-1/2 opacity-40" />
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-20">
            <FadeIn>
              <Badge variant="primary">Analyse d'impact business</Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-[1.1] text-gradient">
                Le cout de l'inaction est
                <br />
                <span className="text-secondary italic">plus eleve que la refonte.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted">
                Utilisez notre simulateur pour estimer les gains d'une
                modernisation IT et debloquer votre potentiel IA.
              </p>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <GlassPanel className="p-8 md:p-10 rounded-[2.5rem]">
              <div className="space-y-8">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted">
                    Cout infra annuel (EUR)
                  </label>
                  <input
                    type="range"
                    min={10000}
                    max={200000}
                    value={infraCost}
                    onChange={(event) => setInfraCost(Number(event.target.value))}
                    className="w-full mt-4"
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted">
                    <span className="text-primary font-bold">
                      {infraCost.toLocaleString()} EUR
                    </span>
                    <span>budget annuel</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted">
                    Heures dev / semaine
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={120}
                    value={devHours}
                    onChange={(event) => setDevHours(Number(event.target.value))}
                    className="w-full mt-4"
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted">
                    <span className="text-primary font-bold">{devHours}h</span>
                    <span>temps critique</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted">
                    Age du systeme
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={systemAge}
                    onChange={(event) => setSystemAge(Number(event.target.value))}
                    className="w-full mt-4"
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted">
                    <span className="text-primary font-bold">{systemAge} ans</span>
                    <span>legacy</span>
                  </div>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="p-8 rounded-[2.5rem] roi-card text-center">
              <p className="text-xs uppercase tracking-widest text-muted mb-4">
                Economies potentielles / an
              </p>
              <p className="text-5xl font-display font-black text-text mb-4">
                {totalRoi.toLocaleString()} EUR
              </p>
              <div className="grid gap-4 text-sm text-muted mb-6">
                <div className="flex items-center justify-between">
                  <span>Maintenance</span>
                  <span className="text-primary font-bold">
                    {maintenanceSavings.toLocaleString()} EUR
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Productivite</span>
                  <span className="text-secondary font-bold">
                    {productivityGain.toLocaleString()} EUR
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-xs font-bold">
                <TrendingUp className="h-4 w-4" />
                ROI estime : +240%
              </div>
              <p className="text-xs text-muted mt-6">
                Estimation indicative. Une etude detaillee peut affiner ce
                resultat.
              </p>
              <ButtonLink
                href="/bookings/technical-roadmap"
                size="lg"
                className="mt-8 rounded-full"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Obtenir une analyse complete
              </ButtonLink>
            </GlassPanel>
          </div>
        </Container>
      </section>
    </>
  );
}

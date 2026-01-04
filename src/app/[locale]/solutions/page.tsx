"use client";

import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, Parallax } from "@/components/motion";
import { ArrowRight, Factory, Truck, Stethoscope, PiggyBank } from "lucide-react";

const industries = [
  {
    title: "Industrie",
    description: "Modernisation des SI de production, IoT et predictive maintenance.",
    icon: Factory,
  },
  {
    title: "Logistique",
    description: "Optimisation des flux, IA pour la planification et tracabilite.",
    icon: Truck,
  },
  {
    title: "Sante",
    description: "Interoperabilite, securite des donnees et automatisation des process.",
    icon: Stethoscope,
  },
  {
    title: "Finance",
    description: "Conformite, fiabilite et experiences digitales hautes perfs.",
    icon: PiggyBank,
  },
];

const valuePoints = [
  { label: "-40%", detail: "Couts operationnels" },
  { label: "+120%", detail: "Productivite tech" },
  { label: "99.9%", detail: "Disponibilite" },
  { label: "8-12 sem.", detail: "Time-to-value" },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden mesh-gradient">
        <Parallax className="pointer-events-none absolute inset-0">
          <div className="hero-glow -top-20 -left-20" />
          <div className="hero-glow bottom-0 right-0 opacity-20" />
        </Parallax>

        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <FadeIn>
                <Badge variant="secondary" className="mb-4">
                  Performance & ROI pour PME/ETI
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] text-gradient">
                  Solutions digitales
                  <br />
                  <span className="text-primary italic">par industrie</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-muted max-w-xl">
                  Nous comprenons les contraintes des entreprises etablies :
                  legacy, conformite stricte et besoin de croissance durable.
                  Nous transformons ces contraintes en avantages competitifs.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="grid grid-cols-2 gap-4">
                  {valuePoints.map((point) => (
                    <GlassPanel key={point.detail} className="p-4 rounded-2xl">
                      <p className="text-2xl font-display font-black text-primary">
                        {point.label}
                      </p>
                      <p className="text-xs text-muted uppercase tracking-wider font-bold">
                        {point.detail}
                      </p>
                    </GlassPanel>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <ButtonLink
                  href="#industries"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="px-8 py-4 rounded-full"
                >
                  Explorer nos solutions
                </ButtonLink>
              </FadeIn>
            </div>

            <GlassPanel className="p-8 rounded-[2.5rem] hidden lg:block">
              <div className="text-xs uppercase tracking-widest text-muted mb-4">
                Indicateurs terrain
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between text-sm">
                  <span>Dette technique resorbee</span>
                  <span className="text-primary font-bold">85%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Agilite de deploiement</span>
                  <span className="text-secondary font-bold">x4</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Satisfaction equipes</span>
                  <span className="text-text font-bold">92%</span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </Container>
      </section>

      <section id="industries" className="py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Solutions specialisees
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Des offres adaptees a vos contraintes sectorielles.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <FadeIn key={industry.title} delay={index * 0.1}>
                <GlassPanel className="p-6 rounded-2xl h-full hover:border-primary/40 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <industry.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{industry.title}</h3>
                  <p className="text-sm text-muted">{industry.description}</p>
                </GlassPanel>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-dark/50 border-y border-white/5">
        <Container>
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Methodologie
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Du diagnostic a l'industrialisation.
              </h2>
              <p className="text-muted mb-8">
                Audit, roadmap et execution agile pour moderniser sans casser la
                production.
              </p>
              <ButtonLink href="/bookings/technical-roadmap" size="lg">
                Demander une consultation
              </ButtonLink>
            </div>
            <div className="grid gap-4">
              {[
                "Audit technique & data",
                "Blueprint d'architecture",
                "Migration progressive",
                "MLOps & securisation",
              ].map((item) => (
                <GlassPanel key={item} className="p-4 rounded-xl text-sm text-muted">
                  {item}
                </GlassPanel>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <GlassPanel className="p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            <div className="hero-glow -top-40 -right-40 opacity-20" />
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Prendre une longueur d'avance.
            </h2>
            <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">
              Nos experts sont prets a auditer vos systemes critiques et proposer
              une roadmap IA adaptee a votre industrie.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ButtonLink
                href="/contact"
                size="lg"
                className="px-10 py-5 rounded-full"
              >
                Discuter de votre projet
              </ButtonLink>
              <ButtonLink
                href="/work"
                variant="glass"
                size="lg"
                className="px-10 py-5 rounded-full"
              >
                Voir nos cas clients
              </ButtonLink>
            </div>
          </GlassPanel>
        </Container>
      </section>
    </>
  );
}

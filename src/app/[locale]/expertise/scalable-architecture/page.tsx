"use client";

import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, Parallax } from "@/components/motion";
import { ArrowRight, Cloud, Layers, Shield, Zap } from "lucide-react";

const principles = [
  {
    title: "Event-driven",
    description: "Des flux asynchrones pour absorber les pics de charge.",
    icon: Zap,
  },
  {
    title: "Microservices",
    description: "Des domaines decouples pour livrer plus vite.",
    icon: Layers,
  },
  {
    title: "Cloud-native",
    description: "Autoscaling, resiliency et couts optimises.",
    icon: Cloud,
  },
  {
    title: "Security by design",
    description: "Zero trust et observabilite native.",
    icon: Shield,
  },
];

export default function ScalableArchitecturePage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden mesh-gradient">
        <div className="hero-glow -top-20 -left-20" />
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <FadeIn>
                <Badge variant="primary">Expertise : architecture scalable</Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] text-gradient">
                  Batir pour les
                  <br />
                  <span className="text-primary">10 prochaines annees.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-muted max-w-xl">
                  Nous concevons des systemes capables de supporter des millions
                  d'utilisateurs sans sourciller. Microservices, event-driven et
                  Infrastructure as Code sont au coeur de notre approche.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Uptime 99.99%
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Latence &lt; 120ms
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <ButtonLink
                  href="/bookings/technical-roadmap"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="px-8 py-4 rounded-full"
                >
                  Demander une roadmap
                </ButtonLink>
              </FadeIn>
            </div>

            <Parallax className="hidden lg:block">
              <GlassPanel className="p-10 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs text-muted uppercase tracking-widest">
                    <span>Architecture map</span>
                    <span>v2026</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {principles.slice(0, 3).map((item) => (
                      <div
                        key={item.title}
                        className="glass-panel p-4 rounded-2xl text-center"
                      >
                        <item.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                        <p className="text-xs font-bold">{item.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-dark/50 p-4 rounded-2xl border border-white/10">
                    <pre className="text-xs text-muted whitespace-pre-wrap">
{`edge -> gateway -> services -> event bus\n\nobservability: metrics | logs | traces`}
                    </pre>
                  </div>
                </div>
              </GlassPanel>
            </Parallax>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-dark/50 border-y border-white/5">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <GlassPanel className="p-6 rounded-2xl h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </GlassPanel>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <GlassPanel className="p-10 md:p-14 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
            <div className="grid lg:grid-cols-[1fr_0.8fr] gap-10 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  Decision maker
                </Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Quelle stack pour votre croissance ?
                </h2>
                <p className="text-muted mb-8">
                  Nous selectionnons les technologies selon vos objectifs,
                  contraintes et time-to-market.
                </p>
                <ButtonLink
                  href="/contact"
                  size="lg"
                  className="rounded-full"
                >
                  Parler a un architecte
                </ButtonLink>
              </div>
              <div className="space-y-4 text-sm text-muted">
                <div className="flex items-center justify-between">
                  <span>Scalabilite</span>
                  <span className="text-primary font-bold">99.99%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Vitesse livraison</span>
                  <span className="text-secondary font-bold">x4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Observabilite</span>
                  <span className="text-primary font-bold">Full stack</span>
                </div>
              </div>
            </div>
          </GlassPanel>
        </Container>
      </section>
    </>
  );
}

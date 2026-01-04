"use client";

import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, Parallax } from "@/components/motion";
import { ArrowRight, Shield, Lock, FileCheck, Radar } from "lucide-react";

const compliancePillars = [
  {
    title: "SOC2 / RGPD",
    description: "Politiques, preuves et procedures audit-ready.",
    icon: FileCheck,
  },
  {
    title: "Data protection",
    description: "Chiffrement, retention et gestion des acces.",
    icon: Lock,
  },
  {
    title: "Threat monitoring",
    description: "Detection d'anomalies et alerte proactive 24/7.",
    icon: Radar,
  },
  {
    title: "Zero trust",
    description: "Segmentation reseau et controle continu.",
    icon: Shield,
  },
];

export default function ComplianceDeepDivePage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden mesh-gradient">
        <div className="hero-glow -top-20 -left-20" />
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <FadeIn>
                <Badge variant="primary">Security excellence center</Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] text-gradient">
                  Conformite & securite
                  <br />
                  <span className="text-primary italic">grade entreprise</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-muted max-w-xl">
                  L'innovation ne vaut rien sans protection. Nous deployons des
                  architectures conformes SOC2, RGPD et audit-ready pour vos
                  donnees sensibles.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <div className="glass-panel px-5 py-3 rounded-2xl text-sm">
                    SOC2 Type II
                  </div>
                  <div className="glass-panel px-5 py-3 rounded-2xl text-sm">
                    RGPD compliance
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <ButtonLink
                  href="/bookings/security-risk-audit"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="px-8 py-4 rounded-full"
                >
                  Demander un audit securite
                </ButtonLink>
              </FadeIn>
            </div>

            <Parallax className="hidden lg:block">
              <GlassPanel className="p-10 rounded-[2.5rem] relative overflow-hidden security-grid">
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                <div className="space-y-6 relative">
                  <div className="text-xs uppercase tracking-widest text-muted">Audit-ready stack</div>
                  <div className="grid grid-cols-2 gap-4">
                    {compliancePillars.slice(0, 2).map((item) => (
                      <div key={item.title} className="glass-panel p-4 rounded-2xl">
                        <item.icon className="h-5 w-5 text-primary mb-2" />
                        <p className="text-sm font-bold">{item.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-dark/50 p-4 rounded-2xl border border-white/10">
                    <pre className="text-xs text-muted whitespace-pre-wrap">
{`policy: access_control\nlogging: immutable\nretention: 24 months`}
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
            {compliancePillars.map((item, index) => (
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
          <GlassPanel className="p-10 md:p-14 rounded-[2.5rem]">
            <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  Audit-ready
                </Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Protocoles securite documentes.
                </h2>
                <p className="text-muted mb-8">
                  Logs immuables, monitoring continu, et gouvernance des acces.
                  Vos audits deviennent un simple check.
                </p>
                <ButtonLink href="/contact" size="lg" className="rounded-full">
                  Discuter avec un expert
                </ButtonLink>
              </div>
              <div className="bg-dark/50 p-6 rounded-2xl border border-white/10 text-xs text-muted font-mono">
                <pre className="whitespace-pre-wrap">
{`policy "security" {\n  audit = true\n  retention = "24m"\n  encryption = "AES-256"\n}\n\ncontrols = ["mfa", "sso", "least-privilege"]`}
                </pre>
              </div>
            </div>
          </GlassPanel>
        </Container>
      </section>
    </>
  );
}

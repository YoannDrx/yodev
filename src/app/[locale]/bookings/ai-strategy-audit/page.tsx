"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { ArrowRight, CheckCircle, Cpu, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";

const stackOptions = ["Next.js", "Node.js", "Python", "AWS", "PostgreSQL", "Legacy ERP"];
const goals = [
  "Automatiser des process",
  "Support client IA",
  "Analyse predictive",
  "RAG sur documentation",
  "Modernisation legacy",
];

export default function AiStrategyAuditPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    stack: [] as string[],
    goals: [] as string[],
    message: "",
  });

  const toggleValue = (key: "stack" | "goals", value: string) => {
    setFormData((prev) => {
      const list = prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value];
      return { ...prev, [key]: list };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative pt-32 pb-20 mesh-gradient overflow-hidden">
        <div className="hero-glow -top-20 -left-20" />
        <Container>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
            <div className="space-y-8 lg:sticky lg:top-32">
              <FadeIn>
                <Badge variant="primary">Acces prioritaire</Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-tight">
                  Audit de strategie
                  <br />
                  <span className="text-primary italic">Intelligence Artificielle</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-muted text-lg">
                  Diagnostic technique approfondi pour identifier vos gisements de
                  valeur IA. 45 minutes avec nos experts LLM et automatisation.
                </p>
              </FadeIn>
              <GlassPanel className="p-6 rounded-2xl border-l-4 border-l-primary space-y-4">
                <h3 className="font-bold text-lg">Inclus dans le diagnostic</h3>
                {[
                  "Analyse de stack et data",
                  "Cartographie des quick wins",
                  "Roadmap ROI sur 90 jours",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-muted">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </GlassPanel>
              <div className="text-xs text-muted font-mono">
                Session: AUDIT-IA-2026
              </div>
            </div>

            <GlassPanel className="p-8 md:p-10 rounded-[2.5rem]">
              {submitted ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">
                    Merci, votre demande est envoyee.
                  </h2>
                  <p className="text-muted">
                    Nous revenons vers vous sous 24h pour confirmer un creneau.
                  </p>
                  <ButtonLink href="/" variant="glass">
                    Retour accueil
                  </ButtonLink>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="flex items-center justify-between text-xs font-mono text-muted">
                    <span>Etape {step} / 4</span>
                    <span className="text-primary">Audit IA</span>
                  </div>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className={cn(
                          "h-1 flex-1 rounded-full",
                          step >= index ? "bg-primary" : "bg-white/10"
                        )}
                      />
                    ))}
                  </div>

                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs uppercase tracking-widest text-muted">
                          Nom complet
                        </label>
                        <div className="relative mt-2">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                          <input
                            value={formData.name}
                            onChange={(event) =>
                              setFormData({ ...formData, name: event.target.value })
                            }
                            className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-sm"
                            placeholder="Votre nom"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-muted">
                          Email
                        </label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(event) =>
                              setFormData({ ...formData, email: event.target.value })
                            }
                            className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-sm"
                            placeholder="vous@entreprise.fr"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted">
                            Entreprise
                          </label>
                          <input
                            value={formData.company}
                            onChange={(event) =>
                              setFormData({ ...formData, company: event.target.value })
                            }
                            className="w-full rounded-xl bg-white/5 border border-white/10 py-3 px-4 text-sm mt-2"
                            placeholder="Nom de la societe"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted">
                            Role
                          </label>
                          <input
                            value={formData.role}
                            onChange={(event) =>
                              setFormData({ ...formData, role: event.target.value })
                            }
                            className="w-full rounded-xl bg-white/5 border border-white/10 py-3 px-4 text-sm mt-2"
                            placeholder="CTO, DSI..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <p className="text-xs uppercase tracking-widest text-muted">
                        Stack actuelle
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {stackOptions.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleValue("stack", item)}
                            className={cn(
                              "px-4 py-3 rounded-xl border text-sm text-left",
                              formData.stack.includes(item)
                                ? "border-primary bg-primary/10"
                                : "border-white/10 bg-white/5"
                            )}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <p className="text-xs uppercase tracking-widest text-muted">
                        Objectifs IA
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {goals.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleValue("goals", item)}
                            className={cn(
                              "px-4 py-3 rounded-xl border text-sm text-left",
                              formData.goals.includes(item)
                                ? "border-primary bg-primary/10"
                                : "border-white/10 bg-white/5"
                            )}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted">
                        Contexte & attentes
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(event) =>
                          setFormData({ ...formData, message: event.target.value })
                        }
                        className="w-full rounded-xl bg-white/5 border border-white/10 py-3 px-4 text-sm mt-2 min-h-[140px]"
                        placeholder="Decrivez vos priorites IA..."
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                      className="text-sm text-muted hover:text-text"
                      disabled={step === 1}
                    >
                      Retour
                    </button>
                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={() => setStep((prev) => Math.min(4, prev + 1))}
                        className="px-6 py-3 rounded-full bg-primary text-dark font-bold text-sm"
                      >
                        Continuer
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-full bg-primary text-dark font-bold text-sm flex items-center gap-2"
                      >
                        Envoyer
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </GlassPanel>
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-white/5">
        <Container>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-primary" /> LLM strategy
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" /> Audit data
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" /> Roadmap 90 jours
            </span>
          </div>
        </Container>
      </section>
    </>
  );
}

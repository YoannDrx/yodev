"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { ArrowRight, Calendar, CheckCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const slots = [
  "Lun 10:00",
  "Lun 14:00",
  "Mar 09:30",
  "Mar 16:00",
  "Mer 11:00",
  "Jeu 15:30",
];

export default function TechnicalRoadmapPage() {
  const [selectedSlot, setSelectedSlot] = useState(slots[0]);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

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
            <div className="space-y-6">
              <FadeIn>
                <Badge variant="secondary">Expertise senior & architectes</Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-6xl font-display font-extrabold leading-tight text-gradient">
                  Roadmap
                  <br />
                  <span className="text-primary">technique strategique</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg text-muted max-w-xl">
                  Une session de 45 minutes pour eliminer la dette technique et
                  preparer votre infrastructure au scaling IA.
                </p>
              </FadeIn>
              <GlassPanel className="p-6 rounded-2xl border-l-4 border-l-primary space-y-4">
                {[
                  "Audit infra complet",
                  "Plan de migration zero downtime",
                  "Benchmark performance",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-muted">
                    <CheckCircle className="h-4 w-4 text-primary mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </GlassPanel>
            </div>

            <GlassPanel className="p-8 md:p-10 rounded-[2.5rem]">
              {submitted ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">
                    Votre session est reservee.
                  </h2>
                  <p className="text-muted">
                    Nous vous envoyons une invitation calendrier sous 1h.
                  </p>
                  <ButtonLink href="/" variant="glass">
                    Retour accueil
                  </ButtonLink>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted">
                      Choisissez un creneau
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3 mt-3">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={cn(
                            "px-4 py-3 rounded-xl border text-sm flex items-center gap-2",
                            selectedSlot === slot
                              ? "border-primary bg-primary/10"
                              : "border-white/10 bg-white/5"
                          )}
                        >
                          <Calendar className="h-4 w-4" />
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted">
                        Nom
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
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(event) =>
                          setFormData({ ...formData, email: event.target.value })
                        }
                        className="w-full rounded-xl bg-white/5 border border-white/10 py-3 px-4 text-sm mt-2"
                        placeholder="vous@entreprise.fr"
                        required
                      />
                    </div>
                  </div>

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
                      Contexte
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(event) =>
                        setFormData({ ...formData, message: event.target.value })
                      }
                      className="w-full rounded-xl bg-white/5 border border-white/10 py-3 px-4 text-sm mt-2 min-h-[120px]"
                      placeholder="Objectifs, contraintes, legacy..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted">
                      Creneau selectionne: <span className="text-primary font-bold">{selectedSlot}</span>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-primary text-dark font-bold text-sm flex items-center gap-2"
                    >
                      Reserver
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </GlassPanel>
          </div>
        </Container>
      </section>
    </>
  );
}

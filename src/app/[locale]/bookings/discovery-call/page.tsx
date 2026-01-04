"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { ArrowRight, CheckCircle, Mail, MessageSquare, User } from "lucide-react";

export default function DiscoveryCallPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "IA & LLM",
    challenge: "",
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
            <div className="space-y-8">
              <FadeIn>
                <Badge variant="primary">Service gratuit pour lecteurs</Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-4xl lg:text-5xl font-display font-extrabold leading-tight text-gradient">
                  Besoin d'un
                  <span className="text-primary italic"> avis d'expert</span> ?
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg text-muted max-w-lg">
                  15 minutes avec un Lead Tech pour debloquer une impasse
                  technique. Pas de pitch, juste de la valeur.
                </p>
              </FadeIn>
              <div className="space-y-6 pt-4">
                {[
                  { title: "Precisez votre impasse", detail: "Bug complexe, choix d'archi ou IA." },
                  { title: "Echange direct (15 min)", detail: "Un call focalise sur votre probleme." },
                  { title: "Plan d'action", detail: "Recommandations immediates et suites." },
                ].map((item, index) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary font-bold">
                      0{index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-text">{item.title}</h4>
                      <p className="text-sm text-muted">{item.detail}</p>
                    </div>
                  </div>
                ))}
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
                    Un expert vous recontacte pour caler le creneau.
                  </p>
                  <ButtonLink href="/" variant="glass">
                    Retour accueil
                  </ButtonLink>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted">
                      Sujet principal
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(event) =>
                        setFormData({ ...formData, topic: event.target.value })
                      }
                      className="w-full rounded-xl bg-white/5 border border-white/10 py-3 px-4 text-sm mt-2"
                    >
                      {[
                        "IA & LLM",
                        "Architecture",
                        "Cybersecurite",
                        "Produit / MVP",
                      ].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted">
                      Votre challenge
                    </label>
                    <textarea
                      value={formData.challenge}
                      onChange={(event) =>
                        setFormData({ ...formData, challenge: event.target.value })
                      }
                      className="w-full rounded-xl bg-white/5 border border-white/10 py-3 px-4 text-sm mt-2 min-h-[140px]"
                      placeholder="Decrivez votre impasse technique..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-full bg-primary text-dark font-bold text-sm flex items-center justify-center gap-2"
                  >
                    Reserver mon avis expert
                    <ArrowRight className="h-4 w-4" />
                  </button>
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
              <MessageSquare className="h-4 w-4 text-primary" /> 15 min
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" /> Sans pitch
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" /> Reco actionnable
            </span>
          </div>
        </Container>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { AlertTriangle, CheckCircle, Shield, Mail, User } from "lucide-react";

const complianceOptions = ["RGPD", "ISO 27001", "SOC2", "PCI-DSS"];

export default function SecurityRiskAuditPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    scope: "Web App",
    compliance: [] as string[],
    message: "",
  });

  const toggleCompliance = (value: string) => {
    setFormData((prev) => {
      const exists = prev.compliance.includes(value);
      return {
        ...prev,
        compliance: exists
          ? prev.compliance.filter((item) => item !== value)
          : [...prev.compliance, value],
      };
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
            <div className="space-y-6">
              <FadeIn>
                <Badge variant="secondary" className="mb-2">
                  Protection critique
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-6xl font-display font-extrabold leading-tight text-gradient">
                  Securite IT &
                  <br />
                  <span className="text-primary">audit de risques</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg text-muted max-w-xl">
                  Identification des vulnerabilites, mise en conformite RGPD/ISO
                  et protection active 24/7 de vos actifs numeriques.
                </p>
              </FadeIn>
              <GlassPanel className="p-6 rounded-2xl border-l-4 border-l-secondary space-y-4">
                {[
                  "Pentest OWASP & scan continu",
                  "Plan de remediation priorise",
                  "Conformite audit-ready",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-muted">
                    <CheckCircle className="h-4 w-4 text-primary mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </GlassPanel>
              <div className="flex items-center gap-4 text-sm text-muted">
                <AlertTriangle className="h-4 w-4 text-secondary" />
                Temps de reponse &lt; 2h pour incident critique.
              </div>
            </div>

            <GlassPanel className="p-8 md:p-10 rounded-[2.5rem]">
              {submitted ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">
                    Demande recue.
                  </h2>
                  <p className="text-muted">
                    Nous vous contactons sous 24h pour cadrer l'audit.
                  </p>
                  <ButtonLink href="/" variant="glass">
                    Retour accueil
                  </ButtonLink>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      Scope
                    </label>
                    <select
                      value={formData.scope}
                      onChange={(event) =>
                        setFormData({ ...formData, scope: event.target.value })
                      }
                      className="w-full rounded-xl bg-white/5 border border-white/10 py-3 px-4 text-sm mt-2"
                    >
                      {[
                        "Web App",
                        "Infrastructure cloud",
                        "SaaS multi-tenant",
                        "Mobile + API",
                      ].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted">
                      Conformite
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3 mt-2">
                      {complianceOptions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleCompliance(item)}
                          className={`px-4 py-3 rounded-xl border text-sm text-left ${
                            formData.compliance.includes(item)
                              ? "border-primary bg-primary/10"
                              : "border-white/10 bg-white/5"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
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
                      placeholder="Decrivez vos enjeux securite..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-full bg-primary text-dark font-bold text-sm flex items-center justify-center gap-2"
                  >
                    Reserver l'audit
                    <Shield className="h-4 w-4" />
                  </button>
                </form>
              )}
            </GlassPanel>
          </div>
        </Container>
      </section>
    </>
  );
}

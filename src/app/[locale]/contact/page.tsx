"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale } from "next-intl";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import { FadeIn } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Locale = "fr" | "en";
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

type FormValues = {
  name: string;
  email: string;
  organization: string;
  projectType: string;
  budget: string;
  message: string;
  website: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  organization: "",
  projectType: "product",
  budget: "",
  message: "",
  website: "",
};

const content = {
  fr: {
    eyebrow: "Parlons de votre produit",
    title: "Un premier échange utile, même avant le devis.",
    subtitle:
      "Décrivez le problème, le contexte et le résultat attendu. Vous recevrez une prochaine étape claire, sans promesse artificielle.",
    formTitle: "Qualifier le projet",
    formIntro:
      "Les champs marqués d’un astérisque sont nécessaires pour vous répondre.",
    projectLegend: "Besoin principal",
    projectTypes: [
      { value: "product", label: "Lancer un produit" },
      { value: "improvement", label: "Améliorer l’existant" },
      { value: "audit", label: "Cadrer ou auditer" },
    ],
    name: "Nom *",
    namePlaceholder: "Votre nom",
    email: "Email professionnel *",
    emailPlaceholder: "vous@entreprise.fr",
    organization: "Organisation",
    organizationPlaceholder: "Entreprise ou projet",
    budget: "Fourchette de budget",
    budgetPlaceholder: "À préciser ensemble",
    budgetOptions: [
      { value: "under-5k", label: "Moins de 5 000 €" },
      { value: "5k-15k", label: "5 000 à 15 000 €" },
      { value: "15k-30k", label: "15 000 à 30 000 €" },
      { value: "30k-plus", label: "Plus de 30 000 €" },
      { value: "unknown", label: "À définir" },
    ],
    message: "Contexte et résultat attendu *",
    messagePlaceholder:
      "Où en est le produit, qui l’utilise, quel problème faut-il résoudre et quelle échéance compte ?",
    submit: "Envoyer la demande",
    submitting: "Envoi en cours",
    successTitle: "Demande transmise",
    successBody:
      "Le message a bien été accepté par notre service d’envoi. Vous pouvez conserver cette page comme confirmation.",
    errorTitle: "La demande n’a pas pu être envoyée",
    errorBody:
      "Réessayez dans quelques instants ou utilisez l’adresse email directe ci-dessous. Aucune réussite n’est simulée.",
    retry: "Réessayer",
    directTitle: "Email direct",
    directBody:
      "Si le formulaire est indisponible, envoyez le même contexte par email.",
    bookingTitle: "Choisir un créneau",
    bookingBody:
      "Le lien de réservation n’apparaît que lorsqu’un calendrier réel est configuré.",
    bookingCta: "Ouvrir le calendrier",
    processTitle: "Ce qui se passe ensuite",
    process: [
      "Lecture du contexte et vérification de l’adéquation.",
      "Réponse avec les inconnues à lever et une prochaine étape.",
      "Cadrage du périmètre, des livrables et des critères d’acceptation.",
    ],
  },
  en: {
    eyebrow: "Let’s discuss your product",
    title: "A useful first conversation, even before a quote.",
    subtitle:
      "Describe the problem, context and expected outcome. You will receive a clear next step without artificial promises.",
    formTitle: "Qualify the project",
    formIntro: "Fields marked with an asterisk are required to reply.",
    projectLegend: "Primary need",
    projectTypes: [
      { value: "product", label: "Launch a product" },
      { value: "improvement", label: "Improve an existing product" },
      { value: "audit", label: "Frame or audit" },
    ],
    name: "Name *",
    namePlaceholder: "Your name",
    email: "Work email *",
    emailPlaceholder: "you@company.com",
    organization: "Organization",
    organizationPlaceholder: "Company or project",
    budget: "Budget range",
    budgetPlaceholder: "To define together",
    budgetOptions: [
      { value: "under-5k", label: "Under €5,000" },
      { value: "5k-15k", label: "€5,000 to €15,000" },
      { value: "15k-30k", label: "€15,000 to €30,000" },
      { value: "30k-plus", label: "Over €30,000" },
      { value: "unknown", label: "To be defined" },
    ],
    message: "Context and expected outcome *",
    messagePlaceholder:
      "What stage is the product at, who uses it, what problem needs solving and what deadline matters?",
    submit: "Send the request",
    submitting: "Sending",
    successTitle: "Request delivered",
    successBody:
      "The message was accepted by our delivery service. You can keep this page as confirmation.",
    errorTitle: "The request could not be sent",
    errorBody:
      "Try again in a moment or use the direct email address below. A successful delivery is never simulated.",
    retry: "Try again",
    directTitle: "Direct email",
    directBody: "If the form is unavailable, send the same context by email.",
    bookingTitle: "Choose a time",
    bookingBody:
      "The booking link only appears when a real calendar is configured.",
    bookingCta: "Open calendar",
    processTitle: "What happens next",
    process: [
      "We read the context and check whether the project is a fit.",
      "We reply with open questions and a clear next step.",
      "We frame scope, deliverables and acceptance criteria.",
    ],
  },
} as const;

const contactEmail = "hello@yodev.fr";
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

export default function ContactPage() {
  const locale = (useLocale() === "en" ? "en" : "fr") satisfies Locale;
  const copy = content[locale];
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const requestIdRef = useRef<string | null>(null);

  useEffect(() => {
    const requestedType = new URLSearchParams(window.location.search).get("type");
    const projectTypeByQuery: Record<string, FormValues["projectType"]> = {
      nouveau: "product",
      new: "product",
      optimisation: "improvement",
      optimization: "improvement",
      audit: "audit",
    };

    if (requestedType && projectTypeByQuery[requestedType]) {
      setValues((current) => ({
        ...current,
        projectType: projectTypeByQuery[requestedType],
      }));
    }
  }, []);

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    requestIdRef.current ??= crypto.randomUUID();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Contact-Request-Id": requestIdRef.current,
        },
        body: JSON.stringify({ ...values, locale }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setValues(initialValues);
      requestIdRef.current = null;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn initiallyVisible>
              <Badge variant="primary" className="mb-6">
                <MessageSquare className="mr-1 size-3" aria-hidden="true" />
                {copy.eyebrow}
              </Badge>
              <h1 className="font-display text-4xl font-extrabold leading-[1.1] md:text-6xl">
                {copy.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {copy.subtitle}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="pb-24 pt-8">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <GlassPanel className="rounded-3xl p-6 md:p-10">
              <div className="mb-8">
                <h2 className="font-display text-2xl font-bold">
                  {copy.formTitle}
                </h2>
                <p className="mt-2 text-sm text-muted">{copy.formIntro}</p>
              </div>

              {status === "success" ? (
                <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6" role="status">
                  <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-bold">{copy.successTitle}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {copy.successBody}
                  </p>
                  <Button className="mt-6" variant="outline" onClick={() => setStatus("idle")}>
                    {copy.retry}
                  </Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-text">
                      {copy.projectLegend}
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {copy.projectTypes.map((projectType) => {
                        const isSelected = values.projectType === projectType.value;

                        return (
                          <button
                            key={projectType.value}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => updateValue("projectType", projectType.value)}
                            className={cn(
                              "min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                              isSelected
                                ? "border-primary bg-primary/10 text-text"
                                : "border-border bg-surface text-muted hover:border-primary/40"
                            )}
                          >
                            {projectType.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label={copy.name}
                      value={values.name}
                      onChange={(event) => updateValue("name", event.target.value)}
                      placeholder={copy.namePlaceholder}
                      autoComplete="name"
                      maxLength={80}
                      required
                    />
                    <Input
                      label={copy.email}
                      type="email"
                      value={values.email}
                      onChange={(event) => updateValue("email", event.target.value)}
                      placeholder={copy.emailPlaceholder}
                      autoComplete="email"
                      maxLength={160}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label={copy.organization}
                      value={values.organization}
                      onChange={(event) => updateValue("organization", event.target.value)}
                      placeholder={copy.organizationPlaceholder}
                      autoComplete="organization"
                      maxLength={120}
                    />
                    <Select
                      label={copy.budget}
                      value={values.budget}
                      onChange={(event) => updateValue("budget", event.target.value)}
                      placeholder={copy.budgetPlaceholder}
                      options={[...copy.budgetOptions]}
                    />
                  </div>

                  <Textarea
                    label={copy.message}
                    value={values.message}
                    onChange={(event) => updateValue("message", event.target.value)}
                    placeholder={copy.messagePlaceholder}
                    minLength={20}
                    maxLength={4_000}
                    rows={7}
                    required
                  />

                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      value={values.website}
                      onChange={(event) => updateValue("website", event.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {status === "error" && (
                    <div className="rounded-xl border border-rose/30 bg-rose/10 p-4" role="alert">
                      <p className="font-bold text-text">{copy.errorTitle}</p>
                      <p className="mt-1 text-sm text-muted">{copy.errorBody}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                    isLoading={status === "submitting"}
                    leftIcon={<Send className="size-4" aria-hidden="true" />}
                  >
                    {status === "submitting" ? copy.submitting : copy.submit}
                  </Button>
                </form>
              )}
            </GlassPanel>

            <div className="space-y-6">
              <GlassPanel className="rounded-2xl p-6">
                <Mail className="size-6 text-primary" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-bold">{copy.directTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {copy.directBody}
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {contactEmail}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </GlassPanel>

              {bookingUrl && (
                <GlassPanel className="rounded-2xl p-6">
                  <Calendar className="size-6 text-primary" aria-hidden="true" />
                  <h2 className="mt-4 text-lg font-bold">{copy.bookingTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {copy.bookingBody}
                  </p>
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {copy.bookingCta}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </GlassPanel>
              )}

              <GlassPanel className="rounded-2xl p-6">
                <h2 className="text-lg font-bold">{copy.processTitle}</h2>
                <ol className="mt-5 space-y-4">
                  {copy.process.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <span className="pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </GlassPanel>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

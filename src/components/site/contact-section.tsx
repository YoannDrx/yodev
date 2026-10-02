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
import { Link } from "@/i18n/navigation";
import { CONTACT_LIMITS, CONTACT_MESSAGE_MIN, CONTACT_CLIENT_TIMEOUT_MS, CONTACT_PRODUCTS, validateContactRequest, type ContactValues, type ContactFieldErrors, type ContactProduct } from "@/lib/contact-request";
import { contactSubmissionId, clearContactReceipt } from "@/lib/contact-submission";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Locale = "fr" | "en";
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

type FormValues = ContactValues;

const initialValues: FormValues = {
  name: "",
  email: "",
  organization: "",
  projectType: "product",
  budget: "",
  message: "",
  website: "",
  product: "",
};

const content = {
  fr: {
    eyebrow: "Parlons de votre produit",
    title: "Un premier échange utile, même avant le devis.",
    subtitle:
      "Décrivez le problème, le contexte et le résultat attendu. Vous recevrez une prochaine étape claire, pour avancer sur votre projet.",
    formTitle: "Parlons de votre projet",
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
      "Votre demande a bien été transmise. Je vous répondrai à l’adresse indiquée.",
    errorTitle: "La demande n’a pas pu être envoyée",
    errorBody:
      "Réessayez dans quelques instants ou utilisez l’adresse email directe ci-dessous. ",
    retry: "Envoyer une autre demande",
    directTitle: "Email direct",
    directBody:
      "Si le formulaire est indisponible, envoyez le même contexte par email.",
    bookingTitle: "Choisir un créneau",
    bookingBody:
      "Vous pouvez également choisir un créneau pour en discuter.",
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
      "Describe the problem, context and expected outcome. You will receive a clear next step to move your project forward.",
    formTitle: "Let’s talk about your project",
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
    successTitle: "Request submitted",
    successBody:
      "Your request has been sent. I will reply to the email address you provided.",
    errorTitle: "The request could not be sent",
    errorBody:
      "Try again in a moment or use the direct email address below.",
    retry: "Send another request",
    directTitle: "Direct email",
    directBody: "If the form is unavailable, send the same context by email.",
    bookingTitle: "Choose a time",
    bookingBody:
      "You can also choose a time to discuss your project.",
    bookingCta: "Open calendar",
    processTitle: "What happens next",
    process: [
      "I read the context and check whether the project is a fit.",
      "I reply with open questions and a clear next step.",
      "We frame scope, deliverables and acceptance criteria.",
    ],
  },
} as const;

const contactEmail = "hello@yodev.fr";
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

export function ContactSection({ embedded = false }: { embedded?: boolean }) {
  const locale = (useLocale() === "en" ? "en" : "fr") satisfies Locale;
  const [ready, setReady] = useState(false);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const requestIdRef = useRef<string | null>(null);
  const busy = useRef(false);
  const activeController = useRef<AbortController | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [errorKind, setErrorKind] = useState("DELIVERY_FAILED");
  const [retryMinutes, setRetryMinutes] = useState(1);
  const dirty = status !== "success" && Boolean(values.name || values.email || values.organization || values.message || values.budget);
  const fr = locale === "fr";
  const productName = values.product ? `Yodev ${values.product[0].toUpperCase()}${values.product.slice(1)}` : "";
  const copy = {
    ...content[locale],
    ...(productName ? {
      eyebrow: fr ? `Découvrir ${productName}` : `Discover ${productName}`,
      title: fr ? `Parlons de votre usage de ${productName}.` : `Let’s talk about your use of ${productName}.`,
      subtitle: fr ? "Décrivez votre usage et vos attentes. Je vous préciserai les possibilités d’accès et la prochaine étape utile." : "Describe your use case and expectations. I will explain the access options and a useful next step.",
      formTitle: fr ? "Parlons de votre usage" : "Tell me about your use case",
      process: fr ? ["Je lis votre demande et votre contexte d’usage.", "Je vous précise la disponibilité et les conditions d’accès du produit.", "Nous choisissons la prochaine étape adaptée à votre besoin."] : ["I review your request and use case.", "I explain product availability and access conditions.", "We choose the next step that fits your needs."],
    } : {}),
  };

  useEffect(() => {
    setReady(true);
    const query = new URLSearchParams(window.location.search);
    const types: Record<string, string> = { nouveau: "product", new: "product", optimisation: "improvement", optimization: "improvement", audit: "audit" };
    const product = query.get("product");
    setValues(current => ({ ...current,
      projectType: types[query.get("type") ?? ""] ?? current.projectType,
      product: CONTACT_PRODUCTS.some(value => value === product) ? product as ContactProduct : "",
    }));
    return () => activeController.current?.abort();
  }, []);

  useEffect(() => {
    if (!dirty) return;
    let discarding = false;
    const discard = () => { discarding = true; };
    const warn = (event: BeforeUnloadEvent) => { if (!discarding) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    window.addEventListener("yodev:discard-contact", discard);
    return () => {
      window.removeEventListener("beforeunload", warn);
      window.removeEventListener("yodev:discard-contact", discard);
    };
  }, [dirty]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function updateValue(field: keyof FormValues, value: string) {
    if (busy.current) return;
    requestIdRef.current = null;
    setValues(current => ({ ...current, [field]: value }));
    setFieldErrors(current => ({ ...current, [field]: undefined }));
    if (status === "error") setStatus("idle");
  }

  function showValidation(fields: ContactFieldErrors) {
    setFieldErrors(fields);
    setErrorKind("INVALID_REQUEST");
    setStatus("error");
    requestAnimationFrame(() => {
      const field = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      const details = field?.closest("details");
      if (details) details.open = true;
      field?.focus();
    });
  }

  function fieldError(field: keyof FormValues) {
    const code = fieldErrors[field];
    if (!code) return undefined;
    if (code === "required") return fr ? "Renseignez ce champ." : "Complete this field.";
    if (field === "message" && code === "too_short") return fr ? "Décrivez votre besoin en au moins 20 caractères, hors espaces en début et fin." : "Describe your needs in at least 20 characters, excluding leading and trailing spaces.";
    if (code === "too_long") return fr ? "Ce champ dépasse la longueur autorisée." : "This field is too long.";
    if (field === "email") return fr ? "Indiquez une adresse email valide." : "Enter a valid email address.";
    return fr ? "Vérifiez la valeur de ce champ." : "Check this field’s value.";
  }

  const errorBody = errorKind === "INVALID_REQUEST"
    ? fr ? "Corrigez les champs indiqués avant de renvoyer votre demande." : "Correct the highlighted fields before submitting again."
    : errorKind === "RATE_LIMITED"
      ? fr ? `Trop de demandes ont été reçues. Attendez environ ${retryMinutes} minute(s), ou utilisez l’email direct.` : `Too many requests were received. Wait about ${retryMinutes} minute(s), or use direct email.`
      : errorKind === "DELIVERY_TIMEOUT"
        ? fr ? "L’envoi prend trop de temps. Votre saisie est conservée. Réessayez la même demande ; elle garde son identifiant pour éviter un doublon." : "Sending is taking too long. Your input is preserved. Retry the same request; it keeps its identifier to avoid duplicates."
        : ["CONTACT_NOT_CONFIGURED", "CONTACT_UNAVAILABLE"].includes(errorKind)
          ? fr ? "Le formulaire est temporairement indisponible. Votre saisie est conservée ; utilisez l’email direct ou réessayez plus tard." : "The form is temporarily unavailable. Your input is preserved; use direct email or try again later."
          : copy.errorBody;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const validation = validateContactRequest({ ...values, locale });
    if (!validation.success) { showValidation(validation.fields); return; }
    busy.current = true;
    setFieldErrors({});
    setStatus("submitting");
    const controller = new AbortController();
    activeController.current = controller;
    const timer = window.setTimeout(() => controller.abort(), CONTACT_CLIENT_TIMEOUT_MS);
    try {
      requestIdRef.current ??= await contactSubmissionId(validation.data);
      const response = await fetch("/api/contact", {
        method: "POST", signal: controller.signal,
        headers: { "Content-Type": "application/json", "X-Contact-Request-Id": requestIdRef.current },
        body: JSON.stringify(validation.data),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        if (response.status === 400 && result.fields) showValidation(result.fields);
        else {
          setErrorKind(result.code ?? "DELIVERY_FAILED");
          setRetryMinutes(Math.max(1, Math.ceil((Number(response.headers.get("retry-after")) || 60) / 60)));
          setStatus("error");
        }
        return;
      }
      setValues({ ...initialValues, product: values.product });
      requestIdRef.current = null;
      clearContactReceipt();
      setStatus("success");
    } catch {
      setErrorKind(controller.signal.aborted ? "DELIVERY_TIMEOUT" : "DELIVERY_FAILED");
      setStatus("error");
    } finally {
      window.clearTimeout(timer);
      busy.current = false;
      activeController.current = null;
    }
  }

  return (
    <div className={`yd-contact${embedded ? " yd-contact-embedded" : ""}`} id="contact">
      {!embedded && <section className="relative overflow-hidden pb-8 pt-12 md:pb-12 md:pt-16">

        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div>
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
            </div>
          </div>
        </Container>
      </section>}

      <section className="pb-24 pt-8">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass-panel rounded-3xl p-6 md:p-10">
              <div className="mb-8">
                <h2 className="font-display text-2xl font-bold">
                  {copy.formTitle}
                </h2>
                <p className="mt-2 text-sm text-muted">{copy.formIntro}</p>
              </div>

              {status === "success" ? (
                <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6" role="status" ref={successRef} tabIndex={-1}>
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
                <form ref={formRef} method="post" action="/api/contact" noValidate onSubmit={handleSubmit} data-contact-dirty={dirty ? "true" : undefined}>
                  {!ready && <p className="mb-4">{fr ? "Activez JavaScript pour utiliser ce formulaire, ou écrivez à " : "Enable JavaScript to use this form, or email "}<a href={`mailto:${contactEmail}`} className="underline">{contactEmail}</a>.</p>}
                  <fieldset className="space-y-6" disabled={!ready || status === "submitting"} aria-busy={status === "submitting"}>
                    <legend className="sr-only">{copy.formTitle}</legend>
                    <Select name="product" label={fr ? "Votre demande concerne" : "Your request is about"}
                      value={values.product} onChange={event => updateValue("product", event.target.value)} error={fieldError("product")}
                      options={[{ value: "", label: fr ? "Une prestation sur devis" : "A project or service" }, ...CONTACT_PRODUCTS.map(product => ({ value: product, label: `Yodev ${product[0].toUpperCase()}${product.slice(1)}` }))]} />
                    {values.product && <p className="text-sm text-muted">{fr ? "Décrivez votre usage et vos attentes pour ce produit. Je vous préciserai les possibilités d’accès." : "Describe your use case and expectations for this product. I will explain the available access options."}</p>}
                  <fieldset hidden={Boolean(values.product)}>
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
                      name="name"
                      error={fieldError("name")}
                      label={copy.name}
                      value={values.name}
                      onChange={(event) => updateValue("name", event.target.value)}
                      placeholder={copy.namePlaceholder}
                      autoComplete="name"
                      maxLength={CONTACT_LIMITS.name}
                      required
                    />
                    <Input
                      name="email"
                      error={fieldError("email")}
                      label={copy.email}
                      type="email"
                      value={values.email}
                      onChange={(event) => updateValue("email", event.target.value)}
                      placeholder={copy.emailPlaceholder}
                      autoComplete="email"
                      maxLength={CONTACT_LIMITS.email}
                      required
                    />
                  </div>

                  <details><summary className="cursor-pointer text-sm text-muted py-2">{locale === "fr" ? "Organisation et budget (facultatif)" : "Organization and budget (optional)"}</summary><div className="grid gap-4 sm:grid-cols-2 mt-4">
                    <Input
                      name="organization"
                      error={fieldError("organization")}
                      label={copy.organization}
                      value={values.organization}
                      onChange={(event) => updateValue("organization", event.target.value)}
                      placeholder={copy.organizationPlaceholder}
                      autoComplete="organization"
                      maxLength={CONTACT_LIMITS.organization}
                    />
                    <Select
                      name="budget"
                      error={fieldError("budget")}
                      label={copy.budget}
                      value={values.budget}
                      onChange={(event) => updateValue("budget", event.target.value)}
                                            options={[{ value: "", label: copy.budgetPlaceholder }, ...copy.budgetOptions]}
                    />
                  </div></details>

                  <Textarea
                    name="message"
                      error={fieldError("message")}
                      label={copy.message}
                    value={values.message}
                    onChange={(event) => updateValue("message", event.target.value)}
                    placeholder={copy.messagePlaceholder}
                    minLength={CONTACT_MESSAGE_MIN}
                    maxLength={CONTACT_LIMITS.message}
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
                      <p className="mt-1 text-sm text-muted">{errorBody}</p>
                    </div>
                  )}

                  <p className="text-xs leading-relaxed text-muted">{fr ? "Yodev utilise ces informations pour étudier votre demande et vous répondre. Les champs marqués * sont nécessaires. " : "Yodev uses this information to assess and reply to your request. Fields marked * are required. "}<Link href="/legal/privacy" target="_blank" rel="noreferrer" className="underline underline-offset-4">{fr ? "Confidentialité et droits (nouvel onglet)" : "Privacy and your rights (new tab)"}</Link></p>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                    isLoading={status === "submitting"}
                    leftIcon={<Send className="size-4" aria-hidden="true" />}
                  >
                    {status === "submitting" ? copy.submitting : copy.submit}
                  </Button>
                  </fieldset>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="glass-panel rounded-2xl p-6">
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
              </div>

              {bookingUrl && (
                <div className="glass-panel rounded-2xl p-6">
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
                </div>
              )}

              <div className="glass-panel rounded-2xl p-6">
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
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

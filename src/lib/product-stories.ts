import type { YodevProduct } from "@/brand/brand";
import type { ProductLocale } from "@/lib/products";

/** Copy for the Signal visuals: the home teasers and the product pages. Every figure shows demonstration data. */
export type ProductTeaser = {
  title: [string, string, string?];
  points: string[];
  status: string;
  cta: string;
  figure: { caption: string; summary: string; label: string };
};

export const demoLabel = { fr: "Données de démonstration", en: "Demonstration data" } as const;

export const productTeasers: Record<ProductLocale, Record<YodevProduct, ProductTeaser>> = {
  fr: {
    mail: {
      title: ["Les emails de votre application, ", "pris en charge."],
      points: ["API idempotente, un événement, un destinataire", "DNS et délivrabilité accompagnés", "Aucun pixel de suivi, aucun lien réécrit"],
      status: "Bêta privée · 29 € HT / mois",
      cta: "Découvrir Mail",
      figure: { caption: "Flux d’envois", summary: "1 rebond sur 4", label: "Quatre envois sur la ligne : deux délivrés, un en file d’attente, un rebond." },
    },
    ads: {
      title: ["Chaque dérive devient ", "une décision expliquée."],
      points: ["Une surveillance quotidienne de tous vos comptes", "Rien ne bouge sans votre approbation", "Des rapports clients révocables"],
      status: "Accès limité",
      cta: "Découvrir Ads",
      figure: { caption: "Coût par conversion, 30 jours", summary: "3 dérives détectées", label: "La courbe du coût par conversion sort trois fois de sa zone cible ; la dernière dérive attend une approbation." },
    },
    spend: {
      title: ["Ce que coûte ", "vraiment", " chaque produit."],
      points: ["Vercel, OpenAI, GitHub et AWS réunis", "Coûts partagés répartis au centime", "Coûts directs et mutualisés par projet"],
      status: "Accès limité",
      cta: "Découvrir Spend",
      figure: { caption: "Dépenses cumulées du mois", summary: "120,25 € au 18", label: "Dépenses cumulées en escalier : Resend, puis Vercel, puis AWS, soit 120,25 euros au 18 du mois." },
    },
  },
  en: {
    mail: {
      title: ["Your application’s emails, ", "taken care of."],
      points: ["Idempotent API, one event, one recipient", "Supported DNS and deliverability", "No tracking pixel, no rewritten links"],
      status: "Private beta · €29 excl. VAT / month",
      cta: "Discover Mail",
      figure: { caption: "Delivery stream", summary: "1 bounce out of 4", label: "Four emails on the line: two delivered, one queued, one bounced." },
    },
    ads: {
      title: ["Every drift becomes ", "an explained decision."],
      points: ["Daily monitoring across all your accounts", "Nothing changes without your approval", "Revocable client reports"],
      status: "Limited access",
      cta: "Discover Ads",
      figure: { caption: "Cost per conversion, 30 days", summary: "3 drifts detected", label: "The cost-per-conversion line leaves its target range three times; the latest drift awaits approval." },
    },
    spend: {
      title: ["What each product ", "really", " costs."],
      points: ["Vercel, OpenAI, GitHub and AWS in one place", "Shared costs allocated to the cent", "Direct and shared costs for every project"],
      status: "Limited access",
      cta: "Discover Spend",
      figure: { caption: "Cumulative spend this month", summary: "€120.25 on the 18th", label: "Cumulative spend in steps: Resend, then Vercel, then AWS, reaching €120.25 on the 18th of the month." },
    },
  },
};

/** Labels drawn on the line charts. */
export const chartLabels = {
  fr: {
    mail: { events: ["invoice.paid", "password.reset", "user.invite", "order.shipped"], states: { delivered: "délivré", queued: "en file", bounced: "rebond" } },
    ads: { zone: "zone cible", approve: "à approuver" },
    spend: { steps: ["Resend · 19 €", "Vercel · +28 €", "AWS · +35 €"], today: "120,25 € au 18" },
  },
  en: {
    mail: { events: ["invoice.paid", "password.reset", "user.invite", "order.shipped"], states: { delivered: "delivered", queued: "queued", bounced: "bounced" } },
    ads: { zone: "target range", approve: "to approve" },
    spend: { steps: ["Resend · €19", "Vercel · +€28", "AWS · +€35"], today: "€120.25 on the 18th" },
  },
} as const;

export type RouteStep = { name: string; detail: string };

export const mailStory = {
  fr: {
    route: { label: "Le trajet d’un email : votre application, l’API Yodev, la validation, la remise, puis la livraison.", steps: [
      { name: "Votre app", detail: "invoice.paid" },
      { name: "API Yodev", detail: "202 accepté · +0,08 s" },
      { name: "Validation", detail: "domaine et template vérifiés" },
      { name: "Remise", detail: "serveur destinataire" },
      { name: "Délivré", detail: "+2,1 s · webhook signé" },
    ] },
    apiTitle: "Une requête. Un événement. Un destinataire.",
    apiBody: "Chaque appel est idempotent et décrit un fait métier : une facture payée, un mot de passe à réinitialiser. Le reste du chemin est pris en charge.",
    refused: ["SMTP", "CC et BCC", "Campagnes", "Pixel de suivi"],
    refusedNote: "Ce que Yodev Mail refuse de faire, volontairement.",
    codeLabel: "Exemple de requête et de réponse",
    codeComment: "// exemple de requête",
    accepted: "202 accepté",
    delivered: "délivré · webhook signé",
    quotaLabel: "Paliers de quota : 50, puis 200, puis 500.",
    quotaBody: "L’accès se fait sur dossier. Les quotas augmentent par paliers, au rythme de votre réputation d’envoi.",
  },
  en: {
    route: { label: "An email’s journey: your application, the Yodev API, review, hand-off, then delivery.", steps: [
      { name: "Your app", detail: "invoice.paid" },
      { name: "Yodev API", detail: "202 accepted · +0.08 s" },
      { name: "Review", detail: "domain and template checked" },
      { name: "Hand-off", detail: "recipient server" },
      { name: "Delivered", detail: "+2.1 s · signed webhook" },
    ] },
    apiTitle: "One request. One event. One recipient.",
    apiBody: "Every call is idempotent and describes a business fact: a paid invoice, a password to reset. The rest of the journey is taken care of.",
    refused: ["SMTP", "CC and BCC", "Campaigns", "Tracking pixel"],
    refusedNote: "What Yodev Mail deliberately refuses to do.",
    codeLabel: "Example request and response",
    codeComment: "// example request",
    accepted: "202 accepted",
    delivered: "delivered · signed webhook",
    quotaLabel: "Quota tiers: 50, then 200, then 500.",
    quotaBody: "Access is granted on application. Quotas increase in tiers as your sending reputation grows.",
  },
} as const;

export const adsStory = {
  fr: {
    drift: { label: "La courbe du coût par conversion sort trois fois de sa zone cible ; la dernière dérive attend votre approbation.", zone: "zone cible du coût par conversion", marks: ["Atelier Nord · termes de recherche", "Studio Lumen · annonce", "Boulangerie Rive · à approuver"] },
    decisionTitle: "Une alerte qui arrive avec sa solution.",
    card: { account: "Boulangerie Rive · Marque — FR", source: "surveillance du budget · 06:00", headline: "Le budget s’épuise chaque jour vers 14 h. 38 % des impressions sont perdues l’après-midi.", today: "Aujourd’hui", todayValue: "40 € / j", proposed: "Proposé, 7 jours", proposedValue: "60 € / j", note: "Validé par Google Ads avant exécution", actions: ["Approuver", "Ajuster", "Ignorer"] },
    journalTitle: "Le journal de cette décision",
    journal: [
      { title: "Anomalie détectée", who: "surveillance du budget", time: "06:00", you: false },
      { title: "Proposition rédigée", who: "agent", time: "06:01", you: false },
      { title: "Approuvée", who: "Camille, media buyer", time: "09:14", you: true },
      { title: "Validée puis exécutée", who: "Google Ads", time: "09:14", you: false },
      { title: "Consignée", who: "historique client", time: "09:15", you: false },
    ],
    flowTitle: "Rien ne change dans un compte sans que vous l’ayez décidé.",
    flow: { label: "Le parcours d’une action : les agents détectent et expliquent, vous approuvez, Google Ads exécute, l’historique trace.", steps: [
      { name: "Détecter", detail: "agent" },
      { name: "Expliquer", detail: "agent" },
      { name: "Approuver", detail: "vous" },
      { name: "Exécuter", detail: "Google Ads" },
      { name: "Tracer", detail: "historique" },
    ] },
  },
  en: {
    drift: { label: "The cost-per-conversion line leaves its target range three times; the latest drift awaits your approval.", zone: "cost-per-conversion target range", marks: ["Atelier Nord · search terms", "Studio Lumen · ad", "Boulangerie Rive · to approve"] },
    decisionTitle: "An alert that arrives with its fix.",
    card: { account: "Boulangerie Rive · Brand — FR", source: "budget monitoring · 06:00", headline: "The budget runs out around 2 pm every day. 38% of impressions are lost in the afternoon.", today: "Today", todayValue: "€40 / day", proposed: "Proposed, 7 days", proposedValue: "€60 / day", note: "Validated by Google Ads before execution", actions: ["Approve", "Adjust", "Dismiss"] },
    journalTitle: "This decision’s log",
    journal: [
      { title: "Anomaly detected", who: "budget monitoring", time: "06:00", you: false },
      { title: "Proposal drafted", who: "agent", time: "06:01", you: false },
      { title: "Approved", who: "Camille, media buyer", time: "09:14", you: true },
      { title: "Validated, then executed", who: "Google Ads", time: "09:14", you: false },
      { title: "Recorded", who: "client history", time: "09:15", you: false },
    ],
    flowTitle: "Nothing changes in an account unless you decided it.",
    flow: { label: "An action’s journey: agents detect and explain, you approve, Google Ads executes, the history records it.", steps: [
      { name: "Detect", detail: "agent" },
      { name: "Explain", detail: "agent" },
      { name: "Approve", detail: "you" },
      { name: "Execute", detail: "Google Ads" },
      { name: "Record", detail: "history" },
    ] },
  },
} as const;

export const spendStory = {
  fr: {
    stairs: { label: "Dépenses cumulées du mois en escalier : Resend 19 euros, Vercel 28 euros, AWS 35 euros, soit 120,25 euros au 18.", marks: ["Resend · 19 €", "Vercel · +28 €", "AWS · +35 €"], today: "120,25 € au 18", start: "début du mois", end: "fin du mois" },
    allocationTitle: "Une facture, quatre destinations, zéro centime perdu.",
    allocationBody: "Les ressources mappées partent directement vers leur projet. Le partagé suit une règle datée. Le reste attend votre arbitrage, visible.",
    allocationLabel: "La facture Vercel de 48 euros se répartit : Parigo 20,16 euros, Pressay 13,44 euros, Yodev Mail 8,64 euros, non alloué 5,76 euros.",
    source: { name: "Vercel", amount: "48,00 €" },
    targets: [
      { name: "Parigo", amount: "20,16 €", kind: "direct" },
      { name: "Pressay", amount: "13,44 €", kind: "direct" },
      { name: "Yodev Mail", amount: "8,64 €", kind: "partagé" },
      { name: "Non alloué", amount: "5,76 €", kind: "à répartir" },
    ],
    sum: "20,16 + 13,44 + 8,64 + 5,76 = 48,00 €",
    reconciled: "Réconcilié au centime",
  },
  en: {
    stairs: { label: "This month’s cumulative spend in steps: Resend €19, Vercel €28, AWS €35, reaching €120.25 on the 18th.", marks: ["Resend · €19", "Vercel · +€28", "AWS · +€35"], today: "€120.25 on the 18th", start: "start of month", end: "end of month" },
    allocationTitle: "One bill, four destinations, not a cent lost.",
    allocationBody: "Mapped resources go straight to their project. Shared costs follow a dated rule. The remainder waits for your decision, in plain sight.",
    allocationLabel: "The €48 Vercel bill is split: Parigo €20.16, Pressay €13.44, Yodev Mail €8.64, unallocated €5.76.",
    source: { name: "Vercel", amount: "€48.00" },
    targets: [
      { name: "Parigo", amount: "€20.16", kind: "direct" },
      { name: "Pressay", amount: "€13.44", kind: "direct" },
      { name: "Yodev Mail", amount: "€8.64", kind: "shared" },
      { name: "Unallocated", amount: "€5.76", kind: "to allocate" },
    ],
    sum: "20.16 + 13.44 + 8.64 + 5.76 = €48.00",
    reconciled: "Reconciled to the cent",
  },
} as const;

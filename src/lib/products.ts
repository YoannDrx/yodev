export const productUrls = {
  mail: "https://mail.yodev.fr/inscription",
  ads: "https://ads.yodev.fr",
  spend: {
    fr: "https://spend.yodev.fr/fr/dashboard",
    en: "https://spend.yodev.fr/en/dashboard",
  },
} as const;

export type ProductLocale = "fr" | "en";

export type ProductLandingCopy = {
  brand: string;
  signature: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  featuresTitle: string;
  features: { title: string; description: string }[];
  trustTitle: string;
  trustItems: string[];
  pricing?: {
    eyebrow: string;
    title: string;
    price: string;
    usage: string;
    details: string[];
  };
  closingTitle: string;
  closingBody: string;
};

export const mailCopy: Record<ProductLocale, ProductLandingCopy> = {
  fr: {
    brand: "Mail",
    signature: "by Yodev",
    eyebrow: "Passerelle transactionnelle gérée",
    title: "Un événement applicatif, un destinataire, une livraison maîtrisée.",
    subtitle:
      "Mail by Yodev opère l’envoi transactionnel pour vos applications : revue du cas d’usage, configuration DNS, API stricte et suivi de délivrabilité, sans compte fournisseur à gérer.",
    primaryCta: "Candidater à la bêta privée",
    secondaryCta: "Présenter mon besoin",
    featuresTitle: "Une chaîne transactionnelle accompagnée",
    features: [
      { title: "API one-to-one", description: "Une requête idempotente décrit un événement métier et un destinataire unique. Aucun SMTP, CC, BCC ou outil de campagne." },
      { title: "Validation avant envoi", description: "Yodev examine l’application, le profil transactionnel et chaque template avant toute clé live." },
      { title: "DNS pris en charge", description: "DKIM, Return-Path et DMARC sont préparés avec vous, ou configurés via une délégation temporaire et limitée." },
      { title: "Délivrabilité sans tracking", description: "Livraisons, bounces, plaintes et suppressions sont suivis sans pixel d’ouverture ni réécriture des liens." },
    ],
    trustTitle: "Une bêta volontairement contrôlée",
    trustItems: ["Accès sur dossier et invitation", "Quotas progressifs 50 / 200 / 500", "Clés Yodev et webhooks signés", "Aucune donnée personnelle dans les files opérationnelles"],
    pricing: {
      eyebrow: "Tarif bêta privée",
      title: "29 € HT / mois",
      price: "+ 0,0025 € HT par email accepté",
      usage: "Aucun email inclus et aucun frais sur les simulations ou rejets avant acceptation.",
      details: ["2 domaines", "3 utilisateurs", "Pièces jointes incluses en V1", "Activation après approbation"],
    },
    closingTitle: "Présentez-nous un flux transactionnel réel.",
    closingBody: "La candidature décrit votre application, les événements déclencheurs, les destinataires attendus et les volumes. Yodev valide ensuite le domaine et le parcours de livraison.",
  },
  en: {
    brand: "Mail",
    signature: "by Yodev",
    eyebrow: "Managed transactional gateway",
    title: "One application event, one recipient, one controlled delivery.",
    subtitle:
      "Mail by Yodev operates transactional delivery for your applications: use-case review, DNS setup, a strict API and deliverability monitoring, with no provider account for you to manage.",
    primaryCta: "Apply for the private beta",
    secondaryCta: "Describe my use case",
    featuresTitle: "A supported transactional delivery chain",
    features: [
      { title: "One-to-one API", description: "An idempotent request describes one business event and one recipient. No SMTP, CC, BCC or campaign tooling." },
      { title: "Review before delivery", description: "Yodev reviews the application, transactional profile and every template before issuing a live key." },
      { title: "Supported DNS", description: "DKIM, Return-Path and DMARC are prepared with you or configured through limited, temporary delegation." },
      { title: "Deliverability without tracking", description: "Delivery, bounces, complaints and suppressions are monitored without open pixels or rewritten links." },
    ],
    trustTitle: "A deliberately controlled beta",
    trustItems: ["Application and invitation only", "Progressive 50 / 200 / 500 quotas", "Yodev keys and signed webhooks", "No personal data in operational queues"],
    pricing: {
      eyebrow: "Private beta pricing",
      title: "€29 excl. VAT / month",
      price: "+ €0.0025 excl. VAT per accepted email",
      usage: "No included emails and no charge for simulations or pre-acceptance rejections.",
      details: ["2 domains", "3 users", "Attachments included in V1", "Activation after approval"],
    },
    closingTitle: "Show us a real transactional flow.",
    closingBody: "Your application describes the app, triggering events, expected recipients and volumes. Yodev then validates the domain and delivery path.",
  },
};

export const adsCopy: Record<ProductLocale, ProductLandingCopy> = {
  fr: {
    brand: "Ads",
    signature: "by Yodev",
    eyebrow: "Pilotage Google Ads multi-client",
    title: "Surveillez chaque compte, expliquez chaque alerte, sécurisez chaque action.",
    subtitle:
      "Ads by Yodev donne aux agences et media buyers un cockpit unique pour analyser, approuver et piloter leurs comptes Google Ads.",
    primaryCta: "Ouvrir Ads by Yodev",
    secondaryCta: "Parler du produit",
    featuresTitle: "Du signal à la décision",
    features: [
      { title: "Monitoring autonome", description: "Des agents quotidiens détectent les anomalies et priorisent le travail." },
      { title: "Analyse 360°", description: "Termes de recherche, qualité, annonces, conversions et budgets sont réunis." },
      { title: "Approbations sécurisées", description: "Chaque mutation sensible est expliquée, validée et auditée avant exécution." },
      { title: "Portefeuille d’agence", description: "Tous les clients, rapports et garde-fous sont isolés par workspace." },
    ],
    trustTitle: "Pensé pour les opérateurs responsables",
    trustItems: ["OAuth Google chiffré", "Validation Google Ads avant mutation", "Historique opérationnel append-only", "Rapports clients révocables"],
    closingTitle: "Moins d’angles morts, plus de décisions traçables.",
    closingBody: "Connectez votre MCC, choisissez vos agents et commencez par une analyse en lecture seule.",
  },
  en: {
    brand: "Ads",
    signature: "by Yodev",
    eyebrow: "Multi-client Google Ads operations",
    title: "Monitor every account, explain every alert and secure every action.",
    subtitle:
      "Ads by Yodev gives agencies and media buyers one cockpit to analyse, approve and operate their Google Ads accounts.",
    primaryCta: "Open Ads by Yodev",
    secondaryCta: "Discuss the product",
    featuresTitle: "From signal to decision",
    features: [
      { title: "Autonomous monitoring", description: "Daily agents detect anomalies and prioritise operational work." },
      { title: "360° analysis", description: "Search terms, quality, ads, conversions and budgets in one view." },
      { title: "Secure approvals", description: "Every sensitive mutation is explained, validated and audited before execution." },
      { title: "Agency portfolio", description: "Clients, reports and guardrails are isolated by workspace." },
    ],
    trustTitle: "Designed for accountable operators",
    trustItems: ["Encrypted Google OAuth", "Google Ads validation before mutation", "Append-only operational history", "Revocable client reports"],
    closingTitle: "Fewer blind spots, more traceable decisions.",
    closingBody: "Connect your MCC, select your agents and start with a read-only analysis.",
  },
};

export const spendCopy: Record<ProductLocale, ProductLandingCopy> = {
  fr: {
    brand: "Spend",
    signature: "by Yodev",
    eyebrow: "FinOps par projet pour les équipes produit",
    title: "Comprenez précisément ce que coûte chaque produit.",
    subtitle:
      "Spend by Yodev réunit les dépenses de votre stack, rattache les coûts directs aux bons projets et répartit les abonnements mutualisés sans perdre un centime.",
    primaryCta: "Ouvrir Spend by Yodev",
    secondaryCta: "Parler du produit",
    featuresTitle: "De la facture au coût réel par projet",
    features: [
      { title: "Connecteurs provider", description: "Vercel, OpenAI, GitHub et AWS alimentent un ledger commun, avec période, devise, statut et fraîcheur visibles." },
      { title: "Attribution explicable", description: "Les ressources mappées sont affectées directement. Les coûts partagés suivent des règles égales ou manuelles, datées et auditables." },
      { title: "Zéro centime perdu", description: "Chaque total provider reste égal à la somme des projets et du reliquat non alloué, y compris lors des arrondis." },
      { title: "Une vue par produit", description: "Chaque projet expose ses providers, ses coûts directs et mutualisés, leur source et leur méthode d’allocation." },
    ],
    trustTitle: "Une vérité financière traçable",
    trustItems: ["Montants source conservés", "Credentials chiffrés", "Isolation stricte par workspace", "Synchronisations idempotentes"],
    closingTitle: "Passez d’une pile de factures à un coût produit défendable.",
    closingBody: "Connectez vos providers, mappez vos projets et identifiez immédiatement les dépenses directes, partagées ou encore non allouées.",
  },
  en: {
    brand: "Spend",
    signature: "by Yodev",
    eyebrow: "Project-level FinOps for product teams",
    title: "Understand exactly what every product costs.",
    subtitle:
      "Spend by Yodev brings your stack expenses together, maps direct costs to the right projects and allocates shared subscriptions without losing a cent.",
    primaryCta: "Open Spend by Yodev",
    secondaryCta: "Discuss the product",
    featuresTitle: "From provider bill to real project cost",
    features: [
      { title: "Provider connectors", description: "Vercel, OpenAI, GitHub and AWS feed one ledger with visible periods, currencies, statuses and freshness." },
      { title: "Explainable allocation", description: "Mapped resources are assigned directly. Shared costs use dated, auditable equal or manual rules." },
      { title: "No lost cents", description: "Every provider total stays equal to projects plus the unallocated remainder, including rounding cases." },
      { title: "One view per product", description: "Each project shows its providers, direct and shared costs, source and allocation method." },
    ],
    trustTitle: "Traceable financial truth",
    trustItems: ["Original amounts preserved", "Encrypted credentials", "Strict workspace isolation", "Idempotent synchronisation"],
    closingTitle: "Turn a pile of bills into a defensible product cost.",
    closingBody: "Connect providers, map projects and immediately identify direct, shared and still-unallocated expenses.",
  },
};

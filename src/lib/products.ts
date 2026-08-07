export const productUrls = {
  mail: "https://mail.yodev.fr",
  ads: "https://ads.yodev.fr",
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
  closingTitle: string;
  closingBody: string;
};

export const mailCopy: Record<ProductLocale, ProductLandingCopy> = {
  fr: {
    brand: "Mail",
    signature: "by Yodev",
    eyebrow: "Email transactionnel & marketing",
    title: "Envoyez des emails fiables, sans perdre le contrôle de vos données.",
    subtitle:
      "Mail by Yodev réunit délivrabilité, campagnes, API et conformité dans un espace multi-tenant conçu pour les équipes françaises.",
    primaryCta: "Ouvrir Mail by Yodev",
    secondaryCta: "Parler du produit",
    featuresTitle: "Une chaîne d’envoi complète et observable",
    features: [
      { title: "API transactionnelle", description: "Une API documentée, idempotente et pensée pour les intégrations produit." },
      { title: "Campagnes conformes", description: "Consentement explicite, désinscription visible et en-têtes RFC 8058." },
      { title: "Délivrabilité", description: "Domaines, événements SES, suppressions et santé d’envoi au même endroit." },
      { title: "Isolation par espace", description: "Données, clés et permissions sont systématiquement limitées au workspace." },
    ],
    trustTitle: "Conçu pour rester maîtrisable",
    trustItems: ["Infrastructure Amazon SES", "Données hébergées dans l’Union européenne", "Clés et webhooks signés", "Aucune donnée personnelle dans les files opérationnelles"],
    closingTitle: "Un socle email que l’on peut expliquer et auditer.",
    closingBody: "Commencez par connecter un domaine, puis testez l’API ou préparez votre première campagne.",
  },
  en: {
    brand: "Mail",
    signature: "by Yodev",
    eyebrow: "Transactional & marketing email",
    title: "Send reliable email without losing control of your data.",
    subtitle:
      "Mail by Yodev brings deliverability, campaigns, API and compliance into a multi-tenant workspace built for European teams.",
    primaryCta: "Open Mail by Yodev",
    secondaryCta: "Discuss the product",
    featuresTitle: "A complete, observable delivery chain",
    features: [
      { title: "Transactional API", description: "A documented, idempotent API designed for product integrations." },
      { title: "Compliant campaigns", description: "Explicit consent, visible unsubscribe and RFC 8058 headers." },
      { title: "Deliverability", description: "Domains, SES events, suppressions and sending health in one place." },
      { title: "Workspace isolation", description: "Data, keys and permissions are always scoped to the active workspace." },
    ],
    trustTitle: "Built to remain understandable",
    trustItems: ["Amazon SES infrastructure", "Data hosted in the European Union", "Signed keys and webhooks", "No personal data in operational queues"],
    closingTitle: "An email foundation you can explain and audit.",
    closingBody: "Connect a domain, then test the API or prepare your first campaign.",
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

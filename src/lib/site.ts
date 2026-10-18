import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.yodev.fr").replace(/\/$/, "");
export const publicRoutes = [
  { key: "home", fr: "", en: "" },
  { key: "services", fr: "/services", en: "/services" },
  { key: "work", fr: "/realisations", en: "/work" },
  { key: "about", fr: "/a-propos", en: "/about" },
  { key: "contact", fr: "/contact", en: "/contact" },
  { key: "mail", fr: "/mail", en: "/mail" },
  { key: "ads", fr: "/ads", en: "/ads" },
  { key: "spend", fr: "/spend", en: "/spend" },
  { key: "legal", fr: "/mentions-legales", en: "/legal" },
  { key: "privacy", fr: "/mentions-legales/confidentialite", en: "/legal/privacy" },
] as const;
const metadataCopy = {
  home: {
    fr: ["Yodev — Développeur indépendant web & mobile", "Conception et développement d’applications web et mobiles pour les PME et les fondateurs. Un interlocuteur, du cadrage à la mise en ligne."],
    en: ["Yodev — Independent web & mobile developer", "Web and mobile applications for small businesses and founders. One person, from scoping and design through to launch."],
  },
  services: {
    fr: ["Applications, refonte et automatisation — Services Yodev", "Développement web et mobile, audit UX et technique, refonte et intégrations. Un périmètre clair et un devis adapté à votre projet."],
    en: ["Applications, redesign & automation — Yodev services", "Web and mobile development, UX and technical audits, redesign and integrations. A clear scope and a quote tailored to your project."],
  },
  work: {
    fr: ["Réalisations web et produits — Yodev", "Découvrez Parigo Music et Pressay : le besoin, la contribution et le résultat de missions clients et de produits personnels."],
    en: ["Selected work & products — Yodev", "Explore Parigo Music and Pressay: the problem, contribution and outcome of client engagements and independent products."],
  },
  about: {
    fr: ["À propos — Un développeur indépendant, de bout en bout", "Découvrez l’approche de Yodev : concevoir les parcours, dessiner les interfaces et développer des logiciels utiles avec leurs fondateurs."],
    en: ["About Yodev — Independent, from design to delivery", "Yodev combines user journeys, interface design and software development, working directly with the people behind each project."],
  },
  contact: {
    fr: ["Parlons de votre projet — Contact Yodev", "Décrivez votre projet ou votre intérêt pour un produit Yodev. Recevez une prochaine étape claire avant de vous engager."],
    en: ["Let’s discuss your project — Contact Yodev", "Describe your project or your interest in a Yodev product. Get a clear next step before making a commitment."],
  },
  legal: {
    fr: ["Mentions légales — Yodev", "Informations sur l’éditeur, l’hébergement et les conditions d’utilisation du site Yodev."],
    en: ["Legal notice — Yodev", "Information about the publisher, hosting and use of the Yodev website."],
  },
  privacy: {
    fr: ["Confidentialité et données personnelles — Yodev", "Finalités, base légale, conservation et droits concernant les données transmises sur le site Yodev."],
    en: ["Privacy & personal data — Yodev", "Purposes, legal basis, retention and your rights regarding information submitted on the Yodev website."],
  },
} as const;
export function pageMetadata(key: keyof typeof metadataCopy, locale: "fr" | "en"): Metadata {
  const route = publicRoutes.find(route => route.key === key)!;
  const [title, description] = metadataCopy[key][locale];
  const canonical = `/${locale}${route[locale]}`;
  return {
    title, description,
    alternates: { canonical, languages: { fr: `/fr${route.fr}`, en: `/en${route.en}` } },
    openGraph: { title, description, url: canonical, type: "website", locale: locale === "fr" ? "fr_FR" : "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

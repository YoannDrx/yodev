import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/services": {
      fr: "/services",
      en: "/services",
    },
    "/services/ai": {
      fr: "/services/ia",
      en: "/services/ai",
    },
    "/services/web": {
      fr: "/services/web",
      en: "/services/web",
    },
    "/services/custom-software": {
      fr: "/services/logiciel-metier",
      en: "/services/custom-software",
    },
    "/services/mobile": {
      fr: "/services/mobile",
      en: "/services/mobile",
    },
    "/services/ecommerce": {
      fr: "/services/ecommerce",
      en: "/services/ecommerce",
    },
    "/services/ux-design": {
      fr: "/services/ux-design",
      en: "/services/ux-design",
    },
    "/services/cybersecurity": {
      fr: "/services/cybersecurite",
      en: "/services/cybersecurity",
    },
    "/ai": {
      fr: "/ia",
      en: "/ai",
    },
    "/expertise": {
      fr: "/expertises",
      en: "/expertise",
    },
    "/work": {
      fr: "/realisations",
      en: "/work",
    },
    "/work/[slug]": {
      fr: "/realisations/[slug]",
      en: "/work/[slug]",
    },
    "/offers": {
      fr: "/offres",
      en: "/offers",
    },
    "/method": {
      fr: "/methode",
      en: "/method",
    },
    "/about": {
      fr: "/a-propos",
      en: "/about",
    },
    "/team": {
      fr: "/notre-equipe",
      en: "/team",
    },
    "/contact": {
      fr: "/contact",
      en: "/contact",
    },
    "/blog": {
      fr: "/blog",
      en: "/blog",
    },
    "/blog/[slug]": {
      fr: "/blog/[slug]",
      en: "/blog/[slug]",
    },
    "/careers": {
      fr: "/carrieres",
      en: "/careers",
    },
    "/careers/[slug]": {
      fr: "/carrieres/[slug]",
      en: "/careers/[slug]",
    },
    "/legal": {
      fr: "/mentions-legales",
      en: "/legal",
    },
    "/legal/privacy": {
      fr: "/mentions-legales/confidentialite",
      en: "/legal/privacy",
    },
  },
});

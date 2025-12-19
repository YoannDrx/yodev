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
    "/work": {
      fr: "/realisations",
      en: "/work",
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
    "/contact": {
      fr: "/contact",
      en: "/contact",
    },
  },
});

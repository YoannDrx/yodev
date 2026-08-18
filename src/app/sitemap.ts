import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yodev.fr";

const publicRoutes = [
  { fr: "", en: "" },
  { fr: "/services", en: "/services" },
  { fr: "/realisations", en: "/work" },
  { fr: "/methode", en: "/method" },
  { fr: "/offres", en: "/offers" },
  { fr: "/a-propos", en: "/about" },
  { fr: "/contact", en: "/contact" },
  { fr: "/mail", en: "/mail" },
  { fr: "/ads", en: "/ads" },
  { fr: "/spend", en: "/spend" },
  { fr: "/mentions-legales", en: "/legal" },
  {
    fr: "/mentions-legales/confidentialite",
    en: "/legal/privacy",
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.flatMap((route) => {
    const frenchUrl = `${baseUrl}/fr${route.fr}`;
    const englishUrl = `${baseUrl}/en${route.en}`;
    const languages = { fr: frenchUrl, en: englishUrl };

    return [
      {
        url: frenchUrl,
        alternates: { languages },
      },
      {
        url: englishUrl,
        alternates: { languages },
      },
    ];
  });
}

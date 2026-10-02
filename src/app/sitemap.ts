import type { MetadataRoute } from "next";

import { publicRoutes, siteUrl as baseUrl } from "@/lib/site";

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

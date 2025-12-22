import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // Rewrites pour les URLs françaises localisées
      { source: "/fr/ia", destination: "/fr/ai" },
      { source: "/fr/expertises", destination: "/fr/expertise" },
      { source: "/fr/methode", destination: "/fr/method" },
      { source: "/fr/offres", destination: "/fr/offers" },
      { source: "/fr/realisations", destination: "/fr/work" },
      { source: "/fr/realisations/:slug", destination: "/fr/work/:slug" },
      { source: "/fr/notre-equipe", destination: "/fr/team" },
      { source: "/fr/a-propos", destination: "/fr/about" },
      { source: "/fr/carrieres", destination: "/fr/careers" },
      { source: "/fr/carrieres/:slug", destination: "/fr/careers/:slug" },
      { source: "/fr/mentions-legales", destination: "/fr/legal" },
      { source: "/fr/mentions-legales/confidentialite", destination: "/fr/legal/privacy" },
      { source: "/fr/services/conseil", destination: "/fr/services/consulting" },
      { source: "/fr/services/maintenance", destination: "/fr/services/support" },
    ];
  },
};

export default withNextIntl(nextConfig);

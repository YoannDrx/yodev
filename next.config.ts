import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    const development = process.env.NODE_ENV === "development";
    // Static rendering needs Next's inline bootstrap scripts. No unsafe-eval in production.
    const csp = [
      "default-src 'self'", "base-uri 'self'", "object-src 'none'", "frame-ancestors 'none'", "form-action 'self'",
      `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob:", "font-src 'self'",
      `connect-src 'self'${development ? " ws: wss:" : ""}`, "frame-src 'none'",
    ].join("; ");
    return [{ source: "/:path*", headers: [
      { key: "Content-Security-Policy", value: csp },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
    ] }];
  },
  async redirects() {
    return [
      { source: "/fr/methode", destination: "/fr/services#methode", permanent: true },
      { source: "/en/method", destination: "/en/services#methode", permanent: true },
      { source: "/fr/offres", destination: "/fr/services#formats", permanent: true },
      { source: "/en/offers", destination: "/en/services#formats", permanent: true },
      { source: "/fr/ia/:path*", destination: "/fr/services", permanent: false },
      { source: "/en/ai/:path*", destination: "/en/services", permanent: false },
      { source: "/fr/expertises/:path*", destination: "/fr/services", permanent: false },
      { source: "/en/expertise/:path*", destination: "/en/services", permanent: false },
      { source: "/fr/solutions/:path*", destination: "/fr/services", permanent: false },
      { source: "/en/solutions/:path*", destination: "/en/services", permanent: false },
      { source: "/fr/notre-equipe/:path*", destination: "/fr/a-propos", permanent: false },
      { source: "/en/team/:path*", destination: "/en/about", permanent: false },
      { source: "/fr/carrieres/:path*", destination: "/fr/a-propos", permanent: false },
      { source: "/en/careers/:path*", destination: "/en/about", permanent: false },
      { source: "/fr/blog/:path*", destination: "/fr/methode", permanent: false },
      { source: "/en/blog/:path*", destination: "/en/method", permanent: false },
      { source: "/fr/rdv/:path*", destination: "/fr/contact", permanent: false },
      { source: "/en/bookings/:path*", destination: "/en/contact", permanent: false },
      { source: "/fr/services/:path+", destination: "/fr/services", permanent: false },
      { source: "/en/services/:path+", destination: "/en/services", permanent: false },
      { source: "/fr/realisations/:path+", destination: "/fr/realisations", permanent: false },
      { source: "/en/work/:path+", destination: "/en/work", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      // Rewrites pour les URLs françaises localisées
      { source: "/fr/methode", destination: "/fr/method" },
      { source: "/fr/offres", destination: "/fr/offers" },
      { source: "/fr/realisations", destination: "/fr/work" },
      { source: "/fr/a-propos", destination: "/fr/about" },
      { source: "/fr/mentions-legales", destination: "/fr/legal" },
      { source: "/fr/mentions-legales/confidentialite", destination: "/fr/legal/privacy" },
    ];
  },
};

export default withNextIntl(nextConfig);

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion";
import {
  Linkedin,
  Twitter,
  Github,
  Mail,
  MapPin,
  ArrowRight,
  Send
} from "lucide-react";

const serviceLinks = [
  { href: "/services/web", key: "web" },
  { href: "/services/mobile", key: "mobile" },
  { href: "/services/saas", key: "saas" },
  { href: "/services/ecommerce", key: "ecommerce" },
  { href: "/services/ux-design", key: "uxDesign" },
  { href: "/services/consulting", key: "consulting" },
] as const;

const companyLinks = [
  { href: "/team", key: "team" },
  { href: "/method", key: "method" },
  { href: "/work", key: "work" },
  { href: "/blog", key: "blog" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" },
] as const;

const resourceLinks = [
  { href: "/offers", key: "offers" },
  { href: "/legal", key: "legal" },
  { href: "/legal/privacy", key: "privacy" },
] as const;

const socialLinks = [
  { href: "https://linkedin.com/company/yodev", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/yodev_agency", icon: Twitter, label: "Twitter" },
  { href: "https://github.com/yodev-agency", icon: Github, label: "GitHub" },
];

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const offices = t.raw("offices") as Array<{
    city: string;
    address: string;
    zip: string;
    country: string;
  }>;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative border-t border-border/40 bg-surface/50">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-bg-2/30" />

      {/* Main footer content */}
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Company info & Newsletter */}
          <FadeIn direction="up" delay={0}>
            <div className="space-y-6">
              <div>
                <Link href="/" className="inline-block">
                  <span className="text-2xl font-bold text-text">
                    Yo<span className="text-primary">dev</span>
                  </span>
                </Link>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                  {t("subtitle")}
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <a
                  href={`mailto:${t("email")}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  {t("email")}
                </a>
                {offices.map((office) => (
                  <div key={office.city} className="flex items-start gap-3 text-sm text-muted">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-text">{office.city}</p>
                      <p>{office.address}</p>
                      <p>
                        {office.zip}, {office.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-text">{t("newsletter.title")}</p>
                {isSubscribed ? (
                  <p className="text-sm text-green-500">{t("newsletter.success")}</p>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder={t("newsletter.placeholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button
                      type="submit"
                      size="icon"
                      isLoading={isSubmitting}
                      aria-label={t("newsletter.submit")}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Services column */}
          <FadeIn direction="up" delay={0.1}>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
                {nav("services")}
              </h3>
              <ul className="mt-4 space-y-3">
                {serviceLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1 text-sm text-muted transition-colors hover:text-primary"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      <span>{t(`services.${item.key}`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Company column */}
          <FadeIn direction="up" delay={0.2}>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
                {t("company")}
              </h3>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1 text-sm text-muted transition-colors hover:text-primary"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      <span>{nav(item.key)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Resources column */}
          <FadeIn direction="up" delay={0.3}>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
                {t("resourcesTitle")}
              </h3>
              <ul className="mt-4 space-y-3">
                {resourceLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1 text-sm text-muted transition-colors hover:text-primary"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      <span>{t(`resources.${item.key}`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social links */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
                  {t("socials")}
                </h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:border-primary/50 hover:bg-primary hover:text-white hover:shadow-glow"
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <Container className="py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted">
              {t("rights")}
            </p>
            <div className="flex items-center gap-6 text-xs text-muted">
              <Link href="/legal" className="transition-colors hover:text-primary">
                {t("resources.legal")}
              </Link>
              <Link href="/legal/privacy" className="transition-colors hover:text-primary">
                {t("resources.privacy")}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

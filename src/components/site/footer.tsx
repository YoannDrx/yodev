"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Linkedin, Twitter, Send, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const serviceLinks = [
  { href: "/services/ai", key: "ai" },
  { href: "/services/cybersecurity", key: "cybersecurity" },
  { href: "/services/web", key: "web" },
  { href: "/expertise", key: "expertise" },
] as const;

const companyLinks = [
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

const socialLinks = [
  {
    href: "https://linkedin.com/company/yodev",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://twitter.com/yodev_agency",
    icon: Twitter,
    label: "Twitter",
  },
];

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-bg border-t border-white/5 pt-20 pb-10">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary rotate-3 transition-transform duration-300 group-hover:rotate-12">
                <span className="text-dark font-black text-lg">Y</span>
              </div>
              <span className="text-xl font-display font-bold tracking-tight">
                yodev
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              {t("subtitle")}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg glass-panel hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6">{nav("services")}</h4>
            <ul className="space-y-4 text-sm text-muted">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {t(`services.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-6">{t("company")}</h4>
            <ul className="space-y-4 text-sm text-muted">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-6">{t("newsletter.title")}</h4>
            <p className="text-sm text-muted mb-4">
              {t("newsletter.description")}
            </p>
            {isSubscribed ? (
              <GlassPanel className="p-4 rounded-xl">
                <p className="text-sm text-primary font-medium">
                  {t("newsletter.success")}
                </p>
              </GlassPanel>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 rounded-xl"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  className="w-full rounded-xl"
                >
                  {t("newsletter.submit")}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted">
          <p>{t("rights")}</p>
          <div className="flex gap-6">
            <Link
              href="/legal"
              className="hover:text-text transition-colors"
            >
              {t("resources.legal")}
            </Link>
            <Link
              href="/legal/privacy"
              className="hover:text-text transition-colors"
            >
              {t("resources.privacy")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

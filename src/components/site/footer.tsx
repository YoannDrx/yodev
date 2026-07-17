"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { ArrowRight, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { buttonClassName } from "@/components/ui/button-styles";

const primaryLinks = [
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/method", key: "method" },
  { href: "/offers", key: "offers" },
] as const;

const companyLinks = [
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="relative bg-bg border-t border-white/5 pt-20 pb-10">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link href="/" className="group">
              <Logo size="sm" />
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Main navigation */}
          <div>
            <h4 className="font-bold mb-6">{t("navigation")}</h4>
            <ul className="space-y-4 text-sm text-muted">
              {primaryLinks.map((item) => (
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

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6">{t("contact.title")}</h4>
            <p className="text-sm text-muted mb-4">
              {t("contact.description")}
            </p>
            <a
              href={`mailto:${t("email")}`}
              className="mb-4 flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Mail className="size-4" aria-hidden="true" />
              {t("email")}
            </a>
            <Link
              href="/contact"
              className={buttonClassName({
                variant: "outline",
                size: "md",
                className: "w-full justify-center rounded-xl",
              })}
            >
              {t("contact.cta")}
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Link>
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

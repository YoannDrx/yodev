"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";

const navItems = [
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/offers", key: "offers" },
  { href: "/method", key: "method" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="border-t border-border/60 bg-bg">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold text-text">Yodev</p>
            <p className="mt-3 text-sm text-muted">{t("subtitle")}</p>
            <p className="mt-4 text-sm text-muted">{t("contact")}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">{t("links")}</p>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {nav(item.key)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">{t("socials")}</p>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://www.behance.net" target="_blank" rel="noreferrer">
                Behance
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noreferrer">
                Dribbble
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>{t("rights")}</p>
          <p>{t("legal")}</p>
        </div>
      </Container>
    </footer>
  );
}

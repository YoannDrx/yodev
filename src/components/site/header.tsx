"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button-styles";
import { LanguageSwitch } from "./language-switch";
import { StyleSwitcher } from "./style-switcher";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/offers", key: "offers" },
  { href: "/method", key: "method" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("Nav");
  const common = useTranslations("Common");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur">
      <Container>
        <div className="flex h-[var(--header-height)] items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface/80 text-sm font-semibold text-text transition group-hover:border-accent/40">
              Y
            </span>
            <div className="leading-tight">
              <p className="text-base font-semibold text-text">Yodev</p>
              <p className="text-xs text-muted">{common("tagline")}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition hover:text-text",
                    isActive && "text-text",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <StyleSwitcher />
            <ThemeToggle />
            <LanguageSwitch />
            <Link
              href="/contact"
              className={buttonClassName({ size: "sm" })}
            >
              {common("cta")}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <LanguageSwitch />
            <details className="group relative">
              <summary className="flex h-9 items-center justify-center rounded-full border border-border bg-surface/80 px-3 text-xs font-medium text-text transition hover:border-accent/40">
                {common("menu")}
              </summary>
              <div className="absolute right-0 mt-3 w-[220px] rounded-[var(--radius-md)] border border-border bg-surface p-4 shadow-soft">
                <div className="flex flex-col gap-3 text-sm">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <StyleSwitcher />
                </div>
                <Link
                  href="/contact"
                  className={buttonClassName({ size: "sm", className: "mt-4 w-full" })}
                >
                  {common("cta")}
                </Link>
              </div>
            </details>
          </div>
        </div>
      </Container>
    </header>
  );
}

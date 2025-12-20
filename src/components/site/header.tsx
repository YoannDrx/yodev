"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button-styles";
import { LanguageSwitch } from "./language-switch";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "border-b border-border bg-surface/80 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <Container>
          <div className="flex h-[var(--header-height)] items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface text-sm font-bold text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-glow">
                Y
              </span>
              <div className="leading-tight">
                <p className="text-base font-semibold text-text">Yodev</p>
                <p className="text-xs text-muted">{common("tagline")}</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-primary"
                        : "text-muted hover:text-text"
                    )}
                  >
                    {t(item.key)}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <LanguageSwitch />
              <Link
                href="/contact"
                className={buttonClassName({ size: "sm" })}
              >
                {common("cta")}
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <LanguageSwitch />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface text-text transition-colors hover:border-primary/40"
                aria-label={isMobileMenuOpen ? common("menuClose") : common("menuOpen")}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isMobileMenuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-[280px] border-l border-border bg-surface shadow-xl transition-transform duration-300 ease-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-[var(--header-height)] items-center justify-between border-b border-border px-6">
          <span className="text-sm font-semibold text-text">{common("menu")}</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-muted transition-colors hover:bg-bg-2 hover:text-text"
            aria-label={common("menuClose")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col p-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b border-border py-4 text-base font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-text hover:text-primary"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-6">
          <Link
            href="/contact"
            className={buttonClassName({ size: "md", className: "w-full justify-center" })}
          >
            {common("cta")}
          </Link>
        </div>
      </div>
    </>
  );
}

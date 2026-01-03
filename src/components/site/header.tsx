"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, ChevronDown, Cpu, Shield, Zap, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button-styles";
import { LanguageSwitch } from "./language-switch";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Services submenu items
const servicesItems = [
  {
    href: "/services/web",
    key: "webMobile",
    icon: Zap,
    color: "text-primary",
  },
  {
    href: "/services/ai",
    key: "iaLegacy",
    icon: Cpu,
    color: "text-primary",
  },
  {
    href: "/services/cybersecurity",
    key: "cybersecurity",
    icon: Shield,
    color: "text-secondary",
  },
] as const;

const navItems = [
  { href: "/expertise", key: "expertise" },
  { href: "/work", key: "work" },
  { href: "/blog", key: "blog" },
] as const;

export function SiteHeader() {
  const t = useTranslations("Nav");
  const common = useTranslations("Common");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass-panel py-3" : "bg-transparent py-6"
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary rotate-3 transition-transform duration-300 group-hover:rotate-12">
                <span className="text-dark font-black text-xl">Y</span>
              </div>
              <span className="text-2xl font-display font-bold tracking-tight">
                yodev
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 py-2 text-sm font-semibold transition-colors",
                    pathname.startsWith("/services")
                      ? "text-primary"
                      : "text-text hover:text-primary"
                  )}
                >
                  <span>{t("services")}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isServicesOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Services Mega Menu */}
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-72 glass-panel rounded-2xl p-4 space-y-2"
                    >
                      {servicesItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-white/5 group"
                          >
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-lg bg-white/5",
                                item.color
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                                {t(item.key)}
                              </p>
                              <p className="text-xs text-muted mt-0.5">
                                {t(`${item.key}Desc`)}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                      <div className="border-t border-white/10 pt-3 mt-3">
                        <Link
                          href="/services"
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-all"
                        >
                          <span className="text-sm font-semibold text-muted group-hover:text-primary">
                            {t("allServices")}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Nav Items */}
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      isActive ? "text-primary" : "text-text hover:text-primary"
                    )}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-4 md:flex">
              <ThemeToggle />
              <LanguageSwitch />
              <Link
                href="/contact"
                className={buttonClassName({
                  variant: "primary",
                  size: "md",
                  className: "rounded-full shadow-[0_0_20px_rgba(27,168,150,0.3)]",
                })}
              >
                {common("cta")}
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center text-text md:hidden"
              aria-label={
                isMobileMenuOpen ? common("menuClose") : common("menuOpen")
              }
            >
              {isMobileMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-dark/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 top-20 z-50 glass-panel mx-6 rounded-3xl p-6 md:hidden"
            >
              <nav className="flex flex-col gap-4">
                {/* Services with sub-items */}
                <div className="border-b border-white/10 pb-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">
                    {t("services")}
                  </p>
                  <div className="grid gap-2">
                    {servicesItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all"
                        >
                          <div
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-lg bg-white/5",
                              item.color
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-semibold">{t(item.key)}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Other nav items */}
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-2xl font-bold py-2 hover:text-primary transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                ))}

                {/* Mobile Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <ThemeToggle />
                  <LanguageSwitch />
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={buttonClassName({
                    variant: "primary",
                    size: "lg",
                    className: "w-full justify-center rounded-xl mt-2",
                  })}
                >
                  {common("cta")}
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import { useState, useRef } from "react";
import { useLocale } from "next-intl";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { YodevBrand } from "@/brand/brand";
import { commercial } from "@/lib/commercial";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitch } from "./language-switch";
export function SiteHeader() {
  const locale = useLocale() === "en" ? "en" : "fr";
  const c = commercial[locale];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const links = <><Link href="/services" aria-current={pathname === "/services" ? "page" : undefined}>{c.expertise}</Link><Link href={{ pathname: "/", hash: "produits" }}>{locale === "fr" ? "Produits" : "Products"}</Link><Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>{c.about}</Link></>;
  return <header className="yd-header"><a className="yd-skip" href="#main-content">{locale === "fr" ? "Aller au contenu" : "Skip to content"}</a><div className="yd-wrap"><div className="yd-masthead yd-meta"><span>YODEV — {locale === "fr" ? "CONCEPTION & DÉVELOPPEMENT" : "DESIGN & DEVELOPMENT"}</span><span>{locale === "fr" ? "INDÉPENDANT, DE BOUT EN BOUT" : "INDEPENDENT, END TO END"}</span></div><div className="yd-nav"><Link href="/" aria-label="Yodev"><YodevBrand /></Link><nav className="yd-nav-links" aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}>{links}</nav><div className="yd-nav-actions"><ThemeToggle /><LanguageSwitch /><Link href="/contact" className="yd-button yd-button-secondary">{c.cta}<ArrowUpRight size={15} /></Link><button ref={toggle} type="button" className="y-theme-toggle yd-mobile-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={locale === "fr" ? "Menu" : "Menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div>{open && <nav id="mobile-navigation" className="yd-mobile-nav" aria-label={locale === "fr" ? "Navigation mobile" : "Mobile navigation"} onClick={() => setOpen(false)} onKeyDown={event => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } }}>{links}<Link href="/contact">{c.cta}</Link></nav>}</div></header>;
}

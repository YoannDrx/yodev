"use client";
import { useLocale } from "next-intl";
import { usePathname, getPathname } from "@/i18n/navigation";

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "fr" ? "en" : "fr";
  function switchLanguage() {
    if (document.querySelector('form[data-contact-dirty="true"]') && !window.confirm(locale === "fr"
      ? "Changer de langue effacera la demande non envoyée. Continuer ?"
      : "Changing language will discard your unsent request. Continue?")) return;
    window.dispatchEvent(new Event("yodev:discard-contact"));
    const destination = getPathname({ locale: nextLocale, href: pathname as Parameters<typeof getPathname>[0]["href"] });
    window.location.assign(destination + window.location.search + window.location.hash);
  }
  return <button type="button" className={`y-theme-toggle text-xs ${className}`} aria-label={nextLocale === "en" ? "Switch to English" : "Passer en français"} onClick={switchLanguage}>{nextLocale.toUpperCase()}</button>;
}

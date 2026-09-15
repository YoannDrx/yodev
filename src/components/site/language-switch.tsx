"use client";
import { useLocale } from "next-intl";
import { usePathname, getPathname } from "@/i18n/navigation";
export function LanguageSwitch({ className = "" }: { className?: string }) {
 const locale = useLocale(); const pathname = usePathname(); const nextLocale = locale === "fr" ? "en" : "fr";
 return <button type="button" className={`y-theme-toggle text-xs ${className}`} aria-label={nextLocale === "en" ? "Switch to English" : "Passer en français"} onClick={() => { const destination = getPathname({ locale: nextLocale, href: pathname as Parameters<typeof getPathname>[0]["href"] }); window.location.assign(destination + window.location.search + window.location.hash); }}>{nextLocale.toUpperCase()}</button>;
}

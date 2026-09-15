"use client";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { setTheme } = useTheme(); const locale = useLocale();
  return <button type="button" aria-label={locale === "fr" ? "Changer le thème" : "Change theme"} onClick={() => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark")} className={`y-theme-toggle ${className}`}><Sun className="y-dark-icon" aria-hidden="true" /><Moon className="y-light-icon" aria-hidden="true" /></button>;
}

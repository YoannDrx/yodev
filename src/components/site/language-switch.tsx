"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale() as (typeof routing.locales)[number];
  const pathname = usePathname();

  const nextLocale = locale === "fr" ? "en" : "fr";

  // Construire l'URL avec la nouvelle locale
  // On utilise le pathname interne (sans locale) et on ajoute la nouvelle locale
  const handleClick = () => {
    // Hard navigation pour forcer le rechargement des messages
    window.location.href = `/${nextLocale}${pathname === "/" ? "" : pathname}`;
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-full border border-border bg-surface/80 px-3 text-xs font-medium text-text transition hover:border-accent/40",
        className,
      )}
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}

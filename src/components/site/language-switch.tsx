"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale() as (typeof routing.locales)[number];
  const pathname = usePathname();
  const params = useParams();

  const nextLocale = locale === "fr" ? "en" : "fr";

  // Exclure locale des params pour éviter duplication
  const { locale: _, ...otherParams } = params;

  return (
    <Link
      // @ts-expect-error -- pathname dynamique avec params
      href={{ pathname, params: otherParams }}
      locale={nextLocale}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-full border border-border bg-surface/80 px-3 text-xs font-medium text-text transition hover:border-accent/40",
        className,
      )}
    >
      {nextLocale.toUpperCase()}
    </Link>
  );
}

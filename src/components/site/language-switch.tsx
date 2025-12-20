"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "fr" ? "en" : "fr";

  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      href={pathname as any}
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

"use client";

import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const locale = useLocale();
  const isDark = resolvedTheme === "dark";
  const label = locale === "fr"
    ? `Activer le thème ${isDark ? "clair" : "sombre"}`
    : `Switch to ${isDark ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface/80 text-text transition hover:border-accent/40",
        className,
      )}
    >
      {isDark ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}

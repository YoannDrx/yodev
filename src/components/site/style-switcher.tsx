"use client";

import { useTranslations } from "next-intl";
import { useStyle } from "@/components/providers/style-provider";
import { cn } from "@/lib/utils";

const styleOptions = [
  { id: "pulse", key: "pulse" },
  { id: "atelier", key: "atelier" },
  { id: "forge", key: "forge" },
] as const;

export function StyleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Styles");
  const { style, setStyle } = useStyle();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-border bg-surface/80 p-1 text-xs",
        className,
      )}
    >
      {styleOptions.map((option) => {
        const isActive = option.id === style;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setStyle(option.id)}
            className={cn(
              "rounded-full px-3 py-1 transition",
              isActive
                ? "bg-accent text-black shadow-glow"
                : "text-muted hover:text-text",
            )}
          >
            {t(option.key)}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STYLE_KEY = "yodev-style";
const styles = ["pulse", "atelier", "forge"] as const;

export type StyleId = (typeof styles)[number];

type StyleContextValue = {
  style: StyleId;
  setStyle: (style: StyleId) => void;
  styles: StyleId[];
};

const StyleContext = createContext<StyleContextValue | undefined>(undefined);

type StyleProviderProps = {
  children: React.ReactNode;
};

export function StyleProvider({ children }: StyleProviderProps) {
  const [style, setStyle] = useState<StyleId>(() => {
    if (typeof window === "undefined") {
      return "pulse";
    }
    const stored = window.localStorage.getItem(STYLE_KEY) as StyleId | null;
    return stored && styles.includes(stored) ? stored : "pulse";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-style", style);
    window.localStorage.setItem(STYLE_KEY, style);
  }, [style]);

  const value = useMemo(
    () => ({
      style,
      setStyle,
      styles: [...styles],
    }),
    [style],
  );

  return <StyleContext.Provider value={value}>{children}</StyleContext.Provider>;
}

export function useStyle() {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error("useStyle must be used within StyleProvider");
  }
  return context;
}

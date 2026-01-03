import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, Fira_Code } from "next/font/google";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

// Body font - Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Display font - DM Sans
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

// Mono font - Fira Code
const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yodev — Agence IA & Transformation Digitale",
  description:
    "Yodev accélère votre transformation digitale avec l'IA, la modernisation legacy et le développement web/mobile haute performance. Expert Next.js, React, LLM & Cloud.",
  keywords: [
    "agence IA",
    "transformation digitale",
    "développement web",
    "Next.js",
    "React",
    "LLM",
    "modernisation legacy",
    "cloud",
    "cybersécurité",
  ],
  authors: [{ name: "Yodev" }],
  openGraph: {
    title: "Yodev — Agence IA & Transformation Digitale",
    description:
      "Accélérez votre transformation digitale avec l'IA et le développement web haute performance.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning data-theme="dark">
      <body
        className={`${plusJakartaSans.variable} ${dmSans.variable} ${firaCode.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

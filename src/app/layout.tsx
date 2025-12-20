import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yodev — Agence Digitale 360°",
  description:
    "Yodev conçoit et déploie vos solutions digitales sur mesure. Du concept à la mise en production, nous transformons vos idées en applications performantes.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning data-theme="light">
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

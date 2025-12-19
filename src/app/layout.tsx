import type { Metadata } from "next";
import { Fraunces, Manrope, Space_Grotesk } from "next/font/google";
import { getLocale } from "next-intl/server";
import { StyleProvider } from "@/components/providers/style-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yodev — Studio digital 360",
  description:
    "Yodev conçoit des sites web, apps mobiles et identités digitales orientés conversion.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-theme="light"
      data-style="pulse"
    >
      <body
        className={`${spaceGrotesk.variable} ${fraunces.variable} ${manrope.variable} antialiased`}
      >
        <ThemeProvider>
          <StyleProvider>{children}</StyleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

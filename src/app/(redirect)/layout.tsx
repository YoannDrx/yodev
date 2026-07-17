import { ThemeProvider } from "@/components/providers/theme-provider";
import { fontVariables } from "@/app/_fonts";
import "@/app/globals.css";

export default function RedirectRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={fontVariables}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale: (typeof routing.locales)[number] =
    locale && routing.locales.includes(locale as "fr" | "en")
      ? (locale as "fr" | "en")
      : routing.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});

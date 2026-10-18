import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { YodevBrand } from "@/brand/brand";
import { commercial } from "@/lib/commercial";
export async function SiteFooter() {
  const locale = await getLocale() === "en" ? "en" : "fr"; const c = commercial[locale];
  return <footer className="yd-footer"><div className="yd-wrap"><div className="yd-footer-top"><Link href="/" aria-label="Yodev"><YodevBrand /></Link><p>{c.footer}</p><nav aria-label={locale === "fr" ? "Pied de page" : "Footer"}><Link href="/services">{c.expertise}</Link><Link href="/work">{c.work}</Link><Link href="/about">{c.about}</Link><Link href="/mail">Mail</Link><Link href="/ads">Ads</Link><Link href="/spend">Spend</Link><a href="mailto:hello@yodev.fr">hello@yodev.fr</a></nav></div><div className="yd-footer-bottom"><span>© {new Date().getFullYear()} Yodev · Yoann Andrieux</span><nav aria-label={locale === "fr" ? "Informations légales" : "Legal information"}><Link href="/legal">{c.legal}</Link><Link href="/legal/privacy">{c.privacy}</Link></nav></div></div></footer>;
}

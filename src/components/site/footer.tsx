import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { YodevBrand } from "@/brand/brand";
import { commercial } from "@/lib/commercial";
export async function SiteFooter() {
  const locale = await getLocale() === "en" ? "en" : "fr"; const c = commercial[locale];
  return <footer className="yd-footer yd-wrap"><div className="yd-footer-top"><Link href="/" aria-label="Yodev"><YodevBrand /></Link><p className="yd-meta">{c.footer}</p><nav><Link href="/services">{c.expertise}</Link><Link href="/work">{c.work}</Link><Link href="/about">{c.about}</Link><a href="mailto:hello@yodev.fr">hello@yodev.fr ↗</a></nav></div><div className="yd-footer-bottom yd-meta"><span>© {new Date().getFullYear()} Yodev · Yoann Andrieux</span><nav><Link href="/legal">{c.legal}</Link><Link href="/legal/privacy">{c.privacy}</Link></nav></div></footer>;
}

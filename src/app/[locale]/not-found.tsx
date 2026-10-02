import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
export default async function NotFound() {
  const fr = await getLocale() !== "en";
  return <section className="yd-wrap yd-intro"><p className="yd-meta">404</p><h1>{fr ? "Cette page n’existe pas." : "This page does not exist."}</h1><p className="yd-lead">{fr ? "Le lien a peut-être changé. Retrouvez les prestations ou décrivez votre projet." : "The link may have changed. Explore the services or tell me about your project."}</p><div className="yd-actions"><Link href="/" className="yd-button">{fr ? "Revenir à l’accueil" : "Back to home"}</Link><Link href="/contact" className="yd-button yd-button-secondary">{fr ? "Me contacter" : "Contact me"}</Link></div></section>;
}

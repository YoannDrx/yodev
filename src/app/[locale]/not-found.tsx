import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/site/page-hero";
export default async function NotFound() {
  const fr = await getLocale() !== "en";
  return <PageHero state="empty" kicker="404" title={fr ? "Cette page n’existe pas." : "This page does not exist."} lead={fr ? "Le lien a peut-être changé. Retrouvez les prestations ou décrivez votre projet." : "The link may have changed. Explore the services or tell me about your project."}><div className="yd-actions"><Link href="/" className="yd-button yd-button-lg">{fr ? "Revenir à l’accueil" : "Back to home"}</Link><Link href="/contact" className="yd-button yd-button-lg yd-button-secondary">{fr ? "Me contacter" : "Contact me"}</Link></div></PageHero>;
}

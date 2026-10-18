"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/site/page-hero";
export default function PageError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const fr = useLocale() !== "en";
  return <PageHero state="error" role="alert" title={fr ? "La page n’a pas pu être affichée." : "The page could not be displayed."} lead={fr ? "Vous pouvez réessayer ou me joindre par email." : "You can try again or contact me by email."}><div className="yd-actions"><button type="button" className="yd-button yd-button-lg" onClick={retry}>{fr ? "Réessayer" : "Try again"}</button><Link href="/" className="yd-button yd-button-lg yd-button-secondary">{fr ? "Accueil" : "Home"}</Link><a href="mailto:hello@yodev.fr" className="yd-text-link">hello@yodev.fr</a></div></PageHero>;
}

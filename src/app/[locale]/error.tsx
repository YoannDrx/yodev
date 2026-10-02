"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
export default function PageError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const fr = useLocale() !== "en";
  return <section className="yd-wrap yd-intro" role="alert"><h1>{fr ? "La page n’a pas pu être affichée." : "The page could not be displayed."}</h1><p className="yd-lead">{fr ? "Vous pouvez réessayer ou me joindre par email." : "You can try again or contact me by email."}</p><div className="yd-actions"><button className="yd-button" onClick={retry}>{fr ? "Réessayer" : "Try again"}</button><Link href="/" className="yd-button yd-button-secondary">{fr ? "Accueil" : "Home"}</Link><a href="mailto:hello@yodev.fr" className="yd-text-link">hello@yodev.fr</a></div></section>;
}

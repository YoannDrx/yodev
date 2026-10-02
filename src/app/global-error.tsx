"use client";
import Link from "next/link";
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "3rem", maxWidth: "45rem", margin: "auto", lineHeight: 1.6 }}>
        <h1>Le site est momentanément indisponible.</h1>
        <p lang="en">The website is temporarily unavailable.</p>
        <button onClick={retry}>Réessayer / Try again</button>
        <p><Link href="/fr">Accueil</Link> · <Link href="/en" lang="en">Home</Link> · <a href="mailto:hello@yodev.fr">hello@yodev.fr</a></p>
      </body>
    </html>
  );
}

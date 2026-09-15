# Yodev

Vitrine bilingue de Yoann Andrieux, développeur indépendant pour les PME et les fondateurs. Elle présente les prestations sur devis et la famille Yodev Mail, Yodev Ads et Yodev Spend.

## Développement

```bash
npm ci
npm run dev
```

Ouvrir http://localhost:3000/fr. Le thème initial est sombre ; un choix explicite est conservé dans le navigateur. Les pages existent en français et en anglais.

## Contact

Configurer `.env.local` pour un envoi réel :

```bash
NEXT_PUBLIC_SITE_URL=https://yodev.fr
CONTACT_EMAIL=hello@yodev.fr
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Yodev <hello@yodev.fr>
# Facultatif : calendrier de réservation
NEXT_PUBLIC_BOOKING_URL=https://...
```

Le formulaire affiche une erreur si le service est absent ou refuse le message. Les champs sont conservés pour réessayer. La suite navigateur neutralise les identifiants d’envoi ; son scénario de réussite simule uniquement la réponse HTTP.

## Identité commune

La référence versionnée est `brand/manifest.json`. Les sources CSS et React se trouvent dans `brand/`. Les règles d’usage figurent dans `docs/design-system.md`.

```bash
npm run brand:sync
npm run brand:check
```

Ces commandes distribuent et contrôlent les copies dans cette vitrine et les dépôts voisins `../yodev-mail`, `../yodev-ads/web` et `../yodev-spend`. Ajouter `-- --local` pour ne traiter que la vitrine. Ne pas éditer directement `src/brand` ou les SVG générés dans `public/brand`.

## Vérifications

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
npm run test:e2e
```

Les tests Playwright démarrent un serveur local au port 3920. Arrêter un éventuel `next dev` de ce dépôt avant de les lancer. Ils couvrent les anciennes URL, FR/EN, les pages produits, le formulaire, les thèmes, le clavier, les contrastes et les tailles 390/768/1440 px.

Les anciennes pages Méthode et Offres redirigent vers les sections `methode` et `formats` de Services, en conservant la langue. Les autres redirections historiques sont conservées dans `next.config.ts`.

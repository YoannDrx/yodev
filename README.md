# Yodev

Vitrine bilingue de Yoann Andrieux : prestations web/mobile et présentation de Yodev Mail, Ads et Spend. Cette vitrine n’implémente ni compte, ni connexion Google, ni paiement, ni base de données métier. Les applications produits sont des services séparés.

## Développement

Node **24**, pnpm **10.30.3** (`packageManager`), un seul lockfile : `pnpm-lock.yaml`.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Ouvrir `http://localhost:3000/fr`. Le thème initial est sombre ; le choix explicite est conservé. Les pages éditoriales FR/EN sont pré-rendues. Les métadonnées sont construites avec `NEXT_PUBLIC_SITE_URL` : reconstruire après modification de cette valeur.

## Contact et configuration

Copier `.env.example` vers `.env.local`, puis renseigner les secrets par un moyen sécurisé. Le formulaire fonctionne sans compte ; le destinataire et l’expéditeur sont fixés côté serveur. Les demandes Ads/Mail/Spend gardent leur contexte. Aucun email n’est envoyé par les tests automatisés.

L’envoi exige Resend **et** un Redis REST avec commandes Lua atomiques. Sans configuration, la route retourne 503 et le formulaire garde la saisie avec un email direct de secours. Sans Redis disponible, aucun envoi n’est tenté. Les limites sont de 5 tentatives/IP et 3/adresse sur 15 minutes, 100/heure et 500/jour au total ; elles incluent les nouvelles tentatives et les appels fournisseur échoués. Redis ne reçoit que des clés HMAC et des compteurs temporaires.

```bash
pnpm readiness
```

Ce contrôle valide la présence et la forme des variables sans afficher leurs valeurs ni appeler les prestataires. `vercel.json` l’impose avant le build Vercel pour empêcher un déploiement sans configuration du contact. Les environnements preview et production doivent chacun être configurés ; un build local de vérification n’a pas besoin de secrets. Voir le [guide d’exploitation](docs/operations.md) pour les variables, la recette réelle et les alertes.

## Vérifications

```bash
pnpm check                # types, lint, tests unitaires, marque locale, build
pnpm test:redis           # Redis jetable via socket Unix ; redis-server/redis-cli requis
pnpm audit:runtime
pnpm exec playwright install chromium
pnpm test:e2e            # build puis parcours sur next start, port 3920
```

Après un `pnpm check` réussi sans modification du code, `pnpm exec playwright test` réutilise le build. Ne pas démarrer un autre serveur sur 3920. Les tests neutralisent les identifiants email et Redis ; seules les réponses de succès fournisseur sont simulées. Le Redis d’intégration est isolé, sans port TCP et sans persistance ; aucune base existante n’est touchée.

La CI exécute ces contrôles sur les PR et les branches `main`/`codex/**`, avec traces navigateur en cas d’échec. Chromium couvre FR/EN, mobile 320/390, tablette 768, ordinateur 1440, thèmes, clavier, Axe, absence de JavaScript sur les pages légales, métadonnées, délais, erreurs, doublons et contexte produit. Un profil mobile à froid conserve les mesures et vérifie les budgets de JavaScript (700 ko décodés / 225 ko transférés). Safari/iOS réels restent une recette de préproduction.

```bash
pnpm smoke --url https://preview.example --canonical https://www.yodev.fr
pnpm contact:smoke --url https://preview.example --locale fr  # simulation sans réseau
```

Le smoke général effectue uniquement des GET. La recette email exige explicitement `--send` et une adresse de test autorisée ; le guide détaille les preuves à relever. Un HTTP 200 du contact prouve l’acceptation par l’API, pas la réception en boîte.

## Identité commune

La référence est `brand/manifest.json`, les sources CSS/React sont dans `brand/`. Voir [les règles d’usage](docs/design-system.md).

```bash
pnpm brand:sync --local
pnpm brand:check --local
```

Sans `--local`, ces commandes traitent aussi les dépôts voisins `../yodev-mail`, `../yodev-ads/web`, `../yodev-spend`. Ne pas éditer directement `src/brand` ni les SVG générés dans `public/brand`.

Les anciennes URL Méthode et Offres redirigent vers les sections de Services, dans la même langue. Les autres redirections historiques restent dans `next.config.ts`.

## Documentation de livraison

- [Audit initial du 2 octobre](docs/audits/production-readiness-2026-10-02.md)
- [Plan d’implémentation](docs/audits/implementation-plan-2026-10-02.md)
- [Exploitation, rétention, recette et reprise](docs/operations.md)
- [Résultats de l’implémentation](docs/audits/implementation-results-2026-10-02.md)

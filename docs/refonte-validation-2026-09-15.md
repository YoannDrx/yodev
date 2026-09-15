# Refonte Yodev — validation du 15 septembre 2026

## Résultat

Les quatre dépôts adoptent la marque Yodev et ses déclinaisons Mail, Ads et Spend : graphite, surfaces opaques, DM Sans / Fira Code, symbole commun, thèmes sombre et clair. Le thème initial est sombre et les préférences existantes sont conservées. Les sources versionnées de la marque se trouvent dans `brand/`; les copies dans chaque `src/brand` sont vérifiées par `npm run brand:check` depuis Yodev.

### Vitrine

Positionnement de développeur indépendant, première personne, prestations sur devis. Nouvelle séquence promesse / produits / expertises / réalisations / collaboration / contact. Parigo Music et Pressay sont distingués selon la nature et le statut de leur réalisation. Les produits ont des pages dédiées, des aperçus explicitement identifiés et des accès limités présentés sans promesse d’ouverture commerciale générale. Services rassemble les formats d’intervention et la méthode ; les anciennes URL Méthode/Offres redirigent en conservant la langue.

### Applications

- Mail : navigation regroupée, suppression des commandes de recherche/notification sans fonction, indicateurs de configuration issus de la base, réputation non mesurée en l’absence d’envois. Les règles d’éligibilité à l’envoi restent l’autorité pour chaque message.
- Ads : navigation regroupée par usage, éléments actifs plus lisibles, thème et langue accessibles, surfaces et états harmonisés. Les permissions, les marques d’agence et la génération des rapports clients conservent leurs mécanismes existants.
- Spend : navigation par projets/services/découvertes/dépenses, menu mobile complet, meilleure lisibilité des montants et du journal, source manuelle explicitée. Les actions et formulaires utilisent les données réelles. Les travaux commerciaux et financiers déjà présents dans le dépôt ont été conservés.

Aucune migration de données ajoutée pour cette refonte. Les migrations existantes ont uniquement servi à préparer les bases locales de validation.

## Vérifications exécutées

| Projet | Vérification du dépôt | Parcours navigateur |
| --- | --- | --- |
| Yodev | `npm run check` : TypeScript, ESLint, 4 tests et build | 6 scénarios Playwright |
| Mail | `npm run check` : ESLint, TypeScript, 308 tests et build | 10 scénarios publics + 9 connectés |
| Ads | `npm run check` : ESLint, TypeScript, frontières de données, sérialisation, 8 tests des scripts, 1 735 tests métier avec couverture, build et audit runtime sans vulnérabilité | 41 scénarios ciblés distincts, exécutés en plusieurs lots |
| Spend | `npm run check` : ESLint, frontières DB, i18n, TypeScript, 134 tests sans exclusion et build | 20 scénarios publics/applicatifs + 1 scénario de sessions réelles |

`npm run brand:check` valide les copies des quatre dépôts. `git diff --check` passe dans les quatre dépôts.

### Détail des parcours

- Vitrine : préférence de thème persistante, langues, menus mobiles, liens produits, anciennes URL, validation du formulaire, erreur HTTP réelle 503 avec conservation des champs, nouvelle tentative avec réponse de succès simulée, icônes et images de partage.
- Mail : connexion par mot de passe, déconnexion et invalidation de session, séparation des espaces, changement d’espace autorisé, révocation d’accès, création/révocation des clés API, invitations, passkeys WebAuthn, étapes de configuration et navigation complète sur mobile.
- Ads : pages publiques FR/EN, cinq rôles et leurs restrictions, navigation au clavier et sur mobile, démarrage, sélection des comptes et quotas, lecture historique, restrictions des contrôles, recherches et pagination des collections, rapports HTML/PDF/CSV et conservation des éditions. Les tests métier et les vérifications locales contrôlent également les approbations et les restrictions d’écriture ; aucune mutation réelle Google Ads n’a été exécutée.
- Spend : clients et projets, erreurs de formulaire avec conservation des champs, exports exacts, coûts décimaux, factures et conflits, correction d’un montant avec conservation de l’original, traductions, navigation et sessions de deux espaces avec révocation.

Les matrices de présentation couvrent 390, 768 et 1 440 px, dans les deux thèmes, sur les pages publiques et les tableaux de bord des produits. Axe vérifie les règles WCAG 2 A/AA des pages contrôlées. Des contrôles supplémentaires portent sur le focus, les liens actifs et l’absence de débordement horizontal. Cela ne constitue pas un audit exhaustif de toutes les combinaisons de données, pages et technologies d’assistance.

## Environnements

Les parcours connectés utilisent PostgreSQL 17 local, exposé uniquement sur la boucle locale, avec des bases distinctes et des identités synthétiques. Les scripts Ads et Mail désactivent leurs fournisseurs réels. Spend a été vérifié depuis une copie temporaire du code sans `.env.local`, avec les mêmes sources applicatives et des rôles PostgreSQL distincts. Ses fixtures `.env.example` sont des fichiers de test du scanner.

Les captures ci-dessous montrent le code exécuté et les données de ces environnements de test. Les totaux et noms de comptes ne représentent aucune activité client.

## Aperçus

- [Yodev — ordinateur sombre](previews/yodev-desktop-dark.png), [clair](previews/yodev-desktop-light.png), [mobile](previews/yodev-mobile-dark.png).
- [Yodev Mail — tableau de bord](previews/mail-dashboard-dark.png), [mobile](previews/mail-mobile-dark.png).
- [Yodev Ads — tableau de bord](previews/ads-dashboard-dark.png), [mobile](previews/ads-mobile-dark.png).
- [Yodev Spend — tableau de bord](previews/spend-dashboard-dark.png), [mobile](previews/spend-mobile-dark.png).

## Avant publication

1. **Dépendances de la vitrine** : son Next.js 16.1.0 préexistant est signalé critique par `npm audit --omit=dev`, avec d’autres dépendances transitives signalées. La mise à niveau de sécurité reste à traiter et à revalider séparément. L’audit est consigné ici ; aucun déploiement n’a été réalisé.
2. **Formulaire de contact** : la gestion des réponses fonctionne, mais la réception réelle d’un message nécessite les identifiants Resend et une boîte de test autorisée. Le succès testé côté navigateur est une réponse HTTP simulée ; aucun email n’a été envoyé.
3. **Fournisseurs et accès commercial** : DNS/email, consentements OAuth, collecte ou mutations Google Ads, Stripe, connecteurs de coûts et ouverture commerciale restent soumis aux environnements et validations de chaque produit. Les tests locaux ne certifient pas leur disponibilité en production.
4. **Validation éditoriale et visuelle** : relire les textes commerciaux et les statuts avant publication, puis valider les quatre produits sur leur environnement de préproduction avec leurs intégrations réelles.

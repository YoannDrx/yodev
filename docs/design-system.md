# Yodev — Design system 3.0 « Signal »

## Positionnement
Yoann Andrieux, développeur indépendant pour PME et fondateurs. Première personne, prestations sur devis, exemples vérifiables. Yodev Mail, Yodev Ads et Yodev Spend sont des produits autonomes de la même famille. Le portfolio recruteur reste distinct.

## Sources
`brand/manifest.json`, `brand/tokens.css` et `brand/brand.tsx` sont canoniques. `npm run brand:sync` distribue leurs copies et les SVG dans Yodev et les dépôts voisins Mail, Ads (`web`) et Spend. `npm run brand:check` compare tous les fichiers octet par octet. `--local` vérifie la seule copie de la vitrine. Les copies sous `src/brand` ne doivent pas être éditées directement.

## Direction
Graphite #0E1110, surfaces #161B19, blanc cassé #ECF0EA ; thème clair #F6F7F4 / #FFFFFF / #121614. Une couleur par produit : Yodev citron #C9F36B, Mail bleu #72B7FF, Ads orange #FF7A4D, Spend jaune #FFD04A. Chaque couleur a trois rôles : `--y-<produit>-fill` (aplat identique dans les deux thèmes, lu avec `--y-<produit>-on-fill`), `--y-<produit>` (accent accessible, encre assombrie en clair) et `--y-<produit>-signal` (couleur de la ligne). `data-product` règle `--y-accent`, `--y-accent-fill` et `--y-signal`. Geist pour les titres et le corps ; Geist Mono réservé aux identifiants, horodatages et extraits de code, jamais aux boutons ni à la navigation.

Le symbole y angulaire reste nu pour Yodev (sur tuile sombre en thème clair) ; Mail, Ads et Spend le portent sur une tuile de leur couleur (`ProductSymbol`).

La ligne de signal est le motif de marque : une ligne de base calme interrompue par des pics, dans la couleur du produit (`SignalLine`, `signalPoints`, `signalPath`). Elle sert de hero, de transition entre sections et de visuel de données ; dans les apps, une ligne plate signale l'état vide et une ligne interrompue l'erreur. Jamais de numérotation des sections ou des étapes : pictogrammes, nœuds de la ligne ou libellés réels.

Thème sombre à la première visite, choix explicite conservé dans chaque origine. Garder la préférence déjà enregistrée. Boutons de 44px minimum, rayon 8px (14px pour les grands blocs), surfaces opaques, filets fins et focus visible. Aucun verre dépoli, dégradé décoratif ou animation continue. Pas de couleur comme seul indicateur d’état. Données financières avec chiffres tabulaires et devise visible.

Maquettes de référence : canvas « YoDev — Refonte DA » (claude.ai/artifact/MhTtXGt5ye3depbMGpK1XW).
Vitrine en production : [accueil sombre](previews/yodev-signal-desktop-dark.png), [clair](previews/yodev-signal-desktop-light.png), [mobile](previews/yodev-signal-mobile-dark.png), [page Mail](previews/yodev-signal-mail-desktop-dark.png). Les captures `yodev-desktop-*` et `yodev-mobile-dark` restent la preuve datée de la refonte du 15 septembre.

## Parcours
Vitrine : promesse → produits → expertises → réalisations → collaboration → contact. Les pages produits exposent usage, public, aperçu identifié et statut réel. Ads et Spend gardent un accès limité tant que leurs gates commerciaux ne sont pas établis. Aucun tarif de prestation freelance public.

Applications : marque et espace de travail en tête, navigation par usage, titre/contexte/action, données puis paramètres. Menus mobiles complets, boutons réels uniquement, états de chargement/vide/erreur explicites. Les marques blanches Ads et les permissions restent prioritaires dans leur périmètre. Les liens entre produits ne partagent aucune session.

## Validation
Vérifier FR/EN, 390/768/1440px, thèmes sombre et clair, clavier, contrastes, erreurs et formulaires. Tests de chaque dépôt, puis parcours Playwright pertinents sur données locales isolées. Pas de promotion automatique.

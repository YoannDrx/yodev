# Yodev — Design system 2.0

## Positionnement
Yoann Andrieux, développeur indépendant pour PME et fondateurs. Première personne, prestations sur devis, exemples vérifiables. Yodev Mail, Yodev Ads et Yodev Spend sont des produits autonomes de la même famille. Le portfolio recruteur reste distinct.

## Sources
`brand/manifest.json`, `brand/tokens.css` et `brand/brand.tsx` sont canoniques. `npm run brand:sync` distribue leurs copies et les SVG dans Yodev et les dépôts voisins Mail, Ads (`web`) et Spend. `npm run brand:check` compare tous les fichiers octet par octet. `--local` vérifie la seule copie de la vitrine. Les copies sous `src/brand` ne doivent pas être éditées directement.

## Direction
Graphite #141716, surfaces #1B201E, blanc cassé #EBEFEB. Yodev et Ads vert #B6D68B, Mail bleu #A7CFE8, Spend ambre #F0C66E. Les accents clairs sont assombris dans le thème clair pour la lisibilité. DM Sans pour les titres et le corps ; Fira Code pour les identifiants et libellés techniques courts. Symbole y angulaire commun, sans dégradé.

Thème sombre à la première visite, choix explicite conservé dans chaque origine. Garder la préférence déjà enregistrée. Boutons de 44px minimum, rayon 4px, surfaces opaques, filets fins et focus visible. Aucun halo, verre dépoli, terminal décoratif ou animation continue. Pas de couleur comme seul indicateur d’état. Données financières avec chiffres tabulaires et devise visible.

## Parcours
Vitrine : promesse → produits → expertises → réalisations → collaboration → contact. Les pages produits exposent usage, public, aperçu identifié et statut réel. Ads et Spend gardent un accès limité tant que leurs gates commerciaux ne sont pas établis. Aucun tarif de prestation freelance public.

Applications : marque et espace de travail en tête, navigation par usage, titre/contexte/action, données puis paramètres. Menus mobiles complets, boutons réels uniquement, états de chargement/vide/erreur explicites. Les marques blanches Ads et les permissions restent prioritaires dans leur périmètre. Les liens entre produits ne partagent aucune session.

## Validation
Vérifier FR/EN, 390/768/1440px, thèmes sombre et clair, clavier, contrastes, erreurs et formulaires. Tests de chaque dépôt, puis parcours Playwright pertinents sur données locales isolées. Pas de promotion automatique.

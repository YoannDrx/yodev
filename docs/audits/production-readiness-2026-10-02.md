# Audit de préparation à la production — Yodev

Date : **2 octobre 2026**, fuseau Europe/Paris. Référence locale : commit **e5fa20d**, arbre Git initial propre. Périmètre : dépôt `yodev`, contrôles locaux et navigation publique en lecture seule. Aucun changement applicatif, envoi réel, compte créé, déploiement ou opération sur les données de production.

## 1. Verdict : non prêt pour un lancement validé

La vitrine est fonctionnelle et visuellement cohérente. Elle est déjà accessible publiquement, mais **cet audit ne permet pas de valider son exploitation commerciale** : la réception réelle d’une demande n’est pas prouvée, la protection contre les abus doit être démontrée ou ajoutée, et l’information sur les données personnelles est incomplète. Plusieurs défauts reproductibles affectent aussi le formulaire, qui constitue l’action métier principale.

Ce verdict ne signifie ni que tout le site est défaillant, ni qu’un incident de sécurité est avéré. Aucun P0 démontré. Une remise à niveau ciblée est préférable à une refonte. Compter environ **3 à 5 jours-personne pour lever les conditions de lancement**, puis **3 à 5 jours-personne de fiabilisation**, hors attentes d’accès, validation spécialisée et disponibilité des fournisseurs. Estimations indicatives, pas un devis.

### Produit réellement audité

Il s’agit d’une **vitrine bilingue de développeur indépendant** destinée aux PME et aux fondateurs. Sa conversion principale est une demande de prestation sur devis. Une seconde activité consiste à présenter Mail, Ads et Spend, avec accès limité ou candidature bêta. Les aperçus portent explicitement la mention de données de démonstration.

Ce dépôt **n’implémente aucune authentification**, aucun OAuth Google, aucun compte ou rôle, aucune base de données, aucun paiement, aucun abonnement, aucun upload. Les produits sont des applications distinctes. Les liens publics vers celles-ci répondent, mais leurs parcours connectés ne sont pas certifiés ici. La mention d’une connexion Google potentiellement défaillante ne correspond à aucun composant de cette vitrine ; aucune cause OAuth n’est donc inventée. Le rapport de septembre évoquant les autres dépôts est un historique, pas une preuve actuelle de leur fonctionnement.

### Niveaux de preuve

- **Vérifié** : observation ou test réussi, dans le périmètre indiqué.
- **Défaut reproduit** : comportement indésirable observé avec des entrées synthétiques.
- **Risque identifié par lecture** : chemin de code ou protection absente, sans incident réel provoqué.
- **Hypothèse à confirmer** : explication probable, non isolée expérimentalement.
- **Non testé** : preuve manquante ; ce n’est pas assimilé à un bug.

La correspondance entre le déploiement public et le commit local n’est pas établie. Les observations publiques portent uniquement sur les pages, les réponses HTTP et les liens consultés le 2 octobre.

## 2. Problèmes prioritaires

Les priorités ci-dessous sont celles de ce produit : **P1** bloque la validation du lancement, **P2** constitue un problème important, **P3** une amélioration. La sévérité d’un avis fournisseur est distinguée de l’exploitabilité de cette application.

| ID | Priorité | Catégorie et constat | Preuve / conséquence | Effort indicatif |
|---|---|---|---|---|
| A01 | P1 | Réception réelle du contact non validée | Succès navigateur simulé ; aucune preuve de livraison en boîte | 0,5 j + accès |
| A02 | P1 | Protection des envois contre les abus non démontrée | Aucun limiteur dans la route ; 8 appels isolés atteignent 8 fois le fournisseur simulé | 0,5–1 j |
| A03 | P1 | Information de confidentialité incomplète | Base légale, durée et droit de réclamation non explicités ; pas de notice près du formulaire | 0,5–1 j + validation |
| A04 | P2 | Dépendance Next.js signalée critique, sans chemin exploitable identifié ici | Version 16.3.5 ; SVG alimentés par constantes | 0,25–0,5 j |
| A05 | P2 | Erreur de saisie présentée comme panne temporaire | Nom `A` accepté côté navigateur, refusé en 400 côté serveur | 0,25–0,5 j |
| A06 | P2 | Contexte Ads/Spend perdu au contact | Paramètre `product` ignoré, absent de la requête envoyée | 0,5 j |
| A07 | P2 | Envoi sans délai explicite et saisie concurrente perdue | Bouton encore bloqué après 12 s simulées ; modification effacée au succès | 0,5–1 j |
| A08 | P2 | Diagnostic des erreurs email insuffisant dans le code | 401, 429, 500 et erreur réseau tous réduits à 502, sans journal métier | 0,5 j |
| A09 | P2 | CI incomplète par rapport aux parcours critiques | E2E, audit des dépendances et contrôle de marque absents de `check` | 0,5–1 j |
| A10 | P2 | Métadonnées génériques sur les pages de prestations | Même titre ; pas de canonical HTML spécifique observé | 0,5 j |
| A11 | P2 | Pages éditoriales rendues dynamiquement sans besoin métier visible | Build `ƒ` et réponses publiques `private, no-store` | 0,5 j |
| A12 | P2 | Confidentialité invisible sans JavaScript | Titre et contenu à `opacity: 0` | 0,25–0,5 j |
| A13 | P3 | Page 404 générique et en anglais | URL FR inconnue → 404 sans parcours de récupération propre au site | 0,25 j |
| A14 | P3 | Durcissement HTTP à compléter | HSTS présent ; CSP, anti-iframe et autres en-têtes absents de la réponse inspectée | 0,25–0,5 j |

**Ordre conseillé :** A01–A03, A04 dans le même lot de maintenance, puis A05–A09 et A12. A10–A11 et les améliorations de conversion viennent ensuite. La résolution d’A01 inclut la vérification minimale des alertes et du retour arrière avant ouverture accrue au trafic.

## 3. Matrice des fonctionnalités et parcours

| Parcours / fonctionnalité | État | Vérifications réalisées | Reste à tester |
|---|---|---|---|
| Accueil, proposition de valeur, prestations | Implémenté, vérifié | Lecture, navigateur public, build local, pages accessibles | Compréhension par prospects réels |
| Réalisations et à propos | Implémenté, vérifié | Lecture des rôles et statuts, pages rendues, navigation | Validation des affirmations et autorisations de publication |
| FR/EN | Implémenté | Navigation localisée, pages produits dans les deux langues, relance mobile réussie | Relecture éditoriale native exhaustive |
| Thème sombre/clair | Implémenté, vérifié | Persistance après rechargement dans le test E2E | Préférences système sur appareils réels |
| Menu mobile | Fonctionne dans les contrôles réussis | Premier test en dépassement de délai ; relance ciblée réussie ; lien public « À propos » réussi | Fiabilité à froid et réseau lent |
| Anciennes URL Méthode / Offres | Vérifié | Quatre variantes FR/EN redirigent vers les sections attendues | Inventaire complet des anciennes URL SEO |
| Pages Mail, Ads, Spend | Implémenté, vérifié | Six pages, titre principal, liens, Axe ; statut limité et aperçu identifié | Réalité de toutes les promesses dans chaque application |
| Candidature Mail | Destination publique accessible | GET des URL d’inscription FR/EN → 200 | Soumission, invitation et suite du parcours hors dépôt |
| Découverte Ads / Spend | Destination publique accessible | GET Ads et Spend FR/EN → 200 | Connexion, onboarding et valeur effective hors dépôt |
| Contact : champs requis et erreurs | Partiel | Validation native, API 400, absence de configuration 503, conservation des champs | Correction A05, messages par champ |
| Contact : succès | Interface vérifiée, livraison non testée | Réponse HTTP 200 simulée ; aucun email envoyé | Réception réelle, spam, reply-to et panne fournisseur |
| Contact : répétitions et interruptions | Partiel | Idempotency-Key propagée dans un test isolé, bouton désactivé, attente et édition concurrente testées | Déduplication Resend réelle, actualisation après réponse perdue |
| Qualification produit | Défectueux | `product=spend` absent du corps envoyé | Conservation bout en bout après correction |
| Contact direct par email | Lien présent | Lien `mailto:` rendu | Réception et traitement opérationnel |
| Réservation calendrier | Optionnelle, non activée localement | Affichage conditionné à une variable d’environnement | URL réelle, créneau, confirmation si activée |
| Mentions légales / confidentialité | Présentes, incomplètes | FR/EN lus ; test sans JavaScript ; Axe après stabilisation | Validation juridique et opérationnelle |
| Accessibilité / responsive | Base satisfaisante, couverture partielle | Axe, lien d’évitement, libellés, 320/390/768/1440 px selon tests | Lecteur d’écran manuel, zoom 200/400 %, iOS Safari, Android |
| SEO technique | Partiel | Robots, sitemap, images OG, titres, canonical et 404 | Search Console, indexation et mesures terrain |
| Auth Google, inscription, sessions, rôles | Non applicable dans ce dépôt | Recherche des routes, dépendances et code | Audit séparé des applications concernées |
| Paiement, données multi-tenant, uploads, IA | Non applicable dans ce dépôt | Aucun module ni stockage correspondant | À traiter dans les produits qui les implémentent |

## 4. Audit détaillé et constats exploitables

### A01 — P1 — Pas de preuve de réception réelle d’une demande

**Parcours / impact :** un prospect peut voir « Demande transmise » sans que cet audit prouve que le message est parvenu à la boîte de traitement. Le site peut être techniquement disponible tout en perdant sa conversion principale.

**Preuve et statut : non testé pour la livraison réelle ; vérifié pour les branches locales.** La configuration Playwright vide les trois paramètres d’envoi dans [playwright.config.ts](/Users/yoannandrieux/Projets/yodev/playwright.config.ts:5). Le test remplace uniquement le succès par une réponse simulée dans [commercial.spec.ts](/Users/yoannandrieux/Projets/yodev/e2e/commercial.spec.ts:41). Une requête valide au serveur local sans configuration renvoie correctement 503. La route considère l’acceptation HTTP par Resend comme un succès dans [route.ts](/Users/yoannandrieux/Projets/yodev/src/app/api/contact/route.ts:85). L’acceptation par l’API ne constitue pas une observation de réception.

**Correction recommandée :** préparer une recette en préproduction avec domaine d’envoi vérifié et destinataire de test autorisé ; vérifier l’événement fournisseur et l’arrivée en boîte, puis la possibilité de répondre au demandeur. Garder le contact direct comme secours. Aucun besoin de base de données ou de file de messages pour satisfaire ce contrôle initial.

**Effort / dépendances / incertitude :** environ 0,5 j ; accès au projet d’hébergement, Resend, DNS et boîte de test ; incertitude forte sur la configuration réelle. L’envoi réel nécessite une instruction distincte conformément au périmètre demandé.

**Acceptation :** une demande FR et une EN sont reçues une seule fois, tous les champs utiles sont corrects, le reply-to est utilisable ; un refus fournisseur conserve la saisie et déclenche une alerte exploitable. Le responsable du traitement des demandes et le délai de réponse annoncé sont définis.

### A02 — P1 — API publique sans maîtrise applicative des abus

**Parcours / impact :** appels automatisés au contact, saturation de la boîte et du quota email, indisponibilité pour les prospects légitimes. Le destinataire est fixe : ce n’est pas un relais ouvert permettant d’envoyer à n’importe quelle adresse.

**Preuve et statut : risque par lecture, branche reproduite avec fournisseur simulé.** [route.ts](/Users/yoannandrieux/Projets/yodev/src/app/api/contact/route.ts:11) parse le JSON, valide les champs et ne possède qu’un honeypot. Huit requêtes synthétiques successives avec honeypot vide provoquent huit appels au faux fournisseur. Une requête avec origine tierce et `Content-Type: text/plain` contenant du JSON est acceptée par le handler isolé. Aucun abus ni test de charge n’a été lancé sur le site public. Les éventuelles protections Vercel configurées hors dépôt sont inconnues.

**Correction recommandée :** d’abord vérifier les règles de l’hébergeur. À défaut, limiter les tentatives sur `/api/contact` avec un mécanisme partagé entre instances et une limite globale, répondre 429 avec `Retry-After`, borner le corps reçu avant son parsing, et accepter uniquement le format JSON attendu. Le contrôle d’origine est un complément pour le navigateur, pas une barrière contre un client automatisé. Garder le honeypot ; ajouter un défi seulement si les mesures simples ne suffisent pas.

**Effort / dépendances / incertitude :** 0,5–1 j ; choix hébergeur ou stockage de quotas ; forte certitude sur l’absence dans le code, configuration edge inconnue.

**Acceptation :** sur environnement isolé, le seuil convenu bloque les requêtes excédentaires avant tout appel fournisseur, fonctionne avec deux instances, revient à la normale après la fenêtre, et n’empêche pas une demande légitime. Un corps excessif est rejeté en 413. Si une règle edge couvre déjà ces besoins, conserver sa preuve et son test au lieu de dupliquer l’infrastructure.

### A03 — P1 — Information insuffisante au moment de la collecte

**Parcours / impact :** une personne transmet son contexte professionnel sans disposer d’une information complète et facilement accessible sur son traitement.

**Preuve et statut : omissions constatées, qualification juridique à valider.** La politique dans [fr.json](/Users/yoannandrieux/Projets/yodev/src/messages/fr.json:148), également en anglais, décrit finalité, contact et droits généraux mais n’explicite pas base légale, durée ou critères de conservation, ni droit de réclamation. Les prestataires sont décrits génériquement ; localisation et garanties des éventuels transferts restent à vérifier. [contact-section.tsx](/Users/yoannandrieux/Projets/yodev/src/components/site/contact-section.tsx:263) n’ajoute pas de notice ni de lien contextualisé près de l’envoi.

**Correction recommandée :** établir le traitement réel, sa base et ses règles de conservation ; compléter la politique et ajouter une mention courte avec lien près du bouton. Inclure la boîte email et les journaux du fournisseur dans la procédure d’accès/effacement. Ne pas imposer artificiellement une case de consentement si la base retenue n’est pas le consentement. Les informations attendues sont détaillées par la [CNIL](https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence).

**Effort / dépendances / incertitude :** 0,5–1 j et validation du responsable du traitement, avec spécialiste si nécessaire ; absence textuelle certaine, applicabilité précise et transferts à confirmer.

**Acceptation :** notice FR/EN accessible au moment de la collecte, politique cohérente avec les services réellement utilisés, durée appliquée, procédure d’effacement testée avec une demande synthétique. Cet audit ne certifie pas la conformité juridique.

### A04 — P2 — Alerte critique de dépendance à traiter avec son contexte

**Parcours / impact :** génération d’icônes et d’images sociales avec `next/og`. Une dépendance vulnérable demeure dans le graphe de production.

**Preuve et statut : version affectée vérifiée, exploitation non établie.** `npm audit --omit=dev --json` renvoie une alerte critique, GHSA-vcvr-r3jv-pc5j, pour Next.js 16.3.5. La version est verrouillée dans les deux lockfiles et déclarée dans [package.json](/Users/yoannandrieux/Projets/yodev/package.json:22). L’[avis officiel Next.js](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j) indique une correction en 16.3.6 et précise que les applications n’insérant pas de données contrôlées par un attaquant dans les SVG ne sont pas affectées. Dans [social-image.tsx](/Users/yoannandrieux/Projets/yodev/src/brand/social-image.tsx:1), attributs et tracé SVG viennent de constantes ; les titres proviennent de textes fixés. Le paramètre de langue sélectionne deux textes constants.

**Correction recommandée :** adopter une version corrigée compatible, mettre à jour les lockfiles choisis et revalider les sept routes d’images testées. Des PNG statiques sont une alternative de simplification pour les images de marque constantes. Ne pas présenter cette alerte comme une RCE démontrée sur le site.

**Effort / dépendances / incertitude :** 0,25–0,5 j ; maintenance de dépendances ; condition d’exploitation absente des chemins examinés, version déployée inconnue.

**Acceptation :** graphe de production corrigé, audit sans cette alerte, build et routes OG/icônes valides. Prévoir ce correctif dans le lot précédant le lancement malgré son classement P2 contextualisé.

### A05 — P2 — Validation client/serveur divergente, erreur inutilisable

**Parcours / impact :** le prospect reçoit « Réessayez dans quelques instants » alors que sa demande sera systématiquement refusée à l’identique.

**Preuve et statut : défaut reproduit sur le build optimisé.** Saisir le nom synthétique `A`, un email syntaxiquement valide et un message de plus de 20 caractères : `form.checkValidity()` vaut `true`, l’API renvoie 400 et l’interface affiche le message de panne temporaire. Le serveur exige au moins deux caractères après trim dans [contact-request.ts](/Users/yoannandrieux/Projets/yodev/src/lib/contact-request.ts:69), tandis que l’input n’a pas de minimum dans [contact-section.tsx](/Users/yoannandrieux/Projets/yodev/src/components/site/contact-section.tsx:293). Tous les statuts non-2xx sont traités de la même manière à la ligne 205.

**Correction recommandée :** partager les contraintes, produire des erreurs de validation par champ, appliquer la normalisation de manière cohérente et associer les erreurs à `aria-describedby`. Décider si le minimum de deux caractères est réellement utile ; accepter les noms légitimes doit primer sur une règle arbitraire.

**Effort / dépendances / incertitude :** 0,25–0,5 j ; décision sur les règles de saisie ; certitude élevée.

**Acceptation :** nom court et message composé d’espaces reçoivent une explication locale précise, sans recommandation de réessayer inchangé ; les entrées valides restent acceptées ; le focus rejoint le premier champ invalide. [Capture de reproduction](/Users/yoannandrieux/Projets/yodev/docs/audits/evidence-2026-10-02/contact-validation.png).

### A06 — P2 — Les demandes produit deviennent des demandes génériques

**Parcours / impact :** visiteur intéressé par Ads ou Spend → « Parlons de votre besoin » → formulaire de création d’un produit. L’exploitant perd l’origine de la demande et doit requalifier le prospect.

**Preuve et statut : défaut reproduit.** [product-landing.tsx](/Users/yoannandrieux/Projets/yodev/src/components/products/product-landing.tsx:8) envoie vers `?product=ads` ou `?product=spend`. Le formulaire ne lit que `type` dans [contact-section.tsx](/Users/yoannandrieux/Projets/yodev/src/components/site/contact-section.tsx:167). Depuis `?product=spend`, le corps intercepté contient huit champs et aucun `product`. Le schéma serveur ne comporte pas ce champ.

**Correction recommandée :** transporter un champ produit optionnel limité à `mail|ads|spend`, afficher un contexte compréhensible et l’inclure dans le message interne. Conserver le même formulaire ; inutile de créer trois tunnels ou listes d’attente indépendantes.

**Effort / dépendances / incertitude :** environ 0,5 j ; évolution conjointe interface, contrat et email ; certitude élevée.

**Acceptation :** les CTA Ads et Spend FR/EN produisent une demande attribuée au bon produit ; valeurs inconnues rejetées ou ignorées de façon explicite ; le contact de prestation conserve son comportement.

### A07 — P2 — Attente non bornée et perte des modifications pendant l’envoi

**Parcours / impact :** connexion lente ou réponse fournisseur perdue ; l’utilisateur ne sait pas quand reprendre la main. Il peut modifier son message pendant l’attente puis voir ces nouvelles informations effacées.

**Preuve et statut : défaut de concurrence reproduit ; absence de délai vérifiée par lecture.** Le `fetch` serveur n’a pas de signal d’annulation dans [route.ts](/Users/yoannandrieux/Projets/yodev/src/app/api/contact/route.ts:67), ni le fetch client dans [contact-section.tsx](/Users/yoannandrieux/Projets/yodev/src/components/site/contact-section.tsx:190). Avec une réponse volontairement retenue, le bouton reste désactivé à 12 secondes ; les champs demeurent éditables. Modifier le message puis libérer la réponse 200 affiche le succès et supprime le formulaire contenant la modification, alors que la requête capturée contient le texte initial.

**Correction recommandée :** définir une borne serveur compatible avec celle de l’hébergeur, puis une borne client légèrement supérieure ; conserver le même identifiant lors d’une reprise du même envoi. Désactiver les champs pendant l’envoi ou préserver explicitement les modifications ultérieures au snapshot envoyé. Le fait de réinitialiser la clé à chaque modification doit suivre cette même règle. La [documentation Resend](https://resend.com/docs/dashboard/emails/idempotency-keys) décrit une fenêtre de déduplication de 24 heures ; la propagation du header est testée, son effet réel ne l’est pas ici.

**Effort / dépendances / incertitude :** 0,5–1 j ; délais de la plateforme, A05 ; reproduction certaine, latence de production non mesurée.

**Acceptation :** panne lente → retour à un état actionnable dans le délai documenté ; double clic → une seule demande ; reprise identique → même clé ; modification ultérieure → aucune saisie perdue. Tester aussi le rechargement après réponse perdue et documenter la limite retenue sans stocker durablement le message dans le navigateur par défaut.

### A08 — P2 — Les erreurs ne permettent pas de diagnostiquer la perte de leads

**Parcours / impact :** l’exploitant doit distinguer une configuration invalide, un quota atteint et une panne réseau pour rétablir rapidement la collecte.

**Preuve et statut : comportement reproduit avec fournisseur simulé ; monitoring de production inconnu.** 401, 429 et 500 du fournisseur, puis exception réseau, deviennent tous 502 `DELIVERY_FAILED`. [route.ts](/Users/yoannandrieux/Projets/yodev/src/app/api/contact/route.ts:85) ne journalise ni catégorie, durée ni identifiant de réponse fournisseur. Le code ne lit pas l’identifiant d’email du succès. L’absence de télémétrie dans ce dépôt ne prouve pas l’absence de métriques Vercel ou d’alertes externes.

**Correction recommandée :** conserver une réponse publique sobre ; journaliser uniquement request ID, code interne, statut fournisseur, durée et identifiant fournisseur si disponible. Exclure nom, email, contenu, clé API et payload complet. Relier les échecs à une alerte et au journal Resend ; décider si les événements de rejet/livraison justifient un webhook selon le volume.

**Effort / dépendances / incertitude :** environ 0,5 j ; accès aux outils d’exploitation et A01 ; forte certitude côté code, dispositif externe inconnu.

**Acceptation :** une panne synthétique est détectée dans le délai convenu, son origine est identifiable avec le request ID, et aucun contenu personnel ne figure dans les logs. Une procédure précise quel service consulter et comment proposer le canal email direct.

### A09 — P2 — Le contrôle CI ne protège pas les parcours navigateur

**Parcours / impact :** une PR peut réussir les contrôles configurés tout en cassant le contact, la langue ou la navigation mobile.

**Preuve et statut : vérifié.** [ci.yml](/Users/yoannandrieux/Projets/yodev/.github/workflows/ci.yml:28) lance uniquement `pnpm check`. [package.json](/Users/yoannandrieux/Projets/yodev/package.json:12) enchaîne TypeScript, lint, quatre tests de validation et build. Les six scénarios E2E, `brand:check -- --local` et l’audit runtime en sont absents. La suite E2E démarre `next dev`, pas le build destiné à la production. Le premier scénario a dépassé cinq secondes sur la navigation mobile ; il a réussi à la relance ciblée sans modification. Cause du dépassement non isolée, compilation à froid plausible.

**Correction recommandée :** unifier la commande de CI documentée, exécuter les tests critiques sur `next build` puis `next start`, installer explicitement le navigateur CI et conserver traces en cas d’échec. Ajouter des tests de route avec fournisseur simulé pour 401/429/5xx, timeout, honeypot, validation et idempotence. Ajouter un contrôle de dépendances avec triage documenté, sans correction automatique aveugle.

**Effort / dépendances / incertitude :** 0,5–1 j ; A05–A07, environnement GitHub Actions ; configuration certaine, historique et protections de branche non consultés.

**Acceptation :** une régression volontaire locale du contact fait échouer le contrôle prévu ; recette sur build optimisé stable à froid et à chaud ; artefacts d’échec disponibles ; aucune valeur réelle Resend dans les tests. Un retry ne doit pas masquer indéfiniment la flakiness.

### A10 — P2 — Pages commerciales insuffisamment différenciées pour le SEO

**Parcours / impact :** résultats de recherche et partages peu spécifiques pour Services, Réalisations, À propos et Contact.

**Preuve et statut : code et HTTP public concordants.** Les pages héritent du titre et de la description du [layout](/Users/yoannandrieux/Projets/yodev/src/app/[locale]/layout.tsx:38). Accueil, Services, Réalisations et Contact affichent le même titre dans les réponses inspectées. Aucun canonical HTML spécifique n’y est observé ; les pages produits en possèdent. Le sitemap fournit déjà les alternances de langue : leur absence dans le HTML ne signifie donc pas une absence totale de signal hreflang.

**Correction recommandée :** définir titre, description, canonical et partage adaptés à chaque page et langue ; conserver l’hôte canonique réel `www` configuré en production. Éviter que la valeur de repli sans `www` génère des URL à redirection lors d’un autre déploiement. Ajouter un contrôle sur les URL du sitemap.

**Effort / dépendances / incertitude :** environ 0,5 j ; validation des textes et hôte ; défaut certain, effet sur classement non mesuré.

**Acceptation :** métadonnées distinctes FR/EN, canonical auto-référent sur l’hôte final, toutes les URL du sitemap finales en 200 et alternances réciproques. Vérifier l’indexation avec Search Console quand l’accès sera disponible.

### A11 — P2 — Rendu dynamique inutile des pages éditoriales

**Parcours / impact :** les pages les plus consultées dépendent inutilement d’un rendu serveur à chaque requête ; coût et latence potentiels sous trafic.

**Preuve et statut : rendu dynamique vérifié, coût non mesuré.** Le build marque `ƒ /[locale]`, `/about`, `/services`, `/work`. Les réponses publiques inspectées pour accueil, services et réalisations sont `private, no-cache, no-store`. Les pages utilisent `getLocale()` sans initialisation locale propre, notamment [page.tsx](/Users/yoannandrieux/Projets/yodev/src/app/[locale]/page.tsx:9), tandis que les pages produit appellent `setRequestLocale` et sont pré-rendues.

**Correction recommandée :** expliciter les paramètres de langue et rendre ces pages pré-rendables. Pour la pile installée, reprendre le pattern déjà utilisé dans les pages produit est une petite correction ; évaluer ensuite la voie `next/root-params` désormais recommandée, sans migration générale nécessaire au lancement. La [documentation next-intl](https://next-intl.dev/docs/routing/setup) distingue ces deux méthodes et explique que le layout seul ne suffit pas au pattern historique.

**Effort / dépendances / incertitude :** environ 0,5 j ; version installée next-intl 4.14.5 ; cause probable cohérente avec les sources, correction non appliquée.

**Acceptation :** build montrant les variantes FR/EN pré-rendues ; HTML correct sans contamination de langue ; navigation et formulaire toujours opérationnels. Mesurer cache et temps de réponse après déploiement, sans promettre un gain chiffré avant mesure.

### A12 — P2 — Une animation masque l’information de confidentialité sans JavaScript

**Parcours / impact :** échec de chargement/hydratation JS ou JS désactivé : la politique de confidentialité est présente dans le HTML, mais invisible à l’écran.

**Preuve et statut : défaut reproduit sur build optimisé.** Dans un contexte Chromium sans JavaScript, le parent du titre et celui de la première section ont une opacité calculée de zéro. [FadeIn](/Users/yoannandrieux/Projets/yodev/src/components/motion/fade-in.tsx:35) initialise l’opacité à zéro ; [PrivacyPage](/Users/yoannandrieux/Projets/yodev/src/app/[locale]/legal/privacy/page.tsx:35) l’utilise sur le titre et les sections. Le même pattern figure dans les mentions légales. Les alertes de contraste relevées pendant une première mesure non stabilisée disparaissent après attente : elles ne sont pas présentées comme des défauts de contraste persistants.

**Correction recommandée :** rendre les textes essentiels visibles par défaut, et appliquer une animation seulement comme amélioration après initialisation ; pour les pages légales, supprimer le fade est l’option la plus simple. Respecter la préférence de réduction du mouvement côté moteur d’animation : les règles CSS de durée n’arrêtent pas nécessairement une animation pilotée en JavaScript.

**Effort / dépendances / incertitude :** 0,25–0,5 j ; aucune intégration ; reproduction certaine sur confidentialité, réduction du mouvement à vérifier séparément.

**Acceptation :** confidentialité et mentions lisibles avec JS désactivé ou un chunk bloqué ; aucun contenu essentiel invisible ; contrôle clavier et Axe après stabilisation réussi dans les deux thèmes.

### A13 — P3 — Absence d’une 404 localisée orientant le visiteur

**Preuve / parcours / impact :** GET d’une URL française inconnue → vrai statut 404, mais titre générique anglais. Le dépôt ne contient pas de page `not-found` personnalisée. Le visiteur n’est pas guidé vers Services ou Contact. **Statut : vérifié.**

**Correction :** page 404 courte, localisée, avec accueil et contact ; prévoir une erreur globale récupérable adaptée aux layouts existants. **Effort :** 0,25 j ; dépendance à la structure locale, faible incertitude. **Acceptation :** statut 404 conservé, texte FR/EN et liens utilisables au clavier. Ne pas rediriger toutes les URL inconnues vers l’accueil en 200.

### A14 — P3 — En-têtes de durcissement absents du contrôle public

**Preuve / impact :** HSTS est présent sur la réponse publique inspectée ; CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy et Permissions-Policy n’y figurent pas. [next.config.ts](/Users/yoannandrieux/Projets/yodev/next.config.ts:6) ne définit pas d’en-têtes. **Statut : observation ciblée et opportunité de défense supplémentaire ; aucune XSS ou attaque de clickjacking reproduite.**

**Correction :** définir les politiques adaptées à une vitrine, notamment `frame-ancestors`, `nosniff` et une politique de referrer ; tester la CSP en mode rapport avant enforcement si nécessaire pour les scripts Next.js. Éviter une configuration copiée qui casserait le thème ou l’hydratation. **Effort :** 0,25–0,5 j ; plateforme et scripts réels ; certitude de l’observation, bénéfice dépendant des menaces. **Acceptation :** réponses production inspectées et parcours clés sans violation bloquante ; intégration iframe interdite si elle n’a aucun usage prévu.

### Couverture par domaine et décisions d’architecture

| Domaine | Ce qui fonctionne / constat | Décision adaptée au produit |
|---|---|---|
| Produit | Positionnement à la première personne, devis, statuts de produits limités, démos identifiées | Conserver ; distinguer clairement prestation et demande d’accès produit |
| Architecture | Next.js App Router, React, TypeScript ; contenu serveur et îlots interactifs ; une route métier | Conserver ; aucun besoin de microservices, base de données ou nouveau framework |
| Contenus et design | Marque centralisée dans `brand/`, copies vérifiées localement ; mêmes composants sur plusieurs pages | Garder le système ; ne pas modifier les copies générées directement |
| Dette de code | Anciens composants de sections et textes coexistent avec `commercial.ts` ; certains composants denses sur une ligne | Nettoyage ciblé après vérification des usages ; pas de refonte cosmétique prioritaire |
| Validation et intégrité | Champs typés et bornés, valeurs métier autorisées, email normalisé, HTML échappé | Garder et aligner le client ; tests de bord à compléter |
| Données | Pas de DB ni migrations ; la demande passe par Resend et la boîte destinataire | Pas de migrations, index, pagination ou transactions à auditer ici ; gestion de conservation côté services externes |
| Concurrence | Clé d’idempotence fournie au fournisseur et bouton désactivé | Corriger A07 ; pas de promesse d’exactly-once globale entre onglets/rechargements |
| Authentification | Aucune session privée, aucun rôle, aucune connexion Google dans le dépôt | N/A sur cette vitrine ; ne pas ajouter un compte pour contacter le prestataire |
| Sécurité | Secret Resend côté serveur, destinataire fixe, HTML utilisateur échappé, pas d’uploads ni requêtes SQL | Risques dominants : disponibilité, abus et dépendances ; A02/A04/A14 |
| Secrets | Aucun fichier `.env` local ni versionné détecté ; scan limité de motifs usuels dans `src` sans résultat | Ne constitue pas un audit de l’historique Git ou des variables de l’hébergeur |
| Intégrations | Resend seul fournisseur appelé par la route ; calendrier facultatif ; liens produits distincts | Pas de paiement, webhook financier, stockage fichier ou IA exécutée ici |
| Accessibilité | Libellés natifs, focus visible, lien d’évitement, états alert/status ; Axe stabilisé sans violation sur les pages testées | Préserver ; corriger A05/A12 et compléter les tests manuels |
| Performance | Images locales WebP, `next/image`, polices auto-hébergées ; `public` environ 396 Ko | Pré-rendre l’éditorial ; mesurer avant de retirer des dépendances |
| Mesure de charge | Aucun load test ni Core Web Vitals terrain ; lecture locale des ressources seulement | Fixer un objectif de trafic et tester en staging, pas sur les sous-domaines publics |
| Infrastructure | Vercel identifié par réponses HTTP ; CI de qualité versionnée ; build reproductible après incident local | Vérifier projet lié, branches, environnements, secrets et rollback dans le compte hébergeur |
| Exploitation | Réponse d’erreur sobre, canal email de secours ; pas de runbook d’incident/restore explicite trouvé | Ajouter une procédure courte avec propriétaire, diagnostic, alerte et retour arrière |
| Acquisition | Sitemap bilingue, robots, images sociales et redirections historiques présentes | A10 ; preuve de réalisation plus accessible, mesure sobre des conversions |
| Obligations | Pages légales présentes ; aucun traceur publicitaire identifié dans le code inspecté | A03 ; inventorier stockage navigateur et services réels avant de décider du consentement nécessaire |

### Exécution et limites des vérifications

| Vérification | Résultat le 2 octobre 2026 |
|---|---|
| `npm run check` | TypeScript et ESLint réussis ; 4/4 tests unitaires réussis ; première tentative de build échouée sur ENOSPC |
| `npm run build` relancé | Réussi : compilation, TypeScript et génération des 33 entrées/pages statiques annoncées par Next |
| `npm run brand:check -- --local` | Réussi, copies de la vitrine vérifiées ; pas de synchronisation des dépôts voisins |
| `npm audit --omit=dev --json` | Une alerte critique sur Next 16.3.5 ; contexte A04 ; aucun correctif appliqué |
| `npm run test:e2e` | 5 réussites / 6 ; premier scénario mobile en timeout de navigation à 5 s |
| Relance `--grep 'dark default'` | 1/1 réussi sans changement de code ; pas de prétention que le premier lot était entièrement vert |
| API locale sans credentials | Valide → 503 ; honeypot → 200 ; nom court, message court, >4000 caractères, enum inconnu et JSON invalide → 400 |
| Handler isolé, fournisseur simulé | 8 demandes → 8 appels ; origine tierce/text/plain acceptés ; idempotency header propagé ; pas de signal abort ; 401/429/500/réseau → 502 |
| Sondes sur `next start`, port 3921 | A05/A06/A07/A12 reproduits ; aucune transmission externe |
| Axe complémentaire | 7 pages × 2 thèmes, viewport 390 px : aucune violation après stabilisation, tags WCAG 2 A/AA, 2.1 AA et 2.2 AA ; ne couvre pas automatiquement toute la page hors écran ou un lecteur d’écran réel |
| Responsive complémentaire | Accueil sans débordement horizontal aux largeurs 320, 390, 768 et 1440 px |
| Public HTTPS | Accueil 200, redirection vers `www`, HSTS ; pages commerciales et cinq destinations de produits consultées en 200 ; URL inconnue en 404 |
| Livraison, Google OAuth, DNS d’envoi | Non testés ; aucune authentification ou intervention de production |
| Sécurité avancée | Pas de pentest, scan historique de secrets, test d’exploitation de la CVE, charge ou simulation de panne réelle |

La première erreur ENOSPC est un incident local, pas un défaut du code. Un relevé disque ultérieur indiquait environ 8,7 Gio disponibles, puis le build a réussi sans suppression de fichiers utilisateur ; la cause exacte de l’incident transitoire n’est pas établie.

Les ressources JavaScript observées sur l’accueil optimisé totalisent environ **690 Ko décodés** et les deux polices environ **73 Ko**. Ce relevé a été fait avec cache navigateur chaud : les valeurs de transfert à zéro ne mesurent pas le téléchargement initial. Aucun score Lighthouse ou débit mobile n’est inventé. Mesurer à froid avec compression et profil réseau représentatif avant de fixer un budget.

Les sondes complémentaires sont conservées dans [browser-probes.cjs.txt](/Users/yoannandrieux/Projets/yodev/docs/audits/evidence-2026-10-02/browser-probes.cjs.txt) et leurs résultats dans [browser-probes.json](/Users/yoannandrieux/Projets/yodev/docs/audits/evidence-2026-10-02/browser-probes.json). Le script est archivé en `.txt` pour ne pas entrer dans les sources applicatives ; le copier dans un fichier `.cjs` temporaire et le lancer depuis la racine du dépôt. Il attend le build local au port 3921, avec les credentials d’envoi neutralisés ; il est un outil d’audit ponctuel, pas une nouvelle suite CI. Les premières erreurs de harnais (contexte Axe puis sélecteur alert ambigu) ont été corrigées dans ce script temporaire avant la passe complète réussie ; aucun changement du produit.

## 5. Recommandations produit et UI/UX

Ces propositions sont **stratégiques ou éditoriales**, distinctes des défauts A01–A14.

1. **Conserver une vitrine simple.** Le site remplit un rôle de découverte et qualification. Comptes, tunnel d’onboarding ou paiement intégré ajouteraient de la friction sans besoin démontré.
2. **Faire apparaître deux intentions de contact.** « Discuter d’une prestation » et « Découvrir Ads/Spend » peuvent partager le même formulaire, avec contexte visible et sélection corrigeable. Bénéfice : moins de requalification et promesse plus cohérente.
3. **Renforcer les preuves avant d’ajouter des slogans.** Les réalisations distinguent déjà mission client et produit personnel. Ajouter, après validation du propriétaire, des liens vers les réalisations publiques et de courts cas : problème, contribution exacte, résultat vérifiable. Ne pas inventer de chiffres ni de témoignages.
4. **Réévaluer la place de “Mes produits” en haut de l’accueil.** Si l’objectif prioritaire est la prestation, tester une preuve client avant les produits ; si l’objectif est l’acquisition SaaS, assumer cette priorité et fournir des critères d’accès plus précis. Décision à prendre sur l’objectif commercial, pas sur un goût graphique.
5. **Rapprocher le formulaire du haut sur mobile.** Le cumul d’espacements de la page Contact laisse une grande zone vide avant le titre et repousse les premiers champs sous l’écran initial. Réduire ce cumul est un ajustement visuel, pas un blocage fonctionnel. Garder organisation et budget facultatifs.
6. **Clarifier l’après-envoi.** Remplacer « Réessayer » après un succès par « Envoyer une autre demande ». Annoncer un délai de réponse uniquement s’il peut être tenu. Prévoir la continuité de saisie lors d’un changement de langue ou avertir d’une navigation qui la perd ; le changement actuel recharge la page.
7. **Mesurer une conversion utile et sobre.** Compter demandes acceptées, erreurs, délai de traitement et origine produit ; éviter contenu du message et identité du prospect dans l’analytics. Les clics sur un bouton ne remplacent pas les demandes effectivement reçues. Valider le cadre de mesure avant d’ajouter un outil ou un bandeau.
8. **Conserver la direction graphique.** Typographie, thèmes et hiérarchie sont cohérents ; pas de justification à une refonte complète. Préférer une simplification des animations et quelques corrections de parcours.

## 6. Plan d’action ordonné

Les efforts sont en jours-personne de travail concentré. Certaines vérifications peuvent se faire dans le même lot ; ne pas additionner mécaniquement toutes les lignes aux estimations du verdict.

| Étape | Livrable concret | Dépendances | Effort | Critère de sortie |
|---|---|---|---|---|
| 0 — Cadrage opérationnel | Identifier déploiement/commit, staging, destinataire de test, propriétaire des alertes et règles de rétention | Accès et décisions du propriétaire | 0,25–0,5 j | Matrice d’environnement documentée sans secrets |
| 1 — Sécurité de base | A02, A04 ; prouver les protections edge existantes avant d’en ajouter | Étape 0 | 0,75–1,5 j | Audit corrigé/trié ; limite de quota testée avec fournisseur simulé |
| 2 — Contact fiable | A05–A08, notice A03, qualification A06 | Étape 0, contrats API | 1–2 j | Erreurs précises, contexte conservé, timeout et concurrence maîtrisés |
| 3 — Recette de lancement | A01, tests automatisés utiles A09, alertes et rollback minimal | Étapes 1–2, autorisation d’envoi de test réel | 0,5–1 j + attente | Message réellement reçu, panne détectée, procédure de retour arrière exécutable |
| 4 — Fiabilisation éditoriale | A10–A12 et 404 | Étape 3 ; textes validés | 1–1,5 j | Métadonnées distinctes, pages pré-rendues, légal lisible sans JS |
| 5 — Exploitation durable | A14, CI stable, gestionnaire unique, runbook de sauvegarde/restauration | Comptes hébergeur et messagerie | 1–1,5 j | Exercice en staging, propriétaire et fréquence de revue définis |
| 6 — Conversion et performance | Preuves client, intention produit, mesure à froid et terrain | Objectif commercial et trafic | 1–2 j | Hypothèse testable et métriques utiles ; pas de refonte sans preuve |

**Gestion des dépendances et documents :** le README utilise `npm ci` alors que `check` et la CI requièrent pnpm ; deux lockfiles sont présents. Ils sont alignés sur Next 16.3.5 lors de cet audit, donc aucun écart de version n’est affirmé. Choisir un gestionnaire, documenter Node 24 et pnpm si conservé, puis éliminer le second lockfile dans une intervention distincte. Mettre aussi à jour le document de validation de septembre, dont l’ancien signalement Next 16.1.0 ne décrit plus l’état actuel.

## 7. Checklist de lancement vérifiable

### Bloquants et recette métier

- [ ] Commit candidat et déploiement de préproduction identifiés ; variables publiques pointant vers le bon domaine ; aucune clé d’envoi de production utilisée par les tests.
- [ ] A01 : demande FR puis EN réellement reçue dans la boîte de test autorisée, avec reply-to et contexte exacts.
- [ ] A02 : limite anti-abus testée avant fournisseur, rejet 429, reprise après fenêtre, preuve du fonctionnement sur plusieurs instances ou à l’edge.
- [ ] A03 : information FR/EN approuvée, notice près du formulaire, durée et procédure d’effacement appliquées.
- [ ] A04 : dépendance corrigée et routes d’images revalidées ; toute alerte restante explicitement évaluée.
- [ ] Nom/message aux limites, espaces, email malformé, enum inconnu, corps excessif et JSON invalide testés ; erreurs compréhensibles.
- [ ] Timeout, perte réseau, refus fournisseur, quota atteint, double clic, répétition, édition en cours d’envoi et rechargement après réponse perdue contrôlés avec mocks.
- [ ] Ads/Spend FR/EN arrivent au formulaire avec le bon contexte et le transmettent.
- [ ] Réception et procédure humaine de réponse ont un responsable désigné ; canal email direct confirmé.

### Qualité, affichage et acquisition

- [ ] TypeScript, lint, tests métier, build, contrôle de marque local et E2E sur build optimisé passent depuis une installation propre.
- [ ] Échec mobile à froid expliqué ou rendu stable sans masquer les défauts avec des retries illimités.
- [ ] FR/EN, thèmes, clavier, focus après erreur, 320/390/768/1440 px et zoom contrôlés ; au moins un essai lecteur d’écran.
- [ ] Contact et pages légales testés sur Safari iOS et Chrome Android ; politique lisible si JavaScript échoue.
- [ ] Robots, sitemap, canonical, titres distincts, images sociales et redirections historiques contrôlés sur l’hôte final.
- [ ] Destinations Mail/Ads/Spend testées sans confondre HTTP 200 et parcours métier réussi ; statuts d’accès validés par les responsables produits.
- [ ] Mesure à froid sur connexion mobile représentative et budget de performance établi ; aucun seuil arbitraire appliqué à un build de développement.

### Surveillance, incident et reprise

- [ ] Contrôle de disponibilité de l’accueil et du contact ; erreur/latence/quota email visibles ; alerte acheminée vers un canal réellement surveillé.
- [ ] Test d’alerte en staging réalisé ; le destinataire confirme qu’il sait identifier la panne grâce au request ID, sans données personnelles dans les logs.
- [ ] Runbook court : symptômes, diagnostics, fournisseur à consulter, moyen de limiter les abus et contact de secours.
- [ ] Sauvegarde du code et des contenus par dépôt distant vérifiée ; inventaire sécurisé des paramètres de déploiement et procédure de restauration des secrets, sans les placer dans Git.
- [ ] Politique de conservation de la boîte email et des données fournisseur définie ; export/restauration testés sur données synthétiques si cette messagerie constitue l’archive des demandes.
- [ ] **Restauration :** reconstruire le candidat depuis le commit/tag et le lockfile retenu en staging, réinjecter les paramètres autorisés, contrôler pages et route contact. Pas de restauration SQL à prévoir pour ce dépôt.
- [ ] **Rollback :** identifier un déploiement précédent sûr, exécuter un exercice en staging, contrôler URL, langues, formulaire et variables ; éviter de revenir à une version comportant une vulnérabilité connue. Prévoir un redéploiement corrigé si le précédent candidat est vulnérable.
- [ ] RTO/RPO définis avec le propriétaire. Proposition à discuter pour cette vitrine : retour du site en moins d’une heure et absence de perte des emails déjà reçus ; ces valeurs ne sont pas vérifiées ni garanties ici.
- [ ] Instruction distincte obtenue avant tout déploiement, modification de production ou envoi réel de recette.

## 8. Inconnues, accès manquants et décisions nécessaires

| Inconnue / décision | Pourquoi elle compte | Preuve attendue |
|---|---|---|
| Correspondance commit / production | Éviter de certifier un code différent de celui servi | Identifiant de déploiement et SHA |
| Projet Vercel, réglages d’environnements, restrictions de preview | Vérifier isolation, protections et procédure de sortie | Lecture de configuration, sans export de secrets |
| Règles WAF / quotas existants | A02 pourrait déjà être partiellement couvert à l’edge | Règle et test staging sur `/api/contact` |
| Configuration Resend et DNS d’envoi | A01 reste ouvert sans réception réelle | Domaine vérifié, événement fournisseur et réception du test autorisé |
| Alertes et historique d’incidents | L’absence de code dédié ne dit pas ce qui est configuré hors dépôt | Test d’alerte, destinataire et runbook |
| Rétention des messages et contrats prestataires | Compléter A03 et les opérations d’effacement | Durées, destinataires et garanties applicables validés |
| Objectif commercial principal | Arbitrer placement produits/réalisations et qualification | Priorité prestation ou acquisition produit, cible et résultat attendu |
| Niveau de trafic / budget | Dimensionner quotas et capacité sans complexité gratuite | Volume cible, pic plausible, limite de dépense acceptée |
| Connexion Google évoquée | Aucune implémentation correspondante ici | Produit et URL concernés, comptes synthétiques/rôles, environnement autorisé ; audit séparé |
| Engagements des pages produits | Une landing page ne prouve pas chiffrement, isolation ou disponibilité réelle | Validation technique dans chaque dépôt et environnement correspondant |
| Accessibilité réglementaire applicable | Dépend du statut, de l’activité et du marché | Validation spécialisée si nécessaire ; aucune certification délivrée ici |

**Décision de lancement recommandée :** conserver la vitrine et son architecture, résoudre les P1, intégrer la maintenance de sécurité et les corrections du contact dans le même lot, puis effectuer la recette réelle autorisée et un exercice de retour arrière. Les pages qui chargent, les tests locaux et un build réussi constituent des preuves utiles ; ils ne remplacent pas la validation de réception ni l’organisation de l’exploitation.

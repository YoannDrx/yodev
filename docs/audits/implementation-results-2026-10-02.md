# Mise en œuvre de l’audit — résultats du 2 octobre 2026

## État livré

Les corrections applicatives de l’audit sont implémentées sur `codex/production-readiness`, à partir de `e5fa20d`. Le périmètre reste la vitrine. Aucun compte, connexion Google, paiement, base métier ou refonte des applications produits n’a été ajouté.

**Le code est vérifié localement ; le lancement réel n’est pas encore validé.** Le formulaire exige désormais un Redis REST partagé. Les trois variables correspondantes sont absentes du projet Vercel consulté ; le garde de build empêche la mise en ligne d’un candidat incomplet. La réception email réelle, l’acheminement des alertes, l’application de la rétention et l’exercice de restauration restent à prouver sur les services externes.

Le [plan](implementation-plan-2026-10-02.md), l’[audit initial](production-readiness-2026-10-02.md) et le [guide d’exploitation](../operations.md) sont conservés séparément pour distinguer les constats initiaux de la livraison.

## Traitement des constats

| Audit | Livraison | Validation / limite |
|---|---|---|
| A01 — réception | Script de recette sans envoi par défaut, identifiant corrélé, procédure FR/EN, reply-to, unicité, event fournisseur et réception | Branches fournisseur testées localement. Les paramètres email existent dans Vercel mais aucun email réel n’a été envoyé. |
| A02 — abus | Quotas partagés atomiques Redis par IP/adresse + globaux, HMAC, TTL, 429/Retry-After, corps borné, JSON et origine contrôlés | Redis jetable réel : concurrence entre deux instances, seuils IP/email/global, expiration, refus sans prolongation. Redis distant à configurer. WAF non vérifié. |
| A03 — confidentialité | Notice près de l’envoi, politique FR/EN détaillée, droits/CNIL, prestataires/transferts, rétention et procédure d’effacement | Lecture/accessibilité vérifiées ; TTL imposé par code. Politique de boîte/logs et contrats à appliquer/vérifier dans les outils réels. |
| A04 — dépendance | Next.js et configuration ESLint 16.3.6 verrouillés, pnpm unique | Audit runtime sans vulnérabilité connue, build et sept routes d’images passent. |
| A05 — validation | Règles partagées navigateur/serveur, nom d’un caractère admis, message validé après trim, erreurs par champ et focus | Tests unitaires et navigateur, y compris entrée blanche/trop courte et champs malformés. |
| A06 — intention produit | Sélection visible et modifiable, contexte conservé depuis tous les CTA produit, payload et email adaptés | Parcours Spend→contact→EN→succès ; validation serveur pour les trois produits. |
| A07 — attente et saisie | Délais sur corps/Redis/fournisseur/client, verrouillage des champs, idempotence de nouvelle tentative, avertissement changement de langue | Délai client simulé, timeout fournisseur, champs désactivés puis réactivés, même UUID au retry, session nettoyée au succès. |
| A08 — diagnostic | Événements JSON allowlistés : code, durée, identifiants et origine produit ; catégories de panne fournisseur privées | Tests prouvent l’absence du nom/email/message/clé dans les événements applicatifs. Seuils/canal d’alerte décrits, non configurés à distance. |
| A09 — CI | Types, lint, 26 tests unitaires, marque locale, build, Redis, audit runtime et 15 E2E ; traces d’échec | Commandes équivalentes passées localement. Workflow distant non exécuté tant que la branche n’est pas poussée. |
| A10 — acquisition | Titres/descriptions/canonical/alternates spécifiques, URL canonique partagée avec sitemap/robots | 14 pages éditoriales vérifiées au navigateur, 20 routes contrôlées par le smoke. |
| A11 — rendu | Locale explicitement fixée dans chaque page, contenus éditoriaux pré-rendus ; messages inutiles retirés du provider client | Build marque les pages éditoriales `●` ; les handlers de contact et images restent dynamiques selon leur fonction. |
| A12 — sans JS | Animations bloquantes retirées des pages légales ; formulaire désactivé tant que JS n’est pas prêt, email de secours visible | Pages légales lisibles sans JS, contact sans soumission GET des champs personnels. |
| A13 — erreurs | Vraies 404 FR/EN avec liens utiles, erreurs de segment localisées, secours global bilingue | Statuts 404 et contenu localisé testés. Les error boundaries compilent ; aucune panne artificielle ajoutée à la production pour les déclencher. |
| A14 — en-têtes | CSP, anti-framing, nosniff, referrer-policy, permissions-policy, retrait X-Powered-By | En-têtes et absence d’erreur CSP/runtime vérifiés sur pages éditoriales. CSP compatible pré-rendu, avec inline nécessaire à Next ; ce n’est pas une politique nonce stricte. |

## Ajustements produit et performance

L’accueil donne la priorité aux prestations : promesse, réalisations, expertises, méthode, produits, contact. Les réalisations ont des liens publics vérifiés, sans chiffres ni témoignages inventés. La direction graphique et les deux thèmes sont conservés. Le formulaire est rapproché du haut de la page ; organisation et budget restent facultatifs.

La demande produit est distincte d’une prestation et peut être corrigée par l’utilisateur. Son titre et les étapes suivantes décrivent l’usage et les conditions d’accès, sans évoquer un devis de prestation. « Envoyer une autre demande » remplace le libellé de nouvelle tentative après succès. Aucun délai de réponse commerciale non validé n’est promis. Les statistiques possibles reposent sur les acceptations dédupliquées et les erreurs serveur, sans nouvel outil publicitaire.

Les encadrés du formulaire n’utilisaient aucune animation malgré leur dépendance à Framer Motion. Leur remplacement par des éléments HTML conserve le style et retire **111 461 octets de JavaScript décodé** et **36 185 octets transférés** de la mesure du candidat. Les composants historiques non utilisés ne sont pas refactorés dans ce lot.

Mesure à froid du build final, cache Chromium désactivé, viewport 390×844, réseau émulé 1,6 Mbit/s descendant / 750 kbit/s montant, latence 150 ms et CPU ralenti ×4 :

| Indicateur | Mesure de référence |
|---|---:|
| JavaScript décodé | 623 418 octets |
| JavaScript transféré | 197 110 octets |
| Transfert total observé | 313 182 octets |
| LCP observé | Environ 0,73 s |
| CLS observé | 0,033 |

Le [fichier de mesure](implementation-evidence-2026-10-02/cold-mobile-metrics.json) contient les valeurs exactes de la dernière passe. Le serveur est local : ces durées ne sont ni un score Lighthouse ni une preuve de vitesse de production ou de téléphone réel. Le TTFB local n’est pas extrapolé à Vercel. Le relevé initial de l’audit utilisait un cache chaud : seule la comparaison entre les deux mesures à froid du candidat est utilisée pour le gain chiffré ci-dessus.

Budgets de non-régression ajoutés à la CI après mesure : **700 000 octets JS décodés** et **225 000 transférés**, soit environ 13–14 % de marge. Les timings restent informatifs pour éviter de dépendre des performances variables d’un runner. Les objectifs de terrain LCP/INP/CLS et les choix de RUM demandent encore une mesure sur l’hôte final et du trafic représentatif.

## Vérifications exécutées

| Contrôle | Résultat |
|---|---|
| `pnpm install --frozen-lockfile --ignore-scripts` | Lockfile cohérent et installation locale à jour ; les dépendances étaient déjà installées. Ce n’est pas une installation sur machine vierge. |
| `pnpm check` | Types générés Next, TypeScript, ESLint, 26 tests, marque locale et build réussis. |
| `pnpm test:redis` | 4 tests réussis sur Redis réel jetable sans TCP/persistance ; aucune base existante modifiée. |
| `pnpm audit:runtime` | Aucune vulnérabilité connue trouvée au moment du contrôle. |
| `pnpm test:e2e`, puis passe finale `pnpm exec playwright test` | Build optimisé et 15 scénarios Chromium distincts réussis ; la passe finale ajoute le smoke HTTP et le budget mesuré. |
| Smoke HTTP intégré | 20 pages FR/EN, sitemap, robots et deux 404 ; aucun POST ni email. |
| `pnpm readiness` sans environnement local | Échec attendu : noms des variables absentes affichés, jamais leurs valeurs. Les tests du garde vérifient également succès et refus de configurations malformées. |
| `pnpm contact:smoke --url https://preview.example --locale fr` | Simulation, aucune requête réseau. |
| `git diff --check` | Réussi. |

La suite couvre 320/390/768/1440 px, thèmes, clavier, langues, redirections, produits, images, validation, erreur serveur réelle 503, succès simulé, idempotence, timeout, changement de langue, métadonnées, CSP, absence de JS et contrôles Axe WCAG 2 A/AA sur les pages testées. Axe ne remplace pas un audit complet avec technologies d’assistance. Aucun email réel ni appel au Redis distant n’est utilisé par ces tests.

Des erreurs du harnais ont été corrigées pendant la mise au point (libellé anglais exact et sélection de l’alerte du formulaire plutôt que l’annonceur Next). Le test sans JavaScript a également conduit à rendre l’avertissement de secours disponible tant que l’application n’est pas initialisée. Aucun échec n’est masqué par un skip ou un retry global.

Preuves conservées : [sortie navigateur](implementation-evidence-2026-10-02/browser-check.txt), [accueil ordinateur](implementation-evidence-2026-10-02/home-desktop-dark.png), [accueil 320 px](implementation-evidence-2026-10-02/home-mobile-light.png), [contact produit 320 px](implementation-evidence-2026-10-02/contact-product-320.png). Les captures et vérifications initiales de l’audit restent dans leur dossier historique.

## Contrôles externes et suite de livraison

La lecture Vercel via le connecteur a permis d’identifier le déploiement de production et son SHA. L’outil de détail projet présentait une erreur de schéma ; la CLI authentifiée a permis la lecture du projet, des noms de variables et des domaines, avec sortie filtrée sans valeurs. Node 24.x et le domaine principal `www.yodev.fr` sont confirmés. Les paramètres Resend existent en preview/production. Les règles WAF n’ont pas pu être lues, donc aucune couverture edge n’est revendiquée.

La configuration Redis est préparée dans `.env.example`. En l’absence de choix de service et de credentials dédiés, aucun service n’est créé ni acheté et aucun secret n’est réutilisé depuis les applications voisines. Le déploiement doit attendre cette configuration et sa recette. Les nouvelles valeurs ne sont pas présentes dans Vercel au terme du contrôle.

À terminer sur les outils réels avant lancement :

1. Configurer Redis REST et le secret HMAC par environnement, vérifier les permissions et la disponibilité ; confirmer l’isolation du destinataire de preview.
2. Effectuer la recette email FR/EN, une nouvelle tentative identique, vérifier livraison fournisseur, boîte et reply-to.
3. Appliquer la rétention de boîte/logs, valider les prestataires et tester les droits sur une demande synthétique.
4. Configurer et recevoir une alerte de test ; exécuter un exercice staging de restauration/retour arrière depuis un candidat sûr.
5. Vérifier sur Safari/iOS et un appareil réel, puis promouvoir le candidat après validation. Les produits et leurs parcours Google/OAuth restent hors de cette livraison.

Aucun push, déploiement, changement de secret, email réel ou rollback de production n’a été effectué. Le précédent déploiement identifié contient la version Next signalée par l’audit : ne pas le considérer comme un retour arrière sûr sans le correctif.

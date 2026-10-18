# Exploitation de la vitrine Yodev

Ce guide concerne exclusivement le dépôt `yodev`, pas les applications Mail/Ads/Spend. Responsable proposé et point de contact : Yoann Andrieux, `hello@yodev.fr`. La supervision doit aboutir à un canal qu’il consulte ; le code ne crée ni abonnement de supervision, ni alerte chez un tiers.

## État connu au 2 octobre 2026

Lecture seule de Vercel : projet `yodev`, Node 24.x, domaine principal `www.yodev.fr`, `yodev.fr` redirige vers celui-ci, domaines vérifiés. Dernier déploiement de production listé : `dpl_GXkbBqXfDPqMTbYx6CP1iSqbkX9S`, commit `e5fa20dca2152e3e77fdaa3de99e723c876e764c`. La nouvelle branche n’est pas déployée. Les previews sont protégées par l’authentification Vercel hors domaines personnalisés.

Les noms `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL` et `NEXT_PUBLIC_SITE_URL` existent pour preview et production. Leur présence ne valide pas leurs valeurs, les DNS, le destinataire ou la livraison. Aucune valeur secrète n’a été affichée ou modifiée. Les trois variables `CONTACT_REDIS_REST_URL`, `CONTACT_REDIS_REST_TOKEN`, `CONTACT_RATE_LIMIT_SECRET` sont absentes. La lecture des règles WAF n’a pas abouti : aucune protection existante n’est présumée suffisante.

Le garde de build `vercel.json` empêchera le nouveau candidat de se déployer avec une configuration incomplète. Il contrôle la forme des variables ; une authentification erronée ou un prestataire indisponible restent à détecter en recette.

## Configuration et isolation

| Variable | Rôle | Règle |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap, origine navigateur autorisée | Origine HTTPS sans chemin ; `https://www.yodev.fr` pour la vitrine. Injectée au build et au runtime. |
| `RESEND_API_KEY` | Envoi serveur | Clé limitée au domaine/usage nécessaire ; coffre de secrets, jamais variable publique. |
| `RESEND_FROM_EMAIL` | Expéditeur fixe | Domaine validé chez Resend ; vérifier SPF/DKIM et politique DMARC. |
| `CONTACT_EMAIL` | Boîte destinataire fixe | Boîte surveillée en production ; boîte de recette autorisée en preview. |
| `CONTACT_REDIS_REST_URL` | API Redis REST | HTTPS, compatible `EVAL`, token serveur. Choisir région et contrat adaptés. À défaut : `UPSTASH_REDIS_REST_URL`, puis `KV_REST_API_URL`. |
| `CONTACT_REDIS_REST_TOKEN` | Autorisation Redis | Base dédiée ou permissions minimales sur le préfixe Yodev ; EVAL/GET/INCR/EXPIRE/TTL. À défaut : `UPSTASH_REDIS_REST_TOKEN`, puis `KV_REST_API_TOKEN` ; jamais le jeton en lecture seule. |
| `CONTACT_RATE_LIMIT_SECRET` | HMAC IP/email et namespace | Au moins 32 caractères aléatoires, distinct par environnement ; gestionnaire de secrets. |
| `CONTACT_TRUSTED_IP_HEADER` | IP hors Vercel | Seulement un header écrasé par l’ingress ; jamais un header client transmis tel quel. Vide sous Vercel. |
| `NEXT_PUBLIC_BOOKING_URL` | Calendrier facultatif | URL publique HTTPS. Absente : carte masquée. |

Sur Vercel, `VERCEL=1`, `VERCEL_ENV` et `VERCEL_URL` viennent de la plateforme. L’IP provient uniquement de `x-vercel-forwarded-for`. Sans ingress de confiance, toutes les requêtes partagent volontairement le seau `unknown` ; le contrôle readiness refuse cette configuration hors Vercel.

Avec l’intégration Upstash du Marketplace Vercel, connecter une base à l’environnement Production et une autre à Preview : Vercel injecte lui-même l’URL et le jeton, sans copie manuelle. Seul `CONTACT_RATE_LIMIT_SECRET` reste à saisir, avec une valeur distincte par environnement.

Créer ou utiliser un Redis REST dédié en préproduction et production. Ne pas réutiliser les secrets des produits. Choisir le fournisseur, sa région, son budget et ses garanties avant activation. Aucune base payante n’est créée par le dépôt. La compatibilité cible est le protocole [Redis REST documenté par Upstash](https://upstash.com/docs/redis/features/restapi) ; aucune dépendance SDK n’est nécessaire. Les tests locaux évaluent le même Lua dans Redis réel mais ne valident pas le contrat du fournisseur distant.

Renseigner les valeurs dans le coffre ou le tableau de bord Vercel (valeurs sensibles), puis `pnpm readiness` dans un environnement autorisé. Ce script ne fait aucun appel réseau. Ne pas exporter les valeurs dans des logs CI. Vérifier que preview n’utilise pas la boîte ou le Redis de production. Les compteurs sont aussi séparés par namespace d’environnement.

## Limites et contrat du contact

- 5 tentatives par IP / 15 minutes, 3 par adresse / 15 minutes, 100 globales / heure, 500 globales / jour. Fenêtres fixes à partir du premier appel ; refus sans prolongation. Ces seuils sont des valeurs initiales, à adapter au trafic constaté avec tests.
- Les tentatives acceptées par le limiteur consomment les quotas, même si le prestataire échoue. Un retry conserve l’idempotence d’envoi mais consomme une tentative. Le quota global protège aussi contre la rotation des IP/adresses.
- JSON uniquement, 32 Kio maximum avant parsing, lecture 5 s, Redis 2 s, fournisseur 8 s, client 18 s, fonction 20 s. Nom/email/organisation/message ont leurs propres bornes partagées.
- Réponse 400/413/415 : entrée à corriger ; 403 : origine refusée ; 429 : attendre `Retry-After` ; 503 : configuration ou limiteur indisponible ; 502/504 : prestataire ou délai. La saisie reste présente après erreur. Le contact direct reste disponible.
- UUID de demande aléatoire, propagé dans `X-Contact-Request-Id` et `Idempotency-Key`. La même demande garde son ID après interruption ; le stockage de session contient seulement ID et empreinte, valables 23 h. Resend documente une [fenêtre d’idempotence de 24 h](https://resend.com/docs/dashboard/emails/idempotency-keys). Au-delà, contrôler d’abord l’historique avant un nouvel envoi.
- Les champs sont verrouillés pendant l’envoi. Un changement de langue prévient avant de perdre une saisie. Sans JavaScript, formulaire désactivé et email direct disponible ; aucune soumission par GET contenant les champs personnels.
- Aucun anti-bot complexe ajouté tant que les compteurs et protections edge suffisent. En cas d’attaque massive, utiliser également le WAF : le quota applicatif ne limite pas le coût des invocations ni les requêtes refusées avant Redis.

## Recette email réelle — à effectuer en préproduction

1. Confirmer l’URL du candidat, son SHA, le domaine Resend vérifié et la boîte `CONTACT_EMAIL` de test. Confirmer aussi la boîte `CONTACT_TEST_REPLY_TO`. Les domaines produits ne font pas partie de cette recette.
2. Exécuter `pnpm smoke --url https://adresse-du-candidat --canonical https://www.yodev.fr`. Une preview protégée nécessite une session ou un accès de recette configuré ; ne pas désactiver la protection globale. Le script n’envoie aucun email.
3. D’abord prévisualiser : `pnpm contact:smoke --url https://adresse-du-candidat --locale fr`. Il n’effectue aucun appel réseau sans `--send`.
4. Avec autorisation d’envoi et la variable d’environnement `CONTACT_TEST_REPLY_TO` renseignée de façon sécurisée, exécuter la même commande avec `--send`. L’API envoie au destinataire fixe de l’environnement. Noter le request ID affiché. Pour une preview protégée, réaliser le même scénario dans le navigateur authentifié ; le script ne contourne pas cette protection.
5. Refaire en EN. Vérifier les informations service/produit, le message texte/HTML et le reply-to dans la boîte. Vérifier côté Resend l’événement `delivered` ; `accepted` dans l’application ne suffit pas. Vérifier le classement courrier indésirable et la possibilité de répondre au demandeur synthétique.
6. Pour un seul scénario, réexécuter à l’identique avec `--id` et le même UUID, dans les 23 h. Confirmer un seul email reçu. Deux langues + un retry atteignent le quota par adresse de cette fenêtre : ne pas multiplier les tests de production.
7. Tester le refus fournisseur et l’alerte dans un environnement isolé avec une clé de test invalide, puis restaurer la configuration de preview. Vérifier saisie conservée et journal sans PII. Les tests locaux automatisés couvrent déjà ces branches sans fournisseur réel.
8. Consigner SHA, heure UTC, langue, ID, acceptation API, événement de livraison, réception, unicité et reply-to. Ne pas archiver le contenu personnel ni les secrets dans Git. Effacer les données synthétiques selon la procédure ci-dessous.

Le délai de réponse commerciale ne figure pas dans le site tant qu’il n’est pas adopté par le responsable. Objectif interne proposé : examiner la boîte chaque jour ouvré et consigner séparément heure de réception/première réponse ; il ne constitue pas une promesse client.

## Mesure et alertes

Chaque tentative produit un événement JSON `event=contact` avec `requestId`, `outcome`, `status`, `durationMs`, éventuellement `providerStatus`, `providerId` et `product`. Aucun nom, IP, email, message ou corps fournisseur n’est journalisé par ce code. Restreindre l’accès aux logs et aux identifiants de corrélation ; ne pas activer la capture du corps HTTP dans un drain externe.

| Signal à configurer dans la supervision | Seuil initial proposé | Action |
|---|---|---|
| GET `/fr`, `/en`, `/fr/contact` | Toutes les 5 min ; 2 échecs consécutifs | Alerte disponibilité, vérifier déploiement/DNS. |
| `CONTACT_NOT_CONFIGURED`, `limiter_unavailable`, `provider_auth` | Dès la première occurrence | Alerte de configuration ; contrôler noms/permissions/expiration des clés. |
| `provider_error`, `provider_network`, `provider_timeout`, `provider_invalid_response` | 3 événements en 5 min | Consulter l’état du fournisseur, corréler IDs, prévenir le responsable. |
| `provider_quota` | Dès la première occurrence | Contrôler quota/budget fournisseur, pas de retry en boucle. |
| `RATE_LIMITED` | 10 refus en 15 min ou hausse inhabituelle | Distinguer recette, pic légitime, abus ; activer règle edge si nécessaire. |
| Durée d’appel | P95 > 5 s sur au moins 20 demandes | Vérifier Redis et Resend ; ne pas augmenter les délais sans diagnostic. |
| Événements Resend `bounced`, `complained`, échecs différés | Dès la première occurrence vers la boîte fixe | Corriger la délivrabilité ; un succès API ne détecte pas ces erreurs. |

Configurer le canal du propriétaire et son suppléant dans le fournisseur de supervision retenu ; ne pas coller les données de formulaire dans les notifications. Faire une panne synthétique en staging et faire confirmer la réception de l’alerte. **Aucun canal ni alerte externe n’est créé ou testé par cette livraison.**

Pour la conversion : compter les `accepted` distincts par request ID, ventilés par `product` (`services`, `mail`, `ads`, `spend`). Dédupliquer les replays. Rapprocher ces acceptations des événements Resend `delivered`, puis du traitement en boîte. Le taux de succès du formulaire se calcule sur demandes valides tentées, hors honeypot ; ne pas présenter un taux de conversion visite→lead sans mesure des visites. Aucun nouvel outil publicitaire ou analytics client n’est installé.

## Rétention, droits et effacement

La politique FR/EN proposée par ce lot fixe : demandes sans relation commerciale supprimées au plus tard 12 mois après le dernier échange, logs applicatifs limités à 30 jours, compteurs Redis entre 15 min et 24 h. Le code impose le TTL Redis. La durée de la boîte et des logs d’hébergement **doit être appliquée dans leurs outils**, puis validée avant publication de ces engagements. Les archives contractuelles suivent leurs durées propres : ne pas supprimer des pièces dues à une obligation légale.

Avant lancement, identifier le fournisseur réel de la boîte, la région Redis, les sous-traitants, DPA et garanties de transfert. Le texte mentionne Vercel et Resend ainsi que leurs DPA ; il ne certifie pas un hébergement exclusivement européen. Mettre à jour la politique si le fournisseur Redis retenu ou un drain change les destinataires/garanties. Référence d’information : [CNIL](https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence).

Procédure mensuelle de rétention (propriétaire) : trier les demandes sans contrat par dernier échange, supprimer les éléments expirés de la boîte et de ses dossiers/trash selon les possibilités du fournisseur ; appliquer la règle de rétention aux exports et archives ; contrôler la durée du stockage de logs/drains. Enregistrer date, périmètre et nombre supprimé, sans contenu.

Pour une demande de droits : vérifier l’identité de façon proportionnée, rechercher la correspondance dans la boîte et chez le fournisseur email, examiner les copies/exports/backups, distinguer suppression et obligation de conservation, répondre et consigner la décision. Les quotas ne constituent pas un annuaire : HMAC et TTL, sans contenu. Avec une demande synthétique, tester réception→recherche→export→effacement et noter les délais des copies fournisseur. Aucun effacement de boîte réelle n’est effectué par le dépôt.

## Incident, restauration et retour arrière

1. Identifier le déploiement et SHA servis, l’heure et le request ID, sans demander le texte personnel du prospect. Pour 503, vérifier la configuration et Redis ; pour 502/504, vérifier Resend. Ne pas afficher les secrets avec une commande de diagnostic.
2. Maintenir l’email direct. En cas d’abus, réduire la surface via WAF et les quotas. Ne pas désactiver silencieusement le limiteur ; une panne Redis refuse l’envoi.
3. Vérifier dans Resend si l’ID a été accepté avant de réessayer. Préserver le même UUID dans sa fenêtre d’idempotence. La vitrine ne stocke pas les brouillons ni ne garantit la reprise d’un message jamais reçu.
4. Choisir un déploiement précédent **sûr** ou préparer un correctif. Le déploiement de septembre repéré ci-dessus inclut la version Next signalée par l’audit : ce n’est pas un retour arrière recommandé sans correctif de sécurité.
5. Tester la restauration dans un environnement isolé : checkout du SHA retenu, Node/pnpm verrouillés, installation gelée, configuration réinjectée depuis le coffre, `pnpm check`, `pnpm test:redis`, `pnpm audit:runtime`, `pnpm exec playwright test`, build/deploy staging puis smoke et recette autorisée. Aucun restore SQL n’est nécessaire.
6. Après autorisation de changement de production, promouvoir le candidat validé via le tableau de bord Vercel. Vérifier alias, domaines, FR/EN, canonical et contact ; relever avant/après et le délai de restauration. L’infrastructure et ses secrets ne sont pas restaurés par un rollback de code : vérifier leur compatibilité explicitement.

Sauvegarde : code et contenus versionnés dans le dépôt distant, paramètres/rotation/reprise dans le coffre sécurisé ; pas de secrets dans Git. Redis ne contient que des quotas temporaires et ne nécessite pas de sauvegarde métier. Si la boîte email sert d’archive des demandes, tester export puis restauration d’un message synthétique dans un dossier de test, avec chiffrement, droits limités et rétention des exports. Supprimer le test après vérification.

Objectifs initiaux à adopter : RTO site inférieur à 1 h ; préserver tous les emails déjà reçus. Le RPO dépend des capacités et de la fréquence de sauvegarde de la messagerie ; le site ne peut garantir zéro perte avant livraison. Un exercice staging horodaté doit démontrer ces objectifs. Aucun rollback ou exercice de restauration externe n’a été exécuté dans cette intervention.

## Validation de lancement

- [ ] Redis dédié, clés et environnement configurés ; readiness et test réel d’accès réussis.
- [ ] SHA du candidat et environnement de recette identifiés ; CI distante verte.
- [ ] Réception FR/EN, reply-to et idempotence prouvés en boîte.
- [ ] Rétention de boîte/logs et garanties prestataires cohérentes avec le texte publié.
- [ ] Alertes acheminées, test d’incident reçu, responsable/suppléant confirmés.
- [ ] Restauration/rollback staging chronométrés, backup code et boîte vérifiés.
- [ ] Contrôle Safari/iOS et appareil mobile réel, statut réel des produits validé.
- [ ] Autorisation de promotion en production.

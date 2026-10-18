# Mise en œuvre de l’audit — 2 octobre 2026

Branche : `codex/production-readiness`. Périmètre autorisé : implémentation et vérification des recommandations dans la vitrine. Aucun déploiement ni achat nécessaire aux changements du dépôt.

## Plan

- [x] Lot 1 — Contact : validation partagée, contexte produit, erreurs accessibles, délais, idempotence et verrouillage de saisie ; API bornée, compteurs Redis partagés, journaux sans contenu personnel.
- [x] Lot 2 — Site : confidentialité FR/EN, lecture sans JavaScript, pages pré-rendues, métadonnées, 404/erreurs, en-têtes de sécurité, preuves et parcours de conversion.
- [x] Lot 3 — Qualité : Next.js corrigé, pnpm unique, tests de route/fournisseur/quotas, E2E sur build optimisé, CI et contrôle des dépendances/marque.
- [x] Lot 4 — Exploitation : configuration d’exemple, contrôle de préparation, scripts de smoke test et recette email explicite, runbook de surveillance/rétention/restauration/rollback.
- [x] Validation finale — TypeScript, lint, tests, audit, build, marque, parcours navigateurs FR/EN, mobile, accessibilité et absence de régression.

## Décisions d’implémentation

- Conserver l’architecture et la marque. Les prospects peuvent contacter sans compte.
- Utiliser pnpm (déjà utilisé par la CI), Node 24 et un seul lockfile.
- Conserver les contenus essentiels visibles sans JavaScript ; simplifier les animations des pages légales.
- Limiter les envois avec des compteurs atomiques et temporaires dans un Redis compatible REST ; aucune création de service payant. Le lancement exige sa configuration, sans dégradation silencieuse vers un limiteur local en production.
- Mesurer les demandes et erreurs par événements serveur structurés, sans contenu, adresse email ou IP dans les journaux.
- Donner la priorité aux prestations dans la hiérarchie de l’accueil, tout en conservant les produits accessibles depuis la navigation.
- Préparer la réception réelle, les alertes et le rollback. Ces validations externes seront marquées comme effectuées uniquement sur preuve réelle ; les accès/configurations absents resteront explicitement signalés.

## Suivi

Les quatre lots de code et de documentation sont terminés et vérifiés localement. Voir le [bilan détaillé](implementation-results-2026-10-02.md) et ses preuves.

Restent à exécuter sur les services réels avant lancement : configuration Redis dans Vercel, réception email FR/EN, alertes, application de la rétention, restauration/rollback en staging et validation sur appareil réel. Le garde de build bloque un déploiement privé de la configuration requise. Aucun déploiement ni envoi réel effectué.

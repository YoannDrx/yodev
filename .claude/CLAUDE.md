# CLAUDE.md

---

## ⚡ AUTO-START grepai (à faire automatiquement)

**Dès que tu commences à travailler sur ce projet, lance cette commande en background :**

```bash
~/.local/bin/grepai watch &
```

> Lance cette commande UNE SEULE FOIS au début de la session. Ne la relance pas à chaque question.

---


Ce fichier fournit des instructions à Claude Code pour ce projet.

---

## grepai - Recherche sémantique de code (100% local et gratuit)

**grepai est l'outil principal pour explorer ce codebase.** Il utilise des embeddings locaux (Ollama) pour la recherche sémantique.


### Lancer le watch (à faire à chaque ouverture du projet)

```bash
cd ~/Projets/yodev
~/.local/bin/grepai watch
```

> Garde ce terminal ouvert : il surveille les modifications en temps réel.

### Commande de recherche

```bash
~/.local/bin/grepai search "ta question en langage naturel"
```

### Paramètres

| Paramètre | Description |
|-----------|-------------|

### Ajuster `-m` selon la complexité

| Type de requête | `-m` recommandé |
|-----------------|-----------------|
| Question simple (1-2 fichiers) | 10 |
| Question moyenne (flow, feature) | 20-30 |
| Question complexe (debug, architecture) | 30-50 |

### Règles

- **OBLIGATOIRE** : Utilise grepai pour TOUTE recherche de code. N'utilise JAMAIS grep, Grep tool, ou Glob.
- **Langage naturel** : Parle à grepai comme à un collègue
  - ❌ `"carousel animation framer"` (mots-clés)
  - ✅ `"Comment fonctionne le carousel avec les animations Framer Motion ?"` (question naturelle)

---

## Subagents (Task tool)

**Les subagents n'héritent PAS des instructions de ce fichier.**

Quand tu lances un subagent, copie-colle cette section grepai dans le prompt du subagent.

---

## A propos du projet

**Yodev** - Site/Application de développement.

## Commandes de développement

```bash
pnpm dev          # Serveur de développement
pnpm build        # Compilation production
pnpm start        # Serveur production
pnpm lint         # ESLint
```

---

## Architecture

### Stack technique

- **Framework** : Next.js 16 avec App Router
- **Langage** : TypeScript
- **Styling** : TailwindCSS v4
- **Animations** : Framer Motion
- **i18n** : next-intl
- **Thème** : next-themes
- **Carousel** : Embla Carousel
- **Package Manager** : pnpm

---

## Subagents

**Les subagents n'héritent PAS des instructions de ce fichier.**

Quand tu lances un subagent, copie-colle les instructions grepai dans son prompt.

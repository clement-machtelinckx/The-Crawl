# The-Crawl

The-Crawl est un site Docusaurus dédié à l’aide de jeu :
- règles & lore
- résumés de sessions
- créateur de personnage
- composants utilitaires pour DCC

## Sections principales

- `/rules` : règles & lore
- `/sessions` : résumés de sessions
- `/createur-personnage` : créateur de personnage

## Stack technique

- Docusaurus 3
- React 19
- TypeScript
- recherche locale avec `@easyops-cn/docusaurus-search-local`

## Prérequis

Avant de lancer le projet, vérifie que tu as :

- Node.js `>= 20`
- npm installé

## Installation

Clone le projet puis installe les dépendances :

```bash
git clone https://github.com/clement-machtelinckx/the-crawl
cd the-crawl
npm install
```

## Lancer le projet en local

Pour démarrer le serveur de développement :

```bash
npm run start
```

Le site sera ensuite accessible en local via l’URL affichée dans le terminal.

## Vérification TypeScript

Pour lancer le typecheck :

```bash
npm run typecheck
```

## Build de production

Pour générer le build statique :

```bash
npm run build
```

Le résultat du build est généré dans le dossier :

```bash
build
```

## Lancer le build localement

Pour servir le build de production en local :

```bash
npm run serve
```

Ça permet de tester le site comme en prod.

## Scripts utiles

### Démarrage en dev
```bash
npm run start
```

### Build de production
```bash
npm run build
```

### Servir le build
```bash
npm run serve
```

### Vérification TypeScript
```bash
npm run typecheck
```

### Nettoyer le cache Docusaurus
```bash
npm run clear
```

### Commandes Docusaurus
```bash
npm run docusaurus
npm run swizzle
npm run deploy
npm run write-translations
npm run write-heading-ids
```

## Structure du projet

```bash
.
├── rules/                  # documentation / règles / lore
├── sessions/               # résumés de sessions
├── src/
│   ├── components/         # composants React réutilisables
│   ├── css/                # styles globaux
│   ├── data/               # données du jeu
│   ├── lib/                # logique métier / helpers
│   └── pages/              # pages custom Docusaurus
├── docusaurus.config.ts
├── sidebars.ts
├── package.json
└── tsconfig.json
```

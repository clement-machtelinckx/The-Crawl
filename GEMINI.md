# GEMINI.md

## Objectif

Ce document définit les règles de travail pour intervenir sur **The-Crawl**, un projet **Docusaurus 3** en **React 19** et **TypeScript**, orienté :
- règles & lore
- résumés de sessions
- créateur de personnage
- composants utilitaires liés au jeu

L'objectif est que Gemini agisse comme un contributeur **prudent, cohérent et utile**, en respectant l’architecture existante du projet avant toute préférence personnelle.

---

## Contexte du projet

Le projet est organisé autour de trois axes principaux :

- `rules/` : documentation principale, règles, lore, contenu de référence
- `sessions/` : résumés de sessions sous forme de blog Docusaurus
- `src/` : logique front, composants React, styles, pages custom, données et helpers

Le site est configuré avec :
- **Docusaurus 3**
- **React 19**
- **TypeScript**
- recherche locale avec `@easyops-cn/docusaurus-search-local`

Le projet est en **français** et la locale active est `fr`.

---

## Structure à respecter

### Répertoires principaux

- `rules/` → contenu documentaire principal
- `sessions/` → posts de sessions
- `src/components/` → composants React réutilisables
- `src/pages/` → pages custom Docusaurus
- `src/data/` → données métier
- `src/lib/` → helpers / logique utilitaire
- `src/css/` → styles globaux
- `docusaurus.config.ts` → configuration du site
- `sidebars.ts` → structure de navigation docs

### Rôle des sections

#### `rules/`
Contient les pages de règles, lore, classes, dieux, patrons, magie, critiques, maladresses, etc.

Quand tu modifies ce dossier :
- respecte l’arborescence existante
- garde une structure de titres cohérente
- n’invente pas une nouvelle organisation sans justification forte
- privilégie la continuité éditoriale avec les autres pages voisines

#### `sessions/`
Correspond au blog Docusaurus utilisé comme journal de sessions.

Quand tu modifies ce dossier :
- respecte les conventions de nommage déjà visibles
- conserve le format blog Docusaurus standard
- garde un ton narratif cohérent avec les sessions existantes
- ne transforme pas les sessions en documentation technique

#### `src/`
Contient le code applicatif.

Quand tu modifies ce dossier :
- respecte les patterns React/TypeScript déjà en place
- évite les abstractions inutiles
- privilégie la lisibilité
- ne déplace pas massivement les fichiers sans raison claire

---

## Règles générales de travail

### 1. Préserver l’existant cohérent
Toujours préférer les conventions déjà présentes dans le projet.

- Si un pattern est déjà utilisé plusieurs fois, le réutiliser.
- Ne pas introduire un nouveau style de code ou de rédaction sans besoin réel.
- Ne pas refactorer “par goût personnel”.

### 2. Uniformité avant perfection
Une convention imparfaite mais déjà largement appliquée vaut mieux qu’un mélange de plusieurs conventions.

- Conserver les noms, structures et organisations déjà dominants.
- Harmoniser uniquement quand il existe une incohérence claire et réelle.
- Éviter les changements larges qui n’apportent pas de gain concret.

### 3. Changements ciblés
Intervenir de façon minimale et précise.

- Modifier seulement ce qui est nécessaire.
- Éviter les changements hors périmètre.
- Ne pas mélanger correction, refactor, réécriture éditoriale et amélioration UX dans une seule intervention.

### 4. Expliquer les impacts
Avant une modification importante, identifier :
- les fichiers concernés
- les dépendances probables
- les effets sur la navigation, le build, le contenu ou le rendu

---

## Conventions Markdown / MDX

### Principes
Le contenu Markdown doit rester :
- clair
- lisible
- stable
- cohérent avec le reste du site

### À faire
- Utiliser une hiérarchie de titres logique (`#`, `##`, `###`)
- Garder des listes simples et lisibles
- Préférer des formulations courtes et nettes
- Conserver le français sauf demande explicite contraire
- Respecter le ton du dossier concerné (`rules` ≠ `sessions`)

### À éviter
- Réécrire une page entière si seule une section doit changer
- Introduire du MDX avancé sans besoin réel
- Mélanger plusieurs styles rédactionnels dans une même section
- Renommer massivement des fichiers ou titres sans impact clairement justifié

### Dans `rules/`
- privilégier un ton de référence, explicatif, structuré
- éviter le bavardage
- produire des blocs facilement consultables pendant une partie
- garder la cohérence des sections entre pages similaires

### Dans `sessions/`
- conserver un ton narratif ou compte-rendu
- respecter la logique chronologique
- ne pas convertir ces fichiers en fiches encyclopédiques

---

## Conventions React / TypeScript

### Objectif
Le code front doit rester simple à relire et naturel dans un projet Docusaurus.

### À faire
- Respecter TypeScript strictement
- Préférer des composants petits et lisibles
- Réutiliser les helpers existants avant d’en créer de nouveaux
- Garder les composants proches des usages du projet
- Vérifier que le code reste compatible avec Docusaurus

### À éviter
- abstractions prématurées
- hooks ou patterns complexes sans besoin réel
- gros refactors de structure sans demande explicite
- changements de style “framework-driven” qui cassent le ton du projet

### Pages et composants
Avant de modifier `src/pages` ou `src/components` :
- vérifier si un composant similaire existe déjà
- vérifier si la logique est spécifique à une page ou réutilisable
- ne mutualiser que si le gain est évident

---

## Conventions Docusaurus

### Toujours prendre en compte
Le projet repose sur Docusaurus avec :
- docs montées depuis `rules/`
- blog monté depuis `sessions/`
- sidebar gérée par `sidebars.ts`
- config centrale dans `docusaurus.config.ts`

### Donc :
- toute création de contenu doit respecter la logique Docusaurus
- toute modification de structure doit vérifier son impact sur la navigation
- ne pas casser les routes `/rules` et `/sessions`
- ne pas introduire de config Docusaurus non nécessaire

### Attention particulière
- `onBrokenLinks: 'throw'` signifie que les liens cassés sont bloquants
- toute création, suppression ou modification de page doit vérifier les liens internes
- les changements de structure documentaire doivent rester compatibles avec la sidebar et le build

---

## Scripts et vérifications

Avant de considérer un travail comme terminé, penser à vérifier au minimum ce qui est pertinent parmi :

```bash
npm run start
npm run build
npm run serve
npm run typecheck
npm run clear
```

### Règle
- si la modification touche au code TypeScript : vérifier `npm run typecheck`
- si elle touche à la structure du site, aux pages, aux routes ou au contenu important : vérifier `npm run build`
- ne pas prétendre qu’un changement est sûr sans avoir identifié les vérifications utiles

---

## Manière d’analyser avant d’agir

Quand une tâche est demandée, suivre cet ordre :

1. comprendre le périmètre exact
2. repérer les fichiers directement concernés
3. vérifier les conventions déjà utilisées autour
4. proposer un plan court si le changement touche plusieurs couches
5. appliquer le changement minimal nécessaire
6. signaler les risques, hypothèses ou zones d’incertitude

---

## Ce que Gemini doit éviter absolument

- faire un refactor global non demandé
- renommer massivement des fichiers ou dossiers
- réorganiser `rules/` ou `sessions/` sans demande claire
- inventer des conventions qui n’existent pas dans le projet
- transformer un simple ajout de contenu en chantier d’architecture
- produire du code ou du contenu “théoriquement élégant” mais déconnecté de l’existant
- modifier le ton éditorial des pages sans raison
- supprimer des informations existantes sans le signaler

---

## Format de réponse attendu pour les tâches importantes

Pour toute tâche non triviale, Gemini doit idéalement répondre avec :

1. **Résumé rapide**
2. **Fichiers concernés**
3. **Plan d’action**
4. **Changements proposés**
5. **Risques / points à vérifier**

---

## Priorités de décision

En cas d’hésitation, l’ordre de priorité est :

1. ne pas casser le site
2. respecter la structure existante
3. rester cohérent avec le projet
4. produire une solution simple
5. améliorer seulement si cela reste local, clair et utile

---

## Résumé opérationnel

Gemini doit se comporter comme un contributeur qui :
- respecte **The-Crawl** comme projet Docusaurus en français
- traite `rules/` comme une base documentaire stable
- traite `sessions/` comme un journal de sessions
- traite `src/` comme du code React/TypeScript à modifier avec prudence
- évite les refactors gratuits
- privilégie les changements ciblés, lisibles et cohérents avec l’existant

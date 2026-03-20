# GEMINI.md

## Objectif

Ce document définit les conventions de travail, de rédaction et de maintenance pour ce projet **Docusaurus**. Il sert de référence unique pour toute contribution sur la documentation, avec une attention particulière portée aux fichiers Markdown et MDX afin de garantir une base homogène, lisible et durable.

L’objectif principal est de préserver les conventions déjà en place, d’éviter les écarts de style, et d’assurer une uniformité éditoriale et technique dans toute l’application.

---

## Principes directeurs

### 1. Préserver l’existant cohérent
- Toujours respecter l’architecture, le ton, les conventions de nommage et les patterns déjà présents dans le projet.
- Ne pas refactorer inutilement un contenu ou une structure qui est déjà cohérente avec le reste du site.
- Toute amélioration doit s’intégrer naturellement dans l’existant.

### 2. Uniformité avant préférence personnelle
- En cas d’hésitation entre plusieurs façons valides de faire, choisir celle qui est déjà utilisée dans le projet.
- Éviter les variations de style entre deux pages qui traitent du même type de contenu.
- Une convention imparfaite mais appliquée partout est préférable à plusieurs conventions concurrentes.

### 3. Clarté, stabilité, maintenabilité
- Rédiger pour être lisible par un humain avant tout.
- Produire des pages faciles à relire, comparer, corriger et maintenir.
- Favoriser une structure prévisible d’une page à l’autre.

### 4. Fidélité sur le fond
- Pour les contenus traduits ou adaptés, rester fidèle au sens de la source.
- Ne pas introduire d’interprétation métier ou de règle non présente dans la source sans le signaler explicitement.
- En cas d’incertitude, préférer une formulation neutre plutôt qu’une surinterprétation.

---

## Périmètre

Ces règles s’appliquent en priorité à :
- tous les fichiers `.md`
- tous les fichiers `.mdx`
- la documentation Docusaurus
- les pages de règles, dieux, patrons, ressources, lore, aides de jeu
- les métadonnées de pages et conventions de navigation

Elles s’appliquent aussi, quand pertinent, aux fichiers de configuration et contenus éditoriaux liés à Docusaurus.

---

## Conventions globales du projet

### Langue
- Le site doit rester cohérent dans la langue d’affichage de chaque section.
- Une page en français doit être entièrement en français, sauf exceptions explicitement assumées.
- Les noms propres peuvent rester dans leur langue d’origine si c’est un choix éditorial stable.
- Les termes techniques ou de règles ne doivent pas être mélangés arbitrairement entre français et anglais.

### Terminologie
- Toujours utiliser la même traduction pour un même terme fonctionnel ou mécanique.
- Interdire les variations non justifiées d’un fichier à l’autre.
- Si un glossaire interne existe, il fait autorité.
- Si aucun glossaire n’existe, toute nouvelle traduction doit chercher à prolonger la convention majoritaire déjà visible dans le projet.

### Style éditorial
- Préférer un style simple, direct, lisible.
- Éviter les tournures trop littérales issues d’une traduction brute.
- Éviter les formulations ambiguës, surchargées ou artificielles.
- Garder une cohérence de ton entre pages comparables.

---

## Standards Markdown / MDX

### Règle générale
Chaque fichier Markdown ou MDX doit être :
- homogène avec les autres pages du même dossier
- prévisible dans sa structure
- proprement formaté
- facile à diff et à relire

### Encodage et caractères
- Utiliser l’UTF-8.
- Conserver correctement les accents français.
- Éviter les caractères invisibles, guillemets incohérents ou espaces parasites.
- Utiliser des apostrophes et ponctuations françaises de façon cohérente.

### Titres
- Un seul `#` par page pour le titre principal.
- Respecter une hiérarchie stricte des niveaux de titres, sans sauter de niveau inutilement.
- Ne pas utiliser les titres uniquement pour créer un effet visuel.
- Les titres d’une même famille de pages doivent suivre le même modèle.

Exemple attendu :

```md
# Cadixtat

## Description

## Clergé

## Pouvoirs
```

### Paragraphes
- Laisser une ligne vide entre deux blocs logiques.
- Éviter les paragraphes inutilement compacts si le contenu gagne à respirer.
- Éviter aussi les retours à la ligne artificiels à l’intérieur d’un paragraphe simple.

### Listes
- Utiliser un style de liste unique dans une même page.
- Préférer `-` pour les listes non ordonnées.
- Garder une indentation stable.
- Une liste doit être grammaticalement homogène.

Exemple :

```md
- Premier point
- Deuxième point
- Troisième point
```

### Tableaux
- Utiliser les tableaux Markdown uniquement lorsqu’ils améliorent réellement la lecture.
- Harmoniser l’ordre des colonnes pour les tableaux similaires.
- Garder les mêmes labels pour les mêmes concepts.
- Éviter les tableaux partiellement traduits.
- Vérifier l’alignement, la lisibilité et la cohérence des intitulés.

### Mise en emphase
- Utiliser `**gras**` pour faire ressortir une information structurante.
- Utiliser `*italique*` avec parcimonie.
- Ne pas multiplier les styles dans la même ligne.
- Éviter de simuler un titre avec du gras seul.

### Citations et blocs spéciaux
- Utiliser les blockquotes uniquement pour de vraies citations, notes ou extraits.
- Ne pas détourner ce format pour la mise en page générale.

### Liens
- Les liens internes doivent suivre les conventions Docusaurus en place dans le projet.
- Vérifier que le texte du lien est explicite.
- Éviter les libellés vagues comme `ici`, `voir`, `lien`.
- Pour les ressources statiques, respecter l’arborescence réellement servie par le site.

### Images
- Les images doivent être référencées avec des chemins cohérents avec la structure du projet.
- Toujours vérifier que le fichier existe réellement dans l’emplacement attendu.
- Utiliser un texte alternatif pertinent quand le contexte le demande.

### Frontmatter
- Le frontmatter doit rester minimal, cohérent et conforme à l’usage déjà en place.
- Ne pas ajouter de clés non utilisées par le projet.
- Garder le même ordre de champs pour les pages comparables quand c’est possible.

Exemple :

```md
---
title: Cadixtat
sidebar_position: 1
---
```

### MDX
- N’utiliser MDX que lorsqu’un besoin réel le justifie.
- Si une page n’a besoin que de contenu éditorial, préférer `.md`.
- Limiter l’usage de composants embarqués pour ne pas complexifier la maintenance.
- Tout composant MDX utilisé doit rester lisible, justifié et cohérent avec l’existant.

---

## Uniformité des pages de règles

Les pages de règles, dieux, patrons ou aides de jeu doivent suivre une structure stable quand le type de contenu est similaire.

### Même type de page = même squelette
Pour deux pages d’une même catégorie, viser autant que possible :
- le même ordre de sections
- le même niveau de détail
- les mêmes conventions de titres
- la même logique de traduction
- la même façon de présenter les pouvoirs, capacités, tableaux et effets

### Noms propres
- Décider explicitement si un nom propre reste en VO ou est traduit.
- Ne pas alterner les deux formes d’une page à l’autre sans raison.
- Si nécessaire, utiliser la forme `Nom français (Nom VO)` au premier passage, puis conserver une seule forme ensuite.

### Terminologie de règles
- Tous les termes mécaniques doivent être uniformisés dans tout le dossier `rules`.
- Un même concept ne doit pas apparaître sous plusieurs formes concurrentes.
- Les intitulés de tables, d’effets et de capacités doivent suivre un modèle constant.

### Traduction
- Traduire le sens, pas seulement les mots.
- Éviter les faux amis et les calques syntaxiques.
- En cas de difficulté, privilégier la clarté de lecture pour un joueur francophone.
- Si une notion reste volontairement en VO, cela doit être un choix éditorial conscient et réutilisé partout.

---

## Nommage des fichiers et dossiers

### Fichiers
- Utiliser des noms de fichiers cohérents avec la convention existante du projet.
- Éviter de mélanger plusieurs styles de nommage dans un même dossier.
- Préférer des noms stables, explicites et prévisibles.

### Dossiers
- Respecter l’organisation documentaire existante.
- Ne pas créer de nouveaux sous-dossiers sans nécessité claire.
- Grouper les contenus par logique fonctionnelle ou éditoriale, pas par préférence individuelle.

---

## Qualité attendue lors d’une modification

Toute modification de contenu doit être relue selon les axes suivants.

### Vérification éditoriale
- orthographe
- grammaire
- accents
- ponctuation
- cohérence du ton
- suppression des restes anglais non voulus
- fluidité des phrases

### Vérification structurelle
- hiérarchie des titres
- espacement entre blocs
- homogénéité des listes
- cohérence des tableaux
- liens valides
- chemins d’assets corrects

### Vérification de cohérence projet
- conformité avec les pages similaires
- respect du vocabulaire déjà en usage
- respect des conventions Docusaurus déjà présentes
- absence d’introduction de nouveaux patterns sans justification

---

## Règles de contribution

### Avant de modifier
- Lire les fichiers voisins du même dossier.
- Identifier le pattern dominant.
- Réutiliser la structure déjà présente quand elle est cohérente.

### Pendant la modification
- Limiter le changement au besoin réel.
- Ne pas mélanger correction de fond et refonte stylistique globale sans nécessité.
- Éviter les modifications massives non homogènes.

### Après la modification
- Relire intégralement la page.
- Vérifier la cohérence avec au moins deux pages similaires.
- Vérifier les liens, ressources et titres.
- S’assurer que le rendu final reste propre dans Docusaurus.

---

## À éviter absolument

- Mélanger français et anglais dans une même page sans raison claire.
- Introduire plusieurs traductions concurrentes d’un même terme.
- Utiliser une structure de titre différente pour des pages comparables.
- Créer des tableaux dont les colonnes changent arbitrairement d’un fichier à l’autre.
- Conserver des morceaux de texte source non traduits par oubli.
- Modifier un nom propre, un titre ou un terme mécanique sans vérifier les autres pages du dossier.
- Ajouter du MDX ou des composants React là où du Markdown simple suffit.
- Corriger un fichier isolé en créant une nouvelle convention incompatible avec le reste.

---

## Check-list de validation pour chaque page Markdown

Avant validation, vérifier :

- [ ] La page est entièrement cohérente dans sa langue.
- [ ] Le titre principal est unique et correct.
- [ ] La hiérarchie des sections est logique.
- [ ] Les listes et tableaux suivent le style du projet.
- [ ] La terminologie est homogène avec les autres pages.
- [ ] Les noms propres suivent la convention retenue.
- [ ] Les liens et assets pointent vers des ressources existantes.
- [ ] Le texte ne contient pas de restes anglais involontaires.
- [ ] La mise en forme Markdown est propre et stable.
- [ ] Le rendu Docusaurus attendu reste lisible.

---

## Recommandation spécifique pour ce projet

Étant donné la nature du site et les écarts observés sur certaines pages de règles, toute nouvelle contribution sur `rules/` doit inclure une vigilance renforcée sur :
- la qualité du français
- la cohérence de traduction
- l’uniformité des tableaux et labels
- la stabilité des conventions entre `Dieux`, `Patron`, `Ressources` et autres sections apparentées

Quand une nouvelle page est créée à partir d’une source anglaise, il faut systématiquement faire deux passes :
1. une passe de traduction fidèle au contenu source
2. une passe d’harmonisation avec les conventions françaises déjà présentes sur le site

---

## Résumé opérationnel

Pour toute intervention sur ce projet Docusaurus :
- respecter l’existant utile
- viser l’uniformité sur tout le site
- traiter les fichiers Markdown comme un périmètre critique
- garder une structure stable et lisible
- harmoniser systématiquement la langue, les titres, les tableaux, les termes de règles et les noms propres

Ce fichier doit être considéré comme la référence de base pour toute contribution éditoriale sur le projet.


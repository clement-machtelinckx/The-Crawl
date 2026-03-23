# Nom de la classe

Courte introduction narrative de 1 à 3 paragraphes maximum.

Cette introduction doit :
- poser l’identité de la classe
- donner son ton et sa fantasy
- rester lisible et fluide
- éviter les retours à la ligne parasites
- rester homogène avec les autres classes du dossier

---

## Caractéristiques de classe

| Élément | Détail |
|---|---|
| **Points de vie** | Décrire clairement les points de vie gagnés par niveau. |
| **Armes maîtrisées** | Lister les armes de manière homogène avec les autres classes. |
| **Armures** | Préciser les armures autorisées et leurs éventuels effets. |
| **Alignement** | Indiquer les tendances d’alignement si pertinent. |
| **Particularité principale** | Ajouter ici le trait identitaire le plus structurant de la classe. |

> Adapter les lignes du tableau au strict besoin de la classe.  
> Conserver les mêmes labels quand une information équivalente existe sur plusieurs classes.

---

## Capacité principale

Présenter ici la mécanique centrale de la classe.

Conseils :
- commencer par une explication simple
- détailler ensuite les effets pratiques
- utiliser des listes à puces si cela améliore la lecture
- éviter les blocs trop denses

Exemple de structure :

- effet principal
- condition d’utilisation
- impact en jeu
- progression éventuelle avec les niveaux

> Ajouter un exemple uniquement si cela clarifie vraiment la règle.

---

## Capacités secondaires

Regrouper ici les autres capacités importantes de la classe.

### Capacité secondaire 1

Expliquer la règle de façon concise et exploitable en jeu.

### Capacité secondaire 2

Expliquer la règle de façon concise et exploitable en jeu.

### Capacité secondaire 3

Expliquer la règle de façon concise et exploitable en jeu.

> Utiliser des sous-sections `###` quand plusieurs capacités doivent être séparées proprement.

---

## Magie

Créer cette section uniquement si la classe utilise la magie.

Inclure ici :
- la nature de la magie pratiquée
- les contraintes importantes
- les risques, limites ou spécificités
- les éléments propres à la classe

Si la classe n’utilise pas la magie, supprimer entièrement cette section.

---

## Combat

Créer cette section si la classe possède des règles de combat spécifiques.

Exemples :
- dé spécial
- critique particulier
- combat à deux armes
- attaque sournoise
- bonus situationnels
- initiative spécifique

Si aucune règle de combat spécifique ne mérite une section dédiée, intégrer ces informations ailleurs.

---

## Traits raciaux ou innés

Créer cette section uniquement si elle est pertinente pour la classe.

Exemples :
- infravision
- immunités
- vulnérabilités
- sens développés
- particularités physiologiques
- effets passifs permanents

Pour une meilleure lisibilité, préférer ce format :

- **Trait :** description claire
- **Trait :** description claire
- **Trait :** description claire

---

## Chance

Créer cette section uniquement si la classe interagit avec la Chance de manière spécifique.

Exemples :
- dé de chance
- récupération de Chance
- bonus fixe appliqué à une mécanique
- rôle de porte-bonheur
- sort favorisé par la Chance

Si la Chance n’a rien de spécifique pour la classe, supprimer cette section.

---

## Langues

Créer cette section si la classe a des règles explicites sur les langues.

Format conseillé :

- **Langues de base :** ...
- **Langues supplémentaires :** ...
- **Condition :** ...

---

## Notes de structure

Quand tu rédiges ou refactors une classe dans `rules/Classes/`, respecte les règles suivantes :

1. **Un seul `#` par fichier**
   - Le titre principal doit être le nom de la classe.

2. **Introduction lisible**
   - Pas de texte brut cassé ligne par ligne.
   - Pas de paragraphe tronqué.
   - Pas de répétition ou de phrase incomplète.

3. **Tableau de caractéristiques stable**
   - Toujours utiliser le tableau `| Élément | Détail |`.
   - Garder le même style de formulation entre classes comparables.

4. **Sections cohérentes**
   - `## Caractéristiques de classe` doit être présent.
   - Les autres sections doivent être ajoutées seulement si elles sont utiles.
   - Préférer des titres explicites : `## Magie`, `## Combat`, `## Chance`, etc.

5. **Lisibilité jeu de rôle**
   - Écrire pour consultation rapide pendant une partie.
   - Préférer des blocs courts, des listes propres et des formulations nettes.

6. **Uniformité avant perfection**
   - Si plusieurs classes décrivent un type d’information similaire, utiliser le même style.
   - Ne pas inventer un nouveau squelette pour une seule classe sans raison forte.

7. **Pas de bruit**
   - Pas de section vide.
   - Pas de lorem ipsum.
   - Pas de texte “à compléter” dans les vrais fichiers finaux.

---

## Check-list avant validation

- [ ] Le fichier contient un seul titre principal `#`.
- [ ] L’introduction est propre et sans retours à la ligne parasites.
- [ ] La section `## Caractéristiques de classe` est présente.
- [ ] Le tableau principal est homogène avec les autres classes.
- [ ] Les sections ajoutées sont réellement utiles.
- [ ] Les mécaniques importantes sont faciles à retrouver.
- [ ] Le français est fluide et cohérent.
- [ ] Les termes de règles sont uniformisés.
- [ ] Le fichier est lisible rapidement en jeu.

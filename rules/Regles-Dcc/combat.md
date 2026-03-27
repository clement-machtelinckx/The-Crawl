# Combat

Les rencontres entre les personnages et les monstres forment la structure de base du jeu. Une rencontre bien conçue demande au Juge de prendre en compte les réactions des monstres, leurs motivations, le moment où ils passent à l’action, et s’il est possible (ou non) de négocier avec eux — ou si le combat est inévitable.

---

## Mécanique de base et Chaîne de dés

Le système repose sur le **d20**. Pour réussir, le résultat (après modificateurs) doit être **supérieur ou égal** au degré de difficulté (**DD**). En combat, le DD est la **Classe d’Armure (CA)**.

### Chaîne de dés
DCC utilise une hiérarchie de dés pour simuler l'avantage ou le désavantage technique :
`d3 - d4 - d5 - d6 - d7 - d8 - d10 - d12 - d14 - d16 - d20 - d24 - d30`

- **Améliorer un dé** : décalage vers la droite.
- **Dégrader un dé** : décalage vers la gauche.
- Les modificateurs numériques (+1, -2, etc.) s’appliquent **après** le changement de dé.

---

## Mouvement

- **Humains et elfes** : 9 m par action.
- **Nains et halfelins** : 6 m par action.

Si les personnages portent une armure de métal ou une charge lourde, ils sont ralentis (voir table des armures).

---

## Initiative

L'initiative est déterminée **une seule fois** au début de la rencontre.
- **Jet** : 1d20 + modificateur d'Agilité.
- **Guerrier** : ajoute son **niveau de classe** au jet.
- **Arme à deux mains** : lance **1d16** au lieu du d20.
- **Égalités** : départagées par l’Agilité, puis le nombre de dés de vie.

---

## Actions et dés d'action

À bas niveau, les personnages disposent d’**une action par round**, exprimée par leur **dé d’action** (souvent 1d20). Un personnage peut se déplacer de son mouvement de base et effectuer son action.

### Activités usuelles et coût en actions

| Activité | Temps |
|---|---|
| Dégainer ou rengainer une arme | 1 action* |
| S’équiper d’un bouclier ou le jeter | 1 action* |
| Ouvrir une porte | 1 action* |
| Allumer une torche ou une lanterne | 1 action |
| Déboucher une potion ou dérouler un parchemin | 1 action |
| Trouver un objet dans son sac à dos | 1 action |
| Se relever après avoir été mis à terre | 1 action |
| Monter ou descendre d’une monture | 1 action |
| Lire un parchemin ou boire une potion | 1 action |

\* *Peut être inclus dans une action de mouvement.*

---

## Classe d’armure et Équipement

La **CA** est déterminée par : `10 + armure + bouclier + Agilité + magie`.
*Note : Le bonus d'Agilité ne s'applique pas si le défenseur ne peut pas manœuvrer (attaché, en équilibre, etc.).*

### Table des armures

| Armure | Bonus CA | Pénalité* | Mouvement | Dé de maladresse |
|---|---:|---:|---:|---:|
| Sans armure | +0 | - | - | d4 |
| Matelassée | +1 | - | - | d8 |
| Cuir | +2 | -1 | - | d8 |
| Cuir clouté | +3 | -2 | - | d8 |
| Peau | +3 | -3 | - | d12 |
| Écailles | +4 | -4 | -1,5 m | d12 |
| Cotte de mailles | +5 | -5 | -1,5 m | d12 |
| Clibanion | +6 | -6 | -1,5 m | d16 |
| Armure de plates | +7 | -7 | -3 m | d16 |
| Harnois | +8 | -8 | -3 m | d16 |
| Bouclier | +1 | -1 | - | d8 |

\* *S'applique à : escalade, saut, équilibre, natation et déplacement silencieux.*
*Note : Un bouclier ne peut pas être utilisé avec une arme à deux mains.*

---

## Jet d’attaque

L’attaquant lance son dé d’action (1d20) + bonus d'attaque de classe + modificateurs.
- **Corps à corps** : + modificateur de **Force** (attaque et dégâts).
- **Distance** : + modificateur d’**Agilité** (attaque uniquement). *La Force ne s'applique aux dégâts qu'à courte portée pour certaines armes de jet.*

### Modificateurs au jet d’attaque

| Situation | Modificateur |
|---|---|
| **Portée (Distance)** | Courte (+2) / Moyenne (+1) / Longue (-1d) |
| **Attaquant** | Invisible (+2) / Surélevé (+1) / Coincé (-1d) / Arme non maîtrisée (-1d) |
| **Cible** | À couvert (-2) / Aveuglée (+2) / Empêtrée (+1d) / Sans défense (+1d) |
| **Position** | À genoux/sol : +2 en mêlée, malus à distance |

---

## Maladresses et Critiques

### Maladresses (1 naturel)
L'attaque échoue. L'attaquant lance le dé correspondant à son armure sur la table des maladresses.
- **Chance** : Le modificateur de Chance est **inversé** (Chance +1 devient -1 sur la table).
- **Guerriers/Nains** : Peuvent brûler **1 pt de Chance** pour annuler l'effet d'une maladresse.

### Coups critiques (20 naturel)
Touche automatiquement. Le lanceur effectue un jet sur la table de critique de sa classe avec son dé de critique spécifique.

---

## Dégâts et Survie

Une attaque réussie inflige toujours **au moins 1 point de dégâts**.

### Mort et Hémorragie (0 PV)
- **Niveau 0** : Mort immédiate.
- **Niveau 1+** : Se vide de son sang. Le personnage a **1 round par niveau** pour être soigné magiquement.
- **Conséquence** : Si sauvé, le personnage subit **-1 Endurance permanent** et une cicatrice.

### Récupérer le corps
Si le corps est récupéré dans l'heure, un **test de Chance** réussi permet de stabiliser le blessé :
- Revient à **1 PV**.
- État **Groggy** pendant 1h (-4 à tous les jets).
- **Blessure permanente** : Perte définitive de 1 pt de caractéristique physique (For, Agi ou End) aléatoire.

---

## Guérison naturelle

- **Nuit de repos** : +1 PV et +1 pt de caractéristique (sauf Chance).
- **Journée alitée + nuit** : +2 PV et +2 pts de caractéristique.

---

## Combat par classe (Spécificités)

- **Guerrier** : Utilise le **Dé de haut fait** (d3 au niv.1) qui s'ajoute à l'attaque et aux dégâts. Peut tenter des manœuvres (aveugler, désarmer) si le dé affiche 3+.
- **Voleur** : **Attaque sournoise** (cible surprise/dos) donne un bonus d'attaque et un **critique automatique** si la cible est touchée.
- **Clerc** : Armes limitées par le culte (souvent gourdin, masse, fronde, marteau). Peut porter n'importe quelle armure sans gêner sa magie.
- **Mage** : Maîtrise des armes très limitée (dague, bâton). L'armure pénalise ses tests d'incantation.

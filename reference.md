# DCC Initiation - Synthèse des règles de combat et de magie

Source analysée : **DCC initiation v3 2023 - maison gnole aventure lvl 1**  
Nature du document : **synthèse structurée** des règles repérées dans le livret d’initiation.  
Périmètre : **combat**, **jets liés au combat**, **guérison**, **magie cléricale et arcanique**, **récupération des sorts**, **brûlesort**, **magie mercurielle**, **corruption**.  
Limite : ce document **résume et remet en forme** les règles visibles dans le PDF ; il **ne remplace pas** les tables complètes de sorts ni le livre de base.

---

## 1. Mécanique de base

- Le système repose principalement sur le **d20**.
- On lance **1d20** et on y ajoute ou soustrait des modificateurs.
- Il faut obtenir un résultat **supérieur ou égal** au **DD** visé.
- En combat, le DD à battre est souvent la **Classe d’Armure (CA)**.
- **1 naturel** : échec automatique, souvent avec **maladresse**.
- **20 naturel** : réussite automatique, souvent avec **coup critique**.

### Chaîne de dés

La chaîne de dés utilisée par DCC est :

`d3 - d4 - d5 - d6 - d7 - d8 - d10 - d12 - d14 - d16 - d20 - d24 - d30`

- **Améliorer un dé** : on se décale d’un cran vers la droite.
- **Dégrader un dé** : on se décale d’un cran vers la gauche.
- Plusieurs décalages peuvent s’additionner ou s’annuler.
- Les modificateurs numériques s’appliquent **après** le changement de dé.

---

## 2. Jets de sauvegarde

Le jeu utilise trois jets de sauvegarde :

- **Vigueur**
- **Réflexes**
- **Volonté**

Ils servent notamment à résister :
- aux effets de sorts,
- aux pièges,
- aux chutes,
- au poison,
- à certaines conséquences de critiques ou de maladresses.

---

## 3. Structure d’un round

À bas niveau, un personnage dispose en général de **1 action par round**, avec un **dé d’action** souvent égal à **1d20**.

En règle générale, un personnage peut :
- **se déplacer** de sa vitesse normale,
- puis **agir** avec son ou ses dés d’action.

### Activités usuelles coûtant 1 action

- Dégainer ou rengainer une arme  
- S’équiper d’un bouclier ou le jeter  
- Ouvrir une porte  
- Allumer une torche ou une lanterne  
- Déboucher une potion ou dérouler un parchemin  
- Chercher un objet dans un sac  
- Se relever après une chute  
- Monter ou descendre d’une monture  
- Lire un parchemin ou boire une potion  

> Certaines de ces actions peuvent être incluses dans un mouvement, selon la situation.

---

## 4. Initiative

- L’initiative détermine l’ordre d’action.
- Certaines armes ou capacités modifient le dé ou le bonus d’initiative.
- Exemple notable : une **arme à deux mains** fait lancer **1d16** pour l’initiative.
- Le **guerrier** ajoute son **niveau de classe** à ses jets d’initiative.

---

## 5. Types de combat

### Combat au corps à corps
- Portée de bras, environ **1,5 m** pour une créature humanoïde.
- Le modificateur de **Force** s’applique :
  - au **jet d’attaque**
  - et aux **dégâts**

### Combat à distance
- Au-delà de la portée de bras.
- Le modificateur d’**Agilité** s’applique au **jet d’attaque**.
- Pour certaines armes de jet, la **Force** ne s’applique aux dégâts qu’à courte portée.

---

## 6. Classe d’Armure (CA)

La **CA** représente la difficulté à toucher une cible.

Elle dépend de :
- l’armure portée,
- le bouclier,
- l’Agilité,
- d’éventuels effets magiques.

### Base
- Un personnage ordinaire sans armure a une **CA 10**.

### Effet de l’Agilité
- Une bonne Agilité augmente la CA.
- Une mauvaise Agilité la diminue.
- Le bonus d’Agilité ne s’applique pas si le défenseur ne peut pas manœuvrer correctement
  (ex. attaché, en train d’escalader, en équilibre précaire, coincé, etc.).

### Armures

| Armure | Bonus CA | Pénalité | Mouvement | Dé de maladresse |
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

Notes :
- Les pénalités d’armure s’appliquent notamment à l’escalade, au saut, à l’équilibre, à la natation et au déplacement silencieux.
- Un **bouclier** ne peut pas être utilisé avec une **arme à deux mains**.
- Mouvement de base :
  - **Humains et elfes** : 9 m
  - **Nains et halfelins** : 6 m

---

## 7. Jet d’attaque

Pour attaquer :

1. lancer le **dé d’action** (souvent **1d20**) ;
2. ajouter :
   - le bonus d’attaque de classe,
   - le modificateur de **Force** en mêlée,
   - le modificateur d’**Agilité** à distance,
   - les bonus/malus éventuels (sorts, objets, capacités, position, portée, etc.) ;
3. comparer le résultat à la **CA** de la cible.

Si le jet est **égal ou supérieur à la CA**, l’attaque touche.

### Modificateurs fréquents au jet d’attaque

#### À distance
- courte portée : pas de malus notable dans la synthèse présente
- moyenne portée : malus
- longue portée : dégradation du jet ou malus important selon la table

#### Situations de combat
- attaquant invisible : bonus
- attaquant surélevé : bonus
- espace étroit : malus
- attaquant empêtré : malus
- arme non maîtrisée : malus
- cible à couvert : malus pour l’attaquant
- cible aveuglée : bonus pour l’attaquant
- cible empêtrée : bonus pour l’attaquant
- cible sans défense, paralysée, endormie ou attachée : fort bonus
- cible à genoux, assise ou au sol : bonus en mêlée, malus à distance selon la table

> La table complète reste la référence si vous voulez tous les modificateurs exacts.

---

## 8. Maladresses

- Un **1 naturel** à une attaque est une **maladresse**.
- L’attaque échoue automatiquement.
- On lance ensuite sur la **table des maladresses**.
- Le **dé lancé dépend de l’armure** portée :
  - sans armure : **d4**
  - sinon : voir la colonne “Dé de maladresse” des armures
- Sur la table des maladresses, le modificateur de **Chance est inversé**.
  - Exemple : **Chance +1** devient **-1** sur la table.

### Exemples d’effets de maladresse
- chute ou perte d’équilibre ;
- arme lâchée ;
- arme endommagée ;
- armure qui se bloque ;
- perte d’action ;
- frappe accidentelle d’un allié ;
- dégâts auto-infligés ;
- immobilisation temporaire.

### Spécificité guerrier / nain
- Les **guerriers** et les **nains** peuvent brûler de la Chance pour réduire les conséquences d’une maladresse.

---

## 9. Coups critiques

- Sur un **20 naturel**, une attaque provoque un **coup critique**.
- Certaines classes élargissent cette plage.
  - Exemple : le **guerrier** critique sur **19-20** aux niveaux 1 à 4.
- Un critique touche automatiquement puis déclenche un **jet sur la table de critique appropriée**.
- La table utilisée dépend de la **classe** et du **niveau**.
- Les personnages de **niveau 0** utilisent une table plus faible ; les classes martiales utilisent des tables plus létales.

### Effets typiques d’un critique
- dégâts supplémentaires ;
- ennemi désarmé ;
- ennemi aveuglé, sonné ou renversé ;
- attaque gratuite ;
- réduction du mouvement ;
- hémorragie interne ;
- perte d’arme ;
- évanouissement sur jet de sauvegarde raté.

---

## 10. Dégâts, mort et survie

### Dégâts
Quand une attaque touche :
- on lance les **dégâts de l’arme** ;
- on ajoute la **Force** en mêlée ;
- on ajoute les bonus éventuels de sort, objet ou capacité.

Une attaque réussie inflige toujours **au moins 1 point de dégâts**, même avec un modificateur de Force négatif.

### Mort à 0 PV
- En règle générale, une créature à **0 PV** meurt.
- Mais certains personnages peuvent encore être sauvés.

### Hémorragie
- Un personnage de **niveau 0** à 0 PV est **mort**.
- Un personnage de **niveau 1** tombe à terre et commence à se vider de son sang :
  - il a **1 round** pour être soigné.
- Chaque niveau au-dessus du 1er donne **1 round supplémentaire**.
- S’il est sauvé, il conserve :
  - **-1 Endurance permanent**
  - une **cicatrice durable**

### Récupérer un corps
Si le corps d’un allié est récupéré dans l’heure :
- il peut tenter un **test de Chance** ;
- en cas de réussite, il n’était pas vraiment mort mais grièvement blessé ;
- il revient avec :
  - **1 PV**
  - état **groggy** pendant 1 heure (**-4 à tous les jets**)
  - perte définitive aléatoire de **1 point** de Force, Agilité ou Endurance

---

## 11. Guérison naturelle

- Une nuit complète de repos : **+1 PV**
- Une journée alitée + une nuit : **+2 PV**
- On ne peut jamais dépasser son maximum de PV.

### Blessures issues de critiques
- Elles guérissent quand les dégâts supplémentaires associés sont soignés.
- Certaines blessures critiques sont **permanentes** et nécessitent des moyens extraordinaires ou magiques.

### Récupération des caractéristiques
- Force, Agilité, Endurance, etc. :
  - **+1 point** après une bonne nuit
  - **+2 points** après une journée + nuit de repos complet
- La **Chance**, elle, ne se récupère normalement pas.
- Exceptions : capacités particulières du **voleur** et du **halfelin**.

---

## 12. Règles de combat par classe (éléments saillants)

### Guerrier
- Dé de haut fait au niveau 1 : **d3**
- Ce dé s’ajoute :
  - au **jet d’attaque**
  - et aux **dégâts**
- Le guerrier peut annoncer un **haut fait d’armes** avant une attaque :
  - désarmer
  - repousser
  - faire trébucher
  - aveugler
  - etc.
- Le haut fait réussit si :
  - l’attaque touche
  - et si le **dé de haut fait** donne **3 ou plus**
- Très bonne progression en critiques.
- Ajoute son niveau à l’initiative.

### Voleur
- Peut faire une **attaque sournoise** :
  - si la cible est surprise ou attaquée par derrière
- Reçoit un bonus au jet d’attaque.
- Si l’attaque touche, elle provoque automatiquement un **critique**.
- Certaines armes (dague, garrot, matraque, sarbacane selon les notes) ont un meilleur profil en attaque sournoise.

### Clerc
- Peut combattre avec les armes autorisées par son culte.
- Dans ces règles d’initiation : gourdin, masse, fronde, bâton, marteau de guerre.
- Peut porter n’importe quelle armure sans malus sur l’incantation.

### Mage
- Maîtrise quelques armes simples et certaines lames.
- Porte rarement une armure, car elle gêne l’incantation.

---

## 13. Principes généraux de la magie

### Test d’incantation
Pour lancer un sort, on fait un **test d’incantation**.

#### Clerc
`1d20 + modificateur de Présence + niveau d’incantateur`

#### Mage
`1d20 + modificateur d’Intelligence + niveau d’incantateur`

- Plus le résultat est élevé, plus l’effet du sort est puissant.
- Chaque sort possède sa propre **table de résultats**.

### Critique et échec en magie
- **20 naturel** au test d’incantation :
  - réussite critique
  - bonus supplémentaire égal au **niveau d’incantateur**
- **1 naturel** :
  - échec automatique
  - peut entraîner **défaveur** (clerc) ou **corruption / revers** (mage)

### Concentration
- Certains sorts exigent de la concentration.
- Pendant ce temps, l’incantateur ne peut généralement rien faire d’autre que se déplacer à **demi-vitesse**.
- S’il subit des dégâts, chute ou subit une interruption importante :
  - **jet de Volonté DD 11**
  - en cas d’échec, la concentration est brisée

### Jet de sauvegarde contre un sort
- Sauf indication contraire, le **DD du jet de sauvegarde** contre un sort est égal au **résultat du test d’incantation**.

### Inversion d’un sort
- Certains sorts peuvent être **inversés** pour produire l’effet opposé.
  - Exemple donné : réparer -> endommager
  - agrandissement -> rétrécissement

### Lancer un sort sans être mage ou clerc
- Une classe non entraînée peut tenter de lire une formule ou un parchemin.
- Elle lance **1d10** au lieu de 1d20.
- Elle n’ajoute ni modificateur de caractéristique ni niveau d’incantateur.
- Le voleur entraîné peut faire mieux selon sa table de classe.

---

## 14. Magie du clerc

### Principe
Le clerc obtient ses miracles d’une divinité.

### Défaveur
- Un **1 naturel** au test d’incantation provoque la **défaveur**.
- Le sort échoue automatiquement.
- Le clerc doit lancer sur la **table de défaveur**.

### Montée du risque
Chaque échec augmente le risque de défaveur pour le reste de la journée :
- après le premier échec : défaveur sur **1-2**
- après le deuxième : **1-3**
- etc.

Cela signifie qu’un clerc peut finir par échouer automatiquement même sur des résultats normalement suffisants.

### Réinitialisation
- En principe, le risque de défaveur revient à son état normal **chaque matin**.
- Mais le texte précise que certains dieux pardonnent mal.

### Sacrifices
Le clerc peut réduire sa défaveur par des **sacrifices** :
- richesses matérielles,
- offrandes,
- service rendu à la divinité,
- quête ou haut fait, selon le Juge.

#### Valeur de rachat
- Chaque tranche de **50 po** sacrifiée annule **1 point** de défaveur.
- Un **1 naturel** reste toujours un échec automatique avec défaveur.
- Faire un sacrifice demande **au moins un tour** et une concentration totale :
  - donc pas une simple action instantanée de combat.

### Repousser les impies
Le clerc peut brandir son symbole sacré pour repousser les créatures impies :
- morts-vivants,
- démons,
- diables,
- et autres ennemis considérés impies par son culte.

Jet :
`1d20 + modificateur de Présence + niveau d’incantateur + modificateur de Chance`

- Un échec augmente aussi la défaveur.

### Imposition des mains
Le clerc peut soigner une créature vivante par contact.

Restrictions :
- ne fonctionne pas sur :
  - morts-vivants,
  - objets animés,
  - créatures extraplanaires,
  - constructions / golems

Jet :
`1d20 + modificateur de Présence + niveau d’incantateur`

- Un échec augmente la défaveur.
- Le nombre de dés de soin dépend :
  - du test obtenu,
  - du type de dé de vie de la cible,
  - et de l’alignement du clerc par rapport à la cible.

#### Soins selon l’alignement
Le livret distingue :
- **Identique**
- **Adjacent**
- **Opposé**

Résultat général :
- même alignement : soins les plus forts
- alignement voisin : soins réduits
- alignement opposé : soins faibles et acte potentiellement fautif

Table résumée :

| Test d’incantation | Identique | Adjacent | Opposé |
|---|---:|---:|---:|
| 1-11 | Échec | Échec | Échec |
| 12-13 | 2 dés | 1 dé | 1 dé |
| 14-19 | 3 dés | 2 dés | 1 dé |
| 20-21 | 4 dés | 3 dés | 2 dés |
| 22+ | 5 dés | 4 dés | 3 dés |

---

## 15. Magie du mage

### Principe
La magie du mage est dangereuse, imprévisible et inhumaine.
Un mage de niveau 1 connaît **4 sorts** dans ce livret.

### Sorts connus
- Les sorts connus sont déterminés **aléatoirement**.
- Ils peuvent être de n’importe quel niveau que le mage est capable de maîtriser.

### Modificateurs liés à la Chance
Chez le mage, la Chance s’applique notamment :
- aux **jets de corruption**
- à la **magie mercurielle**

### Langues
- Le mage maîtrise **2 langues supplémentaires** par point de modificateur d’Intelligence.

---

## 16. Brûlesort

Le **brûlesort** permet au mage d’augmenter un test d’incantation en sacrifiant provisoirement des caractéristiques.

### Principe
Le mage dépense temporairement :
- **Force**
- **Agilité**
- **Endurance**

Pour chaque point sacrifié :
- **+1** au test d’incantation

### Récupération
- Les points reviennent par guérison naturelle.
- Chaque jour où le mage n’utilise pas de brûlesort :
  - il récupère **1 point** de caractéristique sacrifiée

### Critique automatique
- Si le mage sacrifie **20 points** de caractéristiques d’un seul coup,
- son prochain test d’incantation est traité comme un **20 naturel**.

---

## 17. Récupération des sorts

### Sort perdu
Certaines tables de sort indiquent **“perdu”** :
- cela signifie que le sort ne peut plus être relancé **ce jour-là**.

### Cas général
- Si le résultat n’indique pas “perdu”, le sort peut être relancé.
- En général, ce sont surtout les **sorts de mage** qui sont perdus à l’échec.

### Clercs
- Les clercs n’oublient pas leurs sorts de la même manière ;
- à la place, leur problème est l’augmentation de la **défaveur**.

### Moment de récupération
Le retour des sorts dépend du type de magie. Exemples donnés :
- magie blanche : **lever du jour**
- magie noire : **après le passage de la lune**
- magie démoniaque : **8 heures de repos complet**
- magie divine : **repos + prière**
- etc. selon l’accord entre le Juge et le joueur

---

## 18. Magie mercurielle

La **magie mercurielle** rend chaque sort légèrement différent selon le mage.

### Quand faire le jet
Quand un mage **apprend un nouveau sort**, il lance sur la table de **magie mercurielle**.

### Jet
- jet en **%**
- modifié par **Chance x 10 %**
  - exemple : Chance +2 -> +20 %

### Effet
Le résultat est **spécifique au sort appris**.

### Exemples d’effets mercuriels
- le sort soigne aussi autour du mage ;
- le test se fait avec un dé dégradé ;
- le sort doit être crié ;
- les autres mages peuvent aider ;
- une bulle de contremagie pénalise les sorts proches ;
- le mage subit une distorsion de Chance ;
- des doigts fondent ;
- un jumeau mystique apparaît ;
- le sort réclame du sang ou un sacrifice.

---

## 19. Corruption et revers arcanique

### Corruption
L’usage de la magie expose le mage à des transformations physiques ou surnaturelles.

### Déclenchement
À chaque **1 naturel** sur un test d’incantation :
- le sort échoue,
- le mage peut subir un **revers arcanique**,
- et une **corruption** selon la table du sort ou les tables générales.

### Jet de corruption
Quand une corruption mineure, majeure ou supérieure est demandée :
`1d10 - niveau du sort + modificateur de Chance`
avec modificateurs supplémentaires éventuels selon les circonstances.

### Éviter une corruption
- Le mage peut **brûler 1 point de Chance** pour éviter une corruption.
- Cela se fait **après** le jet.
- En revanche, il **ne peut pas** éviter un **revers arcanique** de cette manière.
- Les **souillures de patron** comptent comme des corruptions et peuvent donc être évitées par la Chance.

### Exemples de corruption mineure
- pustules sur le visage,
- peau à l’aspect de cire fondue,
- jambe allongée,
- troubles des yeux,
- plaies qui ne guérissent pas,
- oreilles mutées,
- frissons permanents,
- déformation du visage.

---

## 20. Ce qu’il faut retenir à la table

### Combat
- La **CA** est centrale.
- **1 naturel** = maladresse.
- **20 naturel** = critique.
- Les modificateurs de **Force** et **Agilité** sont essentiels.
- L’armure protège mais pénalise certaines actions.
- À 0 PV, la survie dépend beaucoup du niveau et de la vitesse des soins.

### Magie
- Un sort se résout par **test d’incantation**.
- Plus le résultat est haut, meilleur est l’effet.
- Le **clerc** gère la **défaveur**.
- Le **mage** gère :
  - la perte de sorts,
  - le **brûlesort**,
  - la **magie mercurielle**,
  - la **corruption**,
  - les **revers arcanique**.

### Philosophie générale
DCC favorise :
- les résultats spectaculaires,
- les effets imprévisibles,
- la prise de risque,
- la mortalité réelle,
- des règles de magie beaucoup plus dangereuses et plus “vivantes” qu’un système de sorts classique.

---

## 21. Références utiles dans le PDF

Repères de pages imprimées du livret :

- **p. 1-2** : mécanique de base, chaîne de dés  
- **p. 7-10** : classes, clerc, guerrier, mage  
- **p. 18-22** : combat, attaque, maladresses, critiques, dégâts, mort  
- **p. 22** : guérison  
- **p. 24-26** : magie, concentration, récupération des sorts, magie mercurielle, corruption  
- **p. 26+** : tables et sorts détaillés

---

## 22. Points de prudence

- Cette synthèse conserve les règles visibles dans le **livret d’initiation**, pas l’intégralité du livre de base.
- Certaines tables complètes ont été **résumées**, pas recopiées intégralement.
- Pour arbitrer un cas précis de sort, la **table du sort concerné** reste prioritaire.

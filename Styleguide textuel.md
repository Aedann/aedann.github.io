# 🎨 UI/UX Vision — Portfolio Interactif

## 1. Typographie

* **Police principale :** Georgia, serif.
* **Fallbacks :** Times New Roman, serif.
* **Hiérarchie :**

  * `h1` → titres de section (taille grande, bold, centrés).
  * `h2/h3` → sous-sections (medium, italique possible).
  * `p` → corps du texte (normal, lisible, pas de texte trop serré).
* **Contraste garanti AA** : texte toujours ≥ 4.5:1 sur son fond.

---

## 2. Thèmes graphiques (BarreCateg → change tout le style global)

### EnR (Énergies renouvelables)

* **Palette :**

  * `bg-gradient` : vert forêt (`#2d6a4f`) → marron clair (`#a98467`)
  * `accent` : bleu foncé PV (`#023e8a`)
  * `text` : noir (`#000`) ou brun foncé (`#3b2f2f`)
* **Décor :** Parallax 3 plans (panneaux solaires, montagnes/forêts, montagnes/éoliennes).
* **Icône associée :** panneau solaire.

### Informatique

* **Palette :**

  * `bg` : noir pur (`#000`)
  * `text` : vert terminal (`#39ff14`)
* **Décor :** SVG clavier en fond, style "console matrix".
* **Icône associée :** symbole clavier/code.

### Électronique

* **Palette :**

  * `bg-gradient` : bleu PCB foncé (`#001845`) → vert PCB (`#2a9d8f`)
  * `accent` : cuivre doré conducteur (`#daa520`)
  * `text` : clair (`#f5f5f5`)
* **Décor :** tracés de circuits en SVG transparents.
* **Icône associée :** circuit imprimé.

### Web

* **Palette :**

  * `bg` : gris foncé (`#121212`)
  * `accent-gradient` : de violet (`from-purple-400`) à bleu (`to-blue-300`)
  * `text` : blanc cassé (`#f8f9fa`)
* **Décor :** gradient animé, style "modern web".
* **Icône associée :** symbole globe/web.

### Autres

* **Palette neutre** : gris clair (`#e5e5e5`), texte noir.
* Sert de fallback pour les projets inclassés.

---

## 3. Composants majeurs

### 🔹 BarreCateg

* Occupe **1/10e de la hauteur d’écran**.
* Onglet sélectionné collé à gauche.
* Changement du **thème global** au clic.

### 🔹 Sommaire flottant

* Colonne gauche, **icônes rondes flottantes**.
* Anchors : `#projets`, `#parcours`, `#contact`.

### 🔹 Section Présentation

* Portrait (carré ou rond), nom, âge, texte intro.
* Boutons LinkedIn, GitHub, Mail (icônes claires, hover animé).

### 🔹 ProjetsThumbnails

* Style **claymorphism** : cartes arrondies, ombre douce.
* Couleur de fond dépend de la catégorie (EnR, Info, etc.).
* Contenu : titre, topics (icônes), boutons (`Essayer WASM`, `Lien`, `GitHub`).
* Clic → **Popup détaillée** (Markdown + contenu complet).

### 🔹 NavigateurProjet

* Vue tableau + filtres par catégorie (multi-sélection).
* Filtrage dynamique au clic (checkbox/bouton tag).

### 🔹 BlocParcours

* Timeline verticale (expériences/formation).
* Icônes spécifiques : 🎓 (formation) / 💼 (travail).
* Champs JSON :

  ```json
  {
    "type": "formation|travail",
    "title": "Titre de l’expérience",
    "institution": "Nom établissement",
    "logo": "/logos/ecole.svg",
    "dates": "2020 - 2022",
    "description": "Texte descriptif"
  }
  ```

### 🔹 ParcoursTimeline

* Super-composant → trie blocs JSON par date.
* Affiche en parallèle si chevauchement temporel.

### 🔹 Section Contact

* Bannière finale avec icônes + liens (LinkedIn, GitHub, Mail).
* Style claymorphism cohérent.

---

## 4. Comportements interactifs

* **Hover sur boutons / cartes** → ombre accentuée, légère translation.
* **Projets** → clic ouvre popup markdown.
* **Filtres** → ajout/suppression en temps réel (animation douce).
* **Timeline** → animations légères (slide-in à l’apparition).
* **Parallax** (EnR uniquement) → effet scrolling 3 plans.
* **i18n bouton rond** (FR/EN) → bascule texte en haut à gauche.

---

## 5. Disposition verticale (ordre des sections)

1. **BarreCategories** (top bar, 1/10e hauteur).
2. **Section Présentation** (photo, nom, intro, réseaux).
3. **NavigateurProjet** (filtres + table projets).
4. **ParcoursTimeline** (formations + expériences).
5. **Section Contact** (bannière, liens).

# Globe 3D Interactif 360° pour les Réalisations

Intégration d'une expérience 3D immersive où les 8 projets de Compaoré Abdoul Aziz sont disposés sur une sphère 360° pivotable dans toutes les directions avec inertie physique, interaction tactile/souris, zoom, et bascule fluide vers une grille classique.

## User Review & Critical Decisions

> [!IMPORTANT]
> Les trois décisions fondamentales validées lors de notre échange sont intégrées directement au cœur de l'architecture :
> - **Mode d'affichage hybride** : Un globe 3D interactif spectaculaire par défaut avec un commutateur instantané permettant de basculer vers la vue grille classique (Perez style).
> - **Contrôle & Manipulation 360°** : Rotation libre à la souris (glisser-déplacer) et au doigt sur mobile/tablette avec inertie physique fluide (damping) et rotation automatique douce au repos.
> - **Interaction au clic** : Le clic sur une carte l'amène au premier plan avec ouverture fluide d'une vue détaillée (titre, tags, technologies vérifiées, lien direct vers le site et emplacement de capture d'écran).

---

## 1. Overview & Core Concept

- **Expérience Utilisateur** : Au lieu d'une simple liste de cartes statiques, l'utilisateur découvre un globe céleste 3D rotatif flottant au sein de la section *"My recent work"*. Les 8 projets y sont distribués de manière équidistante sur une sphère orbitale avec des liaisons géométriques lumineuses et des coordonnées spatiales.
- **Interactivité** :
  - L'utilisateur peut faire tourner la sphère dans toutes les directions (360° horizontalement et verticalement).
  - Au survol d'une carte, celle-ci s'oriente face caméra et s'illumine avec les accents dorés/ocres de la charte.
  - Au clic, la sphère pivote pour placer le projet au centre et déploie le panneau de détails avec le lien direct et la possibilité d'importer la capture d'écran.
- **Accessibilité & Flexibilité** : Un bouton de bascule visible *"Vue Globe 3D ⇄ Vue Grille 2D"* permet aux visiteurs qui le souhaitent de revenir à la mise en page en cartes classique du template Perez.

---

## 2. User Experience & Visual Design

- **Ambiance Visuelle** :
  - Harmonisation parfaite avec le design Perez (`#FFF8F1`, ocre `#F9A826` et noir `#141416`).
  - L'arrière-plan du globe intègre une lueur radiale douce, des méridiens et parallèles subtils en pointillés et des particules orbitales dorées.
  - Les cartes projet sur le globe possèdent un cadre vitré élégant avec le titre du projet, son badge de catégorie et l'indicateur cliquable.
- **Contrôles & Ergonomie** :
  - Barre de contrôle compacte en bas du viewport 3D :
    - Bouton Pause / Reprise de la rotation automatique.
    - Bouton Réinitialiser la vue (Recentrage).
    - Bascule *"Globe 3D"* / *"Grille classique"*.
    - Indicateur d'aide gestuelle : *"Glissez pour faire pivoter à 360° · Cliquez sur un projet"*.
- **Transitions & Motion** :
  - Damping exponentiel (`lerp` / inertie) pour un ressenti physique naturel sans à-coups.
  - Animation fluide lors de la sélection d'un projet amenant la caméra à converger vers la carte choisie.

---

## 3. Key Product Decisions & Trade-Offs

- **Technologie 3D retenue : Three.js + HTML Canvas / CSS3D Hybride** :
  - *Pourquoi* : Three.js garantit 60 FPS sur mobile et desktop, permet de gérer les projections sphériques (coordonnées Fibonacci sur sphère) et le raycasting précis.
  - *Alternative écartée* : Pur CSS 3D `transform-style: preserve-3d` (limité en profondeur, manque d'inertie physique et problèmes de clipping entre cartes superposées).
- **Emplacement des captures d'écran préservé** :
  - Chaque projet conserve son composant d'import de capture d'écran, garantissant que l'utilisateur peut enrichir ses visuels à tout moment.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    Section "My Recent Work"                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   En-tête & Commutateur de Vue [ Globe 3D | Grille ]  │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                               │
│              ┌──────────────┴──────────────┐                │
│              ▼                             ▼                │
│   ┌──────────────────────┐     ┌────────────────────────┐   │
│   │   Vue Globe 360°     │     │   Vue Grille Classique │   │
│   │   (Canvas Three.js)  │     │   (Cartes Perez 2D)    │   │
│   │                      │     │                        │   │
│   │ • Sphère interactive │     │ • Cartes 2 colonnes    │   │
│   │ • 8 Cartes en orbite │     │ • Filtres catégories   │   │
│   │ • Raycaster clic     │     │ • Dropzone capture     │   │
│   │ • Inertie & Damping  │     │ • Liens directs        │   │
│   └──────────┬───────────┘     └───────────┬────────────┘   │
│              │                             │                │
│              └──────────────┬──────────────┘                │
│                             ▼                               │
│        ┌──────────────────────────────────────────┐         │
│        │   Tiroir / Modal Détail & Liens Directs  │         │
│        │   (AgriVigil, Horizon, KONEKT, etc.)     │         │
│        └──────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### Étapes d'exécution prévues :
1. **Installation des dépendances 3D** : `three` et `@types/three` via un appel unique d'installation.
2. **Création du composant `ProjectGlobe3D.tsx`** :
   - Initialisation du renderer WebGL, de la caméra perspective et de la scène avec gestion des lumières et de l'environnement studio.
   - Algorithme de distribution sphérique équidistante (Fibonacci Sphere Lattice) pour positionner les 8 projets harmonieusement.
   - Rendu des cartes de projet sous forme de textures canevas haute définition avec titre, catégorie et statut.
   - Gestion des événements de glisser-déplacer (souris et tactile) avec inertie physique, zoom et rotation fluide.
   - Raycasting pour détecter le survol et le clic sur chaque carte projet.
3. **Mise à jour de `Projects.tsx`** :
   - Intégration du composant Globe 3D avec commutateur d'affichage fluide (Globe 360° ↔ Grille Perez).
   - Connexion au système de modal de détail et à l'importateur de capture d'écran.
4. **Vérification & Compilation** :
   - Contrôle strict via `compile_applet` et `lint_applet`.

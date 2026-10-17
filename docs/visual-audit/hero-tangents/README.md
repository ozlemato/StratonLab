# Hero : dessin des cercles et tangentes

Correction du 13 octobre 2026, après demande de l’utilisateur. Référence live et [script public de Gladia](https://www.gladia.io/js/hero-canvas.js) consultés.

## Paramètres relevés et reproduits
- Centre : largeur/2 et hauteur×0,95 ; rayon de base : min(largeur,hauteur)×1,25.
- Anneaux : rayon de base×0,14 /0,22 /0,60.
- Tracé2,4s, interpolation quintique smootherstep ; trois origines par cercle.
- Quatre tangentes, prolongées aux bords de l’écran (marge40px), dessin simultané depuis les deux extrémités.
- Rotation après tracé : deux pas de22,5°, intervalle1,25s, interpolation exponentielle ; arrêt de la boucle à5,4s.
- Apparition du décor : y70→0 et opacité0,4→1 sur3s, cubic-bezier(.16,1,.3,1).

Implémentation propre dans src/components/hero-orbit.tsx. Les droites sont construites avec une direction perpendiculaire au rayon passant par leur point de contact : elles restent mathématiquement tangentes à tous les angles. Les points sont placés par cx+r*cos(a),cy+r*sin(a), donc restent sur leur anneau.

Libellés demandés : agent.active et task_001 sur le grand cercle, workflow_ready sur l’anneau intérieur. Positions latérales adaptées à la largeur pour rester visibles. Couleur de marque et fond jaune existants préservés ; suppression de l’ancienne grille fixe et de la parallaxe scroll.

## Vérifications
- Build production, TypeScript, lint et9tests HTTP réussis.
- États drawing / rotating / complete observés après rechargement ; captures conservées dans ce dossier.
- Vérification visuelle desktop1440×900 et mobile390×844. Aucun débordement horizontal. Espacement du texte en bas du hero mobile ajusté pour éviter le chevauchement du troisième libellé.
- Aucune erreur/alerte console retournée.
- Préférence reduced-motion : état final statique et sans animation CSS ; code contrôlé, préférence système non émulée.
- ResizeObserver, IntersectionObserver, visibilité onglet et démontage nettoyés. Pas de boucle permanente. Aucune nouvelle dépendance ni requête tierce dans l’application.

Les valeurs de géométrie et de timing des cercles/tangentes sont reproduites ; le fond, la typographie des repères et les trois positions/libellés sont ceux de StratonLab. Ce n’est pas une copie pixel à pixel de tout le hero Gladia. Le placement varie avec la hauteur propre de chaque hero. Aucun nouveau score Lighthouse n’a été mesuré après cette correction ; les scores précédents sont historiques.

# Référence visuelle — première implémentation

Référence correcte : https://www.gladia.io/. Date : 12 octobre 2026.

## Sources et accès

AGENTS.md, brief.md et instructions/01-master-prompt.md ont été lus intégralement. Le document 02 n’a pas été exécuté : ses seules URL ont été corrigées à la demande du propriétaire.

La homepage Gladia.io a été inspectée dans le navigateur : hero, navigation, étapes au scroll, grille claire, comparaison, témoignages, CTA et footer. Des états intermédiaires de révélation ont été observés. Les 14 captures desktop et 10 captures mobiles fournies ont aussi été examinées sous forme de planches dans docs/visual-audit/. La page du HAR confirme Gladia.io ; aucun code ni média propriétaire n’a été extrait.

Les deux vidéos sont présentes, mais le décodeur FFmpeg embarqué n’a pas pu lire le MP4 desktop (« Invalid data found when processing input »). Cela ne prouve pas une corruption ; ce décodeur peut être limité. Aucun timing précis n’a été mesuré sur ces vidéos. Le titre live diffère de la capture : la référence a évolué.

## Compositions observées et transposition

Valeurs estimées visuellement, pas mesures de CSS propriétaire.

| Section | Observation | StratonLab |
| --- | --- | --- |
| Navigation | Barre flottante centrée, environ 1190 px à 1440 px, marge haute 24 px, translucide, mégamenu sombre. | Barre 1160 px, marge 22 px, fond clair pour le véritable logo noir/jaune. Mégamenu sombre, menu mobile. |
| Hero | Gros titre centré, badge, paragraphe court, CTA arrondi ; fond clair-violet-noir et arcs. | Titre 80 px, palette ivoire-or-noir, CTA #FDD33C, arcs CSS originaux. Badge sans compteur inventé. |
| Réassurance | Plusieurs rangs de logos clients dans le noir. | Trois verbes métier, aucune preuve sociale fabriquée. |
| Introduction | Titre et texte centrés, apparition verticale. | Présentation agence et principes de conception. |
| Parcours | Quatre textes à gauche, visualisation persistante à droite, étapes activées au scroll, fond pointillé. | Comprendre, concevoir, connecter, faire progresser. Panneau sticky et ligne progressive. |
| Grille claire | Cinq cartes noires asymétriques : 1/3–2/3, 2/3–1/3, pleine largeur. Illustrations et expansion. | Même rythme, visuels métier originaux HTML/SVG et dialogues natifs. |
| Comparaison | Tableau extensible multi-colonnes. | Pas de benchmark sans preuve ; scénarios métier à onglets. |
| Témoignages | Mosaïque sombre de portraits et citations. | Non reprise, aucune référence client disponible. Principes de collaboration et FAQ. |
| CTA | Texte centré, halo bas. | Halo doré, arc et lien réel vers le contact. |
| Footer | Colonnes de liens, badges. | Trois colonnes, aucun badge de certification non justifié. |

## Responsive

Les captures mobiles montrent navigation repliée, hero vertical, parcours sans grand sticky, cartes empilées et footer en deux colonnes. StratonLab garde son logo complet, retire le schéma redondant sous 900 px, passe étapes et cartes sur une colonne sous 600 px.

## Limites

Transposition de composition et de comportement, pas copie frame par frame. Palette, navigation claire et absence de témoignages/comparatif sont intentionnelles. Les durées sont reconstruites. Le deuxième audit reste à effectuer à la demande de l’utilisateur.

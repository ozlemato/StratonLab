# Design system StratonLab

## Marque et couleurs

Logo original copié sans modification dans public/brand/logo-StratonLab.png (1040 × 261), ratio conservé, fond clair. Symbole SVG original conservé. Sept entrées de logo/favicon.zip contrôlées contre les chemins traversants et extraites, manifeste en français nommé StratonLab.

Tokens obligatoires dans src/app/globals.css :

```css
--brand-accent: #FDD33C;
--brand-accent-rgb: 253 211 60;
--brand-accent-foreground: #171717;
```

Noir #080908, papier #f8f8f4, texte #111210. Accent jaune pour CTA, états actifs et détails. Les halos dérivent de tons dorés atténués. Pas de texte jaune sur fond clair.

## Typographie et géométrie

Manrope variable auto-hébergée par next/font/local, fournie par Fontsource (SIL OFL), font-display swap. Après audit : H1 desktop 79px/1,2, graisse400 ; H2 principal48px ; corps hero20px et sections18px. Mobile : H1 40px, corps16–17px ; FAQ15px, champs16px. Les petites légendes graphiques sont décoratives et leur information est reprise dans le contenu.

Conteneur courant1160px, navigation1200px, méthode1240px et solutions1120px ; marges adaptées de40px desktop /20px mobile. Espacements verticaux 75–140 px. Bento asymétrique desktop, adapté tablette puis une colonne mobile. Méthode sur une colonne sous900px. Cartes desktop398px de haut. Cartes rayon 21 px, dialogues 23 px, CTA en pilule, filets fins et ombres mesurées. Breakpoints : 1600, 1100, 900 et 600 px.

## Composants

Navigation flottante, mégamenu, menu mobile, cartes et dialogues natifs, onglets ARIA (flèches, Home, End), FAQ details/summary, formulaire étiqueté, message de statut et 404 française. Icônes Lucide ; aucun émoji.

## Accessibilité et performance

Focus visible, lien d’évitement, hiérarchie H1/H2/H3 et HTML serveur. Schéma sticky décoratif masqué sous 900 px. Polices et marques locales ; pas de vidéo lourde ni WebGL ; pas de scroll capturé. Réduction des mouvements prise en compte. Aucun média ou code propriétaire de référence réutilisé.

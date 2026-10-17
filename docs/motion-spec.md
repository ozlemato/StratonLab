# Motion — état actuel du 13 octobre 2026

Référence : https://www.gladia.io/. L’audit initial des 12–13 octobre est complété par les correctifs ciblés hero et workflow. Les paramètres ci-dessous viennent des scripts publics hero-canvas.js et homepage-deferred.js, confrontés au site live. Ils remplacent les anciennes approximations de la piste et de la ligne.

| Effet | Déclenchement | Comportement |
| --- | --- | --- |
| Hero | Chargement | Canvas : dessin 2,4 s smootherstep, puis deux rotations tangentes de 22,5° espacées de 1,25 s ; arrêt à 5,4 s. Apparition 3 s, cubic-bezier(.16,1,.3,1), y70→0. |
| Fond hero | Chargement et resize | Éclipse radiale noire, halo #FDD33C, couches floutées et voile inférieur de 45 %. Calcul mis en cache par taille ; aucun flou recalculé par frame. Voile placé derrière les repères pour préserver leur lisibilité. |
| Révélations | Entrée dans le viewport | y36→0, opacity0→1, 0,85 s power3.out, top92%, une fois. Ne remasque pas les éléments déjà visibles. |
| Parcours | Entrée d’une étape dans la bande 10–25 % du viewport | Piste sticky, translation discrète 650 ms cubic-bezier(.4,0,.2,1). Centre à 42 % de la scène, 55 % pour la dernière étape. |
| Nœuds | Changement d’étape | Étapes précédentes visibles à 25 % ; nouvelle étape apparaît en 550 ms. Retour arrière réversible. |
| Connecteur | Première visite d’une étape | Segment lumineux descendant en 620 ms, easeInOutSine ; conserve un fil fin derrière lui. |
| Contour du ticket | 440 ms après le connecteur | Petit segment lumineux parcourant le rectangle arrondi depuis le centre supérieur, sens horaire, 1600 ms. Queue jaune et pointe claire, disparition sur les derniers 18 %. |
| Saut d’étapes | Scroll rapide | Rattrapage des étapes non vues, décalage 380 ms. Pas de boucle infinie ni redessin répété au retour. |
| Cartes / CTA | Survol et focus | Transitions CSS ; CTA y−3px, flèche +2/−2px en 250 ms. |

Le connecteur et le contour sont calculés dans les coordonnées de layout de la même piste SVG. Ils restent attachés aux cartes pendant la translation. ResizeObserver recalcule les chemins après redimensionnement ; RAF, observateurs et styles sont nettoyés au démontage ou changement de breakpoint.

GSAP est différé au premier scroll pour les révélations et la gestion matchMedia. La séquence du workflow utilise IntersectionObserver et requestAnimationFrame. Sous 900 px, le diagramme décoratif est masqué ; les quatre étapes restent accessibles. Avec prefers-reduced-motion, aucune séquence de workflow ni rotation du hero : présentation statique. Préférence vérifiée dans le code, pas d’émulation système.

Captures historiques dans visual-audit/phase-02/ (ancienne piste continue), correctif tangentes dans visual-audit/hero-tangents/, nouvel état dans visual-audit/eclipse-workflow/. Les anciens pourcentages de scroll ne mesurent pas cette nouvelle animation temporelle. Pas de prétention à une identité pixel par pixel : couleur, typographie, dimensions des cartes et contenus restent ceux de StratonLab.

## Complément du 14 octobre — navbar et entrée hero
Le logo blanc fourni est utilisé dans navbar/footer. Navigation sombre à65% et blur40px ; panneau animé260/340ms avec blur24px, liens hover160ms. Hero FadeInUp et résolution progressive du flou ; voir visual-audit/navbar-hero/README.md. Points grands écrans :−70°/+45° depuis le haut dès1920px de canvas, mêmes couleurs pour les trois repères. Flèche Explorer dirigée vers le bas. Ces paramètres remplacent les anciennes descriptions correspondantes.

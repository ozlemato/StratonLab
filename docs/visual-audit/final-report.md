# Audit final Visual & Motion — StratonLab

Audit du second prompt exécuté les 12 et 13 octobre 2026. Travail réalisé directement dans le projet existant. Référence visuelle consultée : https://www.gladia.io/. Neuralia reste uniquement une inspiration métier. Aucune fidélité parfaite ni certification de conformité n’est revendiquée.

## Résultat et corrections

| Priorité | Écart initial | Correction réelle et preuve |
| --- | --- | --- |
| P1 | Parcours trop court, diagramme presque statique | Quatre compositions originales, translation verticale, révélation des étapes, progression de la ligne et masque. Parcours desktop porté de 2260 à 3555px pour un viewport de 900px. workflow.tsx, motion.tsx et globals.css ; motion-comparison.png. |
| P1 | Départ du parcours trop bas | Suppression du titre visible redondant (H2 conservé pour la structure), réduction des espaces de l’introduction. Départ de 1906 à 1500px, référence à 1453px. |
| P1 | Typographie et proportions | H1 79px/1,2, graisse 400, largeur 1040px ; texte hero 20px/1,5 ; titres de section 48px et paragraphes 18px. Navigation de 1160 à 1200px. Planche hero avant/après. |
| P1 | Méthode tablette en colonnes | Étapes dans une seule colonne sous 900px, diagramme décoratif masqué, hauteurs adaptées au contenu. Vérifié à 768×1024. |
| P1 | Détail de solution éloigné de la référence | Dialogue clair à deux colonnes avec contenu métier et encadré de cadrage, une colonne mobile, hauteur limitée avec défilement intérieur. Tab, fermeture Échap et restitution du focus vérifiés. |
| P2 | Géométrie irrégulière du bento | Conteneur 1120px, cartes desktop de 398px, titre 32px, dernière carte aussi haute que les autres. |
| P2 | Texte mobile et formulaires trop petits | Corps de méthode/services augmenté, FAQ 15px, champs 16px, texte légal 15px ; contrôle à 390 et 320px. |
| P2 | Double marge des ancres | Un seul décalage de navigation conservé via scroll-padding ; suppression du scroll-margin additionnel. |
| P2 | Charge initiale des animations | Import GSAP au premier défilement ; éléments déjà visibles jamais remasqués. Contextes nettoyés sur changement de route et de media query. |
| P2 | Accent dispersé dans les effets | Alphas jaunes centralisés sur --brand-accent-rgb ; accent principal exact #FDD33C conservé. |
| P3 | CTA final disproportionné | Titre desktop ramené de 70 à 52px, espacement et corps rééquilibrés. |

Aucun P0 identifié dans les contrôles effectués. Les écarts restant observables sont exposés plus bas ; cette conclusion ne signifie pas absence de toute anomalie possible.

## Comparaison de toute la page

| Section | Référence et résultat |
| --- | --- |
| Navigation | Même logique flottante et largeur proche. Fond clair conservé pour le logo noir officiel ; menus français, liens réels, ouverture/fermeture explicite. |
| Hero | Arcs, repères et transition du clair au sombre. Taille du titre rapprochée de la référence 79px/94,8px. Manrope conservée plutôt que la police Suisse Intl. Deux CTA correspondant au parcours agence. |
| Introduction | Rôle de transition vers la méthode conservé ; contenu original, sans bandeau de logos clients inventés. |
| Méthode | Quatre étapes, texte à gauche, diagramme sticky à droite sur desktop. Trois étapes de 85svh puis 140svh, comme les hauteurs observées sur la référence. Composition interne adaptée au métier de l’agence. |
| Solutions | Alternance cartes étroites/larges puis carte pleine largeur ; espace de 16px et hauteur 398px. Dessins CSS/SVG originaux et détails ouverts au clic. |
| Cas d’usage | Onglets et exemple métier remplacent le comparatif commercial propre à Gladia. Scénarios explicitement illustratifs, aucune métrique de performance inventée. |
| Engagements | Trois principes remplacent les preuves commerciales et témoignages faute de références validées. Différence éditoriale intentionnelle. |
| FAQ | Contenu français, accordéons natifs, réponse lisible à 320px. |
| CTA final | Halo jaune, arc et CTA visible. Texte original et hauteur adaptés ; composition proche mais pas copie du décor propriétaire. |
| Footer | Logo officiel, vrais liens internes et pages légales. Plus court que Gladia, sans badges de certification ni liens de produits inexistants. |

## Animations et méthode de mesure

Les captures ne sont pas prises à des positions arbitraires de la page : la progression sticky est calculée par `(scrollY - sectionTop) / (sectionHeight - viewportHeight)`, bornée entre 0 et 1. À 1440×900, la référence commence à environ 1453,29px, le site à 1500,47px ; les deux sections mesurent 3555px, donc la distance sticky est 2655px. Les JSON reference-motion.json et after-motion.json conservent positions, transformations et états.

Les cinq vues 000/025/050/075/100 correspondent à cette **progression observable du parcours sticky**. Elles ne prouvent pas une identité des timelines internes. La timeline locale se termine au début de la quatrième étape, après 2295px : sa progression est environ 0 / 0,29 / 0,578 / 0,868 / 1 sur ces vues. La timeline privée de Gladia n’a pas été instrumentée. Les transitions de référence paraissent davantage découpées par étapes ; le mouvement local reste continu et synchronisé au scroll. L’aller-retour a été vérifié : les étapes suivantes se masquent de nouveau en remontant.

| Animation | Type | Implémentation finale | Limite de fidélité |
| --- | --- | --- | --- |
| Arcs hero | Scroll | Translation verticale 95px, scrub 0,6, linéaire | Amplitude et lissage reconstruits visuellement. |
| Entrées | Entrée viewport puis temps | y36→0, opacité 0→1, 0,85s power3.out, seuil top92%, une fois | Pas de flou animé ; durée de référence non mesurée frame par frame. |
| Diagramme | Sticky + scroll | Piste centrée sur chaque nœud, trois segments égaux, scrub0,65 ; activation progressive et masque supérieur/inférieur | Micro-timing et séquençage différents de la référence. |
| Nœuds | État du parcours | Translation26px, échelle0,97 et opacité ; transition0,65s | Illustrations propres à StratonLab. |
| Cartes/CTA | Interaction | Relief, halo, translation et rotation de l’icône ; transitions CSS | Pas de shaders propriétaires reproduits. |
| Menus/dialogues/onglets/FAQ | Interaction | Contrôles natifs ou ARIA, clavier, pas de contenu dépendant du survol | Transitions adaptées aux composants. |

Pas de boucle lourde ni détournement du scroll. Sous 900px : parcours dans le flux. Avec prefers-reduced-motion : pas de GSAP animé, suppression du sticky et des grandes hauteurs, décor statique, transitions et scroll fluide neutralisés. Code vérifié, changement de préférence système non testé. Le redimensionnement desktop→tablette retire bien data-animated.

## Preuves visuelles reproductibles

Dossier phase-02/ : références et captures finales aux viewports 1440×900, 1280×800, 768×1024, 390×844 ; contrôle complémentaire à 320px. Les variations de largeur utile dues à la barre de défilement sont normales.

- [Hero : référence, avant et après](phase-02/hero-comparison.png).
- [Superposition des contours du hero](phase-02/hero-edge-overlay.png) : référence en rouge, résultat en cyan ; aide d’inspection, pas score de similarité.
- [Parcours : cinq progressions sticky](phase-02/motion-comparison.png).
- [Dialogue mobile](phase-02/after-390-dialog.png), [méthode tablette](phase-02/after-768-method.png), [FAQ 320px](phase-02/after-320-faq.png).

Génération des planches : `python scripts/compare-audit.py`. Les contours conservent les différences de mots, de marque et d’illustrations : celles-ci ne sont pas interprétées comme des erreurs. Aucun pourcentage de similarité n’est avancé.

## Identité : dix contrôles

1. Logo de logo/ repris dans le header et le footer ; copie identique vérifiée par SHA256.
2. Favicon fourni installé, références metadata et HTTP validées.
3. Accent exact #FDD33C, RGB253/211/60 dans les variables et themeColor.
4. CTA principaux jaunes avec texte sombre.
5. Hover et états actifs utilisent les mêmes tokens et transitions.
6. Halos jaunes dérivés de la variable RGB, pas de substitution à la couleur de marque.
7. Aucune identité Gladia ou Neuralia dans les contenus publics ; noms conservés seulement dans les documents d’analyse.
8. Gris et tons secondaires conservés pour la hiérarchie, vérifiés par axe sur les états stables.
9. Texte #171717 sur jaune : contraste élevé ; aucun texte jaune sur fond blanc. Axe : zéro violation détectée dans les pages testées.
10. Logo 1040×261 affiché en largeur contrainte et hauteur auto ; aucun étirement. Assets originaux préservés.

## Éditorial

Navigation, titres, paragraphes, cartes, formulaires, erreurs, métadonnées et pages légales en français. Textes rédigés pour StratonLab : automatisation, assistants, interfaces conversationnelles, applications et cadrage IA. Aucun texte commercial, témoignage, logo client ou chiffre de Gladia/Neuralia réutilisé. Les possibilités de projets sont présentées comme à confirmer au cadrage. Restent à valider : catalogue réel de prestations, coordonnées, mentions d’éditeur/hébergeur et politique liée aux futurs traitements.

## Vérifications techniques réelles

| Contrôle | Résultat |
| --- | --- |
| Build production | Réussi après les corrections du code. |
| ESLint / TypeScript | Réussis, dernier passage le 13 octobre. |
| Tests HTTP | 9/9 réussis : routes françaises, CSP/nonces, en-têtes, ancres, ressources, marque/favicon, 404 fichiers internes et noindex. |
| Dépendances | 0 vulnérabilité production ; 5 alertes élevées de développement, chaîne braces/micromatch/fast-glob/eslint-config-next. Correction nécessaire dès version compatible corrigée. |
| Axe desktop | 0 violation, 28 passes, 2 incomplets. |
| Axe mobile | 0 violation, 28 passes, 2 incomplets. |
| Axe contact | 0 violation, 27 passes, 0 incomplet. |
| Clavier et UI | Dialogue Tab/Échap/focus, menu Échap, onglets flèche droite, FAQ, liens d’ancres et changement de route vérifiés. |
| Formulaire | TXT réellement téléchargé et contenu relu avec données fictives ; erreur française pour texte trop court. Aucun envoi serveur. |
| Responsive | Pas de débordement horizontal détecté aux formats testés ; détails mobiles défilables, méthode tablette sur une colonne. |
| Console et serveur | Aucune erreur/alerte renvoyée lors du dernier parcours ; log stderr vide. |
| Lighthouse mobile local | Performance95, accessibilité100, bonnes pratiques100, SEO66. Dernière mesure LCP2,6s, CLS0, TBT150ms. |

LCP encore légèrement supérieur à la cible2,5s. La première mesure de cette phase était2,9s ; la variabilité interdit d’attribuer tout le gain à l’import différé. Pas de mesure INP ni de données terrain au75e percentile. TBT ne remplace pas INP. SEO66 expliqué notamment par noindex volontaire avant informations réelles et validation. Voir [audit sécurité actualisé](../security-compliance-audit.md).

## Écarts et limites restants

- **Adaptations volontaires** : jaune officiel, logo, navigation claire, Manrope sous licence libre, illustrations originales. Elles ne sont pas des défauts de marque.
- **Différences éditoriales** : textes français, deux CTA, cas d’usage et engagements à la place des preuves commerciales de la référence ; footer moins dense.
- **Approximations visuelles P2/P3** : gradient et halos, décor des cartes, largeur interne du dialogue1120 plutôt que1200, départ du parcours environ47px plus bas, retours de texte propres à la police et au français.
- **Approximation motion P2** : translation continue au lieu du séquençage plus discret de Gladia ; easing, seuils et délais non mesurés dans son code propriétaire. Le comportement est fonctionnel mais pas parfaitement identique.
- **Limites techniques** : Chromium local uniquement. Safari/iOS, Firefox, zoom système, lecteur d’écran et préférence de mouvement système restent non vérifiés. Les résultats automatisés ne constituent pas une certification WCAG/RGPD/OWASP.
- **Avant publication** : compléter informations légales/contact/domaine, contrôler HTTPS/HSTS et en-têtes sur l’hébergement réel, activer l’indexation seulement après validation, corriger les alertes de développement et poursuivre la mesure LCP/INP.
- **Fichiers** : AGENTS.md, brief.md et le prompt02 sont accessibles et lus intégralement. Aucun de ces fichiers requis n’est inaccessible. Les vidéos locales sont présentes, mais aucun décodage frame par frame exploitable n’a été obtenu avec le décodeur disponible ; référence live et captures utilisées.

Le journal de reprise permanent est à la racine : JOURNAL-DE-BORD.md. Les étapes historiques, preuves et limites y sont consignées pour éviter de recommencer après interruption.

## Correction supplémentaire du hero (13 octobre 2026)

Après retour de l’utilisateur, le décor statique a été remplacé par le dessin et les rotations tangentes observés sur Gladia. Les paramètres exacts ont été relevés dans son script public. Voir [compte rendu et preuves](hero-tangents/README.md). Les anciennes limites de l’animation du hero sont donc supersédées par ce correctif ; les mesures Lighthouse précédentes n’ont pas été répétées pour cette version.

## Complément du 13 octobre — éclipse et workflow
L’écart de translation continue et de ligne scaleY est désormais corrigé : transitions par étape et segment parcourant le contour de chaque ticket, paramètres vérifiés dans la source publique Gladia.io. Fond hero radial reconstruit dans la couleur de marque. Voir eclipse-workflow/README.md et ../motion-spec.md pour le comportement actuel, les contrôles et captures. Les limites correspondantes décrites plus haut sont historiques ; les autres réserves avant publication subsistent.

## Complément du 14 octobre — navbar, logos et hero
Corrections ciblées demandées réalisées. Voir navbar-hero/README.md pour mesures de référence, adaptations explicites, détails et preuves. Logo blanc dans header/footer, navigation sombre floutée, accordéon animé, apparition des textes et flou du hero, nouvelles positions/couleurs des points et flèche Explorer verticale. Lint/types/build et9tests HTTP passés. Scores Lighthouse/axe antérieurs non remesurés.
